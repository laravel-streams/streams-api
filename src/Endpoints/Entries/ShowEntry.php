<?php

namespace Streams\Api\Endpoints\Entries;

use Streams\Api\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\URL;
use Streams\Core\Support\Facades\Streams;
use Streams\Api\Builders\Endpoints\ApiEndpoint;
use Streams\Core\Entry\Contract\EntryInterface;
use Streams\Api\Endpoints\Entries\Concerns\AppliesEagerLoading;

class ShowEntry extends ApiEndpoint
{
    use AppliesEagerLoading;

    public function __invoke(?string $stream = null, ?string $entry = null, ?string $map = null): JsonResponse
    {
        $stream = $this->resolveStream($stream);

        $response = new ApiResponse($stream);

        $criteria = $response->stream->entries();

        $this->fire('apply', compact('criteria'));

        $this->applyEagerLoading($criteria, $response->stream);

        if (! $instance = $criteria->find($entry)) {
            return $response->make(null, 404);
        }

        $this->addRelationshipLinks($response, $instance);

        return $response->make($instance);
    }

    public function addRelationshipLinks(ApiResponse $response, EntryInterface $instance): void
    {
        foreach ($instance->stream()->fields as $field) {
            if ($field->type == 'relationship') {
                if (! $value = $instance->getAttribute($field->handle)) {
                    continue;
                }

                $related = Streams::make($field->config('related'));

                /*
                 * When the relation was eager loaded under a relation
                 * name equal to the field handle, the attribute holds
                 * the related entry instead of its key.
                 */
                if (! $value = $this->relatedKey($value, $related->config('key_name', 'id'))) {
                    continue;
                }

                $response->addLink($field->relationName(), URL::route('streams.api.entries.show', [
                    'stream' => $related->id,
                    'entry' => $value,
                ]));
            }
        }
    }

    protected function relatedKey(mixed $value, string $keyName): mixed
    {
        if ($value instanceof EntryInterface) {
            return $value->getAttribute($keyName);
        }

        if ($value instanceof \Illuminate\Contracts\Support\Arrayable) {
            $value = $value->toArray();
        }

        if (is_array($value)) {
            return $value[$keyName] ?? null;
        }

        return is_scalar($value) ? $value : null;
    }

    protected function getDefaultUri(): ?string
    {
        return 'streams/{stream}/entries/{entry}';
    }

    protected function getDefaultMethods(): string|array
    {
        return 'get';
    }

    protected function getDefaultWhere(): array
    {
        return [
            'entry' => '(.*)',
        ];
    }
}

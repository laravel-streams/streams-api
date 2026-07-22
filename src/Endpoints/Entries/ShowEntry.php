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

                $response->addLink($field->relationName(), URL::route('streams.api.entries.show', [
                    'stream' => $related->id,
                    'entry' => $value,
                ]));
            }
        }
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

<?php

namespace Streams\Api\Http\Controller\Entries;

use Streams\Api\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\URL;
use Streams\Core\Support\Facades\Streams;
use Streams\Core\Entry\Contract\EntryInterface;
use Streams\Core\Support\Traits\FiresCallbacks;

class ShowEntry extends Controller
{
    use FiresCallbacks;

    protected static ?string $stream = null;

    protected static ?string $resource = null;

    public function __invoke(string $entry, ?string $map = null): JsonResponse
    {
        $response = new ApiResponse(static::$stream);

        $criteria = $response->stream->entries();

        $this->fire('apply', compact('criteria'));

        if (! $instance = $criteria->find($entry)) {
            return $response->make(null, 404);
        }

        $this->addRelationshipLinks($response, $instance);

        return $response->make($instance);
    }

    public function addRelationshipLinks(ApiResponse $response, EntryInterface $instance)
    {
        foreach ($instance->stream()->fields as $field) {

            if ($field->type == 'relationship') {

                if (! $value = $instance->getAttribute($field->handle)) {
                    continue;
                }

                $stream = Streams::make($field->config('related'));

                $response->addLink($field->handle, URL::route('streams.api.entries.show', [
                    'stream' => $stream->id,
                    'entry' => $value,
                ]));
            }
        }
    }
}

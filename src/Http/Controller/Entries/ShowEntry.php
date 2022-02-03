<?php

namespace Streams\Api\Http\Controller\Entries;

use Streams\Api\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\URL;
use Streams\Core\Support\Facades\Streams;
use Streams\Core\Entry\Contract\EntryInterface;

class ShowEntry extends Controller
{
    public function __invoke(string $stream, string $entry, string $map = null): JsonResponse
    {
        $response = new ApiResponse($stream);

        if (!$instance = $response->stream->entries()->find($entry)) {
            return $response->make(null, 404);
        }

        $this->addRelationshipLinks($response, $instance);

        return $response->make($instance);
    }

    public function addRelationshipLinks(ApiResponse $response, EntryInterface $instance)
    {
        foreach ($instance->stream()->fields as $field) {

            if ($field->type == 'relationship') {

                if (!$value = $instance->getRawAttribute($field->handle)) {
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

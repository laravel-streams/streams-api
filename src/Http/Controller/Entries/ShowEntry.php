<?php

namespace Streams\Api\Http\Controller\Entries;

use Illuminate\Support\Str;
use Streams\Api\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\URL;
use Streams\Api\Http\Controller\ApiController;
use Streams\Core\Entry\Contract\EntryInterface;
use Streams\Core\Support\Facades\Streams;

class ShowEntry extends ApiController
{
    public function __invoke(string $stream, string $entry, string $map = null): JsonResponse
    {
        $response = new ApiResponse($stream);

        if (!$instance = $response->stream->entries()->find($entry)) {
            return $response->make(null, 404);
        }

        // if ($map) {

        //     $map = explode('/', $map);

        //     foreach ($map as $key) {

        //         if ($instance instanceof EntryInterface && $instance->hasAttribute($key)) {

        //             $instance = $instance->{$key};

        //             continue;
        //         }

        //         $accessor = Str::camel("get_{$key}_attribute");

        //         if (is_object($instance) && method_exists($instance, $accessor)) {

        //             $instance = $instance->{$accessor}();

        //             continue;
        //         }

        //         $method = Str::camel($key);

        //         if (is_object($instance) && method_exists($instance, $method)) {

        //             $instance = $instance->{$method}();

        //             continue;
        //         }

        //         $target = get_class($instance);

        //         throw new \Exception("Cannot map [$key] on target [$target].");
        //     }
        // }

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

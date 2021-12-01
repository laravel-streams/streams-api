<?php

namespace Streams\Api\Http\Controller\Entries;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Str;
use Streams\Core\Support\Facades\Streams;
use Streams\Api\Http\Controller\ApiController;
use Streams\Core\Entry\Contract\EntryInterface;

class ShowEntry extends ApiController
{

    public function __invoke(
        string $stream,
        string $entry,
        string $map = null
    ): JsonResponse {

        $instance = Streams::entries($stream)->find($entry);

        if ($map) {

            $map = explode('/', $map);

            foreach ($map as $key) {

                if ($instance instanceof EntryInterface && $instance->hasAttribute($key)) {
                    
                    $instance = $instance->{$key};

                    continue;
                }

                $accessor = Str::camel("get_{$key}_attribute");

                if (is_object($instance) && method_exists($instance, $accessor)) {
                    
                    $instance = $instance->{$accessor}();

                    continue;
                }

                $method = Str::camel($key);

                if (is_object($instance) && method_exists($instance, $method)) {
                    
                    $instance = $instance->{$method}();

                    continue;
                }

                $target = get_class($instance);

                throw new \Exception("Cannot map [$key] on target [$target].");
            }
        }

        $response = Response::json([
            'meta' => [
                'parameters' => Request::route()->parameters(),
                'query' => Request::query(),
            ],
            'links' => [
                'self' => URL::to(Request::path()),
                'stream' => URL::route('streams.api.streams.show', ['stream' => $stream]),
                'entries' => URL::route('streams.api.entries.index', ['stream' => $stream]),
            ],
            'data' => $instance,
        ], $instance ? 200 : 404);

        if (is_object($instance) && method_exists($instance, 'lastModified')) {
            $response->setLastModified($instance->lastModified());
        }

        return $response;
    }
}

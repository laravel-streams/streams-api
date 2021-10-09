<?php

namespace Streams\Api\Http\Controller\Entries;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;
use Streams\Api\Http\Controller\ApiController;

class ShowEntry extends ApiController
{

    /**
     * Return all entries for the stream.
     *
     * @param $stream
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke($stream, $entry)
    {
        $instance = Streams::entries($stream)->find($entry);

        return Response::json([
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
    }
}

<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;

class ShowStream extends Controller
{

    /**
     * Return a single Stream.
     *
     * @param string $stream
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke($stream)
    {
        $instance = Streams::make($stream);

        return Response::json([
            'meta' => [
                'parameters' => Request::route()->parameters(),
                'query' => Request::query(),
            ],
            'links' => [
                'self' => URL::to(Request::path()),
                'streams' => URL::route('streams.api.streams.index'),
                'entries' => URL::route('streams.api.entries.index', ['stream' => $stream]),
            ],
            'data' => $instance,
        ], $instance ? 200 : 404);
    }
}

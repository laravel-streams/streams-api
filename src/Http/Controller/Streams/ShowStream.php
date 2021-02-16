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
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke($stream)
    {
        $instance = Streams::make($stream);

        return Response::json([
            'data' => $instance->toArray(),
            'meta' => [
                'query' => Request::query(),
            ],
            'links' => [
                'self' => URL::to(Request::path()),
                'entries' => URL::route('ls.api.entries.index', ['stream' => $stream]),
            ],
        ]);
    }
}

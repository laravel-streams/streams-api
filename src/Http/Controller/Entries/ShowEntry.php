<?php

namespace Streams\Api\Http\Controller\Entries;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;

class ShowEntry extends Controller
{

    /**
     * Return all entries for the stream.
     *
     * @param $stream
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke($stream, $entry)
    {
        $instance = Streams::repository($stream)->find($entry);

        return Response::json([
            'data' => $instance,
            'meta' => [
                'entry' => $entry,
                'stream' => $stream,
                'query' => Request::query(),
            ],
            'links' => [
                'self' => URL::to(Request::path()),
                'index' => URL::route('ls.api.entries.index', ['stream' => $stream]),
            ],
        ], $instance ? 200 : 404);
    }
}

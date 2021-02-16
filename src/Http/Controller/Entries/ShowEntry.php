<?php

namespace Streams\Api\Http\Controller\Entries;

use Illuminate\Routing\Controller;
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
        if (!$result = Streams::repository($stream)->find($entry)) {
            return Response::json([
                'entry' => $entry,
                'errors' => ['Entry not found'],
            ], 404);
        }
        
        return Response::json([
            'entry' => $entry,
            'data' => $result,
        ]);
    }
}

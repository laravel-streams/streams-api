<?php

namespace Streams\Api\Http\Controller\Entries;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;

class DeleteEntry extends Controller
{

    /**
     * Return all entries for the stream.
     *
     * @param $stream
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke($stream, $entry)
    {
        if (!$entry = Streams::entries($stream)->find($original = $entry)) {
            return Response::json([
                'data' => $entry,
                'meta' => [
                    'stream' => $stream,
                    'input' => Request::input(),
                ],
                'errors' => [
                    "Entry [{$original}] not found.",
                ],
            ], 404);
        }

        $entry->delete();

        return Response::json([], 204);
    }
}

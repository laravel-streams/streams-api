<?php

namespace Streams\Api\Http\Controller\Entries;

use Illuminate\Routing\Controller;
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
        if (!$entry = Streams::entries($stream)->find($entry)) {
            abort(404);
        }

        $entry->delete();

        return Response::json([
            //'data' => $entry,
        ]);
    }
}

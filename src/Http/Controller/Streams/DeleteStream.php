<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;

class DeleteStream extends Controller
{

    /**
     * Return a single Stream.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke($stream)
    {
        if (!$stream = Streams::entries('core.streams')->find($original = $stream)) {
            return Response::json([
                'data' => $stream,
                'meta' => [
                    'input' => Request::input(),
                ],
                'errors' => [
                    "Stream [{$original}] not found.",
                ],
            ], 404);
        }

        Streams::repository('core.streams')->delete($stream->id);

        return Response::json([], 204);
    }
}

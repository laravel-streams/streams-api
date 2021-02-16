<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Routing\Controller;
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
        if (!$stream = Streams::entries('core.streams')->find($stream)) {
            abort(404);
        }

        Streams::repository('streams')->delete($stream->id);

        return Response::json([]);
    }
}

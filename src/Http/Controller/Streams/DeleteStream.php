<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;

class DeleteStream extends Controller
{

    /**
     * Return a single Stream.
     *
     * @param string $stream
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function __invoke($stream)
    {
        if (!$stream = Streams::entries('core.streams')->find($stream)) {
            return Response::json([
                'meta' => [
                    'parameters' => Request::route()->parameters(),
                    'payload' => Request::json(),
                ],
                'links' => [
                    'self' => URL::full(),
                    'streams' => URL::route('streams.api.streams.index'),
                ],
                'errors' => [
                    [
                        'message' => 'Stream not found.',
                    ],
                ],
            ], 404);
        }

        Streams::repository('core.streams')->delete($stream);

        return Response::noContent();
    }
}

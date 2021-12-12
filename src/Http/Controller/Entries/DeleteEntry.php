<?php

namespace Streams\Api\Http\Controller\Entries;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\URL;
use Streams\Core\Support\Facades\Streams;

class DeleteEntry extends Controller
{
    /**
     * Return all entries for the stream.
     *
     * @param $stream
     * @param $entry
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function __invoke($stream, $entry)
    {
        if (! $entry = Streams::entries($stream)->find($entry)) {
            return Response::json([
                'meta' => [
                    'parameters' => Request::route()->parameters(),
                    'payload' => Request::json(),
                ],
                'links' => [
                    'self' => URL::full(),
                    'streams' => URL::route('streams.api.streams.index'),
                    'stream' => URL::route('streams.api.streams.show', ['stream' => $stream]),
                    'entries' => URL::route('streams.api.entries.index', ['stream' => $stream]),
                ],
                'errors' => [
                    [
                        'message' => 'Entry not found.',
                    ],
                ],
            ], 404);
        }

        Streams::repository($stream)->delete($entry);

        return Response::noContent();
    }
}

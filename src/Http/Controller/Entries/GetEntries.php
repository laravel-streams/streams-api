<?php

namespace Streams\Api\Http\Controller\Entries;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;

class GetEntries extends Controller
{

    /**
     * Return all entries for the stream.
     *
     * @param $stream
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke($stream)
    {
        $paginator = Streams::entries($stream)
            ->loadParameters(Request::json('query', []))
            ->paginate([
                'per_page' => Request::get('per_page', 100),
                'page' => Request::get('page', 1),
            ]);

        return Response::json([
            'meta' => [
                'total' => $paginator->total(),
                'per_page' => $paginator->perPage(),
                'last_page' => $paginator->lastPage(),
                'current_page' => $paginator->currentPage(),
                'parameters' => Request::route()->parameters(),
                'payload' => Request::json(),
            ],
            'links' => [
                'self' => URL::full(),
                'first_page' => $paginator->url(1),
                'next_page' => $paginator->nextPageUrl(),
                'previous_page' => $paginator->previousPageUrl(),
                'streams' => URL::route('streams.api.streams.index'),
                'stream' => URL::route('streams.api.streams.show', ['stream' => $stream]),
            ],
            'data' => $paginator->getCollection(),
        ]);
    }
}

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
            ->setParameters($parameters = json_decode(Request::get('q'), true) ?: [])
            ->paginate(Request::get('per_page', 100));

        return Response::json([
            'data' => $paginator->getCollection()->toArray(),
            'meta' => [
                'query' => array_merge(Request::query(), ['q' => $parameters]),
                'total' => $paginator->total(),
                'per_page' => $paginator->perPage(),
                'last_page' => $paginator->lastPage(),
                'current_page' => $paginator->currentPage(),
            ],
            'links' => [
                'self' => URL::to(Request::path()),
                'next_page' => $paginator->nextPageUrl(),
                'previous_page' => $paginator->previousPageUrl(),
            ],
        ]);
    }
}

<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;

class GetStreams extends Controller
{

    /**
     * Return an index of Streams.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke()
    {
        $paginator = Streams::entries('core.streams')
            ->setParameters((array) json_decode(Request::get('q'), true) ?: [])
            ->paginate(Request::get('per_page', 100));

        return Response::json([
            'data' => $paginator->getCollection()->toArray(),
            'meta' => [
                'parameters' => Request::route()->parameters(),
                'query' => Request::query(),
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

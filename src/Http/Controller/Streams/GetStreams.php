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
                'self' => URL::current(),
                'first_page' => $paginator->url(1),
                'next_page' => $paginator->nextPageUrl(),
                'previous_page' => $paginator->previousPageUrl(),
            ],
            'data' => $paginator->getCollection(),
        ]);
    }
}

<?php

namespace Streams\Api\Http\Controller\Entries;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;
use Streams\Api\Http\Controller\ApiController;

class GetEntries extends ApiController
{

    public function __invoke($stream)
    {

        $headers = [];

        $parameters = Request::query('parameters', []);

        $criteria = Streams::entries($stream)->loadParameters($parameters);

        $results = $criteria->paginate([
            'per_page' => Request::get('per_page', 100),
            'page'     => Request::get('page', 1),
        ]);

        $meta = [
            'total' => $results->total(),
            'per_page' => $results->perPage(),
            'last_page' => $results->lastPage(),
            'current_page' => $results->currentPage(),
            'route_parameters' => Request::route()->parameters(),
            'parameters' => $parameters,
        ];

        $links = [
            'first_page' => $results->url(1),
            'next_page' => $results->nextPageUrl(),
            'previous_page' => $results->previousPageUrl(),

            'self'    => URL::full(),
            'streams' => URL::route('streams.api.streams.index'),
            'stream'  => URL::route('streams.api.streams.show', ['stream' => $stream]),
        ];

        return Response::json([
            'meta'  => $meta,
            'links' => $links,
            'data'  => $results->all(),
        ], 200, $headers);
    }
}

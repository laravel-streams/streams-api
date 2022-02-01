<?php

namespace Streams\Api\Http\Controller\Entries;

use Streams\Api\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Request;
use Streams\Api\Http\Controller\ApiController;

class GetEntries extends ApiController
{
    public function __invoke(string $stream): JsonResponse
    {
        $response = new ApiResponse($stream);

        $parameters = Request::query('parameters', Request::json('parameters')) ?: [];

        $criteria = $response->stream
            ->entries()
            ->loadParameters($parameters);

        $results = $criteria->paginate([
            'per_page' => Request::get('per_page', 100),
            'page' => Request::get('page', 1),
        ]);

        $response->addMeta('total', $results->total());
        $response->addMeta('per_page', $results->perPage());
        $response->addMeta('last_page', $results->lastPage());
        $response->addMeta('current_page', $results->currentPage());

        $response->addLink('first_page', $results->url(1));
        $response->addLink('next_page', $results->nextPageUrl());
        $response->addLink('previous_page', $results->previousPageUrl());

        return $response->make($results->all());
    }
}

<?php

namespace Streams\Api\Http\Controller\Entries;

use Streams\Api\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Request;

class RepositoryMethod extends Controller
{
    public function __invoke(string $stream, string $method): JsonResponse
    {
        $response = new ApiResponse($stream);

        $parameters = Request::query();

        $repository = $response->stream->repository();

        $results = $repository->{$method}(...$parameters);

        // @todo let a callback/something set this if collection/single entry?
        // $response->addMeta('total', $results->total());
        // $response->addMeta('per_page', $results->perPage());
        // $response->addMeta('last_page', $results->lastPage());
        // $response->addMeta('current_page', $results->currentPage());

        // $response->addLink('first_page', $results->url(1));
        // $response->addLink('next_page', $results->nextPageUrl());
        // $response->addLink('previous_page', $results->previousPageUrl());

        return $response->make($results);
    }
}

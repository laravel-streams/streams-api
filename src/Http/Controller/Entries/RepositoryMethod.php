<?php

namespace Streams\Api\Http\Controller\Entries;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Streams\Api\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Request;
use Illuminate\Contracts\Pagination\Paginator;

class RepositoryMethod extends Controller
{
    public function __invoke(string $stream, string $method): JsonResponse
    {
        $response = new ApiResponse($stream);

        $parameters = Request::query();

        $repository = $response->stream->repository();

        $results = $repository->{$method}(...$parameters);

        if ($results instanceof Collection) {
            $response->addMeta('total', $results->count());
        }

        if ($results instanceof Paginator) {
            $response->addMeta('per_page', $results->perPage());
            $response->addMeta('current_page', $results->currentPage());

            $response->addLink('first_page', $results->url(1));
            $response->addLink('next_page', $results->nextPageUrl());
            $response->addLink('previous_page', $results->previousPageUrl());
        }
        
        if ($results instanceof LengthAwarePaginator) {
            $response->addMeta('total', $results->total());
            $response->addMeta('last_page', $results->lastPage());
        }
        
        return $response->make($results);
    }
}

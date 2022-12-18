<?php

namespace Streams\Api\Http\Controller\Entries;

use Streams\Api\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Arr;
use Streams\Core\Criteria\Criteria;
use Illuminate\Support\Facades\Request;

class GetEntries extends Controller
{
    public function __invoke(string $stream): JsonResponse
    {
        $response = new ApiResponse($stream);

        $criteria = $response->stream->entries();

        $this->applyFilters($criteria);

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

    protected function applyFilters(Criteria $criteria)
    {
        $constraints = Request::query('constraint', []);

        foreach (Request::query('where', []) as $field => $value) {
            $criteria->where($field, Arr::get($constraints, $field, '='), $value);
        }

        if ($limit = Request::query('limit')) {
            $criteria->limit($limit, Request::query('skip'));
        }
    }
}

<?php

namespace Streams\Api\Http\Controller\Entries;

use Streams\Api\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Streams\Core\Criteria\Criteria;
use Illuminate\Support\Facades\Request;

class GetEntries extends Controller
{
    public function __invoke(string $stream): JsonResponse
    {
        $response = new ApiResponse($stream);

        $parameters = $this->queryParametersFromRequest();

        $criteria = $response->stream->entries();

        $this->loadParameters($criteria, $parameters);

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

    protected function loadParameters(Criteria $criteria, $payload)
    {
        $parameters = [];

        foreach ($payload as $parameter) {
            foreach ($parameter as $method => $arguments) {
                $parameters[$method][] = $arguments;
            }
        }

        $criteria->setParameters($parameters);
    }

    protected function queryParametersFromRequest()
    {
        if ($parameters = Request::json('parameters')) {
            return $parameters;
        }
        
        if (!$parameters = Request::query('parameters')) {
            return [];
        }

        $parameters = urldecode($parameters);
        $parameters = base64_decode($parameters);
        
        return json_decode($parameters) ?: [];
    }
}

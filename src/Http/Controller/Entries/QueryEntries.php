<?php

namespace Streams\Api\Http\Controller\Entries;

use Streams\Api\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Streams\Core\Criteria\Criteria;
use Illuminate\Support\Facades\Request;

class QueryEntries extends Controller
{
    protected $protected = [
        'delete',
        'truncate',
    ];

    public function __invoke(string $stream): JsonResponse
    {
        $response = new ApiResponse($stream);

        $parameters = Request::json('parameters', []);

        $criteria = $response->stream->entries();

        $this->performPayload($criteria, $parameters);

        $results = $criteria->paginate([
            'per_page' => Request::get('per_page', 100),
            'page' => Request::get('page', 1),
        ]);

        $response->setData($results->all());

        $response->addPaginationMeta($results);

        return $response->make();
    }

    protected function performPayload(Criteria $criteria, $payload)
    {
        foreach ($payload as $parameter) {
            foreach ($parameter as $method => $arguments) {

                if (in_array($method, $this->protected)) {
                    throw new \Exception("Method [$method] not allowed.");
                }

                $criteria->{$method}(...$arguments);
            }
        }
    }
}

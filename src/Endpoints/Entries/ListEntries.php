<?php

namespace Streams\Api\Endpoints\Entries;

use Streams\Api\ApiResponse;
use Illuminate\Http\JsonResponse;
use Streams\Core\Criteria\Criteria;
use Illuminate\Support\Facades\Request;
use Streams\Api\Builders\Endpoints\ApiEndpoint;
use Streams\Api\Endpoints\Entries\Concerns\AppliesEagerLoading;

class ListEntries extends ApiEndpoint
{
    use AppliesEagerLoading;

    public function __invoke(?string $stream = null): JsonResponse
    {
        $stream = $this->resolveStream($stream);

        $response = new ApiResponse($stream);

        $criteria = $response->stream->entries();

        $this->fire('apply', compact('criteria'));

        $this->applyFilters($criteria, $response->stream->fields->keys()->all());
        $this->applyEagerLoading($criteria, $response->stream);

        $this->fire('applied', compact('criteria'));

        $results = $criteria->paginate([
            'per_page' => Request::get('per_page', 100),
            'page' => Request::get('page', 1),
        ]);

        $response->addPaginationMeta($results);

        return $response->make($results->all());
    }

    protected function applyFilters(Criteria $criteria, array $filters = []): void
    {
        $constraints = Request::query('constraint', []);

        foreach (Request::query('where', []) as $field => $value) {
            if (isset($constraints[$field])) {
                $criteria->where($field, $constraints[$field], $value);
            } elseif (is_array($value)) {
                foreach ($value as $operator => $operand) {
                    $criteria->where($field, $operator, $operand);
                }
            } else {
                $criteria->where($field, $value);
            }
        }

        foreach (Request::query('order_by', []) as $field => $direction) {
            $criteria->orderBy($field, $direction);
        }

        if ($limit = Request::query('limit')) {
            $criteria->limit($limit, Request::query('skip', 0));
        }
    }

    protected function getDefaultUri(): ?string
    {
        return 'streams/{stream}/entries';
    }

    protected function getDefaultMethods(): string|array
    {
        return 'get';
    }
}

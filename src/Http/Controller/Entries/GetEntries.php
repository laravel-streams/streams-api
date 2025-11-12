<?php

namespace Streams\Api\Http\Controller\Entries;

use Illuminate\Support\Arr;
use Streams\Api\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Streams\Core\Criteria\Criteria;
use Illuminate\Support\Facades\Request;
use Streams\Core\Support\Traits\FiresCallbacks;

class GetEntries extends Controller
{
    use FiresCallbacks;

    protected static ?string $stream = null;
    protected static ?string $resource = null;

    public function __invoke(): JsonResponse
    {
        $stream = static::$stream;

        $response = new ApiResponse($stream);

        $criteria = $response->stream->entries();

        $this->fire('apply', compact('criteria'));

        $this->applyFilters($criteria, $response->stream->fields->keys()->all());

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
        foreach ($filters as $field) {
            foreach ((array) Request::query($field) as $operator => $value) {
                if (is_numeric($operator)) {
                    $criteria->where($field, $operator);
                } else {
                    $criteria->where($field, $operator, $value);
                }
            }
        }

        foreach (Request::query('order_by', []) as $field => $direction) {
            $criteria->orderBy($field, $direction);
        }

        if ($limit = Request::query('limit')) {
            $criteria->limit($limit, Request::query('skip', 0));
        }
    }
}

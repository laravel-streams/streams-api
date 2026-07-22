<?php

namespace Streams\Api\Endpoints\Entries\Concerns;

use Illuminate\Support\Facades\Request;
use Streams\Core\Criteria\Criteria;
use Streams\Core\Stream\Stream;

trait AppliesEagerLoading
{
    /**
     * Apply Criteria::with() from the `with` query parameter.
     *
     * Accepts:
     * - with[]=homeworld&with[]=species
     * - with=homeworld,species
     * - with=homeworld
     *
     * Values are matched against relationship field *relation names*
     * (field handle with a trailing `_id` stripped, or the handle itself
     * when there is no `_id` suffix — see RelationshipFieldType::relationName()).
     */
    protected function applyEagerLoading(Criteria $criteria, Stream $stream): void
    {
        $relations = $this->requestedRelations($stream);

        if ($relations === []) {
            return;
        }

        $criteria->with($relations);
    }

    /**
     * @return list<string>
     */
    protected function requestedRelations(Stream $stream): array
    {
        $with = Request::query('with', []);

        if (is_string($with)) {
            $with = array_filter(array_map('trim', explode(',', $with)));
        }

        if (! is_array($with)) {
            return [];
        }

        $requested = array_values(array_filter(array_map(
            static fn ($relation): string => trim((string) $relation),
            $with,
        )));

        if ($requested === []) {
            return [];
        }

        $allowed = $stream->fields->relationships()->keys()->all();

        return array_values(array_intersect($requested, $allowed));
    }
}

<?php

namespace Streams\Api\Endpoints\Entries\Concerns;

use Streams\Core\Stream\Stream;
use Streams\Core\Criteria\Criteria;
use Illuminate\Support\Facades\Request;

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
     * Values are matched against relationship field handles, as expected
     * by Criteria::with().
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

        $allowed = $stream->fields
            ->filter(static fn ($field): bool => $field->type === 'relationship')
            ->keys()
            ->all();

        return array_values(array_intersect($requested, $allowed));
    }
}

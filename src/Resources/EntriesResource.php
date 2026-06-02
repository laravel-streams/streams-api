<?php

namespace Streams\Api\Resources;

use Streams\Api\ApiResource;
use Streams\Api\Endpoints\Entries\CreateEntry;
use Streams\Api\Endpoints\Entries\DeleteEntry;
use Streams\Api\Endpoints\Entries\ListEntries;
use Streams\Api\Endpoints\Entries\PatchEntry;
use Streams\Api\Endpoints\Entries\QueryEntries;
use Streams\Api\Endpoints\Entries\ShowEntry;
use Streams\Api\Endpoints\Entries\UpdateEntry;

class EntriesResource extends ApiResource
{
    protected static ?string $slug = 'entries';

    public static function usesRoutePrefix(): bool
    {
        return false;
    }

    public static function getEndpoints(): array
    {
        return [
            'list' => ListEntries::route('streams/{stream}/entries', 'get'),
            'create' => CreateEntry::route('streams/{stream}/entries', 'post'),
            'show' => ShowEntry::route(
                'streams/{stream}/entries/{entry}',
                'get',
                null,
                ['entry' => '(.*)'],
            ),
            'update' => UpdateEntry::route(
                'streams/{stream}/entries/{entry}',
                'put',
                null,
                ['entry' => '(.*)'],
            ),
            'patch' => PatchEntry::route(
                'streams/{stream}/entries/{entry}',
                'patch',
                null,
                ['entry' => '(.*)'],
            ),
            'delete' => DeleteEntry::route(
                'streams/{stream}/entries/{entry}',
                'delete',
                null,
                ['entry' => '(.*)'],
            ),
            'query' => QueryEntries::route('streams/{stream}/query', 'post'),
        ];
    }
}

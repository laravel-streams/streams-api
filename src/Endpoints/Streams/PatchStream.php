<?php

namespace Streams\Api\Endpoints\Streams;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Config;
use Streams\Api\Endpoints\Entries\PatchEntry;

class PatchStream extends PatchEntry
{
    public function __invoke(string $stream, ?string $entry = null): JsonResponse
    {
        return parent::__invoke(
            (string) Config::get('streams.core.streams_id'),
            $stream,
        );
    }

    protected function getDefaultUri(): ?string
    {
        return 'streams/{stream}';
    }
}

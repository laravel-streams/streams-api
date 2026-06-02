<?php

namespace Streams\Api\Endpoints\Streams;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Config;
use Streams\Api\Endpoints\Entries\ShowEntry;

class ShowStream extends ShowEntry
{
    public function __invoke(?string $stream = null, ?string $entry = null, ?string $map = null): JsonResponse
    {
        return parent::__invoke(
            Config::get('streams.core.streams_id'),
            $stream,
            $map,
        );
    }

    protected function getDefaultUri(): ?string
    {
        return 'streams/{stream}';
    }
}

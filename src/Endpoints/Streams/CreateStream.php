<?php

namespace Streams\Api\Endpoints\Streams;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Config;
use Streams\Api\Endpoints\Entries\CreateEntry;

class CreateStream extends CreateEntry
{
    public function __invoke(?string $stream = null): JsonResponse
    {
        return parent::__invoke((string) Config::get('streams.core.streams_id'));
    }

    protected function getDefaultUri(): ?string
    {
        return 'streams';
    }
}

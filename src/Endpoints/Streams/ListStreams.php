<?php

namespace Streams\Api\Endpoints\Streams;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Config;
use Streams\Api\Endpoints\Entries\ListEntries;

class ListStreams extends ListEntries
{
    public function __invoke(?string $stream = null): JsonResponse
    {
        return parent::__invoke($stream);
    }

    protected function setUp(): void
    {
        parent::setUp();

        static::$stream = Config::get('streams.core.streams_id');
    }

    protected function getDefaultUri(): ?string
    {
        return 'streams';
    }
}

<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Config;
use Streams\Api\Http\Controller\Entries\UpdateEntry;

class UpdateStream extends Controller
{
    public function __invoke(string $stream): JsonResponse
    {
        $updateEntry = new UpdateEntry;

        return $updateEntry(Config::get('streams.core.streams_id'), $stream);
    }
}

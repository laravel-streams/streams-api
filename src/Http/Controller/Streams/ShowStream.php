<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Config;
use Streams\Api\Http\Controller\Entries\ShowEntry;

class ShowStream extends Controller
{
    public function __invoke(string $stream): JsonResponse
    {
        $showEntry = new ShowEntry;

        return $showEntry(Config::get('streams.core.streams_id'), $stream);
    }
}

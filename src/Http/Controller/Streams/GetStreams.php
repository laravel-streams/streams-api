<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Config;
use Streams\Api\Http\Controller\Entries\GetEntries;

class GetStreams extends Controller
{
    public function __invoke(): JsonResponse
    {
        $getEntries = new GetEntries;

        return $getEntries(Config::get('streams.core.streams_id'));
    }
}

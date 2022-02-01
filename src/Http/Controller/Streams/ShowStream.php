<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Streams\Api\Http\Controller\Entries\ShowEntry;

class ShowStream extends Controller
{
    public function __invoke(string $stream): JsonResponse
    {
        $showEntry = new ShowEntry;

        return $showEntry('core.streams', $stream);
    }
}

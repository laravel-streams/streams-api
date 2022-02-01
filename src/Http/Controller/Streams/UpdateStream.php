<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Streams\Api\Http\Controller\Entries\UpdateEntry;

class UpdateStream extends Controller
{
    public function __invoke(string $stream): JsonResponse
    {
        $updateEntry = new UpdateEntry;

        return $updateEntry('core.streams', $stream);
    }
}

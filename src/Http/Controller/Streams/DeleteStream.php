<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Streams\Api\Http\Controller\Entries\DeleteEntry;

class DeleteStream extends Controller
{
    public function __invoke(string $stream): JsonResponse
    {
        $deleteEntry = new DeleteEntry;

        return $deleteEntry('core.streams', $stream);
    }
}

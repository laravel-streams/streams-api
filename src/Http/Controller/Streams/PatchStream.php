<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Streams\Api\Http\Controller\Entries\PatchEntry;

class PatchStream extends Controller
{
    public function __invoke(string $stream): JsonResponse
    {
        $patchEntry = new PatchEntry;

        return $patchEntry('core.streams', $stream);
    }
}

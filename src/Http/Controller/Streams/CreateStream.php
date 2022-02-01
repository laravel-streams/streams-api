<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Streams\Api\Http\Controller\Entries\CreateEntry;

class CreateStream extends Controller
{
    public function __invoke(): JsonResponse
    {
        $createEntry = new CreateEntry;

        return $createEntry('core.streams');
    }
}

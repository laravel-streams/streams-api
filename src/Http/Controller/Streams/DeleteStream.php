<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Routing\Controller;
use Symfony\Component\HttpFoundation\Response;
use Streams\Api\Http\Controller\Entries\DeleteEntry;

class DeleteStream extends Controller
{
    public function __invoke(string $stream): Response
    {
        $deleteEntry = new DeleteEntry;

        return $deleteEntry('core.streams', $stream);
    }
}

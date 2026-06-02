<?php

namespace Streams\Api\Endpoints\Streams;

use Illuminate\Support\Facades\Config;
use Streams\Api\Endpoints\Entries\DeleteEntry;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class DeleteStream extends DeleteEntry
{
    public function __invoke(string $stream, ?string $entry = null): HttpResponse
    {
        return parent::__invoke(
            (string) Config::get('streams.core.streams_id'),
            $stream,
        );
    }

    protected function getDefaultUri(): ?string
    {
        return 'streams/{stream}';
    }
}

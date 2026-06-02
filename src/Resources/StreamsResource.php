<?php

namespace Streams\Api\Resources;

use Streams\Api\ApiResource;
use Streams\Api\Endpoints\Streams\CreateStream;
use Streams\Api\Endpoints\Streams\DeleteStream;
use Streams\Api\Endpoints\Streams\ListStreams;
use Streams\Api\Endpoints\Streams\PatchStream;
use Streams\Api\Endpoints\Streams\ShowStream;
use Streams\Api\Endpoints\Streams\UpdateStream;

class StreamsResource extends ApiResource
{
    protected static ?string $slug = 'streams';

    public static function usesRoutePrefix(): bool
    {
        return false;
    }

    public static function getEndpoints(): array
    {
        return [
            'list' => ListStreams::route('streams', 'get'),
            'create' => CreateStream::route('streams', 'post'),
            'show' => ShowStream::route('streams/{stream}', 'get'),
            'update' => UpdateStream::route('streams/{stream}', 'put'),
            'patch' => PatchStream::route('streams/{stream}', 'patch'),
            'delete' => DeleteStream::route('streams/{stream}', 'delete'),
        ];
    }
}

<?php

namespace Streams\Api\Endpoints\Entries;

use Streams\Api\ApiResponse;
use Illuminate\Support\Facades\Response;
use Streams\Api\Builders\Endpoints\ApiEndpoint;
use Streams\Core\Support\Facades\Streams;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class DeleteEntry extends ApiEndpoint
{
    public function __invoke(string $stream, string $entry): HttpResponse
    {
        $response = new ApiResponse($stream);

        if (! $entry = Streams::repository($stream)->find($entry)) {
            $response->addError('Entry not found.');

            return $response->make(null, 404);
        }

        $entry->delete();

        return Response::noContent();
    }

    protected function getDefaultUri(): ?string
    {
        return 'streams/{stream}/entries/{entry}';
    }

    protected function getDefaultMethods(): string|array
    {
        return 'delete';
    }

    protected function getDefaultWhere(): array
    {
        return [
            'entry' => '(.*)',
        ];
    }
}

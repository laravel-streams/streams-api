<?php

namespace Streams\Api\Http\Controller\Entries;

use Streams\Api\ApiResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class DeleteEntry extends Controller
{
    public function __invoke(string $stream, string $entry): HttpResponse
    {
        $response = new ApiResponse($stream);

        if (!$entry = Streams::entries($stream)->find($entry)) {

            $response->addError([
                'message' => 'Entry not found.',
            ]);

            return $response->make(null, 404);
        }

        $entry->delete();

        return Response::noContent();
    }
}

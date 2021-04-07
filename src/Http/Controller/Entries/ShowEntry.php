<?php

namespace Streams\Api\Http\Controller\Entries;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;
use Streams\Api\Http\Controller\ApiController;

class ShowEntry extends ApiController
{

    /**
     * Return all entries for the stream.
     *
     * @param $stream
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke($stream, $entry)
    {
        $parameters = array_merge_recursive(
            ['where' => [['id', $entry]]],
            (array) json_decode(Request::get('q'), true)
        );

        $instance = Streams::entries($stream)
            ->setParameters($parameters)
            ->first();

        if ($response = $this->authorizeActionAbility('view', $stream, $instance)) {
            return $response;
        }

        return Response::json([
            'data' => $instance,
            'meta' => [
                'parameters' => Request::route()->parameters(),
                'query' => Request::query(),
            ],
            'links' => [
                'self' => URL::to(Request::path()),
                'index' => URL::route('ls.api.entries.index', ['stream' => $stream]),
            ],
        ], $instance ? 200 : 404);
    }
}

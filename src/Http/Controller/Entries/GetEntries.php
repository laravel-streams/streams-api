<?php

namespace Streams\Api\Http\Controller\Entries;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;

class GetEntries extends Controller
{

    /**
     * Return all entries for the stream.
     *
     * @param $stream
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke($stream)
    {
        $pagination = Streams::entries($stream)
            ->setParameters(json_decode(Request::get('q'), true) ?: [])
            ->paginate(Request::get('per_page', 100));

        return Response::json($pagination->toArray());
    }
}

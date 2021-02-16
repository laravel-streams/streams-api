<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Request;
use Streams\Core\Support\Facades\Streams;

class GetStreams extends Controller
{

    /**
     * Return an index of Streams.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke()
    {
        return Streams::entries('core.streams')
            ->setParameters(json_decode(Request::get('q'), true) ?: [])
            ->paginate(Request::get('per_page', 100));
    }
}

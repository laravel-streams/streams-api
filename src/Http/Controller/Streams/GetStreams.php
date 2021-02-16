<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
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
        if (!Request::get('q')) {
            return Streams::collection('core.streams');
        }

        $paginator = Streams::entries('core.streams')
            ->setParameters(json_decode(Request::get('q'), true) ?: [])
            ->paginate(Request::get('per_page', 100));
            
        return Response::json([
            'data' => $paginator
        ]);
    }
}

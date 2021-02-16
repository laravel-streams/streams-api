<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;

class PatchStream extends Controller
{

    /**
     * Return a single Stream.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke($stream)
    {
        if (!$stream = Streams::entries('core.streams')->find($stream)) {
            abort(404);
        }

        if (!$input = Request::all()) {
            abort(400);
        }

        $stream->fill($input);

        $validator = $stream->validator();

        if ($validator->passes()) {
            $stream->save();
        } else {
            dd($validator->messages());
        }

        return Response::json([]);
    }
}

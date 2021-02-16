<?php

namespace Streams\Api\Http\Controller\Streams;

use Streams\Core\Entry\Entry;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;

class CreateStream extends Controller
{

    /**
     * Return a single Stream.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke()
    {
        if (!$input = Request::all()) {
            abort(400);
        }

        $input['stream'] = Streams::make('core.streams');

        $stream = new Entry($input);

        $validator = $stream->validator();

        if ($validator->passes()) {
            $stream->save();
        } else {
            dd($validator->messages());
        }

        return Response::json([]);
    }
}

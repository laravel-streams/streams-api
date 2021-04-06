<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\URL;
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
    public function __invoke($instance)
    {
        $errors = null;
        $status = 200;

        if (!$instance = Streams::entries('core.streams')->find($original = $instance)) {
            return Response::json([
                'data' => $instance,
                'meta' => [
                    'input' => Request::input(),
                ],
                'errors' => [
                    "Entry [{$original}] not found.",
                ],
            ], 404);
        }

        if (!$input = Request::all()) {
            return Response::json([
                'data' => $instance,
                'meta' => [
                    'input' => Request::input(),
                ],
                'errors' => [
                    "Invalid (empty) input.",
                ],
            ], 400);
        }

        $instance->loadPrototypeAttributes($input);

        $validator = Streams::make('core.streams')->validator($instance);

        if ($validator->passes()) {
            Streams::repository('core.streams')->save($instance);
        } else {
            
            $errors = $validator->messages();

            $status = 409;
        }

        return Response::json([
            'data' => $instance,
            'meta' => [
                'input' => Request::input(),
            ],
            'links' => [
                'index' => URL::route('ls.api.streams.index'),
            ],
            'errors' => $errors,
        ], $status);
    }
}

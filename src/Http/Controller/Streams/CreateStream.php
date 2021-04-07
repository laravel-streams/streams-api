<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Support\Arr;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;

class CreateStream extends Controller
{

    /**
     * Create a stream.
     *
     * @param $stream
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke()
    {
        $instance = null;
        $errors = null;
        $headers = [];

        $status = 201;

        if (!$input = Request::all()) {
            return Response::json([
                'data' => $instance,
                'meta' => [
                    'input' => Request::input(),
                ],
                'errors' => [
                    "Invalid (empty) input.",
                ],
            ], 400, $headers);
        }

        $validator = Streams::make('core.streams')->validator($input);

        if ($validator->passes()) {

            $instance = Streams::repository('core.streams')->create($input);

            $headers['location'] = URL::route('ls.api.streams.show', [
                'stream' => $instance->id,
            ]);
        }

        $messages = $validator->messages();

        if ($messages->isNotEmpty()) {

            $status = 409;

            foreach ($messages->messages() as $key => $details) {
                foreach ($details as $detail) {
                    $errors[] = [
                        'detail' => $detail,
                        'meta' => [
                            'field' => $key,
                        ],
                    ];
                }
            }
        }

        return Response::json([
            'data' => $instance,
            'meta' => [
                'parameters' => Request::route()->parameters(),
                'input' => Request::input(),
            ],
            'links' => [
                'self' => Arr::get($headers, 'location'),
                'index' => URL::route('ls.api.streams.index'),
            ],
            'errors' => $errors,
        ], $status, $headers);
    }
}

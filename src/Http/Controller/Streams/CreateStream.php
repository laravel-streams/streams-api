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
        $payload = Request::json();

        $instance = null;
        $errors = null;
        $headers = [];

        $status = 201;

        /**
         * If there is no input then
         * we can't create anything.
         */
        if ($payload->isEmpty()) {
            return Response::json([
                'data' => $instance,
                'meta' => [
                    'input' => $payload,
                ],
                'errors' => [
                    "Invalid (empty) input.",
                ],
            ], 400, $headers);
        }

        $validator = Streams::make('core.streams')->validator($input);

        if ($validator->passes()) {

            $instance = Streams::repository('core.streams')->create($input->all());

            $headers['location'] = URL::route('streams.api.streams.show', [
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
                'index' => URL::route('streams.api.streams.index'),
            ],
            'errors' => $errors,
        ], $status, $headers);
    }
}

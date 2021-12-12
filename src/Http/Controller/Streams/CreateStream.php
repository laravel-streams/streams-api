<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Routing\Controller;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\URL;
use Streams\Core\Support\Facades\Streams;

class CreateStream extends Controller
{
    /**
     * Create a stream.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke()
    {
        $payload = Request::json();

        $instance = null;
        $headers = [];
        $errors = [];

        $status = 201;

        /*
         * If there is no input then
         * we can't create anything.
         */
        if (! $payload) {
            return Response::json([
                'data' => $instance,
                'meta' => [
                    'parameters' => Request::route()->parameters(),
                    'payload' => Request::json(),
                ],
                'errors' => [
                    [
                        'message' => 'Invalid (empty) input.',
                    ],
                ],
            ], 400, $headers);
        }

        /**
         * Validate the stream input.
         */
        $validator = Streams::make('core.streams')->validator($payload->all());

        /*
         * If validation passes create
         * the stream and add Location.
         */
        if ($validator->passes()) {
            $instance = Streams::repository('core.streams')->create($payload->all());

            $headers['location'] = URL::route('streams.api.streams.show', [
                'stream' => $instance->id,
            ]);
        }

        /**
         * If validation failed then add
         * the errors to the response.
         */
        $messages = $validator->messages();

        if ($messages->isNotEmpty()) {
            $status = 409;

            foreach ($messages->messages() as $field => $messages) {
                foreach ($messages as $message) {
                    $errors[] = [
                        'message' => $message,
                        'meta' => [
                            'field' => $field,
                        ],
                    ];
                }
            }
        }

        return Response::json([
            'meta' => [
                'parameters' => Request::route()->parameters(),
                'payload' => Request::json(),
            ],
            'links' => [
                'self' => URL::full(),
                'location' => Arr::get($headers, 'location'),
                'streams' => URL::route('streams.api.streams.index'),
            ],
            'errors' => $errors,
            'data' => $instance,
        ], $status, $headers);
    }
}

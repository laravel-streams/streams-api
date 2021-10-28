<?php

namespace Streams\Api\Http\Controller\Entries;

use Illuminate\Support\Arr;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;

class CreateEntry extends Controller
{

    /**
     * Return all entries for the stream.
     *
     * @param $stream
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke($stream)
    {
        $payload = Request::json();

        $instance = null;
        $headers = [];
        $errors = [];

        $status = 201;

        /**
         * If there is no input then
         * we can't create anything.
         */
        if (!$payload) {
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
        $validator = Streams::make($stream)->validator($payload->all());

        /**
         * If validation passes create
         * the stream and add Location.
         */
        if ($validator->passes()) {

            $instance = Streams::repository($stream)->create($payload->all());

            $headers['location'] = URL::route('streams.api.entries.show', [
                'stream' => $stream,
                'entry' => $instance->id,
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
                'stream' => URL::route('streams.api.streams.show', ['stream' => $stream]),
                'entries' => URL::route('streams.api.entries.index', ['stream' => $stream]),
            ],
            'errors' => $errors,
            'data' => $instance,
        ], $status, $headers);
    }
}

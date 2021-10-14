<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;
use Symfony\Component\HttpFoundation\ParameterBag;

class PatchStream extends Controller
{

    /**
     * Return a single Stream.
     *
     * @param string $stream
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke($stream)
    {
        $payload = new ParameterBag(Request::json('data'));

        $payload->remove('id');

        $errors = [];
        $status = 200;

        if (!$instance = Streams::entries('core.streams')->find($stream)) {
            return Response::json([
                'meta' => [
                    'parameters' => Request::route()->parameters(),
                    'payload' => Request::json(),
                ],
                'errors' => [
                    [
                        'message' => 'Stream not found.',
                    ],
                ],
            ], 404);
        }

        /**
         * If there is no input then
         * we can't patch anything.
         */
        if (!$payload || !$payload->all()) {
            return Response::json([
                'meta' => [
                    'parameters' => Request::route()->parameters(),
                    'payload' => Request::json(),
                ],
                'errors' => [
                    [
                        'message' => 'Invalid (empty) input.',
                    ],
                ],
            ], 400);
        }

        /**
         * Load the new attributes.
         */
        $instance->loadPrototypeAttributes($payload->all());

        /**
         * Validate the resulting stream.
         */
        $validator = Streams::make('core.streams')->validator($instance);

        /**
         * If validation passes
         * update the stream.
         */
        if ($validator->passes()) {
            Streams::repository('core.streams')->save($instance);
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
                'streams' => URL::route('streams.api.streams.index'),
                'entries' => URL::route('streams.api.entries.index', ['stream' => $stream]),
            ],
            'errors' => $errors,
            'data' => $instance,
        ], $status);
    }
}

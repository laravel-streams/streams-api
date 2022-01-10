<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;

class UpdateStream extends Controller
{
    /**
     * Update a stream.
     *
     * @param string $stream
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke($stream)
    {
        $payload = Request::json();

        $errors = [];
        $status = 200;

        $target = Streams::entries('core.streams');

        // If there is no stream found then create the stream, as this is PUT request
        if (! $instance = $target->find($stream)) {
            $createStream = new CreateStream();

            return $createStream($stream);
        }

        /*
         * If there is no input then
         * we can't update anything.
         */
        if (! $payload) {

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

        /*
         * This is an idempotent request.
         */
        $payload->set('id', $instance->id);

        $instance->setAttributes($payload->all());

        /**
         * Validate the resulting stream.
         */
        $validator = $target->validator($instance, false);

        /*
         * If validation passes
         * update the stream.
         */
        if ($validator->passes()) {
            $target->repository()->save($instance);
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

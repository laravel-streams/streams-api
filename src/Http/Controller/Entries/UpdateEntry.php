<?php

namespace Streams\Api\Http\Controller\Entries;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;

class UpdateEntry extends Controller
{

    /**
     * Return all entries for the stream.
     *
     * @param $stream
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke($stream, $entry)
    {
        $payload = Request::json();

        $errors = [];
        $status = 200;

        // If there is no stream entry found then create the stream entry, as this is PUT request
        if (!$instance = Streams::entries($stream)->find($entry)) {
            $createEntry = new CreateEntry();
            return $createEntry($stream);
        }

        /**
         * If there is no input then
         * we can't update anything.
         */
        if (!$payload) {
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
         * This is an idempotent request.
         */
        $payload->set('id', $instance->id);

        $instance->setAttributes($payload->all());

        /**
         * Validate the resulting stream.
         */
        $validator = Streams::make($stream)->validator($instance);

        /**
         * If validation passes
         * update the stream.
         */
        if ($validator->passes()) {
            Streams::repository($stream)->save($instance);
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
                'stream' => URL::route('streams.api.streams.show', ['stream' => $stream]),
                'entries' => URL::route('streams.api.entries.index', ['stream' => $stream]),
            ],
            'errors' => $errors,
            'data' => $instance,
        ], $status);
    }
}

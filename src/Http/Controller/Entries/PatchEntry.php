<?php

namespace Streams\Api\Http\Controller\Entries;

use Illuminate\Support\Arr;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;

class PatchEntry extends Controller
{
    /**
     * Return all entries for the stream.
     *
     * @param $stream
     * @param $entry
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke($stream, $entry)
    {
        $payload = Request::json();

        $errors = [];
        $status = 200;
        $headers = [];

        $meta = [
            'parameters' => Request::route()->parameters(),
            'payload' => Request::json(),
        ];

        /**
         * Create the entry instead.
         * @todo abstract these things so that we don't have so much copied code.
         */
        if (!$instance = Streams::entries($stream)->find($entry)) {
            
            $attributes = $payload->all();

            $attributes[Streams::make($stream)->config('key_name', 'id')] = $entry;

            foreach (Streams::make($stream)->fields as $field) {
                if (is_null($default = $field->config('default'))) {
                    continue;
                }

                if (array_key_exists($field->handle, $attributes)) {
                    continue;
                }

                $attributes[$field->handle] = $field->type()->default($default);
            }

            /**
             * Validate the stream input.
             */
            $validator = Streams::make($stream)->validator($attributes);

            /*
            * If validation passes create
            * the stream and add Location.
            */
            if ($validator->passes()) {
                $instance = Streams::repository($stream)->create($attributes);

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
                    'stream' => $stream,
                    'payload' => Request::json(),
                    'form-data' => Request::input(),
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

        /*
         * If there is no input then
         * we can't patch anything.
         */
        if (!$payload || !$payload->all()) {
            return Response::json([
                'meta' => $meta,
                'errors' => [
                    [
                        'message' => 'Invalid (empty) input.',
                    ],
                ],
            ], 400);
        }

        /*
         * Load the new attributes.
         */
        $instance->loadPrototypeAttributes($payload->all());

        /**
         * Validate the resulting stream.
         */
        $validator = Streams::make($stream)->validator($instance);

        /*
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
            'meta' => $meta,
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

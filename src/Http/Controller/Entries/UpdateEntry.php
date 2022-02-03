<?php

namespace Streams\Api\Http\Controller\Entries;

use Streams\Api\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Request;
use Streams\Core\Support\Facades\Streams;

class UpdateEntry extends Controller
{
    public function __invoke(string $stream, string $entry): JsonResponse
    {
        $response = new ApiResponse($stream);

        $payload = Request::json();

        $payload->set($response->stream->config('key_name', 'id'), $entry);

        if (!$instance = $response->stream->entries()->find($entry)) {

            $createEntry = new CreateEntry($payload);

            return $createEntry($stream);
        }

        $instance->setAttributes($payload->all());

        $validator = Streams::make($stream)->validator($instance, false);

        $valid = $validator->passes();

        if ($valid) {

            $instance->save();

            $response->setData($instance);
        }

        if (!$valid) {

            $messages = $validator->messages();

            $response->setStatus(409);

            foreach ($messages->messages() as $field => $messages) {
                foreach ($messages as $message) {
                    $response->addError([
                        'message' => $message,
                        'meta' => [
                            'field' => $field,
                        ],
                    ]);
                }
            }
        }

        return $response->make();
    }
}

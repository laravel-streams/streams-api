<?php

namespace Streams\Api\Http\Controller\Entries;

use Streams\Api\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Request;
use Symfony\Component\HttpFoundation\ParameterBag;

class CreateEntry extends Controller
{

    protected ParameterBag $payload;

    public function __construct(ParameterBag $payload = null)
    {
        if ($payload && $payload->all()) {
            $this->payload = $payload;
        }

        if (!isset($this->payload)) {
            $this->payload = Request::json();
        }
    }

    public function __invoke(string $stream): JsonResponse
    {
        $response = new ApiResponse($stream);

        $instance = $response->stream
            ->entries()
            ->newInstance($this->payload->all());

        $validator = $response->stream->validator($instance);

        $valid = $validator->passes();

        if ($valid) {

            $instance->save();

            $response->setStatus(201);

            $response->setData($instance);

            $keyName = $response->stream->config('key_name', 'id');

            $response->addHeader('location', URL::route('streams.api.entries.show', [
                'stream' => $stream,
                'entry' => $instance->{$keyName},
            ]));

            $response->addLink('location', URL::route('streams.api.entries.show', [
                'stream' => $stream,
                'entry' => $instance->{$keyName},
            ]));
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

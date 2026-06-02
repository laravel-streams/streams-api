<?php

namespace Streams\Api\Endpoints\Entries;

use Streams\Api\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Request;
use Streams\Api\Builders\Endpoints\ApiEndpoint;
use Streams\Core\Support\Facades\Streams;

class PatchEntry extends ApiEndpoint
{
    public function __invoke(string $stream, string $entry): JsonResponse
    {
        $response = new ApiResponse($stream);

        $payload = Request::json();

        $payload->set($response->stream->config('key_name', 'id'), $entry);

        if (! $instance = $response->stream->repository()->find($entry)) {
            $createEntry = new CreateEntry($payload);

            return $createEntry($stream);
        }

        foreach ($payload->all() as $field => $value) {
            $instance->{$field} = $value;
        }

        $validator = Streams::make($stream)->validator($instance, false);

        $valid = $validator->passes();

        if ($valid) {
            $instance->save();

            $response->setData($instance);
        }

        if (! $valid) {
            $messages = $validator->messages();

            $response->setStatus(409);

            foreach ($messages->messages() as $field => $messages) {
                foreach ($messages as $message) {
                    $response->addError($message);
                }
            }
        }

        return $response->make();
    }

    protected function getDefaultUri(): ?string
    {
        return 'streams/{stream}/entries/{entry}';
    }

    protected function getDefaultMethods(): string|array
    {
        return 'patch';
    }

    protected function getDefaultWhere(): array
    {
        return [
            'entry' => '(.*)',
        ];
    }
}

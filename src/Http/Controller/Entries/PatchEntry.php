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
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke($stream, $entry)
    {
        $errors = null;
        $status = 200;

        if (!$entry = Streams::entries($stream)->find($original = $entry)) {
            return Response::json([
                'data' => $entry,
                'meta' => [
                    'stream' => $stream,
                    'input' => Request::input(),
                ],
                'errors' => [
                    "Entry [{$original}] not found.",
                ],
            ], 404);
        }

        if (!$input = Request::all()) {
            return Response::json([
                'data' => $entry,
                'meta' => [
                    'stream' => $stream,
                    'input' => Request::input(),
                ],
                'errors' => [
                    "Invalid (empty) input.",
                ],
            ], 400);
        }

        $entry->fill($input);

        $validator = $entry->validator();

        if ($validator->passes()) {
            $entry->save();
        } else {
            
            $errors = $validator->messages();

            $status = 409;
        }

        return Response::json([
            'data' => $entry,
            'meta' => [
                'parameters' => Request::route()->parameters(),
                'input' => Request::input(),
            ],
            'links' => [
                'index' => URL::route('streams.api.entries.index', ['stream' => $stream]),
            ],
            'errors' => $errors,
        ], $status);
    }
}

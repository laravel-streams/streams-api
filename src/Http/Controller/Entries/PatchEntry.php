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
        $entry = null;
        $errors = null;
        $headers = [];

        $status = 200;

        if (!$entry = Streams::entries($stream)->find($entry)) {
            abort(404);
        }

        if (!$input = Request::all()) {
            abort(422);
        }

        $entry->fill($input);

        $validator = $entry->validator();

        if ($validator->passes()) {
            $entry->save();
        } else {
            $errors = $validator->messages();
        }

        return Response::json([
            'data' => $entry,
            'meta' => [
                'stream' => $stream,
                'input' => Request::input(),
            ],
            'links' => [
                'self' => Arr::get($headers, 'location'),
                'index' => URL::route('ls.api.entries.index', ['stream' => $stream]),
            ],
            'errors' => $errors,
        ], $status, $headers);
    }
}

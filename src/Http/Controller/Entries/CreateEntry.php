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
        $entry = null;
        $errors = null;
        $headers = [];

        $status = 201;

        if (!$input = Request::all()) {
            $status = 422;
        }

        $validator = Streams::make($stream)->validator($input);

        if ($validator->passes()) {

            $entry = Streams::repository($stream)->create($input);

            $headers['location'] = URL::route('ls.api.entries.show', [
                'stream' => $stream,
                'entry' => $entry->id,
            ]);
        }

        $messages = $validator->messages();

        if ($messages->isNotEmpty()) {

            $status = 409;

            foreach ($messages->messages() as $key => $details) {
                foreach ($details as $detail) {
                    $errors[] = [
                        'detail' => $detail,
                        'meta' => [
                            'field' => $key,
                        ],
                    ];
                }
            }
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

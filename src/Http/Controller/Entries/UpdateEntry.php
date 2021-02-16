<?php

namespace Streams\Api\Http\Controller\Entries;

use Illuminate\Routing\Controller;
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
        if (!$entry = Streams::entries($stream)->find($entry)) {
            abort(404);
        }

        if (!$input = Request::all()) {
            abort(400);
        }

        $messages = [];

        $entry->setAttributes($input);

        $validator = $entry->validator();

        if ($validator->passes()) {
            $entry->save();
        } else {
            $messages = $validator->messages();
        }

        return Response::json([
            'data' => $entry,
            'messages' => $messages,
        ]);
    }
}

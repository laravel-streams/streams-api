<?php

namespace Streams\Api\Http\Controller\Entries;

use Illuminate\Routing\Controller;
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
        $messages = [];

        if (!$input = Request::all()) {
            abort(400);
        }

        $validator = Streams::make($stream)->validator($input);

        try {
            if ($validator->passes()) {
                $entry = Streams::repository($stream)->create($input);
            } else {
                $messages = $validator->messages();
            }
        } catch (\Exception $e) {
            return Response::json([
                'data' => [],
                'input' => $input,
                'messages' => [
                    $e->getMessage()
                ],
            ]);    
        }

        return Response::json([
            'data' => $entry ?: [],
            'messages' => $messages,
        ]);
    }
}

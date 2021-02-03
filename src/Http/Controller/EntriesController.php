<?php

namespace Streams\Api\Http\Controller;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;

/**
 * Class EntriesController
 *
 * @link   http://pyrocms.com/
 * @author PyroCMS, Inc. <support@pyrocms.com>
 * @author Ryan Thompson <ryan@pyrocms.com>
 */
class EntriesController extends Controller
{

    /**
     * Return an Entry.
     *
     * @param $stream
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($stream)
    {
        $pagination = Streams::entries($stream)->paginate(Request::get('per_page', 100));

        return Response::json($pagination->toArray());
    }

    /**
     * Return an Entry.
     *
     * @param $stream
     * @param $entry
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($stream, $entry)
    {
        if (!$result = Streams::repository($stream)->find($entry)) {
            return Response::json([
                'entry' => $entry,
                'errors' => ['Entry not found'],
            ], 404);
        }
        
        return Response::json([
            'entry' => $entry,
            'data' => $result->toArray(),
        ]);
    }

    /**
     * Put an Entry.
     *
     * @param $stream
     * @return \Illuminate\Http\JsonResponse
     */
    public function post($stream)
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
            'data' => $entry->toArray(),
            'messages' => $messages,
        ]);
    }

    /**
     * Delete an Entry.
     *
     * @param $stream
     * @param $entry
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($stream, $entry)
    {
        if (!$entry = Streams::entries($stream)->find($entry)) {
            abort(404);
        }

        $entry->delete();

        return Response::json([
            //'data' => $entry,
        ]);
    }

    /**
     * Put an Entry.
     *
     * @param $stream
     * @param $entry
     * @return \Illuminate\Http\JsonResponse
     */
    public function put($stream, $entry)
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

    /**
     * Patch an Entry.
     *
     * @param $stream
     * @param $entry
     * @return \Illuminate\Http\JsonResponse
     */
    public function patch($stream, $entry)
    {
        if (!$entry = Streams::entries($stream)->find($entry)) {
            abort(404);
        }

        if (!$input = Request::all()) {
            abort(400);
        }

        $entry->fill($input);

        $validator = $entry->validator();

        if ($validator->passes()) {
            $entry->save();
        } else {
            dd($validator->messages());
        }

        return Response::json([]);
    }
}

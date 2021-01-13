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
        return Streams::entries($stream)->all();
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
        return Streams::entries($stream)->find($entry);
    }

    /**
     * Put an Entry.
     *
     * @param $stream
     * @return \Illuminate\Http\JsonResponse
     */
    public function post($stream)
    {
        if (!$input = Request::all()) {
            abort(400);
        }

        $validator = Streams::make($stream)->validator($input);

        if ($validator->passes()) {
            $entry = Streams::repository($stream)->create($input);
        } else {
            dd($validator->messages());
        }

        return Response::json($entry);
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

        return Response::json([]);
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

        $entry->setAttributes($input);

        $validator = $entry->validator();

        if ($validator->passes()) {
            $entry->save();
        } else {
            dd($validator->messages());
        }

        return Response::json([]);
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

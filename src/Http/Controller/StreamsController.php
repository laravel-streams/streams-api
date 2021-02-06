<?php

namespace Streams\Api\Http\Controller;

use Streams\Core\Entry\Entry;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;

/**
 * Class StreamsController
 *
 * @link   http://pyrocms.com/
 * @author PyroCMS, Inc. <support@pyrocms.com>
 * @author Ryan Thompson <ryan@pyrocms.com>
 */
class StreamsController extends Controller
{

    /**
     * Return an index of Streams.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return Streams::entries('core.streams')
            ->setParameters(json_decode(Request::get('q'), true) ?: [])
            ->paginate(Request::get('per_page', 100));
    }

    /**
     * Return a Stream.
     * 
     * @param $stream
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($stream)
    {
        return Streams::make($stream);
    }

    /**
     * Put an Entry.
     *
     * @param $stream
     * @return \Illuminate\Http\JsonResponse
     */
    public function post()
    {
        if (!$input = Request::all()) {
            abort(400);
        }

        $input['stream'] = Streams::make('core.streams');

        $stream = new Entry($input);

        $validator = $stream->validator();

        if ($validator->passes()) {
            $stream->save();
        } else {
            dd($validator->messages());
        }

        return Response::json([]);
    }

    /**
     * Delete a stream.
     *
     * @param $stream
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($stream)
    {
        if (!$stream = Streams::entries('core.streams')->find($stream)) {
            abort(404);
        }

        Streams::repository('streams')->delete($stream->id);

        return Response::json([]);
    }

    /**
     * Put a stream.
     *
     * @param $stream
     * @return \Illuminate\Http\JsonResponse
     */
    public function put($stream)
    {
        if (!$stream = Streams::entries('core.streams')->find($stream)) {
            abort(404);
        }

        if (!$input = Request::all()) {
            abort(400);
        }

        $stream->setAttributes($input);

        $validator = $stream->validator();

        if ($validator->passes()) {
            $stream->save();
        } else {
            dd($validator->messages());
        }

        return Response::json([]);
    }

    /**
     * Patch an Entry.
     *
     * @param $stream
     * @return \Illuminate\Http\JsonResponse
     */
    public function patch($stream)
    {
        if (!$stream = Streams::entries('core.streams')->find($stream)) {
            abort(404);
        }

        if (!$input = Request::all()) {
            abort(400);
        }

        $stream->fill($input);

        $validator = $stream->validator();

        if ($validator->passes()) {
            $stream->save();
        } else {
            dd($validator->messages());
        }

        return Response::json([]);
    }
}

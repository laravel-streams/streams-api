<?php

namespace Streams\Api\Http\Controller;

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
        return Streams::collection();
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
    public function post($stream)
    {
        if (!$input = Request::all()) {
            abort(400);
        }

        $entry = Streams::repository($stream)->newInstance($input);
        
        $validator = $entry->validator();

        if ($validator->passes()) {
            $entry->save();
        } else {
            dd($validator->messages());
        }

        return Response::json([]);
    }
}

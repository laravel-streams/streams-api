<?php

namespace Streams\Api\Http\Controller;

use Illuminate\Routing\Controller;
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
}

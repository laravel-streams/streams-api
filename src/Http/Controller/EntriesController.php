<?php

namespace Streams\Api\Http\Controller;

use Illuminate\Routing\Controller;
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
}

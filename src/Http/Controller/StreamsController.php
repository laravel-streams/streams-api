<?php

namespace Anomaly\Streams\Platform\Http\Controller;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;
use Anomaly\Streams\Platform\Support\Facades\Streams;

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
     * Return a Stream.
     *
     */
    public function stream($stream)
    {
        $stream = Streams::make($stream);

        return Response::json($stream);
    }
}

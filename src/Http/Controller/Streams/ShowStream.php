<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Routing\Controller;
use Streams\Core\Support\Facades\Streams;

class ShowStream extends Controller
{

    /**
     * Return a single Stream.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke($stream)
    {
        return Streams::make($stream);
    }
}

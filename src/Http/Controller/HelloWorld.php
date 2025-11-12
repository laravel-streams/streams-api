<?php

namespace Streams\Api\Http\Controller;

use Streams\Api\ApiResponse;
use Illuminate\Routing\Controller;

class HelloWorld extends Controller
{
    public function __invoke()
    {
        $response = new ApiResponse();

        $response->addLink('gv.groups', url('/api/testing/gv-groups'));

        $response->setData('Hello World');

        return $response;
    }
}

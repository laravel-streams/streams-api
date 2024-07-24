<?php

namespace Streams\Api\Http\Controller;

use Streams\Api\ApiResponse;
use Illuminate\Routing\Controller;

class GvGroups extends Controller
{
    public function __invoke()
    {
        $response = new ApiResponse();

        // Get groups from GV
        $groups = [];

        $response->setData($groups);

        return $response;
    }
}

<?php

namespace Streams\Api\Http\Controller;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;
use Streams\Api\ApiSchema;

class OpenApiController extends Controller
{
    public function documentation()
    {
        return view('openapi::documentation');
    }

    public function specification()
    {
        return Response::json(ApiSchema::create()->toArray());
    }
}

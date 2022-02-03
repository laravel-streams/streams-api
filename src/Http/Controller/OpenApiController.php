<?php

namespace Streams\Api\Http\Controller;

use Streams\Api\ApiSchema;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;

/**
 * @todo "schema" endpoint perhaps
 * 
 * Need to get a schema ability in place for
 * all prototypes including stream entries.
 */
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

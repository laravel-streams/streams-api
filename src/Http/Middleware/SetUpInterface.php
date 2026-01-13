<?php

namespace Streams\Api\Http\Middleware;

use Illuminate\Http\Request;
use Streams\Api\Support\Facades\API;

class SetUpInterface
{
    public function handle(Request $request, \Closure $next)
    {
        API::bootCurrentInterface();

        return $next($request);
    }
}

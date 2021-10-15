<?php

namespace Streams\Api\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Response;

class IfNoneMatch
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Check for an etag.
        $etag = $request->header('If-None-Match');

        $checksum = md5(
            $request->getContent()
                . json_encode($request->all())
                . json_encode($request->route()->parameters)
        );

        if ($etag === $checksum && Cache::has($etag)) {
            return Response::make(null, 302);
        }

        if ($etag && !Cache::has($etag)) {
            Cache::put($etag, true, 60 * 60);
        }

        return $next($request);
    }
}

<?php

namespace Streams\Api\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;

class ApiCache
{
    public function handle(Request $request, \Closure $next)
    {
        if (!$request->isMethodCacheable()) {
            return $next($request);
        }

        if ($request->isNoCache()) {
            return $next($request);
        }
        
        if (!$stream = $this->resolveStream($request)) {
            return $next($request);
        }

        $stream = Streams::make($stream);

        $ttl = $stream->config('cache.ttl', 60 * 60);

        if ($stream->config('cache.enabled') === false) {
            return $next($request);
        }

        $response = $next($request);

        $etag = $request->header('If-None-Match');
        
        $fingerprint = md5($response->getContent());

        if ($etag === $fingerprint) {
            return Response::make(null, 302);
        }

        /*
         * Set max age according to cache ttl
         */
        $response->setMaxAge($ttl);
        $response->setSharedMaxAge($ttl);

        $response->setPublic();
        $response->setEtag($fingerprint);
        $response->isNotModified($request);

        return $response;
    }

    protected function resolveStream(Request $request)
    {
        $route = $request->route();

        if ($stream = $route->parameter('stream')) {
            return $stream;
        }

        if ($stream = Arr::get($route->action, 'stream')) {
            return $stream;
        }

        return null;
    }
}

<?php

namespace Streams\Api\Http\Middleware;

use Illuminate\Support\Arr;
use Illuminate\Http\Request;
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

        if ($stream->config('cache.enabled') === false) {
            return $next($request);
        }

        $fingerprint = md5(
            $request->url()
                . $request->method()
                . $request->getContent()
                . json_encode($request->all())
        );

        if ($maxAge = $request->headers->getCacheControlDirective('max-age')) {
            return $stream->cache()->remember(
                $fingerprint,
                $maxAge,
                function () use ($next, $request) {
                    return $next($request);
                }
            );
        }

        $response = $next($request);

        $checksum = '"' . md5($response->getContent()) . '"';

        $etag = $request->header('If-None-Match');

        if ($etag === $checksum) {
            $response = Response::noContent(302);
        }

        $ttl = $stream->config('cache.ttl', 60 * 60);

        $response->setMaxAge($ttl);
        $response->setSharedMaxAge($ttl);

        $response->setPublic();
        $response->setEtag($checksum);
        $response->isNotModified($request);

        return $response;
    }

    protected function resolveStream(Request $request)
    {
        $route = $request->route();

        if ($stream = $route->parameter('stream')) {
            return $stream;
        }

        return Arr::get($route->action, 'stream');
    }
}

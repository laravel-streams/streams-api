<?php

namespace Streams\Api\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;

class HttpCache
{


    /**
     * Add cache related HTTP headers.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \InvalidArgumentException
     */
    public function handle($request, Closure $next)
    {

        $options = [];

        /**
         * Streams powah only.
         */
        if (!$stream = $request->route()->parameter('stream')) {
            return $next($request);
        }

        $stream = Streams::make($stream);

        $ttl = $stream->config('cache.ttl', 60 * 60);

        /**
         * Bypass if not enabled.
         */
        if ($stream->config('cache.enabled') !== true) {
            return $next($request);
        }

        /**
         * Bypass when excluded.
         */
        if ($stream->config('cache.http_enabled') === false) {
            return $next($request);
        }

        /**
         * Resolve the response.
         */
        $response = $next($request);

        /**
         * Check for an etag.
         */
        $etag = $request->header('If-None-Match');

        $fingerprint = $options['etag'] = 'etag_' . md5(
            $request->fullUrl() . $response->getContent()
        );
        dd($response->getContent());

        /**
         * If the etag matches this fingerprint and we've served it before
         * then return a null 302 response without thinking twice about it.
         */
        if ($etag === $fingerprint && $stream->cache()->has($etag)) {
            return Response::make(null, 302);
        }

        if ($etag && !$stream->cache()->has($etag)) {
            $stream->cache()->put($etag, true, $ttl);
        }

        /**
         * Only cache GET/HEAD
         */
        if (!$request->isMethodCacheable() || !$response->getContent()) {
            return $response;
        }

        /**
         * Set max age according to cache ttl
         */
        if ($ttl = $stream->config('cache.ttl', 60 * 60)) {
            $response->setMaxAge($ttl);
            $response->setSharedMaxAge($ttl);
        }

        $response->setPublic();
        $response->setEtag($fingerprint);
        $response->isNotModified($request);

        return $response;
    }

    /**
     * Parse the given header options.
     *
     * @param  string  $options
     * @return array
     */
    protected function parseOptions($options)
    {
        return collect(explode(';', rtrim($options, ';')))->mapWithKeys(function ($option) {
            $data = explode('=', $option, 2);

            return [$data[0] => $data[1] ?? true];
        })->all();
    }
}

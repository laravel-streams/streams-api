<?php

namespace Streams\Api\Http\Middleware;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureApiIsEnabled
{
    public function handle(Request $request, \Closure $next): Response
    {
        if (! $this->shouldEnable($request)) {
            abort($this->disabledStatus(), $this->disabledMessage());
        }

        return $next($request);
    }

    protected function shouldEnable(Request $request): bool
    {
        if ($this->inExceptArray($request)) {
            return true;
        }

        return (bool) config('streams.api.enabled', false);
    }

    protected function inExceptArray(Request $request): bool
    {
        foreach ($this->getExcept() as $except) {
            if ($except !== '/') {
                $except = trim($except, '/');
            }

            if ($request->is($except)) {
                return true;
            }
        }

        return false;
    }

    protected function getExcept(): array
    {
        return config('streams.api.gate_except', []);
    }

    protected function disabledStatus(): int
    {
        return (int) config('streams.api.gate_status', 404);
    }

    protected function disabledMessage(): string
    {
        return (string) config('streams.api.gate_message', 'Not Found');
    }
}

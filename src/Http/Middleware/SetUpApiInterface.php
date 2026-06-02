<?php

namespace Streams\Api\Http\Middleware;

use Illuminate\Http\Request;
use Streams\Api\Support\Facades\API;

class SetUpApiInterface
{
    public function handle(Request $request, \Closure $next): mixed
    {
        $route = $request->route();

        if ($route && $name = $route->getName()) {
            $this->resolveInterfaceFromRouteName($name);
        }

        API::bootCurrentApiInterface();

        return $next($request);
    }

    protected function resolveInterfaceFromRouteName(string $name): void
    {
        if (! str_starts_with($name, 'streams.api.')) {
            return;
        }

        $segments = explode('.', $name);
        $defaultId = config('streams.api.default_interface', 'api');

        $candidate = $segments[2] ?? null;

        if ($candidate && isset(API::getInterfaces()[$candidate])) {
            $interface = API::getInterface($candidate);

            if ($interface) {
                API::setCurrentApiInterface($interface);

                return;
            }
        }

        if ($default = API::getDefaultInterface()) {
            API::setCurrentApiInterface($default);
        }
    }
}

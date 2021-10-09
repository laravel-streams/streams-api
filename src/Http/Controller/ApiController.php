<?php

namespace Streams\Api\Http\Controller;

use Illuminate\Support\Arr;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;

abstract class ApiController extends Controller
{

    protected function authorizeActionAbility($ability, $stream, $instance = null)
    {
        $stream = is_object($stream) ? $stream : Streams::make($stream);
        $policy = Arr::get($stream->api ?: [], 'policy');

        if ($policy === true) {
            $policy = $stream->policy;
        }

        if ($policy === true && $instance) {
            $policy = Gate::getPolicyFor($instance);
        }

        if ($policy === true && isset($stream->source['prototype'])) {
            $policy = Gate::getPolicyFor($stream->source['prototype']);
        }

        if (!$policy) {
            $policy = Config::get('streams.api.policy');
        }

        if ($policy && !Gate::allows($ability, array_filter(['entry' => $instance]))) {
            return Response::json([
                'data' => null,
                'meta' => [
                    'parameters' => Request::route()->parameters(),
                    'query' => Request::query(),
                ],
                'links' => [
                    'self' => URL::to(Request::path()),
                    'index' => URL::route('streams.api.entries.index', ['stream' => $stream]),
                ],
                'errors' => [
                    "Action [view] authorized for [{$stream}]."
                ]
            ], 403);
        }
    }
}

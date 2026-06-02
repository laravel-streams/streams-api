<?php

return [

    /*
     * Determine if the API should be enabled.
     *
     * This is disabled by default because
     * The API is public by default.
     */
    'enabled' => env('STREAMS_API_ENABLED', false),

    /*
     * Specify the API prefix.
     */
    'prefix' => env('STREAMS_API_PREFIX', 'api'),

    /*
     * Default API interface identifier.
     */
    'default_interface' => env('STREAMS_API_DEFAULT_INTERFACE', 'api'),

    /*
     * Specify the API group middleware.
     *
     * This is designed to match out of the box
     * "app/Providers/RouteServiceProvider.php"
     * and "app/Http/Kernel.php" Laravel files.
     *
     * Changing this value will require
     * adjusting the above files.
     */
    'middleware' => env('STREAMS_API_MIDDLEWARE', 'api'),

    /*
     * Middleware that gates API access (extend in your application).
     */
    'gate_middleware' => \Streams\Api\Http\Middleware\EnsureApiIsEnabled::class,

    /*
     * HTTP status when the API gate denies access.
     */
    'gate_status' => env('STREAMS_API_GATE_STATUS', 404),

    /*
     * Message when the API gate denies access.
     */
    'gate_message' => env('STREAMS_API_GATE_MESSAGE', 'Not Found'),

    /*
     * URIs excluded from the API enabled check.
     */
    'gate_except' => [],
];

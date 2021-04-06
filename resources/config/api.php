<?php

return [

    /*
     * Determine if the API should be enabled.
     */
    'enabled' => env('STREAMS_API_ENABLED', false),

    /*
     * Specify the API prefix.
     */
    'prefix' => env('STREAMS_API_PREFIX', 'api'),

];

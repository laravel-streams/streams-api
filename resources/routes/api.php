<?php

use Streams\Api\Support\Facades\API;

/*
 * Routes are registered when interfaces are passed to API::interface().
 * This file ensures any interfaces registered during provider boot are routed.
 */
API::bootRegisteredInterfaceRoutes();

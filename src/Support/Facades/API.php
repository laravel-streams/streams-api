<?php

namespace Streams\Api\Support\Facades;

use Illuminate\Support\Facades\Facade;

class API extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'api';
    }
}

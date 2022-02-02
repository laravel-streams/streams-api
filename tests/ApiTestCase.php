<?php

namespace Streams\Api\Tests;

use Streams\Testing\TestCase;
use Streams\Api\ApiServiceProvider;

abstract class ApiTestCase extends TestCase
{

    protected function getPackageProviders($app)
    {
        return [ApiServiceProvider::class];
    }
}

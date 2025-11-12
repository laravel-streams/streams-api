<?php

namespace Streams\Api\Tests;

use Streams\Testing\TestCase;
use Streams\Api\ApiServiceProvider;
use Streams\Api\Support\Facades\API;

abstract class ApiTestCase extends TestCase
{
    protected function getPackageProviders($app)
    {
        return [ApiServiceProvider::class];
    }

    protected function setUp(): void
    {
        parent::setUp();
        
        // Register API routes for testing
        API::routeEntries();
        API::routeStreams();
    }
}

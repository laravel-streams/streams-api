<?php

namespace Streams\Api\Tests;

use Streams\Api\Tests\ApiTestCase;
use Illuminate\Support\Facades\Config;

class ApiServiceProviderTest extends ApiTestCase
{
    public function test_api_can_be_disabed()
    {
        $this->markTestSkipped('Not working');

        $name = 'STREAMS_API_ENABLED';
        $value = false;

        if (false === getenv($name)) {
            putenv("{$name}={$value}");
        }

        if (!isset($_ENV[$name])) {
            $_ENV[$name] = $value;
        }

        Config::set('streams.api.enabled', false);
        
        $this->refreshApplication();

        $response = $this->get('/api/streams/films/entries');

        $response->assertStatus(404);
    }

    public function test_it_merges_published_config()
    {
        $this->markTestSkipped('Not done');

        $response = $this->get('/api/streams/films/entries');

        $response->assertStatus(200);
    }
}

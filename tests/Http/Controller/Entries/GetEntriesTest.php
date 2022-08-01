<?php

namespace Streams\Api\Tests\Http\Controller\Entries;

use Streams\Api\Tests\ApiTestCase;
use Illuminate\Support\Facades\URL;
use Streams\Core\Support\Facades\Streams;

class GetEntriesTest extends ApiTestCase
{

    public function test_it_returns_standard_response_structure()
    {
        $response = $this->get(URL::route('streams.api.entries.index', [
            'stream' => 'films',
        ]));

        $response->assertStatus(200);

        $this->assertTrue(isset($response['errors']));
        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));
        $this->assertTrue(isset($response['data']));
    }

    public function test_it_returns_stream_entries()
    {
        $response = $this->get(URL::route('streams.api.entries.index', [
            'stream' => 'films',
        ]));

        $this->assertEquals(Streams::entries('films')->count(), count($response['data']));
    }

    public function test_it_returns_constrained_stream_entries()
    {
        $response = $this->call('GET', URL::route('streams.api.entries.index', [
            'stream' => 'films',
        ]), [], [], [], [], json_encode([
            'parameters' => [['where' => ['director', 'George Lucas']]]
        ]));

        $entries = Streams::entries('films')->where('director', 'George Lucas')->count();

        $this->assertEquals($entries, count($response['data']));

        /**
         * Query String Parameters
         */
        $parameters = http_build_query([
            'parameters' => base64_encode(json_encode([['where' => ['director', 'George Lucas']]]))
        ]);

        $response = $this->call('GET', URL::route('streams.api.entries.index', [
            'stream' => 'films',
        ]) . '?' . $parameters);

        $entries = Streams::entries('films')->where('director', 'George Lucas')->count();

        $this->assertEquals($entries, count($response['data']));
    }

    public function test_it_returns_paginated_stream_entries()
    {
        $response = $this->call('GET', URL::route('streams.api.entries.index', [
            'stream' => 'films',
        ]), ['per_page' => 2, 'page' => 2]);

        $this->assertTrue(isset($response['links']['next_page']));
        $this->assertTrue(isset($response['links']['first_page']));
        $this->assertTrue(isset($response['links']['previous_page']));

        $this->assertTrue(isset($response['meta']['per_page']));
        $this->assertTrue(isset($response['meta']['last_page']));
        $this->assertTrue(isset($response['meta']['current_page']));
    }
}

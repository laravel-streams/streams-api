<?php

namespace Streams\Api\Tests\Http\Controller\Entries;

use Streams\Api\Tests\ApiTestCase;
use Illuminate\Support\Facades\URL;
use Streams\Core\Criteria\Criteria;
use Streams\Core\Support\Facades\Streams;

class QueryEntriesTest extends ApiTestCase
{

    public function test_it_returns_standard_response_structure()
    {
        $response = $this->post(URL::route('streams.api.entries.query', [
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
        $response = $this->post(URL::route('streams.api.entries.query', [
            'stream' => 'films',
        ]));

        $this->assertEquals(Streams::entries('films')->count(), count($response['data']));
    }

    public function test_it_returns_constrained_stream_entries()
    {
        $response = $this->call('POST', URL::route('streams.api.entries.query', [
            'stream' => 'films',
        ]), [], [], [], [], json_encode([
            'parameters' => [['where' => ['director', 'George Lucas']]]
        ]));

        $entries = Streams::entries('films')->where('director', 'George Lucas')->count();

        $this->assertEquals($entries, count($response['data']));
    }

    public function test_it_returns_paginated_stream_entries()
    {
        $response = $this->call('POST', URL::route('streams.api.entries.query', [
            'stream' => 'films',
        ]), ['per_page' => 2, 'page' => 2]);

        $this->assertTrue(isset($response['links']['next_page']));
        $this->assertTrue(isset($response['links']['first_page']));
        $this->assertTrue(isset($response['links']['previous_page']));

        $this->assertTrue(isset($response['meta']['per_page']));
        $this->assertTrue(isset($response['meta']['last_page']));
        $this->assertTrue(isset($response['meta']['current_page']));
    }

    public function test_it_returns_entry_relationships()
    {
        $response = $this->call('POST', URL::route('streams.api.entries.query', [
            'stream' => 'people',
        ]), ['limit' => 1, 'skip' => 1]);

        $this->assertTrue(isset($response['links']['homeworld']));
    }

    public function test_it_supports_custom_methods()
    {
        Streams::overload('films', [
            'config' => [
                'criteria' => QueryEntriesTestCriteria::class,
            ],
        ]);

        $response = $this->call('POST', URL::route('streams.api.entries.query', [
            'stream' => 'films',
        ]), [], [], [], [], json_encode([
            'parameters' => [['jedi' => []]]
        ]));

        $entries = Streams::entries('films')->where('title', 'LIKE', '%Jedi%')->count();

        $this->assertEquals($entries, count($response['data']));


        $response = $this->call('POST', URL::route('streams.api.entries.query', [
            'stream' => 'films',
            'limit' => 1,
        ]), [], [], [], [], json_encode([
            'parameters' => [['jedi' => []]]
        ]));

        $entry = Streams::entries('films')->where('title', 'LIKE', '%Jedi%')->first();

        $this->assertEquals($entry->title, $response['data']['title']);
    }
}

class QueryEntriesTestCriteria extends Criteria
{
    public function jedi()
    {
        return $this->where('title', 'LIKE', '%Jedi%');
    }
}

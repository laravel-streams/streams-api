<?php

namespace Streams\Api\Tests\Http\Controller\Entries;

use Streams\Core\Entry\Entry;
use Streams\Api\Tests\ApiTestCase;
use Illuminate\Support\Facades\URL;
use Streams\Core\Support\Facades\Streams;

class UpdateStreamTest extends ApiTestCase
{

    public function test_it_returns_standard_response_structure()
    {
        $response = $this->json('PUT', URL::route('streams.api.streams.update', [
            'stream' => 'films',
        ]), [
            'name' => 'Test Name',
        ]);

        $response->assertStatus(200);

        $this->assertTrue(isset($response['errors']));
        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));
        $this->assertTrue(isset($response['data']));

        $this->assertTrue(isset($response['data']));

        $entry = Streams::entries('core.streams')->find('films');

        $this->assertEquals('Test Name', $entry->name);
    }

    public function test_it_creates_entries_if_not_found()
    {
        $stream = $this->streamData();

        $response = $this->json('PUT', URL::route('streams.api.streams.update', [
            'stream' => 'sources',
        ]), $stream);

        $response->assertStatus(201);

        $this->assertTrue(isset($response['errors']));
        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));
        $this->assertTrue(isset($response['data']));

        $this->assertTrue(isset($response['data']));

        $this->assertInstanceOf(
            Entry::class,
            Streams::entries('core.streams')->find('sources')
        );
    }

    protected function streamData()
    {
        return [
            'name' => 'Star Wars data sources.',
            'fields' => [
                [
                    'handle' => 'name',
                    'type' => 'string',
                ],
                [
                    'handle' => 'url',
                    'type' => 'url',
                    'required' => true,
                    'unique' => true,
                ]
            ],
        ];
    }
}

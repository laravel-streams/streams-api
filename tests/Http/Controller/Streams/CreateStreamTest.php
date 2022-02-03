<?php

namespace Streams\Api\Tests\Http\Controller\Stream;

use Streams\Core\Entry\Entry;
use Streams\Api\Tests\ApiTestCase;
use Illuminate\Support\Facades\URL;
use Streams\Core\Support\Facades\Streams;

class CreateStreamTest extends ApiTestCase
{

    public function test_it_returns_standard_response_structure()
    {
        $stream = $this->streamData();

        $response = $this->json('POST', URL::route('streams.api.streams.create'), $stream);

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

    public function test_it_returns_409_if_conflict()
    {
        $stream = $this->streamData();

        unset($stream['id']);

        $response = $this->json('POST', URL::route('streams.api.streams.create'), $stream);

        $response->assertStatus(409);

        $this->assertTrue(isset($response['errors'][0]['message']));

        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));

        $this->assertNull($response['data']);

        $this->assertNull(Streams::entries('core.streams')->find('sources'));
    }

    protected function streamData()
    {
        return [
            'id' => 'sources',
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

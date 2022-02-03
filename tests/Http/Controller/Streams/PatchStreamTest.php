<?php

namespace Streams\Api\Tests\Http\Controller\Streams;

use Streams\Api\Tests\ApiTestCase;
use Illuminate\Support\Facades\URL;
use Streams\Core\Support\Facades\Streams;

class PatchStreamTest extends ApiTestCase
{

    public function test_it_returns_standard_response_structure()
    {
        $response = $this->json('PATCH', URL::route('streams.api.streams.patch', [
            'stream' => 'films',
        ]), [
            'description' => 'Star Wars movies.',
        ]);

        $response->assertStatus(200);

        $this->assertTrue(isset($response['errors']));
        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));
        $this->assertTrue(isset($response['data']));

        $this->assertTrue(isset($response['data']));

        $this->assertEquals(
            'Star Wars movies.',
            Streams::entries('core.streams')->find('films')->description
        );
    }

    public function test_it_creates_entries_if_not_found()
    {
        $response = $this->json('PATCH', URL::route('streams.api.streams.patch', [
            'stream' => 'sources',
        ]), [
            'description' => 'Star Wars data sources.',
        ]);

        $response->assertStatus(201);

        $this->assertTrue(isset($response['errors']));
        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));
        $this->assertTrue(isset($response['data']));

        $this->assertTrue(isset($response['data']));

        $this->assertEquals(
            'Star Wars data sources.',
            Streams::entries('core.streams')->find('sources')->description
        );
    }
}

<?php

namespace Streams\Api\Tests\Http\Controller\Entries;

use Streams\Api\Tests\ApiTestCase;
use Illuminate\Support\Facades\URL;
use Streams\Core\Support\Facades\Streams;

class CreateEntryTest extends ApiTestCase
{

    public function test_it_returns_standard_response_structure()
    {
        $response = $this->json('POST', URL::route('streams.api.entries.create', [
            'stream' => 'films',
        ]), $this->filmData());
        
        $response->assertStatus(201);

        $this->assertTrue(isset($response['errors']));
        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));
        $this->assertTrue(isset($response['data']));

        $this->assertTrue(isset($response['data']));

        $this->assertEquals(8, Streams::entries('films')->count());
    }

    public function test_it_supports_form_data()
    {
        $response = $this->post(URL::route('streams.api.entries.create', [
            'stream' => 'films',
        ]), $this->filmData());

        $response->assertStatus(201);

        $this->assertTrue(isset($response['errors']));
        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));
        $this->assertTrue(isset($response['data']));

        $this->assertTrue(isset($response['data']));

        $this->assertEquals(8, Streams::entries('films')->count());
    }

    public function test_it_returns_409_if_conflict()
    {
        $film = $this->filmData();

        unset($film['title']);

        $response = $this->json('POST', URL::route('streams.api.entries.create', [
            'stream' => 'films',
        ]), $film);

        $response->assertStatus(409);

        $this->assertTrue(isset($response['errors'][0]['message']));

        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));

        $this->assertNull($response['data']);

        $this->assertEquals(7, Streams::entries('films')->count());
    }

    protected function filmData()
    {
        return [
            'episode_id' => 8,
            'title' => 'Star Wars: The Last Jedi',
            'director' => 'Rian Johnson',
            'producer' => 'Kathleen Kennedy, Ram Bergman, J. J. Abrams',
            'release_date' => '2017-12-15',
            'opening_crawl' => 'The FIRST ORDER reigns. Having decimated the peaceful Republic, Supreme Leader Snoke now deploys his merciless legions to seize military control of the galaxy.

Only General Leia Organa\'s band of RESISTANCE fighters stand against the rising tyranny, certain that Jedi Master Luke Skywalker will return and restore a spark of hope to the fight.

"But the Resistance has been exposed. As the First Order speeds toward the rebel base, the brave heroes mount a desperate escape....',
            'characters' => [1, 5],
            'planets' => [],
            'starships' => [9],
            'species' => [1],
        ];
    }
}

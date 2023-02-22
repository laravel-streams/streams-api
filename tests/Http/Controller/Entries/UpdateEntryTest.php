<?php

namespace Streams\Api\Tests\Http\Controller\Entries;

use Streams\Api\Tests\ApiTestCase;
use Illuminate\Support\Facades\URL;
use Streams\Core\Support\Facades\Streams;

class UpdateEntryTest extends ApiTestCase
{

    /**
     * @preserveGlobalState disabled
     * @runInSeparateProcess
     */
    public function test_it_returns_standard_response_structure()
    {
        $response = $this->json('PUT', URL::route('streams.api.entries.update', [
            'stream' => 'films',
            'entry' => 4,
        ]), [
            'title' => 'Test Title',
        ]);

        $response->assertStatus(200);

        $this->assertTrue(isset($response['errors']));
        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));
        $this->assertTrue(isset($response['data']));

        $this->assertTrue(isset($response['data']));

        $entry = Streams::repository('films')->find(4);

        $this->assertEquals('Test Title', $entry->title);
        $this->assertNull($entry->directors);
    }

    /**
     * @preserveGlobalState disabled
     * @runInSeparateProcess
     */
    public function test_it_returns_409_if_conflict()
    {
        $response = $this->json('PUT', URL::route('streams.api.entries.update', [
            'stream' => 'films',
            'entry' => 4,
        ]), [
            'directors' => 'Ryan Thompson',
        ]);

        $response->assertStatus(409);

        $this->assertTrue(isset($response['errors'][0]['message']));

        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));

        $this->assertNull($response['data']);

        $this->assertEquals('A New Hope', Streams::repository('films')->find(4)->title);
    }

    /**
     * @preserveGlobalState disabled
     * @runInSeparateProcess
     */
    public function test_it_creates_entries_if_not_found()
    {
        $response = $this->json('PUT', URL::route('streams.api.entries.update', [
            'stream' => 'films',
            'entry' => 8,
        ]), $this->filmData());

        $response->assertStatus(201);

        $this->assertTrue(isset($response['errors']));
        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));
        $this->assertTrue(isset($response['data']));

        $this->assertTrue(isset($response['data']));

        $this->assertEquals(8, Streams::entries('films')->count());
    }

    protected function filmData()
    {
        return [
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

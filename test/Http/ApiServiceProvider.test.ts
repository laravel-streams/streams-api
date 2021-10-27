import { suite, test } from '@testdeck/mocha';
import { TestCase } from '../TestCase';
import { Streams } from '@laravel-streams/streams-api';
import { expect } from 'chai';


@suite
export class ApiServiceProviderTest extends TestCase {
    @test 'streams has been added to the container'() {
        const streams = this.app.get('streams');
        expect(streams).instanceOf(Streams);
    }

}

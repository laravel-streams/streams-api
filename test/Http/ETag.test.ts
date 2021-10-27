import { skip, suite, test } from '@testdeck/mocha';
import { TestCase } from '../TestCase';
import { ETag } from '../../resources/lib';
import { Streams } from '@laravel-streams/streams-api';






@suite
export class ETagTest extends TestCase {

    protected createStreamsWithEtag(): Streams {
        const streams = this.createStreams();
        const etag    = new ETag(streams, true);
        return streams;
    }

    @test 'etag can be added to streams'() {
        const streams = this.createStreams();
        const etag    = new ETag(streams, true);
        streams.etag.should.eq(etag);
    }

    @test 'etag can be enabled'() {
        const streams = this.createStreamsWithEtag();
        streams.etag.isEnabled().should.eq(false);
        streams.etag.enableEtag();
        streams.etag.isEnabled().should.eq(true);
    }

    @test 'etag can be disabled'() {
        const streams = this.createStreamsWithEtag();
        streams.etag.isEnabled().should.eq(false);
        streams.etag.enableEtag();
        streams.etag.isEnabled().should.eq(true);
        streams.etag.disableEtag();
        streams.etag.isEnabled().should.eq(false);
    }

}

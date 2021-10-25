import { skip, suite, test } from '@testdeck/mocha';
import { TestCase } from '../TestCase';
import { ETag } from '../../resources/lib';


@suite
export class ETagTest extends TestCase {

    @test 'etag can be added to axios'() {
        const streams = this.createStreams();
        const etag    = new ETag(streams);
        streams.etag.should.eq(etag);
    }

    @test 'etag can be enabled'() {
        const streams = this.createStreams();
        streams.etag.isEnabled().should.eq(false);
        streams.etag.enableEtag();
        streams.etag.isEnabled().should.eq(true);
    }

    @test 'etag can be disabled'() {
        const streams = this.createStreams();
        streams.etag.isEnabled().should.eq(false);
        streams.etag.enableEtag();
        streams.etag.isEnabled().should.eq(true);
        streams.etag.disableEtag();
        streams.etag.isEnabled().should.eq(false);
    }

    @skip
    @test 'etag integrates in axios requests'() {}
}

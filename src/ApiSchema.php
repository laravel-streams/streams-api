<?php

namespace Streams\Api;

use Streams\Core\Stream\Stream;
use Streams\Core\Support\Facades\Streams;
use GoldSpecDigital\ObjectOrientedOAS\OpenApi;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Info;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Server;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Contact;
use GoldSpecDigital\ObjectOrientedOAS\Objects\License;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Encoding;
use GoldSpecDigital\ObjectOrientedOAS\Objects\PathItem;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Response;
use GoldSpecDigital\ObjectOrientedOAS\Objects\MediaType;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Operation;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Parameter;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Components;

class ApiSchema
{
    public static function create()
    {
        $jsonEncoding = Encoding::create('JSON')->contentType('application/json');
        $formEncoding = Encoding::create('Form Data')->contentType('multipart/form-data');

        $mediaType = MediaType::json()
            ->encoding($jsonEncoding, $formEncoding);

        return OpenApi::create()
            ->openapi(OpenApi::OPENAPI_3_0_2)
            ->info(
                Info::create()
                    ->title('Streams API Specification')
                    ->version('v1')
                    ->description('For using the "streams/api" package.')
                    ->termsOfService(url('terms'))
                    ->contact(
                        Contact::create()
                            ->name('API Team')
                            ->email('apiteam@example.io')
                            ->url('http://example.io')
                    )
                    ->license(
                        License::create()
                            ->name('Apache 2.0')
                            ->url('https://www.apache.org/licenses/LICENSE-2.0.html')
                    )
            )
            ->tags(...static::tags())
            ->paths(...static::paths())
            ->servers(
                Server::create()
                    ->url(url(config('streams.api.prefix')))
            )
            ->components(
                Components::create()
                    ->schemas(...static::components())
            );
    }

    public static function tags()
    {
        return Streams::collection()
            ->filter(fn ($stream) => strpos($stream->id, '.') === false)
            ->map(fn ($stream) => $stream->schema()->tag())
            ->all();
    }

    public static function components()
    {
        return Streams::collection()
            ->filter(fn ($stream) => strpos($stream->id, '.') === false)
            ->map(fn ($stream) => $stream->schema()->object())
            ->all();
    }

    public static function paths()
    {
        $paths = [];

        Streams::collection()
            ->filter(fn ($stream) => strpos($stream->id, '.') === false)
            ->map(function ($stream) use (&$paths) {
                $paths[] = static::entries($stream);
                $paths[] = static::entry($stream);
            })->all();

        return $paths;
    }

    public static function entries(Stream $stream)
    {
        $tag = $stream->schema()->tag();

        $get = Operation::get()
            ->tags($tag)
            ->summary('List multiple entries.')
            ->operationId($stream->id . '.list')
            ->responses(
                Response::create()
                    ->statusCode(200)
                    ->description('OK')
                    ->content(static::getEntriesResponse200($stream))
            );

        $post = Operation::post()
            ->tags($tag)
            ->summary('Create a new entry.')
            ->operationId($stream->id . '.create')
            ->parameters(
                Parameter::create('body')->in('body')->name('body')->content(
                    MediaType::json()->schema($stream->schema()->object())
                )
                //)->example($stream->factory()->create()->toJson())
            )
            ->responses(
                Response::create()
                    ->statusCode(200)
                    ->description('Entry created successfully.')
                    ->content(static::postEntriesResponse200($stream))
                //->links()
            );

        return PathItem::create()
            ->route('/streams/' . $stream->id . '/entries')
            ->operations($get, $post);
    }

    public static function entry(Stream $stream)
    {
        $keyName = $stream->config('key_name', 'id');
        $keyField = $stream->fields->get($keyName);

        $tag = $stream->schema()->tag();

        $get = Operation::get()
            ->tags($tag)
            ->summary('Show an entry.')
            ->operationId($stream->id . '.show')
            ->responses(
                Response::create()
                    ->statusCode(200)
                    ->description('OK')
                    ->content(static::getEntryResponse200($stream))
            );

        $put = Operation::put()
            ->tags($tag)
            ->summary('Update an entry.')
            ->operationId($stream->id . '.update')
            ->responses(
                Response::create()
                    ->statusCode(200)
                    ->description('Entry updated successfully.')
                    ->content(static::putEntryResponse200($stream))
            );

        $patch = Operation::patch()
            ->tags($tag)
            ->summary('Patch an entry.')
            ->operationId($stream->id . '.patch')
            ->responses(
                Response::create()
                    ->statusCode(200)
                    ->description('Entry patched successfully.')
                    ->content(static::patchEntriesResponse200($stream))
            );

        $delete = Operation::delete()
            ->tags($tag)
            ->summary('Delete an entry.')
            ->operationId($stream->id . '.delete')
            ->responses(
                Response::create()
                    ->statusCode(204)
                    ->description('Entry deleted successfully.')
            );

        return PathItem::create()
            ->route('/streams/' . $stream->id . '/entries/{id}')
            ->parameters(
                Parameter::path('id')
                    ->name('id')
                    ->description(__($keyField?->description))
                    ->schema($keyField?->schema()->property())
            )
            ->operations($get, $put, $patch, $delete);
    }

    protected static function getEntriesResponse200(Stream $stream)
    {
        return MediaType::json()->schema(
            Schema::object('streams.api.entries.list')->properties(
                Schema::object('meta')->properties(
                    Schema::integer('total'),
                    Schema::integer('per_page'),
                    Schema::integer('last_page'),
                    Schema::integer('current_page'),
                    Schema::string('stream'),
                    Schema::array('query'),
                ),
                Schema::object('links')->properties(
                    Schema::string('first_page'),
                    Schema::string('next_page')->nullable(),
                    Schema::string('previous_page')->nullable(),
                    Schema::string('stream'),
                    Schema::string('self'),
                ),
                Schema::array('data')->items(
                    Schema::ref('#/components/schemas/' . $stream->id)
                )
            )
        );
    }

    protected static function postEntriesResponse200(Stream $stream)
    {
        return MediaType::json()->schema(
            Schema::object('streams.api.entries.list')->properties(
                Schema::object('meta')->properties(
                    Schema::string('stream'),
                    Schema::ref('#/components/schemas/' . $stream->id, 'payload'),
                ),
                Schema::object('links')->properties(
                    Schema::string('location')
                        ->description('The URL of the newly created entry.'),
                    Schema::string('entries'),
                    Schema::string('stream'),
                    Schema::string('self'),
                ),
                Schema::array('errors')->items(
                    Schema::object('error')->properties(
                        Schema::string('message'),
                        Schema::object('meta')->properties(
                            Schema::string('field')
                        )
                    )
                ),
                Schema::array('data')->items(
                    Schema::ref('#/components/schemas/' . $stream->id)
                )
            )
        );
    }

    protected static function getEntryResponse200(Stream $stream)
    {
        return MediaType::json()->schema(
            Schema::object('streams.api.entries.show')->properties(
                Schema::object('meta')->properties(
                    Schema::string('stream'),
                    Schema::string('entry'),
                ),
                Schema::object('links')->properties(
                    Schema::string('self'),
                    Schema::string('stream'),
                    Schema::string('entries'),
                ),
                Schema::ref('#/components/schemas/' . $stream->id, 'data')
            )
        );
    }

    protected static function putEntryResponse200(Stream $stream)
    {
        return MediaType::json()->schema(
            Schema::object('streams.api.entries.update')->properties(
                Schema::object('meta')->properties(
                    Schema::string('stream'),
                    Schema::string('entry'),
                    Schema::ref('#/components/schemas/' . $stream->id, 'payload'),
                ),
                Schema::object('links')->properties(
                    Schema::string('entries'),
                    Schema::string('stream'),
                    Schema::string('self'),
                ),
                Schema::array('errors')->items(
                    Schema::object('error')->properties(
                        Schema::string('message'),
                        Schema::object('meta')->properties(
                            Schema::string('field')
                        )
                    )
                ),
                Schema::array('data')->items(
                    Schema::ref('#/components/schemas/' . $stream->id)
                )
            )
        );
    }

    protected static function patchEntriesResponse200(Stream $stream)
    {
        return MediaType::json()->schema(
            Schema::object('streams.api.entries.patch')->properties(
                Schema::object('meta')->properties(
                    Schema::string('stream'),
                    Schema::string('entry'),
                    Schema::ref('#/components/schemas/' . $stream->id, 'payload'),
                ),
                Schema::object('links')->properties(
                    Schema::string('entries'),
                    Schema::string('stream'),
                    Schema::string('self'),
                ),
                Schema::array('errors')->items(
                    Schema::object('error')->properties(
                        Schema::string('message'),
                        Schema::object('meta')->properties(
                            Schema::string('field')
                        )
                    )
                ),
                Schema::array('data')->items(
                    Schema::ref('#/components/schemas/' . $stream->id)
                )
            )
        );
    }
}

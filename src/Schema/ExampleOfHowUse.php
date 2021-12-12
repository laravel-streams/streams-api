<?php

namespace Streams\Api\Schema;

use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;
use Streams\Api\Schema\ApiHelper as h;

class ExampleOfHowUse
{
    public function asdf()
    {
        h::object('field', properties: [
            h::string('id', 'description', 'Title', 'example', 'defaultValue'),
        ]);
        $properties = h::object('otherfield')->properties(
            ...h::mapAttributesToProperties([
                'foo'    => true,
                'bar'    => 1,
                'foobar' => [
                    'title'  => 'Title',
                    'titles' => ['title1', 'title2'],
                ],
            ])
        );
        Schema::object('autoconvert')->properties(...$properties)->additionalProperties(Any::ref('any'));
    }
}

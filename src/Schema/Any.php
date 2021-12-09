<?php

namespace Streams\Api\Schema;

use GoldSpecDigital\ObjectOrientedOAS\Contracts\SchemaContract;
use GoldSpecDigital\ObjectOrientedOAS\Objects\AllOf;
use GoldSpecDigital\ObjectOrientedOAS\Objects\AnyOf;
use GoldSpecDigital\ObjectOrientedOAS\Objects\BaseObject;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Not;
use GoldSpecDigital\ObjectOrientedOAS\Objects\OneOf;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;
use Streams\Api\Schema\ApiHelper as h;

class Any extends Schema
{
    /**
     * @return AllOf|OneOf|AnyOf|Not|Schema
     */
    public static function build($objectId)
    {
        return new static($objectId);
    }

    protected function generate(): array
    {
        return AnyOf::create($this->objectId)->schemas(
            h::string(),
            h::array(),
            h::bool(),
            h::int(),
            h::object(),
        )->generate();
    }
}

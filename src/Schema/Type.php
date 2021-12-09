<?php

namespace Streams\Api\Schema;

use BenSampo\Enum\Enum;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;
use Illuminate\Support\Arr;
use InvalidArgumentException;

/**
 * @method static static ARRAY()
 * @method static static BOOLEAN()
 * @method static static INTEGER()
 * @method static static NUMBER()
 * @method static static OBJECT()
 * @method static static STRING()
 */
class Type extends Enum
{

    const ARRAY = Schema::TYPE_ARRAY;
    const BOOLEAN = Schema::TYPE_BOOLEAN;
    const INTEGER = Schema::TYPE_INTEGER;
    const NUMBER = Schema::TYPE_NUMBER;
    const OBJECT = Schema::TYPE_OBJECT;
    const STRING = Schema::TYPE_STRING;

    public static function resolve($value): Type
    {
        if (is_array($value)) {
            if (Arr::isAssoc($value)) {
                return Type::OBJECT();
            }
            return Type::ARRAY();
        }
        if (is_bool($value)) {
            return Type::BOOLEAN();
        }
        if (is_int($value)) {
            return Type::INTEGER();
        }
        if (is_numeric($value)) {
            return Type::NUMBER();
        }
        if (is_string($value)) {
            return Type::STRING();
        }
        if (is_object($value)) {
            return Type::OBJECT();
        }
        throw new InvalidArgumentException("Type with value '{$value}' does not exist");
    }
}

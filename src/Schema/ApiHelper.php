<?php

namespace Streams\Api\Schema;

use GoldSpecDigital\ObjectOrientedOAS\Objects\MediaType;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Arr;

/**
 * @method static Schema prop(Type|string $type, string $id = null, ?string $description = null, ?string $title = null, $example = null, mixed $defaultValue = null, $properties = null, $additionalProperties = null)
 * @method static Schema array(string $id = null, ?string $description = null, ?string $title = null, $example = null, mixed $defaultValue = null, $properties = null, $additionalProperties = null)
 * @method static Schema boolean(string $id = null, ?string $description = null, ?string $title = null, $example = null, mixed $defaultValue = null, $properties = null, $additionalProperties = null)
 * @method static Schema bool(string $id = null, ?string $description = null, ?string $title = null, $example = null, mixed $defaultValue = null, $properties = null, $additionalProperties = null)
 * @method static Schema int(string $id = null, ?string $description = null, ?string $title = null, $example = null, mixed $defaultValue = null, $properties = null, $additionalProperties = null)
 * @method static Schema integer(string $id = null, ?string $description = null, ?string $title = null, $example = null, mixed $defaultValue = null, $properties = null, $additionalProperties = null)
 * @method static Schema object(string $id = null, ?string $description = null, ?string $title = null, $example = null, mixed $defaultValue = null, $properties = null, $additionalProperties = null)
 * @method static Schema string(string $id = null, ?string $description = null, ?string $title = null, $example = null, mixed $defaultValue = null, $properties = null, $additionalProperties = null)
 * @method static Schema number(string $id = null, ?string $description = null, ?string $title = null, $example = null, mixed $defaultValue = null, $properties = null, $additionalProperties = null)
 */
class ApiHelper
{
    public static function __callStatic(string $name, array $arguments)
    {
        if ($name === 'prop') {
            return static::getPropFunction()(...$arguments);
        }
        if ($name === 'bool') {
            $name = 'boolean';
        }
        if ($name === 'int') {
            $name = 'integer';
        }
        if (Type::hasValue($name)) {
            array_unshift($arguments, $name);
            return static::getPropFunction()(...$arguments);
        }
        throw new \BadMethodCallException($name);
    }

    public static function getPropFunction(): callable
    {
        /**
         * @param Type|string $type
         */
        return function (
             $type,
            string $id = null,
            string $description = null,
            string $title = null,
            mixed $example = null,
            mixed $defaultValue = null,
            $properties = null,
            $additionalProperties = null
        ): Schema {
            $s = Schema::create($id)->type($type instanceof Type ? $type->value : $type)
                ->description($description)
                ->default($defaultValue)
                ->title($title)
                ->example($example);
            if ($properties !== null) {

                $s = $s->properties(...Arr::wrap($properties));
            }
            if ($additionalProperties !== null) {
                $s = $s->additionalProperties($additionalProperties);
            }
            return $s;
        };
    }

    /**
     * @param array|\Illuminate\Contracts\Support\Arrayable $attributes
     * @return array
     */
    public static function mapAttributesToProperties($attributes)
    {
        if ($attributes instanceof Arrayable) {
            $attributes = $attributes->toArray();
        }
        return collect($attributes)->mapWithKeys(function ($value, $key) {
            try {
                $value = static::prop(Type::resolve($value), $key, example: $value);
            }
            catch (\Throwable $e) {
                return Any::ref('any');
//                return static::string($key, 'type was not correctly resolved. type may vary');
            }
            return [ $key => $value ];
        })->toArray();
    }

    public static function makeAvailableFetchedDataContent(Schema $schema)
    {
        return MediaType::json()->schema(
            static::object('response')->properties(
                static::prop('array', 'available', 'A list of all available data keys you can fetch', 'Available', [ 'app', 'layout', 'config', 'foo' ]),
                static::prop('string', 'fetched', 'A list of all data keys structures you have fetched', 'Fetched', [ 'app', 'layout', 'config' ]),
                static::object('data', properties: $schema)
            )
        );
    }
}

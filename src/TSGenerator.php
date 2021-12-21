<?php

namespace Streams\Api;

use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;
use Illuminate\Support\Str;
use Streams\Core\Stream\Stream;
use Streams\Core\Support\Facades\Streams;

class TSGenerator
{
    public const MAP = [
        Schema::TYPE_ARRAY   => 'any[]',
        Schema::TYPE_BOOLEAN => 'boolean',
        Schema::TYPE_INTEGER => 'number',
        Schema::TYPE_NUMBER  => 'number',
        Schema::TYPE_OBJECT  => 'object',
        Schema::TYPE_STRING  => 'string',
    ];

    protected bool $empty;

    public function __construct(bool $empty = false)
    {
        $this->empty = $empty;
    }

    protected function getType(Schema $schema)
    {
        $type = static::MAP[$schema->type];
        if ($schema->format !== null && in_array($schema->format, ['date', 'date-time'])) {
            $type = 'Date';
        }

        return $type;
    }

    public function generate()
    {
        $b = new TSBuilder();
        $b->line('export {};');
        $bn = $b->declare->open('module', "'@laravel-streams/streams-api'");
//        $bn->export
//            ->open('interface', 'BaseEntry')
//            ->add('[key:string]', 'any', true)
//            ->close();
//        $bn->export
//            ->open('interface', 'BaseStream')
//            ->add('entries', 'BaseEntry')
//            ->add('[key:string]', 'any', true)
//            ->close();
        $names = [];
        if ($this->empty === false) {
            /** @var \GoldSpecDigital\ObjectOrientedOAS\Objects\Schema[] $streamSchemas */
            $streamSchemas = Streams::collection()->map(function (Stream $stream) {
                return $stream->schema()->object();
            })->toArray();
            foreach ($streamSchemas as $schema) {
                if (Str::contains($schema->objectId, '.')) {
                    // @todo
                }
                if ($schema->properties) {
                    $name = str_replace('.', '_', $schema->objectId);
                    $names[] = $name;
                    $bns = $bn->export->open('namespace', $name);
                    $bns->export
                        ->open('interface', 'Stream') // extends BaseStream
                        ->add('entries', 'Entry')
                        ->close();
                    $bnsi = $bns->export->open('interface', 'Entry'); // extends BaseEntry
                    foreach ($schema->properties as $prop) {
                        $bnsi->add($prop->objectId, $this->getType($prop), $prop->required !== null);
                    }
                    $bnsi->close();
                    $bns->close();
                }
            }
        }
        $bnf = $bn->export->open('interface', 'IEntries');
        foreach ($names as $namespace) {
            $name = str_replace('_', '.', $namespace);
            $name = "'$name'";
            $bnf->add($name, "{$namespace}.Entry", true);
        }
        $bnf->add('[key:string]', 'any', true);
        $bnf->close();

        $bns = $bn->export->open('interface', 'IStreams');
        foreach ($names as $namespace) {
            $name = str_replace('_', '.', $namespace);
            $name = "'$name'";
            $bns->add($name, "{$namespace}.Stream", true);
        }
        $bns->add('[key:string]', 'any', true);
        $bns->close();
        $bn->export->type('StreamID', 'keyof Streams');
        $bn->close();

        return $b->build();
    }
}

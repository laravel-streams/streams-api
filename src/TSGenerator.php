<?php

namespace Streams\Api;

use GoldSpecDigital\ObjectOrientedOAS\Objects\Components;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;
use Illuminate\Support\Str;
use Streams\Api\Commands\TSBuilder;
use Streams\Core\Stream\Stream;
use Streams\Core\Support\Facades\Streams;

class TSGenerator
{
    const MAP = [
        Schema::TYPE_ARRAY   => 'any[]',
        Schema::TYPE_BOOLEAN => 'boolean',
        Schema::TYPE_INTEGER => 'number',
        Schema::TYPE_NUMBER  => 'number',
        Schema::TYPE_OBJECT  => 'object',
        Schema::TYPE_STRING  => 'string',
    ];

    protected function getType(Schema $schema)
    {
        $type = static::MAP[ $schema->type ];
        if ($schema->format !== null && in_array($schema->format, [ 'date', 'date-time' ])) {
            $type = 'Date';
        }
        return $type;
    }

    public function generate()
    {
        $b = new TSBuilder();
        /** @var \GoldSpecDigital\ObjectOrientedOAS\Objects\Schema[] $streamSchemas */
        $streamSchemas = Streams::collection()->map(function (Stream $stream) {
            return $stream->schema()->object();
        })->toArray();
        $component     = Components::create('streams')->schemas(...$streamSchemas);

        $bn    = $b->export->open('namespace', 'streams');
        $bn->export
            ->open('interface', "BaseEntry")
            ->add('[key:string]','any',true)
            ->close();
        $bn->export
            ->open('interface', "BaseStream")
            ->add('entries','BaseEntry')
            ->add('[key:string]','any',true)
            ->close();
        $names = [];
        foreach ($streamSchemas as $schema) {
            if (Str::contains($schema->objectId, '.')) {
                // @todo
            }
            if ($schema->properties) {
                $name    = str_replace('.', '_', $schema->objectId);
                $names[] = $name;
                $bns     = $bn->export->open('namespace', $name);
                $bns->export
                    ->open('interface', "Stream extends BaseStream")
                    ->add('entries','Entry')
                    ->close();
                $bnsi    = $bns->export->open('interface', 'Entry extends BaseEntry');
                foreach ($schema->properties as $prop) {
                    $bnsi->add($prop->objectId, $this->getType($prop), $prop->required !== null);
                }
                $bnsi->close();
                $bns->close();
            }
        }
        $bnf = $bn->export->open('interface', 'Entries');
        foreach ($names as $namespace) {
            $name =str_replace('_', '.', $namespace);
            $name = "'$name'";
            $bnf->add($name, "{$namespace}.Entry", true);
        }
        $bnf->add('[key:string]', "any", true);
        $bnf->close();

        $bns = $bn->export->open('interface', 'Streams');
        foreach ($names as $namespace) {
            $name =str_replace('_', '.', $namespace);
            $name = "'$name'";
            $bns->add($name, "{$namespace}.Stream", true);
        }
        $bns->add('[key:string]', "any", true);
        $bns->close();
        $bn->export->type('StreamID', 'keyof Streams');
        $bn->close();

        return $b->build();
    }
}

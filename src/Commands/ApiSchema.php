<?php

namespace Streams\Api\Commands;

use GoldSpecDigital\ObjectOrientedOAS\Exceptions\ValidationException;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Streams\Api\Facades\Api;
use Symfony\Component\Yaml\Yaml;

class ApiSchema extends Command
{
    protected $signature = 'api:schema';

    public function handle()
    {
        /** @var \GoldSpecDigital\ObjectOrientedOAS\OpenApi $schema */
        $schema = Api::schema()->create();
        try {
            $schema->validate();
            $yaml = Yaml::dump($schema->toArray(), 100);
            File::put($path = 'bootstrap/cache/api.yaml', $yaml);
            $this->info('Dumped YAML to ' . base_path($path));
        }
        catch (ValidationException $e) {
            foreach($e->getErrors() as $error){
                $this->error(
                    Arr::pull($error,'message') . ':'
                );
                $this->line(collect($error)->transform(fn($v,$k) => "$k: $v")->implode("\n"));
                $this->getOutput()->newLine();
            }
        }
        catch (\Throwable $e) {
            return $this->error($e->getMessage());
        }
    }
}

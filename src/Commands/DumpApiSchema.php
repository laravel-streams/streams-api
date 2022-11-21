<?php

namespace Streams\Api\Commands;

use Streams\Api\ApiSchema;
use Illuminate\Console\Command;
use Symfony\Component\Yaml\Yaml;

class DumpApiSchema extends Command
{

    protected $signature = 'api:schema {path?}';

    public function handle()
    {
        $yaml = Yaml::dump(ApiSchema::create()->toArray(), 100);

        $path = base_path($this->argument('path') ?: 'api.yaml');
        
        file_put_contents($path, $yaml);

        $this->info('Generated YAML: ' . $path);
    }
}

<?php

namespace Streams\Api\Commands;

use Illuminate\Console\Command;
use Streams\Api\ApiSchema;
use Symfony\Component\Yaml\Yaml;

class DumpSchema extends Command
{

    protected $signature = 'api:schema {path?}';

    public function handle()
    {
        $yaml = Yaml::dump(ApiSchema::create()->toArray(), 100);

        $path = base_path($this->argument('path') ?: 'api.yaml');
        
        file_put_contents($path, $yaml);

        $this->info('Dumped YAML to ' . $path);
    }
}

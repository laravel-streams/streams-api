<?php

namespace Streams\Api;

use Illuminate\Support\Facades\Route;

class ApiManager
{
    protected array $interfaces = [];

    public function interface(ApiInterface $interface): void
    {
        $this->interfaces[$interface->getId()] = $interface;

        $interface->register();
    }

    public function getInterfaces()
    {
        return $this->interfaces;
    }

    public function routeStreams()
    {
        /*
        * Route Streams API endpoints.
        */
        Route::get('streams', [
            'uses' => \Streams\Api\Http\Controller\Streams\GetStreams::class,
            'as' => 'streams.api.streams.list',
        ]);
        Route::post('streams', [
            'uses' => \Streams\Api\Http\Controller\Streams\CreateStream::class,
            'as' => 'streams.api.streams.create',
        ]);
        Route::get('streams/{stream}', [
            'uses' => \Streams\Api\Http\Controller\Streams\ShowStream::class,
            'as' => 'streams.api.streams.show',
        ]);
        Route::put('streams/{stream}', [
            'uses' => \Streams\Api\Http\Controller\Streams\UpdateStream::class,
            'as' => 'streams.api.streams.update',
        ]);
        Route::patch('streams/{stream}', [
            'uses' => \Streams\Api\Http\Controller\Streams\PatchStream::class,
            'as' => 'streams.api.streams.patch',
        ]);
        Route::delete('streams/{stream}', [
            'uses' => \Streams\Api\Http\Controller\Streams\DeleteStream::class,
            'as' => 'streams.api.streams.delete',
        ]);
    }

    public function routeEntries()
    {
        /*
        * Route entries API endpoints.
        */
        Route::get('streams/{stream}/entries', [
            'uses' => \Streams\Api\Http\Controller\Entries\GetEntries::class,
            'as' => 'streams.api.entries.list',
        ]);
        Route::post('streams/{stream}/entries', [
            'uses' => \Streams\Api\Http\Controller\Entries\CreateEntry::class,
            'as' => 'streams.api.entries.create',
        ]);
        Route::get('streams/{stream}/entries/{entry}', [
            'uses' => \Streams\Api\Http\Controller\Entries\ShowEntry::class,
            'as' => 'streams.api.entries.show',
            'where' => [
                'entry' => '(.*)',
            ],
        ]);
        Route::put('streams/{stream}/entries/{entry}', [
            'uses' => \Streams\Api\Http\Controller\Entries\UpdateEntry::class,
            'as' => 'streams.api.entries.update',
            'where' => [
                'entry' => '(.*)',
            ],
        ]);
        Route::patch('streams/{stream}/entries/{entry}', [
            'uses' => \Streams\Api\Http\Controller\Entries\PatchEntry::class,
            'as' => 'streams.api.entries.patch',
            'where' => [
                'entry' => '(.*)',
            ],
        ]);
        Route::delete('streams/{stream}/entries/{entry}', [
            'uses' => \Streams\Api\Http\Controller\Entries\DeleteEntry::class,
            'as' => 'streams.api.entries.delete',
            'where' => [
                'entry' => '(.*)',
            ],
        ]);
        Route::post('streams/{stream}/query', [
            'uses' => \Streams\Api\Http\Controller\Entries\QueryEntries::class,
            'as' => 'streams.api.entries.query',
        ]);
    }
}

# Streams API

A powerful, flexible RESTful API package for the Laravel Streams platform. Get instant CRUD endpoints for all your streams with extensive customization options.

## Features

- 🚀 **Automatic REST Endpoints** - Instant CRUD operations for all streams
- 🔍 **Advanced Querying** - Filtering, pagination, and custom query methods
- 🎯 **Custom Interfaces** - Multiple API configurations with different prefixes and middleware
- 🛠️ **Custom Endpoints** - Easy to add your own routes and logic
- 🔐 **Middleware Support** - Authentication, rate limiting, and more
- 📚 **OpenAPI/Swagger** - Auto-generate interactive API documentation
- ⚡ **Response Formatting** - Standardized JSON responses
- 💾 **HTTP Caching** - Built-in caching with ETag support

## Installation

```bash
composer require streams/api:1.0.x-dev
```

## Quick Start

Enable the API in your `.env`:

```env
STREAMS_API_ENABLED=true
```

Routes register automatically when the package boots. Enable access in `.env`:

```env
STREAMS_API_ENABLED=true
```

Extend the API gate middleware in your application (like Laravel's `VerifyCsrfToken`):

```php
// app/Http/Middleware/EnsureApiIsEnabled.php
namespace App\Http\Middleware;

use Streams\Api\Http\Middleware\EnsureApiIsEnabled as Middleware;

class EnsureApiIsEnabled extends Middleware
{
    protected function shouldEnable(\Illuminate\Http\Request $request): bool
    {
        return parent::shouldEnable($request);
    }
}
```

Point `gate_middleware` in `config/streams/api.php` to your class.

Routes are registered only for interfaces you define. Opt into built-in stream/entry CRUD explicitly:

```php
use Streams\Api\ApiInterface;
use Streams\Api\Resources\EntriesResource;
use Streams\Api\Resources\StreamsResource;
use Streams\Api\Support\Facades\API;

API::interface(
    ApiInterface::make('api')
        ->path('api')
        ->resources([StreamsResource::class, EntriesResource::class])
);

// Or use helpers on the default interface:
API::routeCrud(); // both StreamsResource + EntriesResource
API::routeEntries(); // entries only
API::routeStreams(); // streams only
```

## Documentation

**📖 [Full Documentation](https://streams.dev/docs/api/introduction)**

- [Introduction](https://streams.dev/docs/api/introduction) - Overview and quick start
- [Configuration](https://streams.dev/docs/api/configuration) - Configure the API
- [Query Parameters](https://streams.dev/docs/api/query-parameters) - Filter and paginate data
- [Custom Interfaces](https://streams.dev/docs/api/custom-interfaces) - Multiple API configurations
- [Custom Endpoints](https://streams.dev/docs/api/custom-endpoints) - Add your own routes
- [Responses](https://streams.dev/docs/api/responses) - Format API responses
- [OpenAPI](https://streams.dev/docs/api/openapi) - Generate Swagger documentation
- [Testing](https://streams.dev/docs/api/testing) - Test your API

**Note**: Documentation URLs like `/docs/api/introduction` correspond to `docs/introduction.md` in this repository.

## Default Endpoints

### Stream Management
```
GET    /api/streams              # List all streams
POST   /api/streams              # Create a stream
GET    /api/streams/{stream}     # Get a stream
PUT    /api/streams/{stream}     # Update a stream
PATCH  /api/streams/{stream}     # Partially update a stream
DELETE /api/streams/{stream}     # Delete a stream
```

### Entry Management
```
GET    /api/streams/{stream}/entries           # List entries
POST   /api/streams/{stream}/entries           # Create an entry
GET    /api/streams/{stream}/entries/{entry}   # Get an entry
PUT    /api/streams/{stream}/entries/{entry}   # Update an entry
PATCH  /api/streams/{stream}/entries/{entry}   # Partially update an entry
DELETE /api/streams/{stream}/entries/{entry}   # Delete an entry
```

### Query Endpoint
```
POST   /api/streams/{stream}/query   # Advanced queries
```

## Usage Examples

### Filtering & Pagination

```http
GET /api/streams/posts/entries?where[status]=published&per_page=10&page=1
```

### Advanced Queries

```http
POST /api/streams/posts/query
Content-Type: application/json

{
    "parameters": [
        {"where": ["status", "published"]},
        {"where": ["views", ">", 100]},
        {"orderBy": ["created_at", "desc"]},
        {"limit": [20]}
    ]
}
```

### Custom Interface

```php
use Streams\Api\ApiInterface;
use Streams\Api\Support\Facades\API;

$api = ApiInterface::make('v1')
    ->path('api/v1')
    ->middleware(['auth:sanctum', 'throttle:60,1']);

API::interface($api);
```

### Custom Endpoint Builder

```php
use Streams\Api\Builders\Endpoints\ApiEndpoint;
use Streams\Api\ApiResponse;

class FeaturedPosts extends ApiEndpoint
{
    public function __invoke()
    {
        return ApiResponse::make(
            Streams::entries('posts')->where('featured', true)->get()
        );
    }
}

$api->resources([
    PostsResource::class, // getEndpoints() returns FeaturedPosts::route('featured', 'get')
]);
```

## Configuration

Publish configuration file:

```bash
php artisan vendor:publish --provider=Streams\\Api\\ApiServiceProvider --tag=config
```

```php
// config/streams/api.php
return [
    'enabled' => env('STREAMS_API_ENABLED', false),
    'prefix' => env('STREAMS_API_PREFIX', 'api'),
    'middleware' => env('STREAMS_API_MIDDLEWARE', 'api'),
    'gate_middleware' => \App\Http\Middleware\EnsureApiIsEnabled::class,
    'default_interface' => env('STREAMS_API_DEFAULT_INTERFACE', 'api'),
];
```

## Generate Documentation

Create OpenAPI schema:

```bash
php artisan api:schema
```

Generate Swagger UI:

```bash
php artisan api:documentation
```

Visit `/docs/api/index.html` to view interactive API documentation.

## Testing

Run tests:

```bash
php vendor/bin/phpunit
```

Generate coverage report:

```bash
XDEBUG_MODE=coverage php vendor/bin/phpunit --coverage-html=./coverage
```

Current test suite: **142 tests**, **394 assertions** ✅

## Security

⚠️ **Important**: The API is disabled by default and all endpoints are public. Enable authentication:

```php
// config/streams/api.php
'middleware' => ['api', 'auth:sanctum', 'throttle:60,1'],
```

Or per-interface:

```php
$api->middleware(['auth:sanctum']);
```

## Requirements

- PHP 8.1+
- Laravel 10.0+
- Streams Core 1.0+

## License

The Streams API is open-source software licensed under the [MIT license](LICENSE.md).

## Support

- 📖 [Documentation](https://streams.dev/docs/api/introduction)
- 💬 [Discussions](https://github.com/laravel-streams/streams-api/discussions)
- 🐛 [Issues](https://github.com/laravel-streams/streams-api/issues)
- 🌐 [Website](https://streams.dev)

## Roadmap

- [ ] Gates based on Core/Laravel Gates for authorization
- [ ] API versioning helpers
- [ ] Rate limiting per endpoint
- [ ] API key authentication
- [ ] Webhook support
- [ ] GraphQL support
- [ ] Real-time subscriptions
- [ ] Batch operations
- [ ] API analytics/metrics

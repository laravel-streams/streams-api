---
id: configuration
sort_order: 2
status: published
title: Configuration
description: Configure the Streams API to match your application's needs.
---

# Configuration

The Streams API can be configured through environment variables or by publishing the configuration file.

## Publishing Configuration

To publish the configuration file:

```bash
php artisan vendor:publish --provider=Streams\\Api\\ApiServiceProvider --tag=config
```

This creates `config/streams/api.php` in your application.

## Configuration Options

### Enable/Disable API

Control whether the API is enabled:

```php
// config/streams/api.php
'enabled' => env('STREAMS_API_ENABLED', false),
```

```env
# .env
STREAMS_API_ENABLED=true
```

**Important**: The API is disabled by default for security. All endpoints are public unless you add authentication middleware.

### API Prefix

Configure the base URL prefix for all API routes:

```php
'prefix' => env('STREAMS_API_PREFIX', 'api'),
```

```env
# .env
STREAMS_API_PREFIX=api/v1
```

With this setting, endpoints become `/api/v1/streams`, `/api/v1/streams/{stream}/entries`, etc.

### Middleware

Apply middleware to all API routes:

```php
'middleware' => env('STREAMS_API_MIDDLEWARE', 'api'),
```

```env
# .env
STREAMS_API_MIDDLEWARE=api,auth:sanctum
```

This applies Laravel's default `api` middleware group. You can add authentication, rate limiting, or custom middleware:

```php
'middleware' => ['api', 'auth:sanctum', 'throttle:60,1'],
```

## Service Provider Configuration

The API is registered via `ApiServiceProvider`. It automatically:

- Registers console commands (`api:schema`, `api:documentation`)
- Sets up the API manager and facade
- Loads [`resources/routes/api.php`](../resources/routes/api.php) with the default interface, streams, and entries resources

## API Gate Middleware

Routes are always registered. Whether requests are served is controlled by `EnsureApiIsEnabled` (extend in your app like `VerifyCsrfToken`):

```php
'gate_middleware' => \App\Http\Middleware\EnsureApiIsEnabled::class,
'gate_status' => 404,
'gate_except' => [],
```

## Registering Routes

No CRUD routes are registered automatically. Register an interface with explicit resources and/or endpoints:

```php
use Streams\Api\ApiInterface;
use Streams\Api\Resources\EntriesResource;
use Streams\Api\Resources\StreamsResource;
use Streams\Api\Support\Facades\API;

API::interface(
    ApiInterface::make('api')
        ->path(config('streams.api.prefix'))
        ->resources([
            StreamsResource::class,
            EntriesResource::class,
        ])
);
```

Helpers for the default interface (`STREAMS_API_DEFAULT_INTERFACE`, default `api`):

```php
API::routeCrud();      // streams + entries resources
API::routeEntries();   // EntriesResource only
API::routeStreams();   // StreamsResource only
```

## Environment Variables Reference

| Variable | Default | Description |
|----------|---------|-------------|
| `STREAMS_API_ENABLED` | `false` | Enable/disable the API (gate middleware) |
| `STREAMS_API_PREFIX` | `api` | Base URL prefix |
| `STREAMS_API_MIDDLEWARE` | `api` | Middleware group(s) |
| `STREAMS_API_DEFAULT_INTERFACE` | `api` | Default interface identifier |
| `STREAMS_API_GATE_STATUS` | `404` | HTTP status when API is disabled |

## Next Steps

- [Query Parameters](query-parameters) - Learn about filtering and pagination
- [Custom Interfaces](custom-interfaces) - Create multiple API configurations
- [Custom Endpoints](custom-endpoints) - Add custom routes to your API

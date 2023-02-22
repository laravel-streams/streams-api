# Streams API

A full-featured API package for the Streams platform that gives you total control.

## [Documentation](https://streams.dev/docs/api/introduction)

This project is documented at [streams.dev](https://streams.dev/docs/api/introduction).

## [Installation](https://streams.dev/docs/api/installation)

```bash
composer require streams/api:1.0.x-dev
```

## [Configuration](https://streams.dev/docs/api/configuration)

```bash
php artisan vendor:publish --provider=Streams\\Api\\ApiServiceProvider --tag=config
```

## [Endpoints](https://streams.dev/docs/api/endpoints)

```bash
GET /api/streams
POST /api/streams
GET /api/streams/{stream}
PUT /api/streams/{stream}
PATCH /api/streams/{stream}
DELETE /api/streams/{stream}

GET /api/streams/{stream}/entries
POST /api/streams/{stream}/entries
GET /api/streams/{stream}/entries/{entry}
PUT /api/streams/{stream}/entries/{entry}
PATCH /api/streams/{stream}/entries/{entry}
DELETE /api/streams/{stream}/entries/{entry}

POST /api/streams/{stream}/query

?where[field]=value
&constraint[field]=operator
&per_page=10
&page=2
&limit=40
```

```json
{
    "parameters": [
        {"method": ["argument1", "argument2"]},
        {"where": ["field", "LIKE", "%Value%"]}
    ]
}
```

## Testing

```bash
php vendor/bin/phpunit tests/

XDEBUG_MODE=coverage php vendor/bin/phpunit tests/ --coverage-html=./coverage
```

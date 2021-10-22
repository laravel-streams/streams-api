# Streams API

A full-featured API package for the Streams platform that gives you total control.

## [Documentation](https://streams.dev/docs/api/introduction)

This project is documented at [streams.dev](https://streams.dev/docs/api/introduction).

## [Installation](https://streams.dev/docs/api/installation)

```bash
composer require streams/api
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
PATCH /api/streams/{stream}
PUT /api/streams/{stream}
DELETE /api/streams/{stream}

GET /api/streams/{stream}/entries
POST /api/streams/{stream}/entries
GET /api/streams/{stream}/entries/{entry}
PATCH /api/streams/{stream}/entries/{entry}
PUT /api/streams/{stream}/entries/{entry}
DELETE /api/streams/{stream}/entries/{entry}

?q={"where": [["id", "LIKE", "%doc%"]]}
?q={"orderBy": [["name", "asc"]]}
```

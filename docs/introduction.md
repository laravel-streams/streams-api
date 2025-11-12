---
id: introduction
sort_order: 1
status: published
title: Introduction to Streams API
description: Overview of the Streams API and platform goals.
---

# Introduction

The Streams API package provides a powerful, flexible RESTful API for managing streams and their entries in your Laravel application. Built on top of the Streams platform, it offers automatic CRUD endpoints, flexible query capabilities, and extensive customization options.

## Key Features

- **Automatic REST Endpoints**: Instantly get full CRUD operations for all your streams
- **Query API**: Advanced filtering, pagination, and custom query methods
- **Customizable Interfaces**: Create multiple API interfaces with different configurations
- **Custom Endpoints**: Add your own endpoints alongside the generated ones
- **Middleware Support**: Apply authentication, rate limiting, and other middleware at the interface or route level
- **OpenAPI/Swagger Documentation**: Auto-generate API documentation
- **Response Formatting**: Standardized JSON responses with flexible modifiers
- **Caching**: Built-in HTTP caching with ETag support
- [Native JS Client](https://github.com/laravel-streams/api-client)

## Quick Start

Install the package via Composer:

```bash
composer require streams/api:1.0.x-dev
```

Enable the API in your `.env` file:

```env
STREAMS_API_ENABLED=true
```

That's it! Your API is now available at `/api` with automatic endpoints for all your streams.

## Default Endpoints

Once enabled, the API provides these endpoints out of the box:

### Streams Management
```
GET    /api/streams              # List all streams
POST   /api/streams              # Create a stream
GET    /api/streams/{stream}     # Get a stream
PUT    /api/streams/{stream}     # Update a stream (replace)
PATCH  /api/streams/{stream}     # Update a stream (merge)
DELETE /api/streams/{stream}     # Delete a stream
```

### Entry Management
```
GET    /api/streams/{stream}/entries           # List entries
POST   /api/streams/{stream}/entries           # Create an entry
GET    /api/streams/{stream}/entries/{entry}   # Get an entry
PUT    /api/streams/{stream}/entries/{entry}   # Update an entry (replace)
PATCH  /api/streams/{stream}/entries/{entry}   # Update an entry (merge)
DELETE /api/streams/{stream}/entries/{entry}   # Delete an entry
```

### Query Endpoint
```
POST   /api/streams/{stream}/query   # Advanced query with custom methods
```

## What's Next?

- [Configuration](configuration) - Learn about API configuration options
- [Query Parameters](query-parameters) - Master filtering and pagination
- [Custom Interfaces](custom-interfaces) - Create multiple API configurations
- [Custom Endpoints](custom-endpoints) - Add your own API routes
- [Responses](responses) - Work with API responses and formatting

---
title: Streams API
link_title: Introduction
intro: A robust API for interacting with steams and entry data.
enabled: true
---

## Introduction

The Streams API provides a full featured and extensible RESTful API. The API provides access and management control to all configured domain information and a streamlined interface to define custom endpoints of your own.

This package can serve as the primary API, supplement an exisinting API, or add an additional API to a project. 

## Quick Start

### [Installation](installation)

```bash
composer require streams/api
```

### [Configuration](configuration)

```bash
php artisan vendor:publish --provider=Streams\\Api\\ApiServiceProvider --tag=config
```

### [Endpoints](endpoints)

```bash
GET /api/streams/{stream}
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

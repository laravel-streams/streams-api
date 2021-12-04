---
title: Streams API
link_title: Introduction
intro: A robust API for interacting with streams and entry data.
enabled: true
---

## Introduction

The Streams API provides a full featured and extensible RESTful API. The API provides access and management control to all configured domain information and a streamlined interface to define custom endpoints of your own.

This package can serve as the primary API, supplement an exisinting API, or add an additional API to a project. 

### [Installation](installation)

```bash
composer require streams/api
```

### [Configuration](configuration)

```bash
php artisan vendor:publish --provider=Streams\\Api\\ApiServiceProvider --tag=config
```

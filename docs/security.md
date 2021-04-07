---
title: Security
category: basics
sort: 99
stage: outlining
enabled: true
---

[Configuring middleware](configuration#api-middleware) is indeed up to you, but we make it easy to protect your API.

## Authorization

Enable the API policy to enforce the now *required* [stream policy](/docs/core/streams#security) against the corresponding model [policy method](https://laravel.com/docs/8.x/authorization#policy-methods) (`viewAny`, `view`, `create`, `update`, and `delete`<!-- , `restore`, and `forceDelete` -->).

```json
// streams/contacts.json
{
    "api.policy": true
}
```

You can also specify a different policy to use for the API only:

```json
// streams/contacts.json
{
    "api.policy": "App\\Contacts\\ContactApiPolicy"
}
```

### Fallback Authorization

If you would like to run authorization even if no streams or route policy is specified; you can [configure a fallback policy](configuration#configuring-the-api).

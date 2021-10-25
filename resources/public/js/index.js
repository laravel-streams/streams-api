/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/lib/ApiServiceProvider.ts":
/*!*********************************************!*\
  !*** ./resources/lib/ApiServiceProvider.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiServiceProvider": () => (/* binding */ ApiServiceProvider)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../../node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../../node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../../node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../../node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../../node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _laravel_streams_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @laravel-streams/core */ "@laravel-streams/core");
/* harmony import */ var _laravel_streams_core__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_laravel_streams_core__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _laravel_streams_streams_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @laravel-streams/streams-api */ "../../@laravel-streams/streams-api/dist/streams-api.esm-bundler.js");
/* harmony import */ var _ETagCache__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ETagCache */ "./resources/lib/ETagCache.ts");
/* harmony import */ var _ETag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ETag */ "./resources/lib/ETag.ts");






function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result);
  };
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}





_laravel_streams_core__WEBPACK_IMPORTED_MODULE_5__.app.events.on('Application:initialize:defaultConfig', function (config) {
  config.api = {
    baseURL: '/api',
    etag: {
      enabled: true,
      manifestKey: 'streams'
    },
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  };
});
var ApiServiceProvider = /*#__PURE__*/function (_ServiceProvider) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(ApiServiceProvider, _ServiceProvider);

  var _super = _createSuper(ApiServiceProvider);

  function ApiServiceProvider() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ApiServiceProvider);

    return _super.apply(this, arguments);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ApiServiceProvider, [{
    key: "register",
    value: function register() {
      this.app.binding('streams', function (app) {
        return new _laravel_streams_streams_api__WEBPACK_IMPORTED_MODULE_6__.Streams(Object.assign(Object.assign({}, app.config.api), {
          Client: _laravel_streams_streams_api__WEBPACK_IMPORTED_MODULE_6__.Client,
          Http: _laravel_streams_streams_api__WEBPACK_IMPORTED_MODULE_6__.Http
        }));
      }).addBindingGetter('streams');
    }
  }, {
    key: "boot",
    value: function boot() {
      this.bootETag();
    }
  }, {
    key: "bootETag",
    value: function bootETag() {
      // Add ETag caching to our axios instance
      // The ETag instance will also be accessible under 'etag' property on the axios instance
      this.app.singleton('api.etag.cache', _ETagCache__WEBPACK_IMPORTED_MODULE_7__.ETagCache);
      var etag = new _ETag__WEBPACK_IMPORTED_MODULE_8__.ETag(this.app.streams);
      this.app.instance('api.etag', etag);

      if (this.app.config.api.etag.enabled) {
        etag.enableEtag();
      }
    }
  }]);

  return ApiServiceProvider;
}(_laravel_streams_core__WEBPACK_IMPORTED_MODULE_5__.ServiceProvider);

/***/ }),

/***/ "./resources/lib/ETag.ts":
/*!*******************************!*\
  !*** ./resources/lib/ETag.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ETag": () => (/* binding */ ETag)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../../node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../../node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "../../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _laravel_streams_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @laravel-streams/core */ "@laravel-streams/core");
/* harmony import */ var _laravel_streams_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_laravel_streams_core__WEBPACK_IMPORTED_MODULE_2__);





var byLowerCase = function byLowerCase(toFind) {
  return function (value) {
    return toLowerCase(value) === toFind;
  };
};

var toLowerCase = function toLowerCase(value) {
  return value.toLowerCase();
};

var getKeys = function getKeys(headers) {
  return Object.keys(headers);
};

var isCacheableMethod = function isCacheableMethod(request) {
  return ~['GET', 'HEAD'].indexOf(request.method.toUpperCase());
};

var getHeaderCaseInsensitive = function getHeaderCaseInsensitive(headerName) {
  var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return headers[getKeys(headers).find(byLowerCase(headerName))];
};

var getBase64UrlFromConfig = function getBase64UrlFromConfig(request) {
  return btoa(request.url);
};

var ETag = /*#__PURE__*/function () {
  function ETag(streams) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ETag);

    this.streams = streams;
    this.requestKey = 'ApiETagRequest';
    this.responseKey = 'ApiETagResponse';
    this.enabled = false; // Object.defineProperty(streams, 'etag', {
    //     get         : () => {return this;},
    //     configurable: true,
    //     enumerable  : true,
    // });
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ETag, [{
    key: "client",
    get: function get() {
      return this.streams.client;
    }
  }, {
    key: "enableEtag",
    value: function enableEtag() {
      if (this.enabled) return;
      var requestInterceptor = this.getRequestInterceptor();
      var responseInterceptor = this.getResponseInterceptor();
      this.client.hooks.request.tap('ApiETagRequest', function (request) {
        return requestInterceptor(request);
      });
      this.client.hooks.response.tap('ApiETagResponse', function (response, request) {
        return responseInterceptor(response, request);
      });
      this.enabled = true;
    }
  }, {
    key: "disableEtag",
    value: function disableEtag() {
      var _this = this;

      if (!this.enabled) return;
      this.client.hooks.request.taps = this.client.hooks.request.taps.filter(function (tap) {
        return tap.name === _this.requestKey;
      });
      this.client.hooks.response.taps = this.client.hooks.response.taps.filter(function (tap) {
        return tap.name === _this.responseKey;
      });
      this.enabled = false;
    }
  }, {
    key: "isEnabled",
    value: function isEnabled() {
      return this.enabled;
    } //

  }, {
    key: "getRequestInterceptor",
    value: function getRequestInterceptor() {
      var _this2 = this;

      return function (request) {
        if (isCacheableMethod(request)) {
          var uuid = getBase64UrlFromConfig(request);

          var lastCachedResult = _this2.cache.get(uuid);

          if (lastCachedResult) {
            request.headers.set('If-None-Match', lastCachedResult.etag);
          }
        }

        return request;
      };
    }
  }, {
    key: "getResponseInterceptor",
    value: function getResponseInterceptor() {
      var _this3 = this;

      return function (response, request) {
        if (response.ok && isCacheableMethod(request)) {
          if (response.status === 304) {
            var responseETAG = response.headers.get('ETag'); //getHeaderCaseInsensitive('etag', response.headers.get('ETag'));

            if (responseETAG) {
              var data = response.text();

              if (response.headers.get('Content-Type') === 'application/json') {
                data = response.json();
              }

              _this3.cache.set(getBase64UrlFromConfig(request), responseETAG, data);
            }
          }
        }

        return response;
      };
    }
  }]);

  return ETag;
}();

(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_laravel_streams_core__WEBPACK_IMPORTED_MODULE_2__.inject)('api.etag.cache')], ETag.prototype, "cache", void 0);

ETag = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_laravel_streams_core__WEBPACK_IMPORTED_MODULE_2__.injectable)()], ETag);


/***/ }),

/***/ "./resources/lib/ETagCache.ts":
/*!************************************!*\
  !*** ./resources/lib/ETagCache.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ETagCache": () => (/* binding */ ETagCache)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../../node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../../node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "../../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _laravel_streams_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @laravel-streams/core */ "@laravel-streams/core");
/* harmony import */ var _laravel_streams_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_laravel_streams_core__WEBPACK_IMPORTED_MODULE_2__);





var ETagCache = /*#__PURE__*/function () {
  function ETagCache() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ETagCache);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ETagCache, [{
    key: "manifestKey",
    get: function get() {
      return this.config.http.etag.manifestKey;
    }
  }, {
    key: "get",
    value: function get(key) {
      return this.storage.get(key);
    }
  }, {
    key: "set",
    value: function set(key, etag, value) {
      this.addToUuidManifest(key);
      return this.storage.set(key, {
        etag: etag,
        value: value
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this = this;

      this.getUuidManifest().forEach(function (uuid) {
        return _this.storage.unset(uuid);
      });
    }
  }, {
    key: "getUuidManifest",
    value: function getUuidManifest() {
      if (!this.storage.has(this.manifestKey)) {
        this.storage.set(this.manifestKey, []);
      }

      return this.storage.get(this.manifestKey, []);
    }
  }, {
    key: "addToUuidManifest",
    value: function addToUuidManifest(uuid) {
      var manifest = this.getUuidManifest();
      manifest.push(uuid);
      this.storage.set(this.manifestKey, manifest);
    }
  }]);

  return ETagCache;
}();

(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_laravel_streams_core__WEBPACK_IMPORTED_MODULE_2__.inject)('storage')], ETagCache.prototype, "storage", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_laravel_streams_core__WEBPACK_IMPORTED_MODULE_2__.inject)('config')], ETagCache.prototype, "config", void 0);

ETagCache = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_laravel_streams_core__WEBPACK_IMPORTED_MODULE_2__.injectable)()], ETagCache);


/***/ }),

/***/ "../../@laravel-streams/streams-api/dist/streams-api.esm-bundler.js":
/*!**************************************************************************!*\
  !*** ../../@laravel-streams/streams-api/dist/streams-api.esm-bundler.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Client": () => (/* binding */ Client),
/* harmony export */   "Collection": () => (/* binding */ Collection),
/* harmony export */   "Criteria": () => (/* binding */ Criteria),
/* harmony export */   "Entry": () => (/* binding */ Entry),
/* harmony export */   "EntryCollection": () => (/* binding */ EntryCollection),
/* harmony export */   "Field": () => (/* binding */ Field),
/* harmony export */   "FieldCollection": () => (/* binding */ FieldCollection),
/* harmony export */   "HTTPError": () => (/* binding */ HTTPError),
/* harmony export */   "Http": () => (/* binding */ Http),
/* harmony export */   "Method": () => (/* binding */ Method),
/* harmony export */   "PaginatedEntryCollection": () => (/* binding */ PaginatedEntryCollection),
/* harmony export */   "Repository": () => (/* binding */ Repository),
/* harmony export */   "RequestFactory": () => (/* binding */ RequestFactory),
/* harmony export */   "Str": () => (/* binding */ Str),
/* harmony export */   "Stream": () => (/* binding */ Stream),
/* harmony export */   "Streams": () => (/* binding */ Streams),
/* harmony export */   "comparisonOperators": () => (/* binding */ comparisonOperators),
/* harmony export */   "logicalOperators": () => (/* binding */ logicalOperators),
/* harmony export */   "objectify": () => (/* binding */ objectify),
/* harmony export */   "operators": () => (/* binding */ operators)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../../node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../../node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../../node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../../node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../../node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../../node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "../../../node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! util */ "../../../node_modules/util/util.js");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_7__);
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "../../../node_modules/process/browser.js");








function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof self !== 'undefined' ? self : {};
/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var Reflect$1;

(function (Reflect) {
  // Metadata Proposal
  // https://rbuckton.github.io/reflect-metadata/
  (function (factory) {
    var root = (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_6__["default"])(commonjsGlobal) === "object" ? commonjsGlobal : (typeof self === "undefined" ? "undefined" : (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_6__["default"])(self)) === "object" ? self : (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_6__["default"])(this) === "object" ? this : Function("return this;")();
    var exporter = makeExporter(Reflect);

    if (typeof root.Reflect === "undefined") {
      root.Reflect = Reflect;
    } else {
      exporter = makeExporter(root.Reflect, exporter);
    }

    factory(exporter);

    function makeExporter(target, previous) {
      return function (key, value) {
        if (typeof target[key] !== "function") {
          Object.defineProperty(target, key, {
            configurable: true,
            writable: true,
            value: value
          });
        }

        if (previous) previous(key, value);
      };
    }
  })(function (exporter) {
    var hasOwn = Object.prototype.hasOwnProperty; // feature test for Symbol support

    var supportsSymbol = typeof Symbol === "function";
    var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
    var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
    var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support

    var supportsProto = {
      __proto__: []
    } instanceof Array; // feature test for __proto__ support

    var downLevel = !supportsCreate && !supportsProto;
    var HashMap = {
      // create an object in dictionary mode (a.k.a. "slow" mode in v8)
      create: supportsCreate ? function () {
        return MakeDictionary(Object.create(null));
      } : supportsProto ? function () {
        return MakeDictionary({
          __proto__: null
        });
      } : function () {
        return MakeDictionary({});
      },
      has: downLevel ? function (map, key) {
        return hasOwn.call(map, key);
      } : function (map, key) {
        return key in map;
      },
      get: downLevel ? function (map, key) {
        return hasOwn.call(map, key) ? map[key] : undefined;
      } : function (map, key) {
        return map[key];
      }
    }; // Load global or shim versions of Map, Set, and WeakMap

    var functionPrototype = Object.getPrototypeOf(Function);
    var usePolyfill = (typeof process === "undefined" ? "undefined" : (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_6__["default"])(process)) === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";

    var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();

    var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();

    var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill(); // [[Metadata]] internal slot
    // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots


    var Metadata = new _WeakMap();
    /**
     * Applies a set of decorators to a property of a target object.
     * @param decorators An array of decorators.
     * @param target The target object.
     * @param propertyKey (Optional) The property key to decorate.
     * @param attributes (Optional) The property descriptor for the target key.
     * @remarks Decorators are applied in reverse order.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     Example = Reflect.decorate(decoratorsArray, Example);
     *
     *     // property (on constructor)
     *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
     *
     *     // property (on prototype)
     *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
     *
     *     // method (on constructor)
     *     Object.defineProperty(Example, "staticMethod",
     *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
     *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
     *
     *     // method (on prototype)
     *     Object.defineProperty(Example.prototype, "method",
     *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
     *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
     *
     */

    function decorate(decorators, target, propertyKey, attributes) {
      if (!IsUndefined(propertyKey)) {
        if (!IsArray(decorators)) throw new TypeError();
        if (!IsObject(target)) throw new TypeError();
        if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes)) throw new TypeError();
        if (IsNull(attributes)) attributes = undefined;
        propertyKey = ToPropertyKey(propertyKey);
        return DecorateProperty(decorators, target, propertyKey, attributes);
      } else {
        if (!IsArray(decorators)) throw new TypeError();
        if (!IsConstructor(target)) throw new TypeError();
        return DecorateConstructor(decorators, target);
      }
    }

    exporter("decorate", decorate); // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
    // https://rbuckton.github.io/reflect-metadata/#reflect.metadata

    /**
     * A default metadata decorator factory that can be used on a class, class member, or parameter.
     * @param metadataKey The key for the metadata entry.
     * @param metadataValue The value for the metadata entry.
     * @returns A decorator function.
     * @remarks
     * If `metadataKey` is already defined for the target and target key, the
     * metadataValue for that key will be overwritten.
     * @example
     *
     *     // constructor
     *     @Reflect.metadata(key, value)
     *     class Example {
     *     }
     *
     *     // property (on constructor, TypeScript only)
     *     class Example {
     *         @Reflect.metadata(key, value)
     *         static staticProperty;
     *     }
     *
     *     // property (on prototype, TypeScript only)
     *     class Example {
     *         @Reflect.metadata(key, value)
     *         property;
     *     }
     *
     *     // method (on constructor)
     *     class Example {
     *         @Reflect.metadata(key, value)
     *         static staticMethod() { }
     *     }
     *
     *     // method (on prototype)
     *     class Example {
     *         @Reflect.metadata(key, value)
     *         method() { }
     *     }
     *
     */

    function metadata(metadataKey, metadataValue) {
      function decorator(target, propertyKey) {
        if (!IsObject(target)) throw new TypeError();
        if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey)) throw new TypeError();
        OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
      }

      return decorator;
    }

    exporter("metadata", metadata);
    /**
     * Define a unique metadata entry on the target.
     * @param metadataKey A key used to store and retrieve metadata.
     * @param metadataValue A value that contains attached metadata.
     * @param target The target object on which to define metadata.
     * @param propertyKey (Optional) The property key for the target.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     Reflect.defineMetadata("custom:annotation", options, Example);
     *
     *     // property (on constructor)
     *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
     *
     *     // property (on prototype)
     *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
     *
     *     // method (on constructor)
     *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
     *
     *     // method (on prototype)
     *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
     *
     *     // decorator factory as metadata-producing annotation.
     *     function MyAnnotation(options): Decorator {
     *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
     *     }
     *
     */

    function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
    }

    exporter("defineMetadata", defineMetadata);
    /**
     * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
     * @param metadataKey A key used to store and retrieve metadata.
     * @param target The target object on which the metadata is defined.
     * @param propertyKey (Optional) The property key for the target.
     * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     result = Reflect.hasMetadata("custom:annotation", Example);
     *
     *     // property (on constructor)
     *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
     *
     *     // property (on prototype)
     *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
     *
     *     // method (on constructor)
     *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
     *
     *     // method (on prototype)
     *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
     *
     */

    function hasMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryHasMetadata(metadataKey, target, propertyKey);
    }

    exporter("hasMetadata", hasMetadata);
    /**
     * Gets a value indicating whether the target object has the provided metadata key defined.
     * @param metadataKey A key used to store and retrieve metadata.
     * @param target The target object on which the metadata is defined.
     * @param propertyKey (Optional) The property key for the target.
     * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
     *
     *     // property (on constructor)
     *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
     *
     *     // property (on prototype)
     *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
     *
     *     // method (on constructor)
     *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
     *
     *     // method (on prototype)
     *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
     *
     */

    function hasOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
    }

    exporter("hasOwnMetadata", hasOwnMetadata);
    /**
     * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
     * @param metadataKey A key used to store and retrieve metadata.
     * @param target The target object on which the metadata is defined.
     * @param propertyKey (Optional) The property key for the target.
     * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     result = Reflect.getMetadata("custom:annotation", Example);
     *
     *     // property (on constructor)
     *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
     *
     *     // property (on prototype)
     *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
     *
     *     // method (on constructor)
     *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
     *
     *     // method (on prototype)
     *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
     *
     */

    function getMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryGetMetadata(metadataKey, target, propertyKey);
    }

    exporter("getMetadata", getMetadata);
    /**
     * Gets the metadata value for the provided metadata key on the target object.
     * @param metadataKey A key used to store and retrieve metadata.
     * @param target The target object on which the metadata is defined.
     * @param propertyKey (Optional) The property key for the target.
     * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     result = Reflect.getOwnMetadata("custom:annotation", Example);
     *
     *     // property (on constructor)
     *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
     *
     *     // property (on prototype)
     *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
     *
     *     // method (on constructor)
     *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
     *
     *     // method (on prototype)
     *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
     *
     */

    function getOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
    }

    exporter("getOwnMetadata", getOwnMetadata);
    /**
     * Gets the metadata keys defined on the target object or its prototype chain.
     * @param target The target object on which the metadata is defined.
     * @param propertyKey (Optional) The property key for the target.
     * @returns An array of unique metadata keys.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     result = Reflect.getMetadataKeys(Example);
     *
     *     // property (on constructor)
     *     result = Reflect.getMetadataKeys(Example, "staticProperty");
     *
     *     // property (on prototype)
     *     result = Reflect.getMetadataKeys(Example.prototype, "property");
     *
     *     // method (on constructor)
     *     result = Reflect.getMetadataKeys(Example, "staticMethod");
     *
     *     // method (on prototype)
     *     result = Reflect.getMetadataKeys(Example.prototype, "method");
     *
     */

    function getMetadataKeys(target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryMetadataKeys(target, propertyKey);
    }

    exporter("getMetadataKeys", getMetadataKeys);
    /**
     * Gets the unique metadata keys defined on the target object.
     * @param target The target object on which the metadata is defined.
     * @param propertyKey (Optional) The property key for the target.
     * @returns An array of unique metadata keys.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     result = Reflect.getOwnMetadataKeys(Example);
     *
     *     // property (on constructor)
     *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
     *
     *     // property (on prototype)
     *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
     *
     *     // method (on constructor)
     *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
     *
     *     // method (on prototype)
     *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
     *
     */

    function getOwnMetadataKeys(target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryOwnMetadataKeys(target, propertyKey);
    }

    exporter("getOwnMetadataKeys", getOwnMetadataKeys);
    /**
     * Deletes the metadata entry from the target object with the provided key.
     * @param metadataKey A key used to store and retrieve metadata.
     * @param target The target object on which the metadata is defined.
     * @param propertyKey (Optional) The property key for the target.
     * @returns `true` if the metadata entry was found and deleted; otherwise, false.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     result = Reflect.deleteMetadata("custom:annotation", Example);
     *
     *     // property (on constructor)
     *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
     *
     *     // property (on prototype)
     *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
     *
     *     // method (on constructor)
     *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
     *
     *     // method (on prototype)
     *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
     *
     */

    function deleteMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      var metadataMap = GetOrCreateMetadataMap(target, propertyKey,
      /*Create*/
      false);
      if (IsUndefined(metadataMap)) return false;
      if (!metadataMap.delete(metadataKey)) return false;
      if (metadataMap.size > 0) return true;
      var targetMetadata = Metadata.get(target);
      targetMetadata.delete(propertyKey);
      if (targetMetadata.size > 0) return true;
      Metadata.delete(target);
      return true;
    }

    exporter("deleteMetadata", deleteMetadata);

    function DecorateConstructor(decorators, target) {
      for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target);

        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsConstructor(decorated)) throw new TypeError();
          target = decorated;
        }
      }

      return target;
    }

    function DecorateProperty(decorators, target, propertyKey, descriptor) {
      for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target, propertyKey, descriptor);

        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsObject(decorated)) throw new TypeError();
          descriptor = decorated;
        }
      }

      return descriptor;
    }

    function GetOrCreateMetadataMap(O, P, Create) {
      var targetMetadata = Metadata.get(O);

      if (IsUndefined(targetMetadata)) {
        if (!Create) return undefined;
        targetMetadata = new _Map();
        Metadata.set(O, targetMetadata);
      }

      var metadataMap = targetMetadata.get(P);

      if (IsUndefined(metadataMap)) {
        if (!Create) return undefined;
        metadataMap = new _Map();
        targetMetadata.set(P, metadataMap);
      }

      return metadataMap;
    } // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata


    function OrdinaryHasMetadata(MetadataKey, O, P) {
      var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn) return true;
      var parent = OrdinaryGetPrototypeOf(O);
      if (!IsNull(parent)) return OrdinaryHasMetadata(MetadataKey, parent, P);
      return false;
    } // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata


    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
      var metadataMap = GetOrCreateMetadataMap(O, P,
      /*Create*/
      false);
      if (IsUndefined(metadataMap)) return false;
      return ToBoolean(metadataMap.has(MetadataKey));
    } // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata


    function OrdinaryGetMetadata(MetadataKey, O, P) {
      var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn) return OrdinaryGetOwnMetadata(MetadataKey, O, P);
      var parent = OrdinaryGetPrototypeOf(O);
      if (!IsNull(parent)) return OrdinaryGetMetadata(MetadataKey, parent, P);
      return undefined;
    } // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata


    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
      var metadataMap = GetOrCreateMetadataMap(O, P,
      /*Create*/
      false);
      if (IsUndefined(metadataMap)) return undefined;
      return metadataMap.get(MetadataKey);
    } // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata


    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
      var metadataMap = GetOrCreateMetadataMap(O, P,
      /*Create*/
      true);
      metadataMap.set(MetadataKey, MetadataValue);
    } // 3.1.6.1 OrdinaryMetadataKeys(O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys


    function OrdinaryMetadataKeys(O, P) {
      var ownKeys = OrdinaryOwnMetadataKeys(O, P);
      var parent = OrdinaryGetPrototypeOf(O);
      if (parent === null) return ownKeys;
      var parentKeys = OrdinaryMetadataKeys(parent, P);
      if (parentKeys.length <= 0) return ownKeys;
      if (ownKeys.length <= 0) return parentKeys;
      var set = new _Set();
      var keys = [];

      for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
        var key = ownKeys_1[_i];
        var hasKey = set.has(key);

        if (!hasKey) {
          set.add(key);
          keys.push(key);
        }
      }

      for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
        var key = parentKeys_1[_a];
        var hasKey = set.has(key);

        if (!hasKey) {
          set.add(key);
          keys.push(key);
        }
      }

      return keys;
    } // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys


    function OrdinaryOwnMetadataKeys(O, P) {
      var keys = [];
      var metadataMap = GetOrCreateMetadataMap(O, P,
      /*Create*/
      false);
      if (IsUndefined(metadataMap)) return keys;
      var keysObj = metadataMap.keys();
      var iterator = GetIterator(keysObj);
      var k = 0;

      while (true) {
        var next = IteratorStep(iterator);

        if (!next) {
          keys.length = k;
          return keys;
        }

        var nextValue = IteratorValue(next);

        try {
          keys[k] = nextValue;
        } catch (e) {
          try {
            IteratorClose(iterator);
          } finally {
            throw e;
          }
        }

        k++;
      }
    } // 6 ECMAScript Data Typ0es and Values
    // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values


    function Type(x) {
      if (x === null) return 1
      /* Null */
      ;

      switch ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_6__["default"])(x)) {
        case "undefined":
          return 0
          /* Undefined */
          ;

        case "boolean":
          return 2
          /* Boolean */
          ;

        case "string":
          return 3
          /* String */
          ;

        case "symbol":
          return 4
          /* Symbol */
          ;

        case "number":
          return 5
          /* Number */
          ;

        case "object":
          return x === null ? 1
          /* Null */
          : 6
          /* Object */
          ;

        default:
          return 6
          /* Object */
          ;
      }
    } // 6.1.1 The Undefined Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type


    function IsUndefined(x) {
      return x === undefined;
    } // 6.1.2 The Null Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type


    function IsNull(x) {
      return x === null;
    } // 6.1.5 The Symbol Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type


    function IsSymbol(x) {
      return (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_6__["default"])(x) === "symbol";
    } // 6.1.7 The Object Type
    // https://tc39.github.io/ecma262/#sec-object-type


    function IsObject(x) {
      return (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_6__["default"])(x) === "object" ? x !== null : typeof x === "function";
    } // 7.1 Type Conversion
    // https://tc39.github.io/ecma262/#sec-type-conversion
    // 7.1.1 ToPrimitive(input [, PreferredType])
    // https://tc39.github.io/ecma262/#sec-toprimitive


    function ToPrimitive(input, PreferredType) {
      switch (Type(input)) {
        case 0
        /* Undefined */
        :
          return input;

        case 1
        /* Null */
        :
          return input;

        case 2
        /* Boolean */
        :
          return input;

        case 3
        /* String */
        :
          return input;

        case 4
        /* Symbol */
        :
          return input;

        case 5
        /* Number */
        :
          return input;
      }

      var hint = PreferredType === 3
      /* String */
      ? "string" : PreferredType === 5
      /* Number */
      ? "number" : "default";
      var exoticToPrim = GetMethod(input, toPrimitiveSymbol);

      if (exoticToPrim !== undefined) {
        var result = exoticToPrim.call(input, hint);
        if (IsObject(result)) throw new TypeError();
        return result;
      }

      return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
    } // 7.1.1.1 OrdinaryToPrimitive(O, hint)
    // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive


    function OrdinaryToPrimitive(O, hint) {
      if (hint === "string") {
        var toString_1 = O.toString;

        if (IsCallable(toString_1)) {
          var result = toString_1.call(O);
          if (!IsObject(result)) return result;
        }

        var valueOf = O.valueOf;

        if (IsCallable(valueOf)) {
          var result = valueOf.call(O);
          if (!IsObject(result)) return result;
        }
      } else {
        var valueOf = O.valueOf;

        if (IsCallable(valueOf)) {
          var result = valueOf.call(O);
          if (!IsObject(result)) return result;
        }

        var toString_2 = O.toString;

        if (IsCallable(toString_2)) {
          var result = toString_2.call(O);
          if (!IsObject(result)) return result;
        }
      }

      throw new TypeError();
    } // 7.1.2 ToBoolean(argument)
    // https://tc39.github.io/ecma262/2016/#sec-toboolean


    function ToBoolean(argument) {
      return !!argument;
    } // 7.1.12 ToString(argument)
    // https://tc39.github.io/ecma262/#sec-tostring


    function ToString(argument) {
      return "" + argument;
    } // 7.1.14 ToPropertyKey(argument)
    // https://tc39.github.io/ecma262/#sec-topropertykey


    function ToPropertyKey(argument) {
      var key = ToPrimitive(argument, 3
      /* String */
      );
      if (IsSymbol(key)) return key;
      return ToString(key);
    } // 7.2 Testing and Comparison Operations
    // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
    // 7.2.2 IsArray(argument)
    // https://tc39.github.io/ecma262/#sec-isarray


    function IsArray(argument) {
      return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
    } // 7.2.3 IsCallable(argument)
    // https://tc39.github.io/ecma262/#sec-iscallable


    function IsCallable(argument) {
      // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
      return typeof argument === "function";
    } // 7.2.4 IsConstructor(argument)
    // https://tc39.github.io/ecma262/#sec-isconstructor


    function IsConstructor(argument) {
      // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
      return typeof argument === "function";
    } // 7.2.7 IsPropertyKey(argument)
    // https://tc39.github.io/ecma262/#sec-ispropertykey


    function IsPropertyKey(argument) {
      switch (Type(argument)) {
        case 3
        /* String */
        :
          return true;

        case 4
        /* Symbol */
        :
          return true;

        default:
          return false;
      }
    } // 7.3 Operations on Objects
    // https://tc39.github.io/ecma262/#sec-operations-on-objects
    // 7.3.9 GetMethod(V, P)
    // https://tc39.github.io/ecma262/#sec-getmethod


    function GetMethod(V, P) {
      var func = V[P];
      if (func === undefined || func === null) return undefined;
      if (!IsCallable(func)) throw new TypeError();
      return func;
    } // 7.4 Operations on Iterator Objects
    // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects


    function GetIterator(obj) {
      var method = GetMethod(obj, iteratorSymbol);
      if (!IsCallable(method)) throw new TypeError(); // from Call

      var iterator = method.call(obj);
      if (!IsObject(iterator)) throw new TypeError();
      return iterator;
    } // 7.4.4 IteratorValue(iterResult)
    // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue


    function IteratorValue(iterResult) {
      return iterResult.value;
    } // 7.4.5 IteratorStep(iterator)
    // https://tc39.github.io/ecma262/#sec-iteratorstep


    function IteratorStep(iterator) {
      var result = iterator.next();
      return result.done ? false : result;
    } // 7.4.6 IteratorClose(iterator, completion)
    // https://tc39.github.io/ecma262/#sec-iteratorclose


    function IteratorClose(iterator) {
      var f = iterator["return"];
      if (f) f.call(iterator);
    } // 9.1 Ordinary Object Internal Methods and Internal Slots
    // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
    // 9.1.1.1 OrdinaryGetPrototypeOf(O)
    // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof


    function OrdinaryGetPrototypeOf(O) {
      var proto = Object.getPrototypeOf(O);
      if (typeof O !== "function" || O === functionPrototype) return proto; // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
      // Try to determine the superclass constructor. Compatible implementations
      // must either set __proto__ on a subclass constructor to the superclass constructor,
      // or ensure each class has a valid `constructor` property on its prototype that
      // points back to the constructor.
      // If this is not the same as Function.[[Prototype]], then this is definately inherited.
      // This is the case when in ES6 or when using __proto__ in a compatible browser.

      if (proto !== functionPrototype) return proto; // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.

      var prototype = O.prototype;
      var prototypeProto = prototype && Object.getPrototypeOf(prototype);
      if (prototypeProto == null || prototypeProto === Object.prototype) return proto; // If the constructor was not a function, then we cannot determine the heritage.

      var constructor = prototypeProto.constructor;
      if (typeof constructor !== "function") return proto; // If we have some kind of self-reference, then we cannot determine the heritage.

      if (constructor === O) return proto; // we have a pretty good guess at the heritage.

      return constructor;
    } // naive Map shim


    function CreateMapPolyfill() {
      var cacheSentinel = {};
      var arraySentinel = [];

      var MapIterator =
      /** @class */
      function () {
        function MapIterator(keys, values, selector) {
          this._index = 0;
          this._keys = keys;
          this._values = values;
          this._selector = selector;
        }

        MapIterator.prototype["@@iterator"] = function () {
          return this;
        };

        MapIterator.prototype[iteratorSymbol] = function () {
          return this;
        };

        MapIterator.prototype.next = function () {
          var index = this._index;

          if (index >= 0 && index < this._keys.length) {
            var result = this._selector(this._keys[index], this._values[index]);

            if (index + 1 >= this._keys.length) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            } else {
              this._index++;
            }

            return {
              value: result,
              done: false
            };
          }

          return {
            value: undefined,
            done: true
          };
        };

        MapIterator.prototype.throw = function (error) {
          if (this._index >= 0) {
            this._index = -1;
            this._keys = arraySentinel;
            this._values = arraySentinel;
          }

          throw error;
        };

        MapIterator.prototype.return = function (value) {
          if (this._index >= 0) {
            this._index = -1;
            this._keys = arraySentinel;
            this._values = arraySentinel;
          }

          return {
            value: value,
            done: true
          };
        };

        return MapIterator;
      }();

      return (
        /** @class */
        function () {
          function Map() {
            this._keys = [];
            this._values = [];
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          }

          Object.defineProperty(Map.prototype, "size", {
            get: function get() {
              return this._keys.length;
            },
            enumerable: true,
            configurable: true
          });

          Map.prototype.has = function (key) {
            return this._find(key,
            /*insert*/
            false) >= 0;
          };

          Map.prototype.get = function (key) {
            var index = this._find(key,
            /*insert*/
            false);

            return index >= 0 ? this._values[index] : undefined;
          };

          Map.prototype.set = function (key, value) {
            var index = this._find(key,
            /*insert*/
            true);

            this._values[index] = value;
            return this;
          };

          Map.prototype.delete = function (key) {
            var index = this._find(key,
            /*insert*/
            false);

            if (index >= 0) {
              var size = this._keys.length;

              for (var i = index + 1; i < size; i++) {
                this._keys[i - 1] = this._keys[i];
                this._values[i - 1] = this._values[i];
              }

              this._keys.length--;
              this._values.length--;

              if (key === this._cacheKey) {
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              }

              return true;
            }

            return false;
          };

          Map.prototype.clear = function () {
            this._keys.length = 0;
            this._values.length = 0;
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          };

          Map.prototype.keys = function () {
            return new MapIterator(this._keys, this._values, getKey);
          };

          Map.prototype.values = function () {
            return new MapIterator(this._keys, this._values, getValue);
          };

          Map.prototype.entries = function () {
            return new MapIterator(this._keys, this._values, getEntry);
          };

          Map.prototype["@@iterator"] = function () {
            return this.entries();
          };

          Map.prototype[iteratorSymbol] = function () {
            return this.entries();
          };

          Map.prototype._find = function (key, insert) {
            if (this._cacheKey !== key) {
              this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
            }

            if (this._cacheIndex < 0 && insert) {
              this._cacheIndex = this._keys.length;

              this._keys.push(key);

              this._values.push(undefined);
            }

            return this._cacheIndex;
          };

          return Map;
        }()
      );

      function getKey(key, _) {
        return key;
      }

      function getValue(_, value) {
        return value;
      }

      function getEntry(key, value) {
        return [key, value];
      }
    } // naive Set shim


    function CreateSetPolyfill() {
      return (
        /** @class */
        function () {
          function Set() {
            this._map = new _Map();
          }

          Object.defineProperty(Set.prototype, "size", {
            get: function get() {
              return this._map.size;
            },
            enumerable: true,
            configurable: true
          });

          Set.prototype.has = function (value) {
            return this._map.has(value);
          };

          Set.prototype.add = function (value) {
            return this._map.set(value, value), this;
          };

          Set.prototype.delete = function (value) {
            return this._map.delete(value);
          };

          Set.prototype.clear = function () {
            this._map.clear();
          };

          Set.prototype.keys = function () {
            return this._map.keys();
          };

          Set.prototype.values = function () {
            return this._map.values();
          };

          Set.prototype.entries = function () {
            return this._map.entries();
          };

          Set.prototype["@@iterator"] = function () {
            return this.keys();
          };

          Set.prototype[iteratorSymbol] = function () {
            return this.keys();
          };

          return Set;
        }()
      );
    } // naive WeakMap shim


    function CreateWeakMapPolyfill() {
      var UUID_SIZE = 16;
      var keys = HashMap.create();
      var rootKey = CreateUniqueKey();
      return (
        /** @class */
        function () {
          function WeakMap() {
            this._key = CreateUniqueKey();
          }

          WeakMap.prototype.has = function (target) {
            var table = GetOrCreateWeakMapTable(target,
            /*create*/
            false);
            return table !== undefined ? HashMap.has(table, this._key) : false;
          };

          WeakMap.prototype.get = function (target) {
            var table = GetOrCreateWeakMapTable(target,
            /*create*/
            false);
            return table !== undefined ? HashMap.get(table, this._key) : undefined;
          };

          WeakMap.prototype.set = function (target, value) {
            var table = GetOrCreateWeakMapTable(target,
            /*create*/
            true);
            table[this._key] = value;
            return this;
          };

          WeakMap.prototype.delete = function (target) {
            var table = GetOrCreateWeakMapTable(target,
            /*create*/
            false);
            return table !== undefined ? delete table[this._key] : false;
          };

          WeakMap.prototype.clear = function () {
            // NOTE: not a real clear, just makes the previous data unreachable
            this._key = CreateUniqueKey();
          };

          return WeakMap;
        }()
      );

      function CreateUniqueKey() {
        var key;

        do {
          key = "@@WeakMap@@" + CreateUUID();
        } while (HashMap.has(keys, key));

        keys[key] = true;
        return key;
      }

      function GetOrCreateWeakMapTable(target, create) {
        if (!hasOwn.call(target, rootKey)) {
          if (!create) return undefined;
          Object.defineProperty(target, rootKey, {
            value: HashMap.create()
          });
        }

        return target[rootKey];
      }

      function FillRandomBytes(buffer, size) {
        for (var i = 0; i < size; ++i) {
          buffer[i] = Math.random() * 0xff | 0;
        }

        return buffer;
      }

      function GenRandomBytes(size) {
        if (typeof Uint8Array === "function") {
          if (typeof crypto !== "undefined") return crypto.getRandomValues(new Uint8Array(size));
          if (typeof msCrypto !== "undefined") return msCrypto.getRandomValues(new Uint8Array(size));
          return FillRandomBytes(new Uint8Array(size), size);
        }

        return FillRandomBytes(new Array(size), size);
      }

      function CreateUUID() {
        var data = GenRandomBytes(UUID_SIZE); // mark as random - RFC 4122 § 4.4

        data[6] = data[6] & 0x4f | 0x40;
        data[8] = data[8] & 0xbf | 0x80;
        var result = "";

        for (var offset = 0; offset < UUID_SIZE; ++offset) {
          var byte = data[offset];
          if (offset === 4 || offset === 6 || offset === 8) result += "-";
          if (byte < 16) result += "0";
          result += byte.toString(16).toLowerCase();
        }

        return result;
      }
    } // uses a heuristic used by v8 and chakra to force an object into dictionary mode.


    function MakeDictionary(obj) {
      obj.__ = undefined;
      delete obj.__;
      return obj;
    }
  });
})(Reflect$1 || (Reflect$1 = {}));
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */


var _extendStatics = function extendStatics(d, b) {
  _extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    }
  };

  return _extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

  _extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var _assign = function __assign() {
  _assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return _assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}

var isMergeableObject = function isMergeableObject(value) {
  return isNonNullObject(value) && !isSpecial(value);
};

function isNonNullObject(value) {
  return !!value && (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_6__["default"])(value) === 'object';
}

function isSpecial(value) {
  var stringValue = Object.prototype.toString.call(value);
  return stringValue === '[object RegExp]' || stringValue === '[object Date]' || isReactElement(value);
} // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25


var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
  return value.$$typeof === REACT_ELEMENT_TYPE;
}

function emptyTarget(val) {
  return Array.isArray(val) ? [] : {};
}

function cloneUnlessOtherwiseSpecified(value, options) {
  return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
}

function defaultArrayMerge(target, source, options) {
  return target.concat(source).map(function (element) {
    return cloneUnlessOtherwiseSpecified(element, options);
  });
}

function getMergeFunction(key, options) {
  if (!options.customMerge) {
    return deepmerge;
  }

  var customMerge = options.customMerge(key);
  return typeof customMerge === 'function' ? customMerge : deepmerge;
}

function getEnumerableOwnPropertySymbols(target) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
    return target.propertyIsEnumerable(symbol);
  }) : [];
}

function getKeys(target) {
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
}

function propertyIsOnObject(object, property) {
  try {
    return property in object;
  } catch (_) {
    return false;
  }
} // Protects from prototype poisoning and unexpected merging up the prototype chain.


function propertyIsUnsafe(target, key) {
  return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
  && !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
  && Object.propertyIsEnumerable.call(target, key)); // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
  var destination = {};

  if (options.isMergeableObject(target)) {
    getKeys(target).forEach(function (key) {
      destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
    });
  }

  getKeys(source).forEach(function (key) {
    if (propertyIsUnsafe(target, key)) {
      return;
    }

    if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
      destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
    } else {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
    }
  });
  return destination;
}

function deepmerge(target, source, options) {
  options = options || {};
  options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  options.isMergeableObject = options.isMergeableObject || isMergeableObject; // cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
  // implementations can use it. The caller may not replace it.

  options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
  var sourceIsArray = Array.isArray(source);
  var targetIsArray = Array.isArray(target);
  var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source, options);
  } else if (sourceIsArray) {
    return options.arrayMerge(target, source, options);
  } else {
    return mergeObject(target, source, options);
  }
}

deepmerge.all = function deepmergeAll(array, options) {
  if (!Array.isArray(array)) {
    throw new Error('first argument should be an array');
  }

  return array.reduce(function (prev, next) {
    return deepmerge(prev, next, options);
  }, {});
};

var deepmerge_1 = deepmerge;
var cjs = deepmerge_1;
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var util$1 = (util__WEBPACK_IMPORTED_MODULE_7___default());
var deprecateContext = util$1.deprecate(function () {}, "Hook.context is deprecated and will be removed");

var CALL_DELEGATE = function CALL_DELEGATE() {
  this.call = this._createCall("sync");
  return this.call.apply(this, arguments);
};

var CALL_ASYNC_DELEGATE = function CALL_ASYNC_DELEGATE() {
  this.callAsync = this._createCall("async");
  return this.callAsync.apply(this, arguments);
};

var PROMISE_DELEGATE = function PROMISE_DELEGATE() {
  this.promise = this._createCall("promise");
  return this.promise.apply(this, arguments);
};

var Hook$3 = /*#__PURE__*/function () {
  function Hook$3() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, Hook$3);

    this._args = args;
    this.name = name;
    this.taps = [];
    this.interceptors = [];
    this._call = CALL_DELEGATE;
    this.call = CALL_DELEGATE;
    this._callAsync = CALL_ASYNC_DELEGATE;
    this.callAsync = CALL_ASYNC_DELEGATE;
    this._promise = PROMISE_DELEGATE;
    this.promise = PROMISE_DELEGATE;
    this._x = undefined;
    this.compile = this.compile;
    this.tap = this.tap;
    this.tapAsync = this.tapAsync;
    this.tapPromise = this.tapPromise;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(Hook$3, [{
    key: "compile",
    value: function compile(options) {
      throw new Error("Abstract: should be overridden");
    }
  }, {
    key: "_createCall",
    value: function _createCall(type) {
      return this.compile({
        taps: this.taps,
        interceptors: this.interceptors,
        args: this._args,
        type: type
      });
    }
  }, {
    key: "_tap",
    value: function _tap(type, options, fn) {
      if (typeof options === "string") {
        options = {
          name: options.trim()
        };
      } else if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_6__["default"])(options) !== "object" || options === null) {
        throw new Error("Invalid tap options");
      }

      if (typeof options.name !== "string" || options.name === "") {
        throw new Error("Missing name for tap");
      }

      if (typeof options.context !== "undefined") {
        deprecateContext();
      }

      options = Object.assign({
        type: type,
        fn: fn
      }, options);
      options = this._runRegisterInterceptors(options);

      this._insert(options);
    }
  }, {
    key: "tap",
    value: function tap(options, fn) {
      this._tap("sync", options, fn);
    }
  }, {
    key: "tapAsync",
    value: function tapAsync(options, fn) {
      this._tap("async", options, fn);
    }
  }, {
    key: "tapPromise",
    value: function tapPromise(options, fn) {
      this._tap("promise", options, fn);
    }
  }, {
    key: "_runRegisterInterceptors",
    value: function _runRegisterInterceptors(options) {
      var _iterator = _createForOfIteratorHelper(this.interceptors),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var interceptor = _step.value;

          if (interceptor.register) {
            var newOptions = interceptor.register(options);

            if (newOptions !== undefined) {
              options = newOptions;
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return options;
    }
  }, {
    key: "withOptions",
    value: function withOptions(options) {
      var _this2 = this;

      var mergeOptions = function mergeOptions(opt) {
        return Object.assign({}, options, typeof opt === "string" ? {
          name: opt
        } : opt);
      };

      return {
        name: this.name,
        tap: function tap(opt, fn) {
          return _this2.tap(mergeOptions(opt), fn);
        },
        tapAsync: function tapAsync(opt, fn) {
          return _this2.tapAsync(mergeOptions(opt), fn);
        },
        tapPromise: function tapPromise(opt, fn) {
          return _this2.tapPromise(mergeOptions(opt), fn);
        },
        intercept: function intercept(interceptor) {
          return _this2.intercept(interceptor);
        },
        isUsed: function isUsed() {
          return _this2.isUsed();
        },
        withOptions: function withOptions(opt) {
          return _this2.withOptions(mergeOptions(opt));
        }
      };
    }
  }, {
    key: "isUsed",
    value: function isUsed() {
      return this.taps.length > 0 || this.interceptors.length > 0;
    }
  }, {
    key: "intercept",
    value: function intercept(interceptor) {
      this._resetCompilation();

      this.interceptors.push(Object.assign({}, interceptor));

      if (interceptor.register) {
        for (var i = 0; i < this.taps.length; i++) {
          this.taps[i] = interceptor.register(this.taps[i]);
        }
      }
    }
  }, {
    key: "_resetCompilation",
    value: function _resetCompilation() {
      this.call = this._call;
      this.callAsync = this._callAsync;
      this.promise = this._promise;
    }
  }, {
    key: "_insert",
    value: function _insert(item) {
      this._resetCompilation();

      var before;

      if (typeof item.before === "string") {
        before = new Set([item.before]);
      } else if (Array.isArray(item.before)) {
        before = new Set(item.before);
      }

      var stage = 0;

      if (typeof item.stage === "number") {
        stage = item.stage;
      }

      var i = this.taps.length;

      while (i > 0) {
        i--;
        var x = this.taps[i];
        this.taps[i + 1] = x;
        var xStage = x.stage || 0;

        if (before) {
          if (before.has(x.name)) {
            before.delete(x.name);
            continue;
          }

          if (before.size > 0) {
            continue;
          }
        }

        if (xStage > stage) {
          continue;
        }

        i++;
        break;
      }

      this.taps[i] = item;
    }
  }]);

  return Hook$3;
}();

Object.setPrototypeOf(Hook$3.prototype, null);
var Hook_1 = Hook$3;
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var HookCodeFactory$a = /*#__PURE__*/function () {
  function HookCodeFactory$a(config) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, HookCodeFactory$a);

    this.config = config;
    this.options = undefined;
    this._args = undefined;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(HookCodeFactory$a, [{
    key: "create",
    value: function create(options) {
      this.init(options);
      var fn;

      switch (this.options.type) {
        case "sync":
          fn = new Function(this.args(), '"use strict";\n' + this.header() + this.contentWithInterceptors({
            onError: function onError(err) {
              return "throw ".concat(err, ";\n");
            },
            onResult: function onResult(result) {
              return "return ".concat(result, ";\n");
            },
            resultReturns: true,
            onDone: function onDone() {
              return "";
            },
            rethrowIfPossible: true
          }));
          break;

        case "async":
          fn = new Function(this.args({
            after: "_callback"
          }), '"use strict";\n' + this.header() + this.contentWithInterceptors({
            onError: function onError(err) {
              return "_callback(".concat(err, ");\n");
            },
            onResult: function onResult(result) {
              return "_callback(null, ".concat(result, ");\n");
            },
            onDone: function onDone() {
              return "_callback();\n";
            }
          }));
          break;

        case "promise":
          var errorHelperUsed = false;
          var content = this.contentWithInterceptors({
            onError: function onError(err) {
              errorHelperUsed = true;
              return "_error(".concat(err, ");\n");
            },
            onResult: function onResult(result) {
              return "_resolve(".concat(result, ");\n");
            },
            onDone: function onDone() {
              return "_resolve();\n";
            }
          });
          var code = "";
          code += '"use strict";\n';
          code += this.header();
          code += "return new Promise((function(_resolve, _reject) {\n";

          if (errorHelperUsed) {
            code += "var _sync = true;\n";
            code += "function _error(_err) {\n";
            code += "if(_sync)\n";
            code += "_resolve(Promise.resolve().then((function() { throw _err; })));\n";
            code += "else\n";
            code += "_reject(_err);\n";
            code += "};\n";
          }

          code += content;

          if (errorHelperUsed) {
            code += "_sync = false;\n";
          }

          code += "}));\n";
          fn = new Function(this.args(), code);
          break;
      }

      this.deinit();
      return fn;
    }
  }, {
    key: "setup",
    value: function setup(instance, options) {
      instance._x = options.taps.map(function (t) {
        return t.fn;
      });
    }
    /**
     * @param {{ type: "sync" | "promise" | "async", taps: Array<Tap>, interceptors: Array<Interceptor> }} options
     */

  }, {
    key: "init",
    value: function init(options) {
      this.options = options;
      this._args = options.args.slice();
    }
  }, {
    key: "deinit",
    value: function deinit() {
      this.options = undefined;
      this._args = undefined;
    }
  }, {
    key: "contentWithInterceptors",
    value: function contentWithInterceptors(options) {
      var _this3 = this;

      if (this.options.interceptors.length > 0) {
        var onError = options.onError;
        var onResult = options.onResult;
        var onDone = options.onDone;
        var code = "";

        for (var i = 0; i < this.options.interceptors.length; i++) {
          var interceptor = this.options.interceptors[i];

          if (interceptor.call) {
            code += "".concat(this.getInterceptor(i), ".call(").concat(this.args({
              before: interceptor.context ? "_context" : undefined
            }), ");\n");
          }
        }

        code += this.content(Object.assign(options, {
          onError: onError && function (err) {
            var code = "";

            for (var _i2 = 0; _i2 < _this3.options.interceptors.length; _i2++) {
              var _interceptor = _this3.options.interceptors[_i2];

              if (_interceptor.error) {
                code += "".concat(_this3.getInterceptor(_i2), ".error(").concat(err, ");\n");
              }
            }

            code += onError(err);
            return code;
          },
          onResult: onResult && function (result) {
            var code = "";

            for (var _i3 = 0; _i3 < _this3.options.interceptors.length; _i3++) {
              var _interceptor2 = _this3.options.interceptors[_i3];

              if (_interceptor2.result) {
                code += "".concat(_this3.getInterceptor(_i3), ".result(").concat(result, ");\n");
              }
            }

            code += onResult(result);
            return code;
          },
          onDone: onDone && function () {
            var code = "";

            for (var _i4 = 0; _i4 < _this3.options.interceptors.length; _i4++) {
              var _interceptor3 = _this3.options.interceptors[_i4];

              if (_interceptor3.done) {
                code += "".concat(_this3.getInterceptor(_i4), ".done();\n");
              }
            }

            code += onDone();
            return code;
          }
        }));
        return code;
      } else {
        return this.content(options);
      }
    }
  }, {
    key: "header",
    value: function header() {
      var code = "";

      if (this.needContext()) {
        code += "var _context = {};\n";
      } else {
        code += "var _context;\n";
      }

      code += "var _x = this._x;\n";

      if (this.options.interceptors.length > 0) {
        code += "var _taps = this.taps;\n";
        code += "var _interceptors = this.interceptors;\n";
      }

      return code;
    }
  }, {
    key: "needContext",
    value: function needContext() {
      var _iterator2 = _createForOfIteratorHelper(this.options.taps),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var tap = _step2.value;
          if (tap.context) return true;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return false;
    }
  }, {
    key: "callTap",
    value: function callTap(tapIndex, _ref) {
      var onError = _ref.onError,
          onResult = _ref.onResult,
          onDone = _ref.onDone,
          rethrowIfPossible = _ref.rethrowIfPossible;
      var code = "";
      var hasTapCached = false;

      for (var i = 0; i < this.options.interceptors.length; i++) {
        var interceptor = this.options.interceptors[i];

        if (interceptor.tap) {
          if (!hasTapCached) {
            code += "var _tap".concat(tapIndex, " = ").concat(this.getTap(tapIndex), ";\n");
            hasTapCached = true;
          }

          code += "".concat(this.getInterceptor(i), ".tap(").concat(interceptor.context ? "_context, " : "", "_tap").concat(tapIndex, ");\n");
        }
      }

      code += "var _fn".concat(tapIndex, " = ").concat(this.getTapFn(tapIndex), ";\n");
      var tap = this.options.taps[tapIndex];

      switch (tap.type) {
        case "sync":
          if (!rethrowIfPossible) {
            code += "var _hasError".concat(tapIndex, " = false;\n");
            code += "try {\n";
          }

          if (onResult) {
            code += "var _result".concat(tapIndex, " = _fn").concat(tapIndex, "(").concat(this.args({
              before: tap.context ? "_context" : undefined
            }), ");\n");
          } else {
            code += "_fn".concat(tapIndex, "(").concat(this.args({
              before: tap.context ? "_context" : undefined
            }), ");\n");
          }

          if (!rethrowIfPossible) {
            code += "} catch(_err) {\n";
            code += "_hasError".concat(tapIndex, " = true;\n");
            code += onError("_err");
            code += "}\n";
            code += "if(!_hasError".concat(tapIndex, ") {\n");
          }

          if (onResult) {
            code += onResult("_result".concat(tapIndex));
          }

          if (onDone) {
            code += onDone();
          }

          if (!rethrowIfPossible) {
            code += "}\n";
          }

          break;

        case "async":
          var cbCode = "";
          if (onResult) cbCode += "(function(_err".concat(tapIndex, ", _result").concat(tapIndex, ") {\n");else cbCode += "(function(_err".concat(tapIndex, ") {\n");
          cbCode += "if(_err".concat(tapIndex, ") {\n");
          cbCode += onError("_err".concat(tapIndex));
          cbCode += "} else {\n";

          if (onResult) {
            cbCode += onResult("_result".concat(tapIndex));
          }

          if (onDone) {
            cbCode += onDone();
          }

          cbCode += "}\n";
          cbCode += "})";
          code += "_fn".concat(tapIndex, "(").concat(this.args({
            before: tap.context ? "_context" : undefined,
            after: cbCode
          }), ");\n");
          break;

        case "promise":
          code += "var _hasResult".concat(tapIndex, " = false;\n");
          code += "var _promise".concat(tapIndex, " = _fn").concat(tapIndex, "(").concat(this.args({
            before: tap.context ? "_context" : undefined
          }), ");\n");
          code += "if (!_promise".concat(tapIndex, " || !_promise").concat(tapIndex, ".then)\n");
          code += "  throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise".concat(tapIndex, " + ')');\n");
          code += "_promise".concat(tapIndex, ".then((function(_result").concat(tapIndex, ") {\n");
          code += "_hasResult".concat(tapIndex, " = true;\n");

          if (onResult) {
            code += onResult("_result".concat(tapIndex));
          }

          if (onDone) {
            code += onDone();
          }

          code += "}), function(_err".concat(tapIndex, ") {\n");
          code += "if(_hasResult".concat(tapIndex, ") throw _err").concat(tapIndex, ";\n");
          code += onError("_err".concat(tapIndex));
          code += "});\n";
          break;
      }

      return code;
    }
  }, {
    key: "callTapsSeries",
    value: function callTapsSeries(_ref2) {
      var _this4 = this;

      var _onError = _ref2.onError,
          onResult = _ref2.onResult,
          resultReturns = _ref2.resultReturns,
          onDone = _ref2.onDone,
          doneReturns = _ref2.doneReturns,
          rethrowIfPossible = _ref2.rethrowIfPossible;
      if (this.options.taps.length === 0) return onDone();
      var firstAsync = this.options.taps.findIndex(function (t) {
        return t.type !== "sync";
      });
      var somethingReturns = resultReturns || doneReturns;
      var code = "";
      var current = onDone;
      var unrollCounter = 0;

      var _loop = function _loop(j) {
        var i = j;
        var unroll = current !== onDone && (_this4.options.taps[i].type !== "sync" || unrollCounter++ > 20);

        if (unroll) {
          unrollCounter = 0;
          code += "function _next".concat(i, "() {\n");
          code += current();
          code += "}\n";

          current = function current() {
            return "".concat(somethingReturns ? "return " : "", "_next").concat(i, "();\n");
          };
        }

        var done = current;

        var doneBreak = function doneBreak(skipDone) {
          if (skipDone) return "";
          return onDone();
        };

        var content = _this4.callTap(i, {
          onError: function onError(error) {
            return _onError(i, error, done, doneBreak);
          },
          onResult: onResult && function (result) {
            return onResult(i, result, done, doneBreak);
          },
          onDone: !onResult && done,
          rethrowIfPossible: rethrowIfPossible && (firstAsync < 0 || i < firstAsync)
        });

        current = function current() {
          return content;
        };
      };

      for (var j = this.options.taps.length - 1; j >= 0; j--) {
        _loop(j);
      }

      code += current();
      return code;
    }
  }, {
    key: "callTapsLooping",
    value: function callTapsLooping(_ref3) {
      var onError = _ref3.onError,
          onDone = _ref3.onDone,
          rethrowIfPossible = _ref3.rethrowIfPossible;
      if (this.options.taps.length === 0) return onDone();
      var syncOnly = this.options.taps.every(function (t) {
        return t.type === "sync";
      });
      var code = "";

      if (!syncOnly) {
        code += "var _looper = (function() {\n";
        code += "var _loopAsync = false;\n";
      }

      code += "var _loop;\n";
      code += "do {\n";
      code += "_loop = false;\n";

      for (var i = 0; i < this.options.interceptors.length; i++) {
        var interceptor = this.options.interceptors[i];

        if (interceptor.loop) {
          code += "".concat(this.getInterceptor(i), ".loop(").concat(this.args({
            before: interceptor.context ? "_context" : undefined
          }), ");\n");
        }
      }

      code += this.callTapsSeries({
        onError: onError,
        onResult: function onResult(i, result, next, doneBreak) {
          var code = "";
          code += "if(".concat(result, " !== undefined) {\n");
          code += "_loop = true;\n";
          if (!syncOnly) code += "if(_loopAsync) _looper();\n";
          code += doneBreak(true);
          code += "} else {\n";
          code += next();
          code += "}\n";
          return code;
        },
        onDone: onDone && function () {
          var code = "";
          code += "if(!_loop) {\n";
          code += onDone();
          code += "}\n";
          return code;
        },
        rethrowIfPossible: rethrowIfPossible && syncOnly
      });
      code += "} while(_loop);\n";

      if (!syncOnly) {
        code += "_loopAsync = true;\n";
        code += "});\n";
        code += "_looper();\n";
      }

      return code;
    }
  }, {
    key: "callTapsParallel",
    value: function callTapsParallel(_ref4) {
      var _this5 = this;

      var _onError2 = _ref4.onError,
          onResult = _ref4.onResult,
          onDone = _ref4.onDone,
          rethrowIfPossible = _ref4.rethrowIfPossible,
          _ref4$onTap = _ref4.onTap,
          onTap = _ref4$onTap === void 0 ? function (i, run) {
        return run();
      } : _ref4$onTap;

      if (this.options.taps.length <= 1) {
        return this.callTapsSeries({
          onError: _onError2,
          onResult: onResult,
          onDone: onDone,
          rethrowIfPossible: rethrowIfPossible
        });
      }

      var code = "";
      code += "do {\n";
      code += "var _counter = ".concat(this.options.taps.length, ";\n");

      if (onDone) {
        code += "var _done = (function() {\n";
        code += onDone();
        code += "});\n";
      }

      var _loop2 = function _loop2(i) {
        var done = function done() {
          if (onDone) return "if(--_counter === 0) _done();\n";else return "--_counter;";
        };

        var doneBreak = function doneBreak(skipDone) {
          if (skipDone || !onDone) return "_counter = 0;\n";else return "_counter = 0;\n_done();\n";
        };

        code += "if(_counter <= 0) break;\n";
        code += onTap(i, function () {
          return _this5.callTap(i, {
            onError: function onError(error) {
              var code = "";
              code += "if(_counter > 0) {\n";
              code += _onError2(i, error, done, doneBreak);
              code += "}\n";
              return code;
            },
            onResult: onResult && function (result) {
              var code = "";
              code += "if(_counter > 0) {\n";
              code += onResult(i, result, done, doneBreak);
              code += "}\n";
              return code;
            },
            onDone: !onResult && function () {
              return done();
            },
            rethrowIfPossible: rethrowIfPossible
          });
        }, done, doneBreak);
      };

      for (var i = 0; i < this.options.taps.length; i++) {
        _loop2(i);
      }

      code += "} while(false);\n";
      return code;
    }
  }, {
    key: "args",
    value: function args() {
      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          before = _ref5.before,
          after = _ref5.after;

      var allArgs = this._args;
      if (before) allArgs = [before].concat(allArgs);
      if (after) allArgs = allArgs.concat(after);

      if (allArgs.length === 0) {
        return "";
      } else {
        return allArgs.join(", ");
      }
    }
  }, {
    key: "getTapFn",
    value: function getTapFn(idx) {
      return "_x[".concat(idx, "]");
    }
  }, {
    key: "getTap",
    value: function getTap(idx) {
      return "_taps[".concat(idx, "]");
    }
  }, {
    key: "getInterceptor",
    value: function getInterceptor(idx) {
      return "_interceptors[".concat(idx, "]");
    }
  }]);

  return HookCodeFactory$a;
}();

var HookCodeFactory_1 = HookCodeFactory$a;
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var Hook$2 = Hook_1;
var HookCodeFactory$9 = HookCodeFactory_1;

var SyncHookCodeFactory = /*#__PURE__*/function (_HookCodeFactory$) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__["default"])(SyncHookCodeFactory, _HookCodeFactory$);

  var _super2 = _createSuper(SyncHookCodeFactory);

  function SyncHookCodeFactory() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, SyncHookCodeFactory);

    return _super2.apply(this, arguments);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(SyncHookCodeFactory, [{
    key: "content",
    value: function content(_ref6) {
      var _onError3 = _ref6.onError,
          onDone = _ref6.onDone,
          rethrowIfPossible = _ref6.rethrowIfPossible;
      return this.callTapsSeries({
        onError: function onError(i, err) {
          return _onError3(err);
        },
        onDone: onDone,
        rethrowIfPossible: rethrowIfPossible
      });
    }
  }]);

  return SyncHookCodeFactory;
}(HookCodeFactory$9);

var factory$2 = new SyncHookCodeFactory();

var TAP_ASYNC$1 = function TAP_ASYNC$1() {
  throw new Error("tapAsync is not supported on a SyncHook");
};

var TAP_PROMISE$1 = function TAP_PROMISE$1() {
  throw new Error("tapPromise is not supported on a SyncHook");
};

var COMPILE$2 = function COMPILE$2(options) {
  factory$2.setup(this, options);
  return factory$2.create(options);
};

function SyncHook$1() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var hook = new Hook$2(args, name);
  hook.constructor = SyncHook$1;
  hook.tapAsync = TAP_ASYNC$1;
  hook.tapPromise = TAP_PROMISE$1;
  hook.compile = COMPILE$2;
  return hook;
}

SyncHook$1.prototype = null;
var SyncHook_1 = SyncHook$1;
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var HookCodeFactory$8 = HookCodeFactory_1;

var SyncBailHookCodeFactory = /*#__PURE__*/function (_HookCodeFactory$2) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__["default"])(SyncBailHookCodeFactory, _HookCodeFactory$2);

  var _super3 = _createSuper(SyncBailHookCodeFactory);

  function SyncBailHookCodeFactory() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, SyncBailHookCodeFactory);

    return _super3.apply(this, arguments);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(SyncBailHookCodeFactory, [{
    key: "content",
    value: function content(_ref7) {
      var _onError4 = _ref7.onError,
          _onResult = _ref7.onResult,
          resultReturns = _ref7.resultReturns,
          onDone = _ref7.onDone,
          rethrowIfPossible = _ref7.rethrowIfPossible;
      return this.callTapsSeries({
        onError: function onError(i, err) {
          return _onError4(err);
        },
        onResult: function onResult(i, result, next) {
          return "if(".concat(result, " !== undefined) {\n").concat(_onResult(result), ";\n} else {\n").concat(next(), "}\n");
        },
        resultReturns: resultReturns,
        onDone: onDone,
        rethrowIfPossible: rethrowIfPossible
      });
    }
  }]);

  return SyncBailHookCodeFactory;
}(HookCodeFactory$8);

new SyncBailHookCodeFactory();
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var Hook$1 = Hook_1;
var HookCodeFactory$7 = HookCodeFactory_1;

var SyncWaterfallHookCodeFactory = /*#__PURE__*/function (_HookCodeFactory$3) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__["default"])(SyncWaterfallHookCodeFactory, _HookCodeFactory$3);

  var _super4 = _createSuper(SyncWaterfallHookCodeFactory);

  function SyncWaterfallHookCodeFactory() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, SyncWaterfallHookCodeFactory);

    return _super4.apply(this, arguments);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(SyncWaterfallHookCodeFactory, [{
    key: "content",
    value: function content(_ref8) {
      var _this6 = this;

      var _onError5 = _ref8.onError,
          onResult = _ref8.onResult,
          resultReturns = _ref8.resultReturns,
          rethrowIfPossible = _ref8.rethrowIfPossible;
      return this.callTapsSeries({
        onError: function onError(i, err) {
          return _onError5(err);
        },
        onResult: function onResult(i, result, next) {
          var code = "";
          code += "if(".concat(result, " !== undefined) {\n");
          code += "".concat(_this6._args[0], " = ").concat(result, ";\n");
          code += "}\n";
          code += next();
          return code;
        },
        onDone: function onDone() {
          return onResult(_this6._args[0]);
        },
        doneReturns: resultReturns,
        rethrowIfPossible: rethrowIfPossible
      });
    }
  }]);

  return SyncWaterfallHookCodeFactory;
}(HookCodeFactory$7);

var factory$1 = new SyncWaterfallHookCodeFactory();

var TAP_ASYNC = function TAP_ASYNC() {
  throw new Error("tapAsync is not supported on a SyncWaterfallHook");
};

var TAP_PROMISE = function TAP_PROMISE() {
  throw new Error("tapPromise is not supported on a SyncWaterfallHook");
};

var COMPILE$1 = function COMPILE$1(options) {
  factory$1.setup(this, options);
  return factory$1.create(options);
};

function SyncWaterfallHook$1() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  if (args.length < 1) throw new Error("Waterfall hooks must have at least one argument");
  var hook = new Hook$1(args, name);
  hook.constructor = SyncWaterfallHook$1;
  hook.tapAsync = TAP_ASYNC;
  hook.tapPromise = TAP_PROMISE;
  hook.compile = COMPILE$1;
  return hook;
}

SyncWaterfallHook$1.prototype = null;
var SyncWaterfallHook_1 = SyncWaterfallHook$1;
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var HookCodeFactory$6 = HookCodeFactory_1;

var SyncLoopHookCodeFactory = /*#__PURE__*/function (_HookCodeFactory$4) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__["default"])(SyncLoopHookCodeFactory, _HookCodeFactory$4);

  var _super5 = _createSuper(SyncLoopHookCodeFactory);

  function SyncLoopHookCodeFactory() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, SyncLoopHookCodeFactory);

    return _super5.apply(this, arguments);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(SyncLoopHookCodeFactory, [{
    key: "content",
    value: function content(_ref9) {
      var _onError6 = _ref9.onError,
          onDone = _ref9.onDone,
          rethrowIfPossible = _ref9.rethrowIfPossible;
      return this.callTapsLooping({
        onError: function onError(i, err) {
          return _onError6(err);
        },
        onDone: onDone,
        rethrowIfPossible: rethrowIfPossible
      });
    }
  }]);

  return SyncLoopHookCodeFactory;
}(HookCodeFactory$6);

new SyncLoopHookCodeFactory();
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var HookCodeFactory$5 = HookCodeFactory_1;

var AsyncParallelHookCodeFactory = /*#__PURE__*/function (_HookCodeFactory$5) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__["default"])(AsyncParallelHookCodeFactory, _HookCodeFactory$5);

  var _super6 = _createSuper(AsyncParallelHookCodeFactory);

  function AsyncParallelHookCodeFactory() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, AsyncParallelHookCodeFactory);

    return _super6.apply(this, arguments);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(AsyncParallelHookCodeFactory, [{
    key: "content",
    value: function content(_ref10) {
      var _onError7 = _ref10.onError,
          onDone = _ref10.onDone;
      return this.callTapsParallel({
        onError: function onError(i, err, done, doneBreak) {
          return _onError7(err) + doneBreak(true);
        },
        onDone: onDone
      });
    }
  }]);

  return AsyncParallelHookCodeFactory;
}(HookCodeFactory$5);

new AsyncParallelHookCodeFactory();
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var HookCodeFactory$4 = HookCodeFactory_1;

var AsyncParallelBailHookCodeFactory = /*#__PURE__*/function (_HookCodeFactory$6) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__["default"])(AsyncParallelBailHookCodeFactory, _HookCodeFactory$6);

  var _super7 = _createSuper(AsyncParallelBailHookCodeFactory);

  function AsyncParallelBailHookCodeFactory() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, AsyncParallelBailHookCodeFactory);

    return _super7.apply(this, arguments);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(AsyncParallelBailHookCodeFactory, [{
    key: "content",
    value: function content(_ref11) {
      var onError = _ref11.onError,
          onResult = _ref11.onResult,
          onDone = _ref11.onDone;
      var code = "";
      code += "var _results = new Array(".concat(this.options.taps.length, ");\n");
      code += "var _checkDone = function() {\n";
      code += "for(var i = 0; i < _results.length; i++) {\n";
      code += "var item = _results[i];\n";
      code += "if(item === undefined) return false;\n";
      code += "if(item.result !== undefined) {\n";
      code += onResult("item.result");
      code += "return true;\n";
      code += "}\n";
      code += "if(item.error) {\n";
      code += onError("item.error");
      code += "return true;\n";
      code += "}\n";
      code += "}\n";
      code += "return false;\n";
      code += "}\n";
      code += this.callTapsParallel({
        onError: function onError(i, err, done, doneBreak) {
          var code = "";
          code += "if(".concat(i, " < _results.length && ((_results.length = ").concat(i + 1, "), (_results[").concat(i, "] = { error: ").concat(err, " }), _checkDone())) {\n");
          code += doneBreak(true);
          code += "} else {\n";
          code += done();
          code += "}\n";
          return code;
        },
        onResult: function onResult(i, result, done, doneBreak) {
          var code = "";
          code += "if(".concat(i, " < _results.length && (").concat(result, " !== undefined && (_results.length = ").concat(i + 1, "), (_results[").concat(i, "] = { result: ").concat(result, " }), _checkDone())) {\n");
          code += doneBreak(true);
          code += "} else {\n";
          code += done();
          code += "}\n";
          return code;
        },
        onTap: function onTap(i, run, done, doneBreak) {
          var code = "";

          if (i > 0) {
            code += "if(".concat(i, " >= _results.length) {\n");
            code += done();
            code += "} else {\n";
          }

          code += run();
          if (i > 0) code += "}\n";
          return code;
        },
        onDone: onDone
      });
      return code;
    }
  }]);

  return AsyncParallelBailHookCodeFactory;
}(HookCodeFactory$4);

new AsyncParallelBailHookCodeFactory();
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var HookCodeFactory$3 = HookCodeFactory_1;

var AsyncSeriesHookCodeFactory = /*#__PURE__*/function (_HookCodeFactory$7) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__["default"])(AsyncSeriesHookCodeFactory, _HookCodeFactory$7);

  var _super8 = _createSuper(AsyncSeriesHookCodeFactory);

  function AsyncSeriesHookCodeFactory() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, AsyncSeriesHookCodeFactory);

    return _super8.apply(this, arguments);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(AsyncSeriesHookCodeFactory, [{
    key: "content",
    value: function content(_ref12) {
      var _onError8 = _ref12.onError,
          onDone = _ref12.onDone;
      return this.callTapsSeries({
        onError: function onError(i, err, next, doneBreak) {
          return _onError8(err) + doneBreak(true);
        },
        onDone: onDone
      });
    }
  }]);

  return AsyncSeriesHookCodeFactory;
}(HookCodeFactory$3);

new AsyncSeriesHookCodeFactory();
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var HookCodeFactory$2 = HookCodeFactory_1;

var AsyncSeriesBailHookCodeFactory = /*#__PURE__*/function (_HookCodeFactory$8) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__["default"])(AsyncSeriesBailHookCodeFactory, _HookCodeFactory$8);

  var _super9 = _createSuper(AsyncSeriesBailHookCodeFactory);

  function AsyncSeriesBailHookCodeFactory() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, AsyncSeriesBailHookCodeFactory);

    return _super9.apply(this, arguments);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(AsyncSeriesBailHookCodeFactory, [{
    key: "content",
    value: function content(_ref13) {
      var _onError9 = _ref13.onError,
          _onResult2 = _ref13.onResult,
          resultReturns = _ref13.resultReturns,
          onDone = _ref13.onDone;
      return this.callTapsSeries({
        onError: function onError(i, err, next, doneBreak) {
          return _onError9(err) + doneBreak(true);
        },
        onResult: function onResult(i, result, next) {
          return "if(".concat(result, " !== undefined) {\n").concat(_onResult2(result), "\n} else {\n").concat(next(), "}\n");
        },
        resultReturns: resultReturns,
        onDone: onDone
      });
    }
  }]);

  return AsyncSeriesBailHookCodeFactory;
}(HookCodeFactory$2);

new AsyncSeriesBailHookCodeFactory();
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var HookCodeFactory$1 = HookCodeFactory_1;

var AsyncSeriesLoopHookCodeFactory = /*#__PURE__*/function (_HookCodeFactory$9) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__["default"])(AsyncSeriesLoopHookCodeFactory, _HookCodeFactory$9);

  var _super10 = _createSuper(AsyncSeriesLoopHookCodeFactory);

  function AsyncSeriesLoopHookCodeFactory() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, AsyncSeriesLoopHookCodeFactory);

    return _super10.apply(this, arguments);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(AsyncSeriesLoopHookCodeFactory, [{
    key: "content",
    value: function content(_ref14) {
      var _onError10 = _ref14.onError,
          onDone = _ref14.onDone;
      return this.callTapsLooping({
        onError: function onError(i, err, next, doneBreak) {
          return _onError10(err) + doneBreak(true);
        },
        onDone: onDone
      });
    }
  }]);

  return AsyncSeriesLoopHookCodeFactory;
}(HookCodeFactory$1);

new AsyncSeriesLoopHookCodeFactory();
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var Hook = Hook_1;
var HookCodeFactory = HookCodeFactory_1;

var AsyncSeriesWaterfallHookCodeFactory = /*#__PURE__*/function (_HookCodeFactory) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__["default"])(AsyncSeriesWaterfallHookCodeFactory, _HookCodeFactory);

  var _super11 = _createSuper(AsyncSeriesWaterfallHookCodeFactory);

  function AsyncSeriesWaterfallHookCodeFactory() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, AsyncSeriesWaterfallHookCodeFactory);

    return _super11.apply(this, arguments);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(AsyncSeriesWaterfallHookCodeFactory, [{
    key: "content",
    value: function content(_ref15) {
      var _this7 = this;

      var _onError11 = _ref15.onError,
          onResult = _ref15.onResult,
          onDone = _ref15.onDone;
      return this.callTapsSeries({
        onError: function onError(i, err, next, doneBreak) {
          return _onError11(err) + doneBreak(true);
        },
        onResult: function onResult(i, result, next) {
          var code = "";
          code += "if(".concat(result, " !== undefined) {\n");
          code += "".concat(_this7._args[0], " = ").concat(result, ";\n");
          code += "}\n";
          code += next();
          return code;
        },
        onDone: function onDone() {
          return onResult(_this7._args[0]);
        }
      });
    }
  }]);

  return AsyncSeriesWaterfallHookCodeFactory;
}(HookCodeFactory);

var factory = new AsyncSeriesWaterfallHookCodeFactory();

var COMPILE = function COMPILE(options) {
  factory.setup(this, options);
  return factory.create(options);
};

function AsyncSeriesWaterfallHook$1() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  if (args.length < 1) throw new Error("Waterfall hooks must have at least one argument");
  var hook = new Hook(args, name);
  hook.constructor = AsyncSeriesWaterfallHook$1;
  hook.compile = COMPILE;
  hook._call = undefined;
  hook.call = undefined;
  return hook;
}

AsyncSeriesWaterfallHook$1.prototype = null;
var AsyncSeriesWaterfallHook_1 = AsyncSeriesWaterfallHook$1;
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var util = (util__WEBPACK_IMPORTED_MODULE_7___default());

var defaultFactory = function defaultFactory(key, hook) {
  return hook;
};

var HookMap = /*#__PURE__*/function () {
  function HookMap(factory) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, HookMap);

    this._map = new Map();
    this.name = name;
    this._factory = factory;
    this._interceptors = [];
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(HookMap, [{
    key: "get",
    value: function get(key) {
      return this._map.get(key);
    }
  }, {
    key: "for",
    value: function _for(key) {
      var hook = this.get(key);

      if (hook !== undefined) {
        return hook;
      }

      var newHook = this._factory(key);

      var interceptors = this._interceptors;

      for (var i = 0; i < interceptors.length; i++) {
        newHook = interceptors[i].factory(key, newHook);
      }

      this._map.set(key, newHook);

      return newHook;
    }
  }, {
    key: "intercept",
    value: function intercept(interceptor) {
      this._interceptors.push(Object.assign({
        factory: defaultFactory
      }, interceptor));
    }
  }]);

  return HookMap;
}();

HookMap.prototype.tap = util.deprecate(function (key, options, fn) {
  return this.for(key).tap(options, fn);
}, "HookMap#tap(key,…) is deprecated. Use HookMap#for(key).tap(…) instead.");
HookMap.prototype.tapAsync = util.deprecate(function (key, options, fn) {
  return this.for(key).tapAsync(options, fn);
}, "HookMap#tapAsync(key,…) is deprecated. Use HookMap#for(key).tapAsync(…) instead.");
HookMap.prototype.tapPromise = util.deprecate(function (key, options, fn) {
  return this.for(key).tapPromise(options, fn);
}, "HookMap#tapPromise(key,…) is deprecated. Use HookMap#for(key).tapPromise(…) instead.");
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var SyncHook = SyncHook_1;
var SyncWaterfallHook = SyncWaterfallHook_1;
var AsyncSeriesWaterfallHook = AsyncSeriesWaterfallHook_1;
var Method;

(function (Method) {
  Method["connect"] = "CONNECT";
  Method["delete"] = "DELETE";
  Method["get"] = "GET";
  Method["head"] = "HEAD";
  Method["options"] = "OPTIONS";
  Method["patch"] = "PATCH";
  Method["post"] = "POST";
  Method["put"] = "PUT";
  Method["trace"] = "TRACE";
})(Method || (Method = {}));

var HTTPError =
/** @class */
function (_super) {
  __extends(HTTPError, _super);

  function HTTPError(response, request) {
    var _this = _super.call(this, "HTTP " + response.status + " Error: " + response.statusText) || this;

    _this.response = response;
    _this.request = request;
    _this.name = 'HTTPError';
    return _this;
  }

  return HTTPError;
}(Error);

var Str =
/** @class */
function () {
  function Str() {}

  Str.random = function (length) {
    if (length === void 0) {
      length = 15;
    }

    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  };

  Str.ensureLeft = function (str, left) {
    if (false === str.startsWith(left)) {
      return left + str;
    }

    return str;
  };

  Str.ensureRight = function (str, right) {
    if (false === str.endsWith(right)) {
      return str + right;
    }

    return str;
  };

  Str.stripLeft = function (str, left) {
    if (str.startsWith(left)) {
      return str.substr(left.length);
    }

    return str;
  };

  Str.stripRight = function (str, right) {
    if (str.endsWith(right)) {
      return str.substr(0, str.length - right.length);
    }

    return str;
  };

  Str.ucfirst = function (string) {
    return string[0].toUpperCase() + string.slice(1);
  };

  Str.lcfirst = function (string) {
    return string[0].toLowerCase() + string.slice(1);
  };

  Str.parameters = function (str, params) {
    Object.entries(params).forEach(function (_a) {
      var key = _a[0],
          value = _a[1];
      return str = str.replace(new RegExp(':' + key, 'g'), value);
    });
    return str;
  };

  return Str;
}();
/**
 *
 * @param obj
 * @param k
 * @param v
 * @example
 *
 * params = Object.entries(params).filter(([ key, value ]) => {
 *     return value.toString().length > 0;
 * }).reduce(utils.objectify, {});
 *
 */


var objectify = function objectify(obj, _a) {
  var _b;

  var k = _a[0],
      v = _a[1];
  return _assign(_assign({}, obj), (_b = {}, _b[k] = v, _b));
};

var camelcase$1 = {
  exports: {}
};

var preserveCamelCase = function preserveCamelCase(string, locale) {
  var isLastCharLower = false;
  var isLastCharUpper = false;
  var isLastLastCharUpper = false;

  for (var i = 0; i < string.length; i++) {
    var character = string[i];

    if (isLastCharLower && /(?:[A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1C90-\u1CBA\u1CBD-\u1CBF\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2F\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AE\uA7B0-\uA7B4\uA7B6\uA7B8\uA7BA\uA7BC\uA7BE\uA7C0\uA7C2\uA7C4-\uA7C7\uA7C9\uA7D0\uA7D6\uA7D8\uA7F5\uFF21-\uFF3A]|\uD801[\uDC00-\uDC27\uDCB0-\uDCD3\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95]|\uD803[\uDC80-\uDCB2]|\uD806[\uDCA0-\uDCBF]|\uD81B[\uDE40-\uDE5F]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]|\uD83A[\uDD00-\uDD21])/.test(character)) {
      string = string.slice(0, i) + '-' + string.slice(i);
      isLastCharLower = false;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = true;
      i++;
    } else if (isLastCharUpper && isLastLastCharUpper && /(?:[a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0560-\u0588\u10D0-\u10FA\u10FD-\u10FF\u13F8-\u13FD\u1C80-\u1C88\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5F\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7AF\uA7B5\uA7B7\uA7B9\uA7BB\uA7BD\uA7BF\uA7C1\uA7C3\uA7C8\uA7CA\uA7D1\uA7D3\uA7D5\uA7D7\uA7D9\uA7F6\uA7FA\uAB30-\uAB5A\uAB60-\uAB68\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A]|\uD801[\uDC28-\uDC4F\uDCD8-\uDCFB\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC]|\uD803[\uDCC0-\uDCF2]|\uD806[\uDCC0-\uDCDF]|\uD81B[\uDE60-\uDE7F]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]|\uD837[\uDF00-\uDF09\uDF0B-\uDF1E]|\uD83A[\uDD22-\uDD43])/.test(character)) {
      string = string.slice(0, i - 1) + '-' + string.slice(i - 1);
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = false;
      isLastCharLower = true;
    } else {
      isLastCharLower = character.toLocaleLowerCase(locale) === character && character.toLocaleUpperCase(locale) !== character;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = character.toLocaleUpperCase(locale) === character && character.toLocaleLowerCase(locale) !== character;
    }
  }

  return string;
};

var preserveConsecutiveUppercase = function preserveConsecutiveUppercase(input) {
  return input.replace(/^(?:[A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1C90-\u1CBA\u1CBD-\u1CBF\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2F\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AE\uA7B0-\uA7B4\uA7B6\uA7B8\uA7BA\uA7BC\uA7BE\uA7C0\uA7C2\uA7C4-\uA7C7\uA7C9\uA7D0\uA7D6\uA7D8\uA7F5\uFF21-\uFF3A]|\uD801[\uDC00-\uDC27\uDCB0-\uDCD3\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95]|\uD803[\uDC80-\uDCB2]|\uD806[\uDCA0-\uDCBF]|\uD81B[\uDE40-\uDE5F]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]|\uD83A[\uDD00-\uDD21])(?!(?:[A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1C90-\u1CBA\u1CBD-\u1CBF\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2F\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AE\uA7B0-\uA7B4\uA7B6\uA7B8\uA7BA\uA7BC\uA7BE\uA7C0\uA7C2\uA7C4-\uA7C7\uA7C9\uA7D0\uA7D6\uA7D8\uA7F5\uFF21-\uFF3A]|\uD801[\uDC00-\uDC27\uDCB0-\uDCD3\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95]|\uD803[\uDC80-\uDCB2]|\uD806[\uDCA0-\uDCBF]|\uD81B[\uDE40-\uDE5F]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]|\uD83A[\uDD00-\uDD21]))/g, function (m1) {
    return m1.toLowerCase();
  });
};

var postProcess = function postProcess(input, options) {
  return input.replace(/[ \x2D\._]+((?:[0-9A-Z_a-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0345\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05B0-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05EF-\u05F2\u0610-\u061A\u0620-\u0657\u0659-\u0669\u066E-\u06D3\u06D5-\u06DC\u06E1-\u06E8\u06ED-\u06FC\u06FF\u0710-\u073F\u074D-\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0817\u081A-\u082C\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u08D4-\u08DF\u08E3-\u08E9\u08F0-\u093B\u093D-\u094C\u094E-\u0950\u0955-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD-\u09C4\u09C7\u09C8\u09CB\u09CC\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3E-\u0A42\u0A47\u0A48\u0A4B\u0A4C\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD-\u0AC5\u0AC7-\u0AC9\u0ACB\u0ACC\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFC\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D-\u0B44\u0B47\u0B48\u0B4B\u0B4C\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71-\u0B77\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD0\u0BD7\u0BE6-\u0BF2\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4C\u0C55\u0C56\u0C58-\u0C5A\u0C5D\u0C60-\u0C63\u0C66-\u0C6F\u0C78-\u0C7E\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCC\u0CD5\u0CD6\u0CDD\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4C\u0D4E\u0D54-\u0D63\u0D66-\u0D78\u0D7A-\u0D7F\u0D81-\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E46\u0E4D\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F71-\u0F81\u0F88-\u0F97\u0F99-\u0FBC\u1000-\u1036\u1038\u103B-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1713\u171F-\u1733\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17B3\u17B6-\u17C8\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u1938\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A61-\u1A74\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1ABF\u1AC0\u1ACC-\u1ACE\u1B00-\u1B33\u1B35-\u1B43\u1B45-\u1B4C\u1B50-\u1B59\u1B80-\u1BA9\u1BAC-\u1BE5\u1BE7-\u1BF1\u1C00-\u1C36\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1DE7-\u1DF4\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2189\u2150-\u2182\u2460-\u249B\u24B6-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA674-\uA67B\uA67F-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA805\uA807-\uA827\uA830-\uA835\uA840-\uA873\uA880-\uA8C3\uA8C5\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD-\uA92A\uA930-\uA952\uA960-\uA97C\uA980-\uA9B2\uA9B4-\uA9BF\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAABE\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF5\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABEA\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD27\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEAB\uDEAC\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC00-\uDC45\uDC52-\uDC6F\uDC71-\uDC75\uDC82-\uDCB8\uDCC2\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD32\uDD36-\uDD3F\uDD44-\uDD47\uDD50-\uDD72\uDD76\uDD80-\uDDBF\uDDC1-\uDDC4\uDDCE-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE34\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEE8\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D-\uDF44\uDF47\uDF48\uDF4B\uDF4C\uDF50\uDF57\uDF5D-\uDF63]|\uD805[\uDC00-\uDC41\uDC43-\uDC45\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCC1\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDBE\uDDD8-\uDDDD\uDE00-\uDE3E\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB5\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF1D-\uDF2A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC38\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD35\uDD37\uDD38\uDD3B\uDD3C\uDD3F-\uDD42\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD7\uDDDA-\uDDDF\uDDE1\uDDE3\uDDE4\uDE00-\uDE32\uDE35-\uDE3E\uDE50-\uDE97\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC3E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD41\uDD43\uDD46\uDD47\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD8E\uDD90\uDD91\uDD93-\uDD96\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF6\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF4F-\uDF87\uDF8F-\uDF9F\uDFE0\uDFE1\uDFE3\uDFF0\uDFF1]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9E]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD47\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C\uDD30-\uDD49\uDD50-\uDD69\uDD70-\uDD89]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])|$)/g, function (_, p1) {
    return p1.toLocaleUpperCase(options.locale);
  }).replace(/[0-9]+((?:[0-9A-Z_a-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0345\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05B0-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05EF-\u05F2\u0610-\u061A\u0620-\u0657\u0659-\u0669\u066E-\u06D3\u06D5-\u06DC\u06E1-\u06E8\u06ED-\u06FC\u06FF\u0710-\u073F\u074D-\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0817\u081A-\u082C\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u08D4-\u08DF\u08E3-\u08E9\u08F0-\u093B\u093D-\u094C\u094E-\u0950\u0955-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD-\u09C4\u09C7\u09C8\u09CB\u09CC\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3E-\u0A42\u0A47\u0A48\u0A4B\u0A4C\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD-\u0AC5\u0AC7-\u0AC9\u0ACB\u0ACC\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFC\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D-\u0B44\u0B47\u0B48\u0B4B\u0B4C\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71-\u0B77\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD0\u0BD7\u0BE6-\u0BF2\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4C\u0C55\u0C56\u0C58-\u0C5A\u0C5D\u0C60-\u0C63\u0C66-\u0C6F\u0C78-\u0C7E\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCC\u0CD5\u0CD6\u0CDD\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4C\u0D4E\u0D54-\u0D63\u0D66-\u0D78\u0D7A-\u0D7F\u0D81-\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E46\u0E4D\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F71-\u0F81\u0F88-\u0F97\u0F99-\u0FBC\u1000-\u1036\u1038\u103B-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1713\u171F-\u1733\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17B3\u17B6-\u17C8\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u1938\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A61-\u1A74\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1ABF\u1AC0\u1ACC-\u1ACE\u1B00-\u1B33\u1B35-\u1B43\u1B45-\u1B4C\u1B50-\u1B59\u1B80-\u1BA9\u1BAC-\u1BE5\u1BE7-\u1BF1\u1C00-\u1C36\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1DE7-\u1DF4\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2189\u2150-\u2182\u2460-\u249B\u24B6-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA674-\uA67B\uA67F-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA805\uA807-\uA827\uA830-\uA835\uA840-\uA873\uA880-\uA8C3\uA8C5\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD-\uA92A\uA930-\uA952\uA960-\uA97C\uA980-\uA9B2\uA9B4-\uA9BF\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAABE\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF5\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABEA\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD27\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEAB\uDEAC\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC00-\uDC45\uDC52-\uDC6F\uDC71-\uDC75\uDC82-\uDCB8\uDCC2\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD32\uDD36-\uDD3F\uDD44-\uDD47\uDD50-\uDD72\uDD76\uDD80-\uDDBF\uDDC1-\uDDC4\uDDCE-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE34\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEE8\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D-\uDF44\uDF47\uDF48\uDF4B\uDF4C\uDF50\uDF57\uDF5D-\uDF63]|\uD805[\uDC00-\uDC41\uDC43-\uDC45\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCC1\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDBE\uDDD8-\uDDDD\uDE00-\uDE3E\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB5\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF1D-\uDF2A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC38\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD35\uDD37\uDD38\uDD3B\uDD3C\uDD3F-\uDD42\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD7\uDDDA-\uDDDF\uDDE1\uDDE3\uDDE4\uDE00-\uDE32\uDE35-\uDE3E\uDE50-\uDE97\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC3E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD41\uDD43\uDD46\uDD47\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD8E\uDD90\uDD91\uDD93-\uDD96\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF6\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF4F-\uDF87\uDF8F-\uDF9F\uDFE0\uDFE1\uDFE3\uDFF0\uDFF1]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9E]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD47\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C\uDD30-\uDD49\uDD50-\uDD69\uDD70-\uDD89]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])|$)/g, function (m) {
    return m.toLocaleUpperCase(options.locale);
  });
};

var camelCase = function camelCase(input, options) {
  if (!(typeof input === 'string' || Array.isArray(input))) {
    throw new TypeError('Expected the input to be `string | string[]`');
  }

  options = _objectSpread({
    pascalCase: false,
    preserveConsecutiveUppercase: false
  }, options);

  if (Array.isArray(input)) {
    input = input.map(function (x) {
      return x.trim();
    }).filter(function (x) {
      return x.length;
    }).join('-');
  } else {
    input = input.trim();
  }

  if (input.length === 0) {
    return '';
  }

  if (input.length === 1) {
    return options.pascalCase ? input.toLocaleUpperCase(options.locale) : input.toLocaleLowerCase(options.locale);
  }

  var hasUpperCase = input !== input.toLocaleLowerCase(options.locale);

  if (hasUpperCase) {
    input = preserveCamelCase(input, options.locale);
  }

  input = input.replace(/^[_.\- ]+/, '');

  if (options.preserveConsecutiveUppercase) {
    input = preserveConsecutiveUppercase(input);
  } else {
    input = input.toLocaleLowerCase();
  }

  if (options.pascalCase) {
    input = input.charAt(0).toLocaleUpperCase(options.locale) + input.slice(1);
  }

  return postProcess(input, options);
};

camelcase$1.exports = camelCase; // TODO: Remove this for the next major release

camelcase$1.exports.default = camelCase;
var camelcase = camelcase$1.exports;

function transformResponse(response) {
  var transformed = response.clone();
  Object.defineProperty(transformed, 'headers', {
    value: {}
  });
  var headerEntries = Array.from(response.headers['entries']());
  Object.entries(cjs.all([headerEntries.map(function (_a) {
    var key = _a[0],
        value = _a[1];
    return [camelcase(key), value];
  }).reduce(objectify, {}), headerEntries.map(function (_a) {
    var key = _a[0],
        value = _a[1];
    return [key.split('-').map(function (seg) {
      return Str.ucfirst(seg);
    }).join('-'), value];
  }).reduce(objectify, {}), headerEntries.reduce(objectify, {})])).forEach(function (_a) {
    var key = _a[0],
        value = _a[1];
    transformed.headers[key] = value;
    transformed.headers.set(key, value);
  });
  return transformed;
}

var Client =
/** @class */
function () {
  function Client(config) {
    this.hooks = {
      createRequest: new SyncWaterfallHook(['factory']),
      request: new SyncWaterfallHook(['request']),
      response: new AsyncSeriesWaterfallHook(['response', 'request'])
    };
    this.config = cjs({
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      request: {
        method: 'GET',
        credentials: 'include'
      }
    }, config);
  }

  Client.prototype.request = function (method, uri, config) {
    if (config === void 0) {
      config = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      var request, res, response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            request = this.createRequest(method, uri, config);
            request = this.hooks.request.call(request);
            return [4
            /*yield*/
            , fetch(request)];

          case 1:
            res = _a.sent();
            response = transformResponse(res);
            return [4
            /*yield*/
            , this.hooks.response.promise(response, request)];

          case 2:
            response = _a.sent();

            if (!response.ok) {
              throw new HTTPError(response, request);
            }

            return [2
            /*return*/
            , response];
        }
      });
    });
  };

  Client.prototype.createRequest = function (method, uri, config) {
    if (config === void 0) {
      config = {};
    }

    var factory = this.createRequestFactory(method, uri, config);
    factory.headers(this.config.headers);
    factory = this.hooks.createRequest.call(factory);
    return factory.make();
  };

  Client.prototype.createRequestFactory = function (method, uri, config) {
    if (config === void 0) {
      config = {};
    }

    config = this.getRequestConfig(config);
    config.method = Method[method];
    config.url = uri;
    return createRequestFactory(this.config).merge(config);
  };

  Client.prototype.getRequestConfig = function (config) {
    if (config === void 0) {
      config = {};
    }

    return cjs(this.config.request, config, {
      clone: true
    });
  };

  return Client;
}();

var RequestFactory =
/** @class */
function () {
  function RequestFactory(_clientConfig, _Request) {
    this._clientConfig = _clientConfig;
    this._Request = _Request;
    this._config = {};
    this._params = new URLSearchParams();
    this._headers = new Headers();
    return new Proxy(this, {
      get: function get(target, p, receiver) {
        if (Reflect.has(target, p)) {
          return Reflect.get(target, p, receiver);
        } //@formatter:on


        return function (value) {
          target._config[p] = value;
          return target;
        };
      },
      set: function set(target, p, value, receiver) {
        if (typeof target[p] === 'function') {
          return target[p](value);
        }

        return Reflect.set(target, p, value, receiver);
      }
    });
  }

  RequestFactory.prototype.merge = function (config) {
    var _this = this;

    Object.entries(config).forEach(function (_a) {
      var key = _a[0],
          value = _a[1];
      return _this[key](value);
    });
    return this;
  };

  RequestFactory.prototype.getConfig = function () {
    return _assign(_assign({}, this._config), {
      headers: this._headers,
      params: this._params,
      url: this._config.url ? this.getUri(this._config.url) : this._config.url
    });
  };

  RequestFactory.prototype.header = function (name, value) {
    this._headers.set(name, value);

    return this;
  };

  RequestFactory.prototype.param = function (name, value) {
    this._headers.set(name, value);

    return this;
  };

  RequestFactory.prototype.headers = function (headers) {
    mergeHeaders(headers, this._headers);
    return this;
  };

  RequestFactory.prototype.params = function (params) {
    mergeURLSearchParams(params, this._params);
    return this;
  };

  RequestFactory.prototype.data = function (value) {
    this._headers.set('Content-Type', 'application/json');

    this._config.body = JSON.stringify(value);
    return this;
  };

  RequestFactory.prototype.getUri = function (uri) {
    var params = this._params.toString();

    if (params.length) {
      params = '?' + params;
    }

    return Str.ensureRight(this._clientConfig.baseURL, '/') + Str.stripLeft(uri, '/') + params;
  };

  RequestFactory.prototype.basic = function (username, password) {
    return this.authorization('Basic', btoa(username + ':' + password));
  };

  RequestFactory.prototype.bearer = function (token) {
    return this.authorization('Bearer', token);
  };

  RequestFactory.prototype.authorization = function (key, value) {
    this._headers.set('Authorization', key + ' ' + value);

    return this;
  };

  RequestFactory.prototype.make = function () {
    var config = this.getConfig();
    return new this._Request(config.url, config);
  };

  return RequestFactory;
}();

function createRequestFactory(clientConfig, _Request) {
  if (_Request === void 0) {
    _Request = Request;
  }

  return new RequestFactory(clientConfig, _Request);
}

function mergeHeaders(source, destination) {
  new Headers(source).forEach(function (value, key) {
    return destination.set(key, value);
  });
  return destination;
}

function mergeURLSearchParams(source, destination) {
  new URLSearchParams(source).forEach(function (value, key) {
    return destination.set(key, value);
  });
  return destination;
}

var Collection =
/** @class */
function (_super) {
  __extends(Collection, _super);
  /**
   * Create a new collection instance.
   *
   * @param items
   */


  function Collection() {
    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    var _this = _super.apply(this, items) || this;

    Object.setPrototypeOf(_this, Array.prototype);
    return _this;
  }

  return Collection;
}(Array);

var Entry =
/** @class */
function () {
  function Entry(_stream, _data, _fresh) {
    if (_data === void 0) {
      _data = {};
    }

    if (_fresh === void 0) {
      _fresh = true;
    }

    this._stream = _stream;
    this._data = _data;
    this._fresh = _fresh;
    var proxy = new Proxy(this, {
      get: function get(target, p, receiver) {
        if (Reflect.has(target, p)) {
          return Reflect.get(target, p, receiver);
        }

        if (Reflect.has(target._data, p)) {
          return Reflect.get(target._data, p);
        }
      },
      set: function set(target, p, value, receiver) {
        if (Reflect.has(target, p)) {
          return Reflect.set(target, p, value, receiver);
        }

        return Reflect.set(target._data, p, value);
      }
    });
    return proxy;
  }

  Object.defineProperty(Entry.prototype, "http", {
    get: function get() {
      return this._stream.streams.http;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Entry.prototype, "stream", {
    get: function get() {
      return this._stream;
    },
    enumerable: false,
    configurable: true
  });

  Entry.prototype.save = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 4,, 5]);

            if (!this._fresh) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , this.http.postEntry(this._stream.id, this._data)];

          case 1:
            _a.sent();

            return [2
            /*return*/
            , true];

          case 2:
            return [4
            /*yield*/
            , this.http.patchEntry(this._stream.id, this._data.id, this._data)];

          case 3:
            _a.sent();

            return [2
            /*return*/
            , true];

          case 4:
            _a.sent();

            return [2
            /*return*/
            , false];

          case 5:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  Entry.prototype.validator = function () {};

  return Entry;
}();

var EntryCollection =
/** @class */
function (_super) {
  __extends(EntryCollection, _super);

  function EntryCollection(entries, meta, links) {
    var _this = _super.apply(this, entries) || this;

    _this.meta = meta;
    _this.links = links;
    return _this;
  }

  EntryCollection.fromResponse = function (response, stream) {
    var entries = Object.values(response.data).map(function (entry) {
      return new Entry(stream, entry, false);
    });
    return new EntryCollection(entries, response.meta, response.links);
  };

  return EntryCollection;
}(Collection);

var PaginatedEntryCollection =
/** @class */
function (_super) {
  __extends(PaginatedEntryCollection, _super);

  function PaginatedEntryCollection(entries, meta, links) {
    var _this = _super.apply(this, entries) || this;

    _this.meta = meta;
    _this.links = links;
    return _this;
  }

  PaginatedEntryCollection.fromResponse = function (response, stream) {
    var entries = Object.values(response.data).map(function (entry) {
      return new Entry(stream, entry, false);
    });
    return new PaginatedEntryCollection(entries, response.meta, response.links);
  };

  return PaginatedEntryCollection;
}(Collection);

var comparisonOperators = ['>', '<', '==', '!=', '>=', '<=', '!<', '!>', '<>'];
var logicalOperators = ['BETWEEN', 'EXISTS', 'OR', 'AND', 'NOT', 'IN', 'ALL', 'ANY', 'LIKE', 'IS NULL', 'UNIQUE'];
var operators = [].concat(comparisonOperators).concat(logicalOperators);

var isOperator = function isOperator(value) {
  return operators.includes(value);
};

var ensureArray = function ensureArray(value) {
  return Array.isArray(value) ? value : [value];
};

var Criteria =
/** @class */
function () {
  /**
   * Create a new instance.
   *
   * @param stream
   */
  function Criteria(stream) {
    this.stream = stream;
    this.parameters = [];
  }

  Object.defineProperty(Criteria.prototype, "http", {
    get: function get() {
      return this.stream.streams.http;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Find an entry by ID.
   *
   * @param id
   * @returns
   */

  Criteria.prototype.find = function (id) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.where('id', id).first()];
      });
    });
  };
  /**
   * Return the first result.
   *
   * @returns
   */


  Criteria.prototype.first = function () {
    return __awaiter(this, void 0, void 0, function () {
      var collection;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.limit(1).get()];

          case 1:
            collection = _a.sent();
            return [2
            /*return*/
            , collection[0]];
        }
      });
    });
  };

  Criteria.prototype.cache = function () {
    return this;
  };
  /**
   * Order the query by field/direction.
   *
   * @param key
   * @param direction
   * @returns
   */


  Criteria.prototype.orderBy = function (key, direction) {
    if (direction === void 0) {
      direction = 'desc';
    }

    this.addParameter('orderBy', [key, direction]);
    return this;
  };
  /**
   * Limit the entries returned.
   *
   * @param value
   * @returns
   */


  Criteria.prototype.limit = function (value) {
    this.addParameter('limit', value);
    return this;
  };

  Criteria.prototype.where = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var key, operator, value, nested;

    if (args.length === 2) {
      key = args[0];
      operator = '==';
      value = args[1];
    } else if (args.length === 3) {
      key = args[0];
      operator = args[1];
      value = args[2];
    } else if (args.length === 4) {
      key = args[0];
      operator = args[1];
      value = args[2];
      nested = args[3];
    }

    if (!isOperator(operator)) {
      throw new Error("Criteria where() operator \"" + operator + "\" not valid ");
    }

    this.addParameter('where', [key, operator, value, nested]);
    return this;
  };

  Criteria.prototype.orWhere = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var key, operator, value;

    if (args.length === 2) {
      key = args[0];
      operator = '==';
      value = args[1];
    } else {
      key = args[0];
      operator = args[1];
      value = args[2];
    }

    if (!isOperator(operator)) {
      throw new Error("Criteria orWhere() operator \"" + operator + "\" not valid ");
    }

    this.addParameter('where', [key, operator, value, 'or']);
    return this;
  };
  /**
   * Get the criteria results.
   *
   * @returns
   */


  Criteria.prototype.get = function () {
    return __awaiter(this, void 0, void 0, function () {
      var query, response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            query = this.compileStatements();
            return [4
            /*yield*/
            , this.http.getEntries(this.stream.id, {
              query: query
            }, {})];

          case 1:
            response = _a.sent();
            return [2
            /*return*/
            , EntryCollection.fromResponse(response, this.stream)];
        }
      });
    });
  }; //count(): number { return 0; }

  /**
   * Create a new entry.
   *
   * @param attributes
   * @returns
   */


  Criteria.prototype.create = function (attributes) {
    return __awaiter(this, void 0, void 0, function () {
      var entry;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            entry = this.newInstance(attributes);
            return [4
            /*yield*/
            , entry.save()];

          case 1:
            _a.sent();

            return [2
            /*return*/
            , entry];
        }
      });
    });
  };
  /**
   * Save an entry.
   *
   * @param entry
   * @returns
   */


  Criteria.prototype.save = function (entry) {
    return __awaiter(this, void 0, void 0, function () {
      var result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , entry.save()];

          case 1:
            result = _a.sent();
            return [2
            /*return*/
            , result];
        }
      });
    });
  };

  Criteria.prototype.delete = function () {
    return this;
  }; //truncate(): this { return this; }

  /**
   * Get paginated criteria results.
   *
   * @param per_page
   * @param page
   * @returns
   */


  Criteria.prototype.paginate = function (per_page, page) {
    if (per_page === void 0) {
      per_page = 100;
    }

    if (page === void 0) {
      page = 1;
    }

    return __awaiter(this, void 0, void 0, function () {
      var query, response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            query = this.compileStatements();
            return [4
            /*yield*/
            , this.http.getEntries(this.stream.id, {
              query: query
            }, {
              paginate: true,
              per_page: per_page,
              page: page
            })];

          case 1:
            response = _a.sent();
            return [2
            /*return*/
            , PaginatedEntryCollection.fromResponse(response, this.stream)];
        }
      });
    });
  };
  /**
   * Return an entry instance.
   *
   * @param attributes
   * @returns Entry
   */


  Criteria.prototype.newInstance = function (attributes) {
    return new Entry(this.stream, attributes, true);
  };
  /**
   * Get the parameters.
   *
   * @returns
   */


  Criteria.prototype.getParameters = function () {
    return this.parameters;
  };
  /**
   * Set the parameters.
   *
   * @param parameters
   * @returns
   */


  Criteria.prototype.setParameters = function (parameters) {
    this.parameters = parameters;
    return this;
  };
  /**
   * Add a statement.
   *
   * @param name
   * @param value
   * @returns
   */


  Criteria.prototype.addParameter = function (name, value) {
    this.parameters.push({
      name: name,
      value: value
    });
    return this;
  };
  /**
   * Return standardized parameters.
   *
   * @returns
   */


  Criteria.prototype.compileStatements = function () {
    return this.parameters.map(function (statement) {
      var _a;

      return _a = {}, _a[statement.name] = ensureArray(statement.value), _a;
    });
  };

  return Criteria;
}();

var Field =
/** @class */
function () {
  function Field(field) {
    Object.assign(this, field);
  }

  return Field;
}();

var FieldCollection =
/** @class */
function (_super) {
  __extends(FieldCollection, _super);

  function FieldCollection() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return FieldCollection;
}(Collection);

var Http =
/** @class */
function () {
  function Http(streams) {
    this.streams = streams;
  }

  Object.defineProperty(Http.prototype, "client", {
    get: function get() {
      return this.streams.client;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Http.prototype, "config", {
    get: function get() {
      return this.streams.config;
    },
    enumerable: false,
    configurable: true
  });

  Http.prototype.getStreams = function (params, config) {
    if (params === void 0) {
      params = {};
    }

    if (config === void 0) {
      config = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        config.params = params;
        return [2
        /*return*/
        , this.get('/streams', config)];
      });
    });
  };

  Http.prototype.postStream = function (data, config) {
    if (config === void 0) {
      config = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.post('/streams', data, config)];
      });
    });
  };

  Http.prototype.getStream = function (stream, params, config) {
    if (params === void 0) {
      params = {};
    }

    if (config === void 0) {
      config = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            config.params = params;
            return [4
            /*yield*/
            , this.get("/streams/" + stream, config)];

          case 1:
            return [2
            /*return*/
            , _a.sent()];
        }
      });
    });
  };

  Http.prototype.patchStream = function (stream, data, config) {
    if (data === void 0) {
      data = {};
    }

    if (config === void 0) {
      config = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.patch("/streams/" + stream, data, config)];
      });
    });
  };

  Http.prototype.putStream = function (stream, data, config) {
    if (data === void 0) {
      data = {};
    }

    if (config === void 0) {
      config = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.put("/streams/" + stream, data, config)];
      });
    });
  };

  Http.prototype.deleteStream = function (stream, config) {
    if (config === void 0) {
      config = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.delete("/streams/" + stream, config)];
      });
    });
  };

  Http.prototype.getEntries = function (stream, data, params, config) {
    if (data === void 0) {
      data = {};
    }

    if (params === void 0) {
      params = {};
    }

    if (config === void 0) {
      config = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        config.body = data;
        config.params = params;
        return [2
        /*return*/
        , this.get("/streams/" + stream + "/entries", _assign(_assign({}, config), {
          headers: {
            'Content-Type': 'application/json'
          }
        }))];
      });
    });
  };

  Http.prototype.postEntry = function (stream, data, config) {
    if (data === void 0) {
      data = {};
    }

    if (config === void 0) {
      config = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.post("/streams/" + stream + "/entries", data, config)];
      });
    });
  };

  Http.prototype.getEntry = function (stream, entry, config) {
    if (config === void 0) {
      config = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.get("/streams/" + stream + "/entries/" + entry, config)];
      });
    });
  };

  Http.prototype.patchEntry = function (stream, entry, data, config) {
    if (data === void 0) {
      data = {};
    }

    if (config === void 0) {
      config = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.patch("/streams/" + stream + "/entries/" + entry, data, config)];
      });
    });
  };

  Http.prototype.putEntry = function (stream, entry, data, config) {
    if (data === void 0) {
      data = {};
    }

    if (config === void 0) {
      config = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.put("/streams/" + stream + "/entries/" + entry, data, config)];
      });
    });
  };

  Http.prototype.deleteEntry = function (stream, entry, config) {
    if (config === void 0) {
      config = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        Str.parameters('/streams/:stream/entries/:entry', {
          stream: stream,
          entry: entry
        });
        return [2
        /*return*/
        , this.patch("/streams/" + stream + "/entries/" + entry, config)];
      });
    });
  };

  Http.prototype.get = function (url, config) {
    if (config === void 0) {
      config = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.request('get', url, config)];
      });
    });
  };

  Http.prototype.delete = function (url, config) {
    if (config === void 0) {
      config = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.request('delete', url, config)];
      });
    });
  };

  Http.prototype.head = function (url, config) {
    if (config === void 0) {
      config = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.request('head', url, config)];
      });
    });
  };

  Http.prototype.options = function (url, config) {
    if (config === void 0) {
      config = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.request('options', url, config)];
      });
    });
  };

  Http.prototype.post = function (url, data, config) {
    if (config === void 0) {
      config = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.request('post', url, _assign({
          data: data
        }, config))];
      });
    });
  };

  Http.prototype.put = function (url, data, config) {
    if (config === void 0) {
      config = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.request('put', url, _assign({
          data: data
        }, config))];
      });
    });
  };

  Http.prototype.patch = function (url, data, config) {
    if (config === void 0) {
      config = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.request('patch', url, _assign({
          data: data
        }, config))];
      });
    });
  };

  Http.prototype.request = function (method, url, config) {
    return __awaiter(this, void 0, void 0, function () {
      var response, e_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2,, 3]);

            return [4
            /*yield*/
            , this.client.request(method, url, config)];

          case 1:
            response = _a.sent();
            return [2
            /*return*/
            , response];

          case 2:
            e_1 = _a.sent();
            throw e_1;

          case 3:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  return Http;
}();

var Repository =
/** @class */
function () {
  /**
   * Create a new repository instance.
   *
   * @param stream
   */
  function Repository(stream) {
    this.stream = stream;
  }

  Object.defineProperty(Repository.prototype, "http", {
    get: function get() {
      return this.stream.streams.http;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Return all items.
   *
   * @returns EntryCollection
   */

  Repository.prototype.all = function () {
    return __awaiter(this, void 0, void 0, function () {
      var response, entries;

      var _this = this;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.http.getEntries(this.stream.id)];

          case 1:
            response = _a.sent();
            entries = response.data.map(function (entry) {
              return new Entry(_this.stream, entry, false);
            });
            return [2
            /*return*/
            , new EntryCollection(entries, response.meta, response.links)];
        }
      });
    });
  };
  /**
   * Find an entry by ID.
   *
   * @param id
   * @returns Entry
   */


  Repository.prototype.find = function (id) {
    return __awaiter(this, void 0, void 0, function () {
      var criteria;
      return __generator(this, function (_a) {
        criteria = this.stream.entries();
        return [2
        /*return*/
        , criteria.where('id', id).first()];
      });
    });
  };
  /**
   * Find all records by IDs.
   *
   * @param ids
   * @returns EntryCollection
   */


  Repository.prototype.findAll = function (ids) {
    return __awaiter(this, void 0, void 0, function () {
      var criteria;
      return __generator(this, function (_a) {
        criteria = this.stream.entries();
        return [2
        /*return*/
        , criteria.where('id', 'IN', ids).get()];
      });
    });
  };
  /**
   * Find an entry by a field value.
   *
   * @param field
   * @param value
   * @returns Entry
   */


  Repository.prototype.findBy = function (field, value) {
    return __awaiter(this, void 0, void 0, function () {
      var criteria;
      return __generator(this, function (_a) {
        criteria = this.stream.entries();
        return [2
        /*return*/
        , criteria.where(field, value).first()];
      });
    });
  };
  /**
   * Find all entries by field value.
   *
   * @param $field
   * @param $operator
   * @param $value
   * @return EntryCollection
   */


  Repository.prototype.findAllWhere = function (field, value) {
    return __awaiter(this, void 0, void 0, function () {
      var criteria;
      return __generator(this, function (_a) {
        criteria = this.stream.entries();
        return [2
        /*return*/
        , criteria.where(field, value).get()];
      });
    });
  };
  /**
   * Create a new entry.
   *
   * @param attributes
   * @returns
   */


  Repository.prototype.create = function (attributes) {
    return __awaiter(this, void 0, void 0, function () {
      var entry;
      return __generator(this, function (_a) {
        entry = this.newCriteria().newInstance(attributes);
        return [2
        /*return*/
        , entry.save()];
      });
    });
  };
  /**
   * Save an entry.
   *
   * @param entry
   * @returns
   */


  Repository.prototype.save = function (entry) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , entry.save()];
      });
    });
  };
  /**
   * Save an entry.
   *
   * @param entry
   * @returns
   */


  Repository.prototype.delete = function (entry) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.http.deleteEntry(this.stream.id, entry.id)];

          case 1:
            _a.sent();

            return [2
            /*return*/
            , true];
        }
      });
    });
  };

  Repository.prototype.truncate = function () {
    return this;
  };
  /**
   * Return a new instance.
   *
   * @param attributes
   * @returns
   */


  Repository.prototype.newInstance = function (attributes) {
    return this.newCriteria().newInstance(attributes);
  };
  /**
   * Return a new entry criteria.
   *
   * @returns Criteria
   */


  Repository.prototype.newCriteria = function () {
    return new Criteria(this.stream);
  };

  return Repository;
}();

var Stream =
/** @class */
function () {
  function Stream(streams, stream, meta, links) {
    this.streams = streams;
    this.meta = meta;
    this.links = links;

    if (stream.fields) {
      this.fields = new Map(Object.entries(stream.fields).map(function (_a) {
        var key = _a[0],
            field = _a[1];
        return [key, new Field(field)];
      }));
      delete stream.fields;
    }

    Object.assign(this, stream);
  }

  Object.defineProperty(Stream.prototype, "repository", {
    /**
     * Return the entries repository.
     *
     * @returns Repository
     */
    get: function get() {
      if (!this._repository) {
        this._repository = new Repository(this);
      }

      return this._repository;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Return the entries criteria.
   *
   * @returns Criteria
   */

  Stream.prototype.entries = function () {
    return this.repository.newCriteria();
  };

  return Stream;
}();

var Streams =
/** @class */
function () {
  function Streams(config) {
    this.config = config;
    this.hooks = {
      all: new AsyncSeriesWaterfallHook(['data']),
      make: new AsyncSeriesWaterfallHook(['data']),
      maked: new SyncHook(['stream']),
      create: new AsyncSeriesWaterfallHook(['data']),
      created: new SyncHook(['stream'])
    };
    this.client = new config.Client(this.config);
    this.http = new config.Http(this);
  }
  /**
   * Return all streams.
   *
   * @returns
   */


  Streams.prototype.all = function () {
    return __awaiter(this, void 0, void 0, function () {
      var response, streams, _i, _a, data, stream;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4
            /*yield*/
            , this.http.getStreams()];

          case 1:
            response = _b.sent();
            streams = [];
            _i = 0, _a = response.data;
            _b.label = 2;

          case 2:
            if (!(_i < _a.length)) return [3
            /*break*/
            , 5];
            data = _a[_i];
            return [4
            /*yield*/
            , this.hooks.all.promise(data)];

          case 3:
            data = _b.sent();
            stream = new Stream(this, data);
            streams.push(stream);
            _b.label = 4;

          case 4:
            _i++;
            return [3
            /*break*/
            , 2];

          case 5:
            return [2
            /*return*/
            , streams];
        }
      });
    });
  };
  /**
   * Make a stream instance.
   *
   * @param id
   * @returns
   */


  Streams.prototype.make = function (id) {
    return __awaiter(this, void 0, void 0, function () {
      var response, stream;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.http.getStream(id)];

          case 1:
            response = _a.sent();
            return [4
            /*yield*/
            , this.hooks.make.promise(response.data)];

          case 2:
            _a.sent();

            stream = new Stream(this, response.data, response.meta, response.links);
            this.hooks.maked.call(stream);
            return [2
            /*return*/
            , stream];
        }
      });
    });
  };

  Streams.prototype.create = function (id, streamData) {
    return __awaiter(this, void 0, void 0, function () {
      var response, stream;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.http.postStream(_assign({
              id: id,
              name: id
            }, streamData))];

          case 1:
            response = _a.sent();
            return [4
            /*yield*/
            , this.hooks.create.promise(response.data)];

          case 2:
            _a.sent();

            stream = new Stream(this, response.data, response.meta, response.links);
            this.hooks.created.call(stream);
            return [2
            /*return*/
            , stream];
        }
      });
    });
  };

  Streams.prototype.entries = function (id) {
    return __awaiter(this, void 0, void 0, function () {
      var stream;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.make(id)];

          case 1:
            stream = _a.sent();
            return [2
            /*return*/
            , new Criteria(stream)];
        }
      });
    });
  };
  /**
   * Return an entry repository.
   *
   * @param id
   * @returns
   */


  Streams.prototype.repository = function (id) {
    return __awaiter(this, void 0, void 0, function () {
      var stream;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.make(id)];

          case 1:
            stream = _a.sent();
            return [2
            /*return*/
            , new Repository(stream)];
        }
      });
    });
  };
  /**
   * Return the Streams collection.
   */


  Streams.prototype.collection = function () {// return this._collection
  };

  return Streams;
}();



/***/ }),

/***/ "../../../node_modules/process/browser.js":
/*!************************************************!*\
  !*** ../../../node_modules/process/browser.js ***!
  \************************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "../../../node_modules/tslib/tslib.es6.js":
/*!************************************************!*\
  !*** ../../../node_modules/tslib/tslib.es6.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__extends": () => (/* binding */ __extends),
/* harmony export */   "__assign": () => (/* binding */ __assign),
/* harmony export */   "__rest": () => (/* binding */ __rest),
/* harmony export */   "__decorate": () => (/* binding */ __decorate),
/* harmony export */   "__param": () => (/* binding */ __param),
/* harmony export */   "__metadata": () => (/* binding */ __metadata),
/* harmony export */   "__awaiter": () => (/* binding */ __awaiter),
/* harmony export */   "__generator": () => (/* binding */ __generator),
/* harmony export */   "__createBinding": () => (/* binding */ __createBinding),
/* harmony export */   "__exportStar": () => (/* binding */ __exportStar),
/* harmony export */   "__values": () => (/* binding */ __values),
/* harmony export */   "__read": () => (/* binding */ __read),
/* harmony export */   "__spread": () => (/* binding */ __spread),
/* harmony export */   "__spreadArrays": () => (/* binding */ __spreadArrays),
/* harmony export */   "__spreadArray": () => (/* binding */ __spreadArray),
/* harmony export */   "__await": () => (/* binding */ __await),
/* harmony export */   "__asyncGenerator": () => (/* binding */ __asyncGenerator),
/* harmony export */   "__asyncDelegator": () => (/* binding */ __asyncDelegator),
/* harmony export */   "__asyncValues": () => (/* binding */ __asyncValues),
/* harmony export */   "__makeTemplateObject": () => (/* binding */ __makeTemplateObject),
/* harmony export */   "__importStar": () => (/* binding */ __importStar),
/* harmony export */   "__importDefault": () => (/* binding */ __importDefault),
/* harmony export */   "__classPrivateFieldGet": () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   "__classPrivateFieldSet": () => (/* binding */ __classPrivateFieldSet)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}


/***/ }),

/***/ "../../../node_modules/util/node_modules/inherits/inherits_browser.js":
/*!****************************************************************************!*\
  !*** ../../../node_modules/util/node_modules/inherits/inherits_browser.js ***!
  \****************************************************************************/
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ "../../../node_modules/util/support/isBufferBrowser.js":
/*!*************************************************************!*\
  !*** ../../../node_modules/util/support/isBufferBrowser.js ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "../../../node_modules/util/util.js":
/*!******************************************!*\
  !*** ../../../node_modules/util/util.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "../../../node_modules/process/browser.js");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(__webpack_require__.g.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "../../../node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "../../../node_modules/util/node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}


/***/ }),

/***/ "@laravel-streams/core":
/*!***********************************!*\
  !*** external ["streams","core"] ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = window["streams"]["core"];

/***/ }),

/***/ "../../../node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!*********************************************************************************!*\
  !*** ../../../node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _assertThisInitialized)
/* harmony export */ });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),

/***/ "../../../node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!**************************************************************************!*\
  !*** ../../../node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "../../../node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!***********************************************************************!*\
  !*** ../../../node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/***/ }),

/***/ "../../../node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!**************************************************************************!*\
  !*** ../../../node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "../../../node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js":
/*!**************************************************************************!*\
  !*** ../../../node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _getPrototypeOf)
/* harmony export */ });
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),

/***/ "../../../node_modules/@babel/runtime/helpers/esm/inherits.js":
/*!********************************************************************!*\
  !*** ../../../node_modules/@babel/runtime/helpers/esm/inherits.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inherits)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "../../../node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "../../../node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js":
/*!*************************************************************************************!*\
  !*** ../../../node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _possibleConstructorReturn)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "../../../node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized.js */ "../../../node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");


function _possibleConstructorReturn(self, call) {
  if (call && ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return (0,_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__["default"])(self);
}

/***/ }),

/***/ "../../../node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!**************************************************************************!*\
  !*** ../../../node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "../../../node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!******************************************************************!*\
  !*** ../../../node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!********************************!*\
  !*** ./resources/lib/index.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiServiceProvider": () => (/* reexport safe */ _ApiServiceProvider__WEBPACK_IMPORTED_MODULE_0__.ApiServiceProvider),
/* harmony export */   "ETag": () => (/* reexport safe */ _ETag__WEBPACK_IMPORTED_MODULE_1__.ETag),
/* harmony export */   "ETagCache": () => (/* reexport safe */ _ETagCache__WEBPACK_IMPORTED_MODULE_2__.ETagCache)
/* harmony export */ });
/* harmony import */ var _ApiServiceProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ApiServiceProvider */ "./resources/lib/ApiServiceProvider.ts");
/* harmony import */ var _ETag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ETag */ "./resources/lib/ETag.ts");
/* harmony import */ var _ETagCache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ETagCache */ "./resources/lib/ETagCache.ts");



})();

(window.streams = window.streams || {}).api = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFEQTtBQU5BO0FBREE7QUFhQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQVRBO0FBQUE7QUFBQTtBQVlBO0FBQ0E7QUFiQTtBQUFBO0FBQUE7QUFnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQXpCQTs7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCQTs7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTs7QUFHQTtBQVVBO0FBQUE7O0FBQUE7QUFSQTtBQUNBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQWhCQTtBQUFBO0FBQUE7QUFPQTtBQUNBO0FBUkE7QUFBQTtBQUFBO0FBbUJBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUF6QkE7QUFBQTtBQUFBO0FBMkJBOztBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQWhDQTtBQUFBO0FBQUE7QUFrQ0E7QUFsQ0E7O0FBQUE7QUFBQTtBQUFBO0FBc0NBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQVJBO0FBVUE7QUFqREE7QUFBQTtBQUFBO0FBbURBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBYkE7QUFlQTtBQW5FQTs7QUFBQTtBQUFBOztBQUNBOztBQURBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaQTs7QUFRQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUFBO0FBSkE7QUFBQTtBQUFBO0FBT0E7QUFDQTtBQVJBO0FBQUE7QUFBQTtBQVdBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQWJBO0FBQUE7QUFBQTtBQWVBOztBQUNBO0FBQUE7QUFBQTtBQUNBO0FBakJBO0FBQUE7QUFBQTtBQW9CQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQXhCQTtBQUFBO0FBQUE7QUEyQkE7QUFDQTtBQUNBO0FBQ0E7QUE5QkE7O0FBQUE7QUFBQTs7QUFDQTs7QUFDQTs7QUFGQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBOztBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFBQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBWkE7O0FBZUE7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTtBQUVBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBRUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUNBOztBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUVBOzs7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFFQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQVBBO0FBU0E7QUFFQTs7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFOQTs7QUFRQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFDQTtBQUNBO0FBRUE7OztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFDQTtBQUNBO0FBRUE7OztBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFLQTtBQUVBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUhBO0FBS0E7QUFFQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBOzs7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7O0FBR0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7O0FBR0E7O0FBR0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBSEE7O0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFBQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUEvREE7O0FBZ0VBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUhBOztBQUtBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBOztBQUNBO0FBQ0E7QUFuQkE7QUFvQkE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUExQkE7O0FBMkJBO0FBQ0E7O0FBQ0E7QUFDQTtBQURBOztBQUdBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFDQTs7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQURBOztBQUVBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxbUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFDQTtBQUFBO0FBQUE7O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUFBO0FBQUE7QUFDQTs7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBNkJBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFDQTs7QUFDQTtBQUFBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7O0FBQUE7O0FBQUE7O0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFDQTs7QUFDQTs7QUFBQTtBQVhBOztBQWFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBakJBOztBQWtCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7QUN2R0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBRUE7QUFHQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFFQTs7Ozs7O0FDOUhBO0FBRUE7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBQUE7O0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFBQTs7QUFBQTtBQUNBO0FBQUE7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFTQTtBQUNBOzs7QUFFQTtBQUFBOztBQUNBO0FBQUE7QUFDQTtBQUFBO0FBREE7O0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQVBBO0FBU0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTs7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7Ozs7O0FBR0E7QUFFQTs7Ozs7O0FDeEtBO0FBQ0E7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUVBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBTEE7QUFRQTs7QUFDQTtBQUNBO0FBRUE7QUFEQTtBQU1BO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUhBO0FBTUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFOQTtBQVFBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBM0RBOztBQTZEQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTs7QUFDQTtBQUVBO0FBR0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTs7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQXZDQTtBQTBDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUFBOztBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUVBO0FBQ0E7OztBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUdBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF4RUE7O0FBMEVBO0FBQ0E7OztBQUVBO0FBT0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFOQTtBQVFBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUFBO0FBQUE7QUFDQTs7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTs7QUFXQTtBQUFBO0FBQUE7QUFuQ0E7O0FBT0E7QUFBQTtBQTZCQTs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdEJBO0FBd0JBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7O0FBRUE7QUFNQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBaEJBO0FBa0JBO0FBQ0E7QUFFQTs7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBdEJBO0FBREE7QUE3QkE7O0FBaUJBO0FBQUE7QUF3Q0E7O0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7QUFHQTs7Ozs7O0FDN2NBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7Ozs7QUFQQTs7QUFVQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBRUE7Ozs7OztBQ3RDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBSUE7QUFDQTtBQUNBO0FBUkE7QUFVQTs7OztBQVpBOztBQWVBOzs7Ozs7QUNsQkE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQUNBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBWkE7QUFjQTs7OztBQWhCQTs7QUFtQkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBRUE7Ozs7OztBQ2pEQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBSEE7QUFLQTs7OztBQVBBOztBQVVBOzs7Ozs7QUNaQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFGQTtBQUlBOzs7O0FBTkE7O0FBU0E7Ozs7OztBQ1hBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWhDQTtBQWtDQTtBQUNBOzs7O0FBdERBOztBQXlEQTs7Ozs7O0FDM0RBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUZBO0FBSUE7Ozs7QUFOQTs7QUFTQTs7Ozs7O0FDWEE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFJQTtBQUNBO0FBUEE7QUFTQTs7OztBQVhBOztBQWNBOzs7Ozs7QUNoQkE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBRkE7QUFJQTs7OztBQU5BOztBQVNBOzs7Ozs7QUNaQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FBQ0E7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFWQTtBQVlBOzs7O0FBZEE7O0FBaUJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFFQTs7Ozs7O0FDeENBOztBQUVBO0FBQUE7QUFBQTs7QUFFQTtBQUNBO0FBQUE7O0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUNBOztBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFHQTtBQURBO0FBTUE7Ozs7OztBQUdBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7Ozs7O0FDbkRBO0FBRUE7QUFPQTtBQ1JBOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDakJBOztBQUNBO0FBQUE7O0FBQUE7QUFBQTtBQUVBOztBQUNBOztBQUNBO0FBTEE7Ozs7O0FDREE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBWUE7OztBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFGQTs7QUFNQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7O0FDM0VBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7Ozs7QUFVQTtBQVBBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFRQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUZBO0FBSkE7QUFTQTs7QUFHQTtBQUFBO0FBQUE7QUFBQTs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7OztBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7OztBQUFBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUFBO0FBQUE7Ozs7QUFDQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7O0FBRUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQ0E7O0FBQ0E7QUFBQTs7Ozs7QUFjQTtBQUFBO0FBQUE7QUFKQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFFQTtBQWpCQTtBQW1CQTs7QUFFQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQUtBOztBQUVBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUFBOztBQUVBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7Ozs7QUN4TUE7Ozs7Ozs7O0FBT0E7QUFBQTs7QUFBQTtBQUFBOzs7QUFBQTs7QUFJQTs7QUFDQTs7QUFDQTtBQWJBOzs7OztBQ1lBO0FBRUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTs7QUFGQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7O0FBeEJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUEwQkE7QUFBQTtBQUNBO0FBQ0E7QUFGQTs7QUFBQTs7QUFJQTs7Ozs7OztBQUVBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTs7O0FBQUE7O0FBQ0E7QUFBQTtBQUFBOzs7QUFFQTtBQUFBO0FBQUE7OztBQUFBOztBQUNBO0FBQUE7QUFBQTs7Ozs7QUFFQTtBQUFBO0FBQUE7Ozs7Ozs7OztBQUVBOztBQUVBOztBQUlBO0FBQUE7Ozs7O0FDckNBOztBQUNBO0FBQUE7O0FBQUE7QUFBQTs7QUFFQTs7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBQ0E7QUFUQTs7Ozs7QUFXQTs7QUFDQTtBQUFBOztBQUFBO0FBQUE7O0FBRUE7O0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUNBO0FBVEE7O0FDVkE7QUFlQTtBQUVBOztBQU1BO0FBQUE7QUFBQTs7QUFFQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7QUFpQkE7QUFBQTtBQVBBO0FBT0E7O0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7Ozs7Ozs7QUFRQTs7O0FBQ0E7QUFBQTtBQUFBOzs7QUFDQTs7Ozs7Ozs7QUFPQTs7Ozs7O0FBRUE7QUFBQTtBQUFBOzs7QUFBQTtBQUVBO0FBQUE7QUFBQTs7OztBQUNBOztBQUVBO0FBQUE7QUFBQTs7Ozs7Ozs7OztBQVNBO0FBQUE7QUFBQTtBQUFBOztBQUVBO0FBRUE7QUFDQTs7Ozs7Ozs7O0FBUUE7QUFFQTtBQUVBO0FBQ0E7O0FBWUE7QUFBQTs7QUFBQTtBQUFBOzs7QUFFQTs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUVBO0FBQ0E7O0FBSUE7QUFBQTs7QUFBQTtBQUFBOzs7QUFFQTs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBRUE7QUFDQTs7Ozs7Ozs7QUFPQTs7Ozs7O0FBRUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUFBQTtBQUVBO0FBQUE7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7O0FBVUE7Ozs7OztBQUVBO0FBRUE7QUFBQTtBQUFBOzs7QUFBQTs7QUFFQTtBQUFBO0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7O0FBUUE7Ozs7OztBQUVBO0FBQUE7QUFBQTs7O0FBQUE7QUFFQTtBQUFBO0FBQUE7Ozs7QUFDQTs7QUFFQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7O0FBV0E7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOzs7Ozs7O0FBRUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQUFBO0FBRUE7QUFBQTtBQUFBOzs7O0FBQ0E7Ozs7Ozs7OztBQVFBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQVFBO0FBRUE7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FBU0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7Ozs7Ozs7O0FBT0E7QUFDQTs7O0FBQUE7QUFBQTtBQUNBOztBQUNBO0FBQUE7Ozs7O0FDclNBO0FBQ0E7QUFDQTs7QUFDQTtBQUFBOzs7OztBQ1hBOztBQUFBOztBQUNBOztBQUFBO0FBREE7Ozs7O0FDS0E7QUFBQTtBQUFBOztBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUVBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7OztBQUNBO0FBQ0E7QUFBQTtBQUFBOzs7QUFDQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTs7OztBQUNBO0FBQUE7QUFBQTs7O0FBQ0E7O0FBRUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOzs7Ozs7QUFDQTtBQUNBO0FBQUE7QUFBQTs7O0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7O0FBRUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBOzs7QUFDQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7Ozs7QUFDQTtBQUFBO0FBQUE7OztBQUNBOztBQUVBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBOzs7QUFDQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFEQTtBQURBOzs7QUFLQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7Ozs7QUFDQTtBQUFBO0FBQUE7OztBQUNBOztBQUdBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBOzs7QUFDQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7Ozs7QUFDQTtBQUFBO0FBQUE7OztBQUNBOztBQUVBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7OztBQUNBO0FBQUE7QUFBQTs7O0FBQ0E7O0FBRUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTs7O0FBQ0E7O0FBRUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFBQTtBQUFBO0FBQUE7OztBQUFBOztBQUVBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQUE7QUFBQTtBQUFBOzs7QUFBQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTs7OztBQUFBO0FBQUE7QUFBQTs7O0FBQUE7O0FBRUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFBQTtBQUFBO0FBQUE7OztBQUFBOztBQUVBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FBQUE7O0FBRUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUFBQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQUFBOztBQUVBOzs7Ozs7OztBQUVBO0FBQUE7QUFBQTs7O0FBQUE7QUFDQTtBQUFBO0FBQUE7Ozs7QUFFQTs7Ozs7Ozs7O0FBRUE7O0FBRUE7QUFBQTs7Ozs7Ozs7OztBQ25GQTtBQUFBO0FBQUE7O0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTs7QUFBQTs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFFQTtBQUFBO0FBQUE7OztBQUFBO0FBRUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBOzs7O0FBQ0E7Ozs7Ozs7OztBQVFBOzs7O0FBRUE7QUFFQTtBQUFBO0FBQUE7OztBQUNBOzs7Ozs7Ozs7QUFRQTs7OztBQUVBO0FBRUE7QUFBQTtBQUFBOzs7QUFDQTs7Ozs7Ozs7OztBQVNBOzs7O0FBRUE7QUFFQTtBQUFBO0FBQUE7OztBQUNBOzs7Ozs7Ozs7OztBQVVBOzs7O0FBRUE7QUFFQTtBQUFBO0FBQUE7OztBQUNBOzs7Ozs7Ozs7QUFRQTs7OztBQUVBO0FBRUE7QUFBQTtBQUFBOzs7QUFDQTs7Ozs7Ozs7O0FBUUE7OztBQUVBO0FBQUE7QUFBQTs7O0FBQ0E7Ozs7Ozs7OztBQVFBOzs7OztBQUVBO0FBQUE7QUFBQTs7O0FBQUE7O0FBRUE7QUFBQTtBQUFBOzs7O0FBQ0E7O0FBRUE7QUFBQTtBQUFBOzs7Ozs7Ozs7QUFRQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FBT0E7QUFDQTtBQUNBOztBQUNBO0FBQUE7Ozs7O0FDdklBO0FBQ0E7QUFFQTtBQUNBOztBQUdBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUEyQkE7Ozs7OztBQUFBO0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFQQTs7QUFBQTs7Ozs7OztBQWNBO0FBQ0E7QUFDQTs7QUF3QkE7QUFBQTs7Ozs7QUN0RUE7QUFBQTtBQVZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBV0E7QUFDQTtBQUNBOzs7Ozs7OztBQU9BOzs7Ozs7O0FBRUE7QUFBQTtBQUFBOzs7QUFBQTtBQUNBO0FBQ0E7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTs7O0FBQUE7QUFDQTtBQUNBOzs7O0FBSEE7Ozs7OztBQUtBO0FBQUE7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7QUFRQTs7Ozs7O0FBRUE7QUFBQTtBQUFBOzs7QUFBQTtBQUNBO0FBQUE7QUFBQTs7O0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7OztBQUNBOztBQUVBOzs7Ozs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQUFBO0FBQ0E7QUFBQTtBQUFBOzs7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOzs7O0FBQ0E7O0FBRUE7Ozs7OztBQUNBO0FBQUE7QUFBQTs7O0FBQUE7QUFDQTtBQUFBO0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7O0FBUUE7Ozs7OztBQUNBO0FBQUE7QUFBQTs7O0FBQUE7QUFDQTtBQUFBO0FBQUE7Ozs7QUFDQTs7Ozs7O0FBS0E7QUFFQTs7QUFDQTtBQUFBOzs7Ozs7Ozs7Ozs7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzlPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3prQkE7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2xpYi9BcGlTZXJ2aWNlUHJvdmlkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2xpYi9FVGFnLnRzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9saWIvRVRhZ0NhY2hlLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVmbGVjdC1tZXRhZGF0YS9SZWZsZWN0LmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZGVlcG1lcmdlL2Rpc3QvY2pzLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdGFwYWJsZS9saWIvSG9vay5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RhcGFibGUvbGliL0hvb2tDb2RlRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RhcGFibGUvbGliL1N5bmNIb29rLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdGFwYWJsZS9saWIvU3luY0JhaWxIb29rLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdGFwYWJsZS9saWIvU3luY1dhdGVyZmFsbEhvb2suanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy90YXBhYmxlL2xpYi9TeW5jTG9vcEhvb2suanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy90YXBhYmxlL2xpYi9Bc3luY1BhcmFsbGVsSG9vay5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RhcGFibGUvbGliL0FzeW5jUGFyYWxsZWxCYWlsSG9vay5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RhcGFibGUvbGliL0FzeW5jU2VyaWVzSG9vay5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RhcGFibGUvbGliL0FzeW5jU2VyaWVzQmFpbEhvb2suanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy90YXBhYmxlL2xpYi9Bc3luY1Nlcmllc0xvb3BIb29rLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdGFwYWJsZS9saWIvQXN5bmNTZXJpZXNXYXRlcmZhbGxIb29rLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdGFwYWJsZS9saWIvSG9va01hcC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RhcGFibGUvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9zcmMvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9IVFRQRXJyb3IudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy91dGlscy50cyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NhbWVsY2FzZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL0NsaWVudC50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL0NvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9FbnRyeS50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL0VudHJ5Q29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL0NyaXRlcmlhLnRzIiwid2VicGFjazovLy8uLi9zcmMvRmllbGQudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9GaWVsZENvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9IdHRwLnRzIiwid2VicGFjazovLy8uLi9zcmMvUmVwb3NpdG9yeS50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL1N0cmVhbS50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL1N0cmVhbXMudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL25vZGVfbW9kdWxlcy91dGlsL25vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdXRpbC9zdXBwb3J0L2lzQnVmZmVyQnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3V0aWwvdXRpbC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgd2luZG93IFtcInN0cmVhbXNcIixcImNvcmVcIl0iLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9nZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2luaGVyaXRzLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3NldFByb3RvdHlwZU9mLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdHlwZW9mLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvbGliL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFwcCwgQ29uZmlndXJhdGlvbiwgU2VydmljZVByb3ZpZGVyIH0gZnJvbSAnQGxhcmF2ZWwtc3RyZWFtcy9jb3JlJztcbmltcG9ydCB7IENsaWVudCwgSHR0cCxTdHJlYW1zIH0gZnJvbSAnQGxhcmF2ZWwtc3RyZWFtcy9zdHJlYW1zLWFwaSc7XG5pbXBvcnQgeyBFVGFnQ2FjaGUgfSBmcm9tICcuL0VUYWdDYWNoZSc7XG5pbXBvcnQgeyBFVGFnIH0gZnJvbSAnLi9FVGFnJztcblxuYXBwLmV2ZW50cy5vbignQXBwbGljYXRpb246aW5pdGlhbGl6ZTpkZWZhdWx0Q29uZmlnJywgKGNvbmZpZzogQ29uZmlndXJhdGlvbikgPT4ge1xuICAgIGNvbmZpZy5hcGkgPSB7XG4gICAgICAgIGJhc2VVUkw6ICcvYXBpJyxcbiAgICAgICAgZXRhZyAgIDoge1xuICAgICAgICAgICAgZW5hYmxlZCAgICA6IHRydWUsXG4gICAgICAgICAgICBtYW5pZmVzdEtleTogJ3N0cmVhbXMnLFxuICAgICAgICB9LFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcsXG4gICAgICAgIH0sXG4gICAgfTtcbn0pO1xuXG5leHBvcnQgY2xhc3MgQXBpU2VydmljZVByb3ZpZGVyIGV4dGVuZHMgU2VydmljZVByb3ZpZGVyIHtcbiAgICBwdWJsaWMgcmVnaXN0ZXIoKSB7XG4gICAgICAgIHRoaXMuYXBwLmJpbmRpbmcoJ3N0cmVhbXMnLCBhcHAgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTdHJlYW1zKHtcbiAgICAgICAgICAgICAgICAuLi5hcHAuY29uZmlnLmFwaSxcbiAgICAgICAgICAgICAgICBDbGllbnQ6IENsaWVudCxcbiAgICAgICAgICAgICAgICBIdHRwOiBIdHRwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuYWRkQmluZGluZ0dldHRlcignc3RyZWFtcycpO1xuICAgIH1cblxuICAgIHB1YmxpYyBib290KCk6IGFueSB7XG4gICAgICAgIHRoaXMuYm9vdEVUYWcoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYm9vdEVUYWcoKSB7XG4gICAgICAgIC8vIEFkZCBFVGFnIGNhY2hpbmcgdG8gb3VyIGF4aW9zIGluc3RhbmNlXG4gICAgICAgIC8vIFRoZSBFVGFnIGluc3RhbmNlIHdpbGwgYWxzbyBiZSBhY2Nlc3NpYmxlIHVuZGVyICdldGFnJyBwcm9wZXJ0eSBvbiB0aGUgYXhpb3MgaW5zdGFuY2VcbiAgICAgICAgdGhpcy5hcHAuc2luZ2xldG9uKCdhcGkuZXRhZy5jYWNoZScsIEVUYWdDYWNoZSk7XG4gICAgICAgIGNvbnN0IGV0YWcgPSBuZXcgRVRhZyh0aGlzLmFwcC5zdHJlYW1zKTtcbiAgICAgICAgdGhpcy5hcHAuaW5zdGFuY2UoJ2FwaS5ldGFnJywgZXRhZyk7XG4gICAgICAgIGlmICggdGhpcy5hcHAuY29uZmlnLmFwaS5ldGFnLmVuYWJsZWQgKSB7XG4gICAgICAgICAgICBldGFnLmVuYWJsZUV0YWcoKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRVRhZ0NhY2hlIH0gZnJvbSAnLi9FVGFnQ2FjaGUnO1xuaW1wb3J0IHsgaW5qZWN0YWJsZSAsaW5qZWN0IH0gZnJvbSAnQGxhcmF2ZWwtc3RyZWFtcy9jb3JlJztcbmltcG9ydCB7IENsaWVudCwgU3RyZWFtcyB9IGZyb20gJ0BsYXJhdmVsLXN0cmVhbXMvc3RyZWFtcy1hcGknO1xuXG5jb25zdCBieUxvd2VyQ2FzZSAgICAgICAgICAgICAgPSB0b0ZpbmQgPT4gdmFsdWUgPT4gdG9Mb3dlckNhc2UodmFsdWUpID09PSB0b0ZpbmQ7XG5jb25zdCB0b0xvd2VyQ2FzZSAgICAgICAgICAgICAgPSB2YWx1ZSA9PiB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuY29uc3QgZ2V0S2V5cyAgICAgICAgICAgICAgICAgID0gaGVhZGVycyA9PiBPYmplY3Qua2V5cyhoZWFkZXJzKTtcbmNvbnN0IGlzQ2FjaGVhYmxlTWV0aG9kICAgICAgICA9IChyZXF1ZXN0OiBSZXF1ZXN0KSA9PiB+IFsgJ0dFVCcsICdIRUFEJyBdLmluZGV4T2YocmVxdWVzdC5tZXRob2QudG9VcHBlckNhc2UoKSk7XG5jb25zdCBnZXRIZWFkZXJDYXNlSW5zZW5zaXRpdmUgPSAoaGVhZGVyTmFtZSwgaGVhZGVycyA9IHt9KSA9PiBoZWFkZXJzWyBnZXRLZXlzKGhlYWRlcnMpLmZpbmQoYnlMb3dlckNhc2UoaGVhZGVyTmFtZSkpIF07XG5jb25zdCBnZXRCYXNlNjRVcmxGcm9tQ29uZmlnICAgPSAocmVxdWVzdDogUmVxdWVzdCkgPT4gYnRvYShyZXF1ZXN0LnVybCk7XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFVGFnIHtcbiAgICBAaW5qZWN0KCdhcGkuZXRhZy5jYWNoZScpIHB1YmxpYyBjYWNoZTogRVRhZ0NhY2hlO1xuICAgIHByb3RlY3RlZCByZWFkb25seSByZXF1ZXN0S2V5OiBzdHJpbmcgID0gJ0FwaUVUYWdSZXF1ZXN0JztcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgcmVzcG9uc2VLZXk6IHN0cmluZyA9ICdBcGlFVGFnUmVzcG9uc2UnO1xuICAgIHByb3RlY3RlZCBlbmFibGVkOiBib29sZWFuICAgICAgICAgICAgID0gZmFsc2U7XG5cbiAgICBnZXQgY2xpZW50KCk6IENsaWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0cmVhbXMuY2xpZW50O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzdHJlYW1zOiBTdHJlYW1zKSB7XG4gICAgICAgIC8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzdHJlYW1zLCAnZXRhZycsIHtcbiAgICAgICAgLy8gICAgIGdldCAgICAgICAgIDogKCkgPT4ge3JldHVybiB0aGlzO30sXG4gICAgICAgIC8vICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIC8vICAgICBlbnVtZXJhYmxlICA6IHRydWUsXG4gICAgICAgIC8vIH0pO1xuICAgIH1cblxuICAgIGVuYWJsZUV0YWcoKSB7XG4gICAgICAgIGlmICggdGhpcy5lbmFibGVkICkgcmV0dXJuO1xuICAgICAgICBjb25zdCByZXF1ZXN0SW50ZXJjZXB0b3IgID0gdGhpcy5nZXRSZXF1ZXN0SW50ZXJjZXB0b3IoKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VJbnRlcmNlcHRvciA9IHRoaXMuZ2V0UmVzcG9uc2VJbnRlcmNlcHRvcigpO1xuICAgICAgICB0aGlzLmNsaWVudC5ob29rcy5yZXF1ZXN0LnRhcCgnQXBpRVRhZ1JlcXVlc3QnLCByZXF1ZXN0ID0+IHJlcXVlc3RJbnRlcmNlcHRvcihyZXF1ZXN0KSk7XG4gICAgICAgIHRoaXMuY2xpZW50Lmhvb2tzLnJlc3BvbnNlLnRhcCgnQXBpRVRhZ1Jlc3BvbnNlJywgKHJlc3BvbnNlLCByZXF1ZXN0KSA9PiByZXNwb25zZUludGVyY2VwdG9yKHJlc3BvbnNlLCByZXF1ZXN0KSk7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZGlzYWJsZUV0YWcoKSB7XG4gICAgICAgIGlmICggIXRoaXMuZW5hYmxlZCApIHJldHVybjtcbiAgICAgICAgdGhpcy5jbGllbnQuaG9va3MucmVxdWVzdC50YXBzICA9IHRoaXMuY2xpZW50Lmhvb2tzLnJlcXVlc3QudGFwcy5maWx0ZXIodGFwID0+IHRhcC5uYW1lID09PSB0aGlzLnJlcXVlc3RLZXkpO1xuICAgICAgICB0aGlzLmNsaWVudC5ob29rcy5yZXNwb25zZS50YXBzID0gdGhpcy5jbGllbnQuaG9va3MucmVzcG9uc2UudGFwcy5maWx0ZXIodGFwID0+IHRhcC5uYW1lID09PSB0aGlzLnJlc3BvbnNlS2V5KTtcbiAgICAgICAgdGhpcy5lbmFibGVkICAgICAgICAgICAgICAgICAgICA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlzRW5hYmxlZCgpIHtyZXR1cm4gdGhpcy5lbmFibGVkO31cblxuICAgIC8vXG5cbiAgICBwcm90ZWN0ZWQgZ2V0UmVxdWVzdEludGVyY2VwdG9yKCkge1xuICAgICAgICByZXR1cm4gKHJlcXVlc3Q6IFJlcXVlc3QpID0+IHtcbiAgICAgICAgICAgIGlmICggaXNDYWNoZWFibGVNZXRob2QocmVxdWVzdCkgKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdXVpZCAgICAgICAgICAgICA9IGdldEJhc2U2NFVybEZyb21Db25maWcocmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdENhY2hlZFJlc3VsdCA9IHRoaXMuY2FjaGUuZ2V0KHV1aWQpO1xuICAgICAgICAgICAgICAgIGlmICggbGFzdENhY2hlZFJlc3VsdCApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5oZWFkZXJzLnNldCgnSWYtTm9uZS1NYXRjaCcsIGxhc3RDYWNoZWRSZXN1bHQuZXRhZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldFJlc3BvbnNlSW50ZXJjZXB0b3IoKSB7XG4gICAgICAgIHJldHVybiAocmVzcG9uc2U6IFJlc3BvbnNlLCByZXF1ZXN0OiBSZXF1ZXN0KSA9PiB7XG4gICAgICAgICAgICBpZiAoIHJlc3BvbnNlLm9rICYmIGlzQ2FjaGVhYmxlTWV0aG9kKHJlcXVlc3QpICkge1xuICAgICAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3RhdHVzID09PSAzMDQgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlRVRBRyA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdFVGFnJyk7Ly9nZXRIZWFkZXJDYXNlSW5zZW5zaXRpdmUoJ2V0YWcnLCByZXNwb25zZS5oZWFkZXJzLmdldCgnRVRhZycpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCByZXNwb25zZUVUQUcgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggcmVzcG9uc2UuaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpID09PSAnYXBwbGljYXRpb24vanNvbicgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KGdldEJhc2U2NFVybEZyb21Db25maWcocmVxdWVzdCksIHJlc3BvbnNlRVRBRywgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gcHJvdGVjdGVkIGdldENhY2hlQnlBeGlvc0NvbmZpZyhjb25maWc6IEF4aW9zUmVxdWVzdENvbmZpZykge1xuICAgIC8vICAgICByZXR1cm4gdGhpcy5jYWNoZS5nZXQoZ2V0QmFzZTY0VXJsRnJvbUNvbmZpZyhjb25maWcpKTtcbiAgICAvLyB9XG4gICAgLy8gcHJvdGVjdGVkIGdldFJlc3BvbnNlRXJyb3JJbnRlcmNlcHRvcigpIHtcbiAgICAvLyAgICAgcmV0dXJuIChlcnJvcjogQXhpb3NFcnJvcikgPT4ge1xuICAgIC8vICAgICAgICAgaWYgKCBlcnJvci5yZXNwb25zZSAmJiBlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDMwNCApIHtcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBnZXRDYWNoZWRSZXN1bHQgPSB0aGlzLmdldENhY2hlQnlBeGlvc0NvbmZpZyhlcnJvci5yZXNwb25zZS5jb25maWcpO1xuICAgIC8vICAgICAgICAgICAgIGlmICggIWdldENhY2hlZFJlc3VsdCApIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgY29uc3QgbmV3UmVzcG9uc2UgID0gZXJyb3IucmVzcG9uc2U7XG4gICAgLy8gICAgICAgICAgICAgbmV3UmVzcG9uc2Uuc3RhdHVzID0gMjAwO1xuICAgIC8vICAgICAgICAgICAgIG5ld1Jlc3BvbnNlLmRhdGEgICA9IGdldENhY2hlZFJlc3VsdC52YWx1ZTtcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ld1Jlc3BvbnNlKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgLy8gICAgIH07XG4gICAgLy8gfVxufVxuIiwiaW1wb3J0IHtDb25maWcsIFN0b3JhZ2VBZGFwdGVySW50ZXJmYWNlICxpbmplY3QsaW5qZWN0YWJsZSB9IGZyb20gJ0BsYXJhdmVsLXN0cmVhbXMvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRVRhZ0NhY2hlVmFsdWUge1xuICAgIGV0YWc6IHN0cmluZztcbiAgICB2YWx1ZTogYW55O1xufVxuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRVRhZ0NhY2hlIHtcbiAgICBAaW5qZWN0KCdzdG9yYWdlJykgc3RvcmFnZTogU3RvcmFnZUFkYXB0ZXJJbnRlcmZhY2U7XG4gICAgQGluamVjdCgnY29uZmlnJykgY29uZmlnOiBDb25maWc7XG5cbiAgICBnZXQgbWFuaWZlc3RLZXkoKTogc3RyaW5nIHtyZXR1cm4gdGhpcy5jb25maWcuaHR0cC5ldGFnLm1hbmlmZXN0S2V5O31cblxuICAgIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcpOiBFVGFnQ2FjaGVWYWx1ZSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0KGtleSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldChrZXk6IHN0cmluZywgZXRhZzogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuYWRkVG9VdWlkTWFuaWZlc3Qoa2V5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5zZXQoa2V5LCB7IGV0YWcsIHZhbHVlIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXNldCgpIHtcbiAgICAgICAgdGhpcy5nZXRVdWlkTWFuaWZlc3QoKS5mb3JFYWNoKHV1aWQgPT4gdGhpcy5zdG9yYWdlLnVuc2V0KHV1aWQpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0VXVpZE1hbmlmZXN0KCk6IHN0cmluZ1tdIHtcbiAgICAgICAgaWYgKCAhdGhpcy5zdG9yYWdlLmhhcyh0aGlzLm1hbmlmZXN0S2V5KSApIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXQodGhpcy5tYW5pZmVzdEtleSwgW10pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0KHRoaXMubWFuaWZlc3RLZXksIFtdKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWRkVG9VdWlkTWFuaWZlc3QodXVpZCkge1xuICAgICAgICBsZXQgbWFuaWZlc3QgPSB0aGlzLmdldFV1aWRNYW5pZmVzdCgpO1xuICAgICAgICBtYW5pZmVzdC5wdXNoKHV1aWQpO1xuICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KHRoaXMubWFuaWZlc3RLZXksIG1hbmlmZXN0KTtcbiAgICB9XG5cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuQ29weXJpZ2h0IChDKSBNaWNyb3NvZnQuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cblxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xudmFyIFJlZmxlY3Q7XG4oZnVuY3Rpb24gKFJlZmxlY3QpIHtcbiAgICAvLyBNZXRhZGF0YSBQcm9wb3NhbFxuICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvXG4gICAgKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgICAgIHZhciByb290ID0gdHlwZW9mIGdsb2JhbCA9PT0gXCJvYmplY3RcIiA/IGdsb2JhbCA6XG4gICAgICAgICAgICB0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIiA/IHNlbGYgOlxuICAgICAgICAgICAgICAgIHR5cGVvZiB0aGlzID09PSBcIm9iamVjdFwiID8gdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgIEZ1bmN0aW9uKFwicmV0dXJuIHRoaXM7XCIpKCk7XG4gICAgICAgIHZhciBleHBvcnRlciA9IG1ha2VFeHBvcnRlcihSZWZsZWN0KTtcbiAgICAgICAgaWYgKHR5cGVvZiByb290LlJlZmxlY3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHJvb3QuUmVmbGVjdCA9IFJlZmxlY3Q7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBleHBvcnRlciA9IG1ha2VFeHBvcnRlcihyb290LlJlZmxlY3QsIGV4cG9ydGVyKTtcbiAgICAgICAgfVxuICAgICAgICBmYWN0b3J5KGV4cG9ydGVyKTtcbiAgICAgICAgZnVuY3Rpb24gbWFrZUV4cG9ydGVyKHRhcmdldCwgcHJldmlvdXMpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0W2tleV0gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHsgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXMpXG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0pKGZ1bmN0aW9uIChleHBvcnRlcikge1xuICAgICAgICB2YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgICAgICAgLy8gZmVhdHVyZSB0ZXN0IGZvciBTeW1ib2wgc3VwcG9ydFxuICAgICAgICB2YXIgc3VwcG9ydHNTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICAgIHZhciB0b1ByaW1pdGl2ZVN5bWJvbCA9IHN1cHBvcnRzU3ltYm9sICYmIHR5cGVvZiBTeW1ib2wudG9QcmltaXRpdmUgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wudG9QcmltaXRpdmUgOiBcIkBAdG9QcmltaXRpdmVcIjtcbiAgICAgICAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gc3VwcG9ydHNTeW1ib2wgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbC5pdGVyYXRvciA6IFwiQEBpdGVyYXRvclwiO1xuICAgICAgICB2YXIgc3VwcG9ydHNDcmVhdGUgPSB0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gXCJmdW5jdGlvblwiOyAvLyBmZWF0dXJlIHRlc3QgZm9yIE9iamVjdC5jcmVhdGUgc3VwcG9ydFxuICAgICAgICB2YXIgc3VwcG9ydHNQcm90byA9IHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXk7IC8vIGZlYXR1cmUgdGVzdCBmb3IgX19wcm90b19fIHN1cHBvcnRcbiAgICAgICAgdmFyIGRvd25MZXZlbCA9ICFzdXBwb3J0c0NyZWF0ZSAmJiAhc3VwcG9ydHNQcm90bztcbiAgICAgICAgdmFyIEhhc2hNYXAgPSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgYW4gb2JqZWN0IGluIGRpY3Rpb25hcnkgbW9kZSAoYS5rLmEuIFwic2xvd1wiIG1vZGUgaW4gdjgpXG4gICAgICAgICAgICBjcmVhdGU6IHN1cHBvcnRzQ3JlYXRlXG4gICAgICAgICAgICAgICAgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBNYWtlRGljdGlvbmFyeShPYmplY3QuY3JlYXRlKG51bGwpKTsgfVxuICAgICAgICAgICAgICAgIDogc3VwcG9ydHNQcm90b1xuICAgICAgICAgICAgICAgICAgICA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIE1ha2VEaWN0aW9uYXJ5KHsgX19wcm90b19fOiBudWxsIH0pOyB9XG4gICAgICAgICAgICAgICAgICAgIDogZnVuY3Rpb24gKCkgeyByZXR1cm4gTWFrZURpY3Rpb25hcnkoe30pOyB9LFxuICAgICAgICAgICAgaGFzOiBkb3duTGV2ZWxcbiAgICAgICAgICAgICAgICA/IGZ1bmN0aW9uIChtYXAsIGtleSkgeyByZXR1cm4gaGFzT3duLmNhbGwobWFwLCBrZXkpOyB9XG4gICAgICAgICAgICAgICAgOiBmdW5jdGlvbiAobWFwLCBrZXkpIHsgcmV0dXJuIGtleSBpbiBtYXA7IH0sXG4gICAgICAgICAgICBnZXQ6IGRvd25MZXZlbFxuICAgICAgICAgICAgICAgID8gZnVuY3Rpb24gKG1hcCwga2V5KSB7IHJldHVybiBoYXNPd24uY2FsbChtYXAsIGtleSkgPyBtYXBba2V5XSA6IHVuZGVmaW5lZDsgfVxuICAgICAgICAgICAgICAgIDogZnVuY3Rpb24gKG1hcCwga2V5KSB7IHJldHVybiBtYXBba2V5XTsgfSxcbiAgICAgICAgfTtcbiAgICAgICAgLy8gTG9hZCBnbG9iYWwgb3Igc2hpbSB2ZXJzaW9ucyBvZiBNYXAsIFNldCwgYW5kIFdlYWtNYXBcbiAgICAgICAgdmFyIGZ1bmN0aW9uUHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKEZ1bmN0aW9uKTtcbiAgICAgICAgdmFyIHVzZVBvbHlmaWxsID0gdHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnZbXCJSRUZMRUNUX01FVEFEQVRBX1VTRV9NQVBfUE9MWUZJTExcIl0gPT09IFwidHJ1ZVwiO1xuICAgICAgICB2YXIgX01hcCA9ICF1c2VQb2x5ZmlsbCAmJiB0eXBlb2YgTWFwID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIE1hcC5wcm90b3R5cGUuZW50cmllcyA9PT0gXCJmdW5jdGlvblwiID8gTWFwIDogQ3JlYXRlTWFwUG9seWZpbGwoKTtcbiAgICAgICAgdmFyIF9TZXQgPSAhdXNlUG9seWZpbGwgJiYgdHlwZW9mIFNldCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTZXQucHJvdG90eXBlLmVudHJpZXMgPT09IFwiZnVuY3Rpb25cIiA/IFNldCA6IENyZWF0ZVNldFBvbHlmaWxsKCk7XG4gICAgICAgIHZhciBfV2Vha01hcCA9ICF1c2VQb2x5ZmlsbCAmJiB0eXBlb2YgV2Vha01hcCA9PT0gXCJmdW5jdGlvblwiID8gV2Vha01hcCA6IENyZWF0ZVdlYWtNYXBQb2x5ZmlsbCgpO1xuICAgICAgICAvLyBbW01ldGFkYXRhXV0gaW50ZXJuYWwgc2xvdFxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeS1vYmplY3QtaW50ZXJuYWwtbWV0aG9kcy1hbmQtaW50ZXJuYWwtc2xvdHNcbiAgICAgICAgdmFyIE1ldGFkYXRhID0gbmV3IF9XZWFrTWFwKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVzIGEgc2V0IG9mIGRlY29yYXRvcnMgdG8gYSBwcm9wZXJ0eSBvZiBhIHRhcmdldCBvYmplY3QuXG4gICAgICAgICAqIEBwYXJhbSBkZWNvcmF0b3JzIEFuIGFycmF5IG9mIGRlY29yYXRvcnMuXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3QuXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgdG8gZGVjb3JhdGUuXG4gICAgICAgICAqIEBwYXJhbSBhdHRyaWJ1dGVzIChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGRlc2NyaXB0b3IgZm9yIHRoZSB0YXJnZXQga2V5LlxuICAgICAgICAgKiBAcmVtYXJrcyBEZWNvcmF0b3JzIGFyZSBhcHBsaWVkIGluIHJldmVyc2Ugb3JkZXIuXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICogICAgIEV4YW1wbGUgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnNBcnJheSwgRXhhbXBsZSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnNBcnJheSwgRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnNBcnJheSwgRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIsXG4gICAgICAgICAqICAgICAgICAgUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzQXJyYXksIEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIsXG4gICAgICAgICAqICAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIikpKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiLFxuICAgICAgICAgKiAgICAgICAgIFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9yc0FycmF5LCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIixcbiAgICAgICAgICogICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIikpKTtcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwgcHJvcGVydHlLZXksIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFJc0FycmF5KGRlY29yYXRvcnMpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdChhdHRyaWJ1dGVzKSAmJiAhSXNVbmRlZmluZWQoYXR0cmlidXRlcykgJiYgIUlzTnVsbChhdHRyaWJ1dGVzKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgIGlmIChJc051bGwoYXR0cmlidXRlcykpXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gRGVjb3JhdGVQcm9wZXJ0eShkZWNvcmF0b3JzLCB0YXJnZXQsIHByb3BlcnR5S2V5LCBhdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghSXNBcnJheShkZWNvcmF0b3JzKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgIGlmICghSXNDb25zdHJ1Y3Rvcih0YXJnZXQpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIERlY29yYXRlQ29uc3RydWN0b3IoZGVjb3JhdG9ycywgdGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcImRlY29yYXRlXCIsIGRlY29yYXRlKTtcbiAgICAgICAgLy8gNC4xLjIgUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSlcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jcmVmbGVjdC5tZXRhZGF0YVxuICAgICAgICAvKipcbiAgICAgICAgICogQSBkZWZhdWx0IG1ldGFkYXRhIGRlY29yYXRvciBmYWN0b3J5IHRoYXQgY2FuIGJlIHVzZWQgb24gYSBjbGFzcywgY2xhc3MgbWVtYmVyLCBvciBwYXJhbWV0ZXIuXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YUtleSBUaGUga2V5IGZvciB0aGUgbWV0YWRhdGEgZW50cnkuXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YVZhbHVlIFRoZSB2YWx1ZSBmb3IgdGhlIG1ldGFkYXRhIGVudHJ5LlxuICAgICAgICAgKiBAcmV0dXJucyBBIGRlY29yYXRvciBmdW5jdGlvbi5cbiAgICAgICAgICogQHJlbWFya3NcbiAgICAgICAgICogSWYgYG1ldGFkYXRhS2V5YCBpcyBhbHJlYWR5IGRlZmluZWQgZm9yIHRoZSB0YXJnZXQgYW5kIHRhcmdldCBrZXksIHRoZVxuICAgICAgICAgKiBtZXRhZGF0YVZhbHVlIGZvciB0aGF0IGtleSB3aWxsIGJlIG92ZXJ3cml0dGVuLlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICogICAgIEBSZWZsZWN0Lm1ldGFkYXRhKGtleSwgdmFsdWUpXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvciwgVHlwZVNjcmlwdCBvbmx5KVxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgQFJlZmxlY3QubWV0YWRhdGEoa2V5LCB2YWx1ZSlcbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljUHJvcGVydHk7XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlLCBUeXBlU2NyaXB0IG9ubHkpXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICBAUmVmbGVjdC5tZXRhZGF0YShrZXksIHZhbHVlKVxuICAgICAgICAgKiAgICAgICAgIHByb3BlcnR5O1xuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIEBSZWZsZWN0Lm1ldGFkYXRhKGtleSwgdmFsdWUpXG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZCgpIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICBAUmVmbGVjdC5tZXRhZGF0YShrZXksIHZhbHVlKVxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZCgpIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGRlY29yYXRvcih0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkgJiYgIUlzUHJvcGVydHlLZXkocHJvcGVydHlLZXkpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgT3JkaW5hcnlEZWZpbmVPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGVjb3JhdG9yO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydGVyKFwibWV0YWRhdGFcIiwgbWV0YWRhdGEpO1xuICAgICAgICAvKipcbiAgICAgICAgICogRGVmaW5lIGEgdW5pcXVlIG1ldGFkYXRhIGVudHJ5IG9uIHRoZSB0YXJnZXQuXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YUtleSBBIGtleSB1c2VkIHRvIHN0b3JlIGFuZCByZXRyaWV2ZSBtZXRhZGF0YS5cbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhVmFsdWUgQSB2YWx1ZSB0aGF0IGNvbnRhaW5zIGF0dGFjaGVkIG1ldGFkYXRhLlxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRvIGRlZmluZSBtZXRhZGF0YS5cbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIG9wdGlvbnMsIEV4YW1wbGUpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIG9wdGlvbnMsIEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIG9wdGlvbnMsIEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBvcHRpb25zLCBFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIG9wdGlvbnMsIEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIGRlY29yYXRvciBmYWN0b3J5IGFzIG1ldGFkYXRhLXByb2R1Y2luZyBhbm5vdGF0aW9uLlxuICAgICAgICAgKiAgICAgZnVuY3Rpb24gTXlBbm5vdGF0aW9uKG9wdGlvbnMpOiBEZWNvcmF0b3Ige1xuICAgICAgICAgKiAgICAgICAgIHJldHVybiAodGFyZ2V0LCBrZXk/KSA9PiBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgb3B0aW9ucywgdGFyZ2V0LCBrZXkpO1xuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZGVmaW5lTWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUsIHRhcmdldCwgcHJvcGVydHlLZXkpIHtcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xuICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUsIHRhcmdldCwgcHJvcGVydHlLZXkpO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydGVyKFwiZGVmaW5lTWV0YWRhdGFcIiwgZGVmaW5lTWV0YWRhdGEpO1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyBhIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgdGFyZ2V0IG9iamVjdCBvciBpdHMgcHJvdG90eXBlIGNoYWluIGhhcyB0aGUgcHJvdmlkZWQgbWV0YWRhdGEga2V5IGRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YUtleSBBIGtleSB1c2VkIHRvIHN0b3JlIGFuZCByZXRyaWV2ZSBtZXRhZGF0YS5cbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCBvbiB3aGljaCB0aGUgbWV0YWRhdGEgaXMgZGVmaW5lZC5cbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cbiAgICAgICAgICogQHJldHVybnMgYHRydWVgIGlmIHRoZSBtZXRhZGF0YSBrZXkgd2FzIGRlZmluZWQgb24gdGhlIHRhcmdldCBvYmplY3Qgb3IgaXRzIHByb3RvdHlwZSBjaGFpbjsgb3RoZXJ3aXNlLCBgZmFsc2VgLlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gaGFzTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpIHtcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xuICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5SGFzTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydGVyKFwiaGFzTWV0YWRhdGFcIiwgaGFzTWV0YWRhdGEpO1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyBhIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgdGFyZ2V0IG9iamVjdCBoYXMgdGhlIHByb3ZpZGVkIG1ldGFkYXRhIGtleSBkZWZpbmVkLlxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgQSBrZXkgdXNlZCB0byBzdG9yZSBhbmQgcmV0cmlldmUgbWV0YWRhdGEuXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXG4gICAgICAgICAqIEByZXR1cm5zIGB0cnVlYCBpZiB0aGUgbWV0YWRhdGEga2V5IHdhcyBkZWZpbmVkIG9uIHRoZSB0YXJnZXQgb2JqZWN0OyBvdGhlcndpc2UsIGBmYWxzZWAuXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzT3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzT3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzT3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc093bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzT3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBoYXNPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlIYXNPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZXhwb3J0ZXIoXCJoYXNPd25NZXRhZGF0YVwiLCBoYXNPd25NZXRhZGF0YSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBtZXRhZGF0YSB2YWx1ZSBmb3IgdGhlIHByb3ZpZGVkIG1ldGFkYXRhIGtleSBvbiB0aGUgdGFyZ2V0IG9iamVjdCBvciBpdHMgcHJvdG90eXBlIGNoYWluLlxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgQSBrZXkgdXNlZCB0byBzdG9yZSBhbmQgcmV0cmlldmUgbWV0YWRhdGEuXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBtZXRhZGF0YSB2YWx1ZSBmb3IgdGhlIG1ldGFkYXRhIGtleSBpZiBmb3VuZDsgb3RoZXJ3aXNlLCBgdW5kZWZpbmVkYC5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGdldE1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUdldE1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcImdldE1ldGFkYXRhXCIsIGdldE1ldGFkYXRhKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIG1ldGFkYXRhIHZhbHVlIGZvciB0aGUgcHJvdmlkZWQgbWV0YWRhdGEga2V5IG9uIHRoZSB0YXJnZXQgb2JqZWN0LlxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgQSBrZXkgdXNlZCB0byBzdG9yZSBhbmQgcmV0cmlldmUgbWV0YWRhdGEuXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBtZXRhZGF0YSB2YWx1ZSBmb3IgdGhlIG1ldGFkYXRhIGtleSBpZiBmb3VuZDsgb3RoZXJ3aXNlLCBgdW5kZWZpbmVkYC5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGdldE93bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUdldE93bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcImdldE93bk1ldGFkYXRhXCIsIGdldE93bk1ldGFkYXRhKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIG1ldGFkYXRhIGtleXMgZGVmaW5lZCBvbiB0aGUgdGFyZ2V0IG9iamVjdCBvciBpdHMgcHJvdG90eXBlIGNoYWluLlxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRoZSBtZXRhZGF0YSBpcyBkZWZpbmVkLlxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IGZvciB0aGUgdGFyZ2V0LlxuICAgICAgICAgKiBAcmV0dXJucyBBbiBhcnJheSBvZiB1bmlxdWUgbWV0YWRhdGEga2V5cy5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMoRXhhbXBsZSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyhFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyhFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBnZXRNZXRhZGF0YUtleXModGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlNZXRhZGF0YUtleXModGFyZ2V0LCBwcm9wZXJ0eUtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZXhwb3J0ZXIoXCJnZXRNZXRhZGF0YUtleXNcIiwgZ2V0TWV0YWRhdGFLZXlzKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIHVuaXF1ZSBtZXRhZGF0YSBrZXlzIGRlZmluZWQgb24gdGhlIHRhcmdldCBvYmplY3QuXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXG4gICAgICAgICAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHVuaXF1ZSBtZXRhZGF0YSBrZXlzLlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5cyhFeGFtcGxlKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGFLZXlzKEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXMoRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXMoRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGFLZXlzKEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGdldE93bk1ldGFkYXRhS2V5cyh0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeU93bk1ldGFkYXRhS2V5cyh0YXJnZXQsIHByb3BlcnR5S2V5KTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcImdldE93bk1ldGFkYXRhS2V5c1wiLCBnZXRPd25NZXRhZGF0YUtleXMpO1xuICAgICAgICAvKipcbiAgICAgICAgICogRGVsZXRlcyB0aGUgbWV0YWRhdGEgZW50cnkgZnJvbSB0aGUgdGFyZ2V0IG9iamVjdCB3aXRoIHRoZSBwcm92aWRlZCBrZXkuXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YUtleSBBIGtleSB1c2VkIHRvIHN0b3JlIGFuZCByZXRyaWV2ZSBtZXRhZGF0YS5cbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCBvbiB3aGljaCB0aGUgbWV0YWRhdGEgaXMgZGVmaW5lZC5cbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cbiAgICAgICAgICogQHJldHVybnMgYHRydWVgIGlmIHRoZSBtZXRhZGF0YSBlbnRyeSB3YXMgZm91bmQgYW5kIGRlbGV0ZWQ7IG90aGVyd2lzZSwgZmFsc2UuXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmRlbGV0ZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBkZWxldGVNZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICB2YXIgbWV0YWRhdGFNYXAgPSBHZXRPckNyZWF0ZU1ldGFkYXRhTWFwKHRhcmdldCwgcHJvcGVydHlLZXksIC8qQ3JlYXRlKi8gZmFsc2UpO1xuICAgICAgICAgICAgaWYgKElzVW5kZWZpbmVkKG1ldGFkYXRhTWFwKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAoIW1ldGFkYXRhTWFwLmRlbGV0ZShtZXRhZGF0YUtleSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgaWYgKG1ldGFkYXRhTWFwLnNpemUgPiAwKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgdmFyIHRhcmdldE1ldGFkYXRhID0gTWV0YWRhdGEuZ2V0KHRhcmdldCk7XG4gICAgICAgICAgICB0YXJnZXRNZXRhZGF0YS5kZWxldGUocHJvcGVydHlLZXkpO1xuICAgICAgICAgICAgaWYgKHRhcmdldE1ldGFkYXRhLnNpemUgPiAwKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgTWV0YWRhdGEuZGVsZXRlKHRhcmdldCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcImRlbGV0ZU1ldGFkYXRhXCIsIGRlbGV0ZU1ldGFkYXRhKTtcbiAgICAgICAgZnVuY3Rpb24gRGVjb3JhdGVDb25zdHJ1Y3RvcihkZWNvcmF0b3JzLCB0YXJnZXQpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlY29yYXRvciA9IGRlY29yYXRvcnNbaV07XG4gICAgICAgICAgICAgICAgdmFyIGRlY29yYXRlZCA9IGRlY29yYXRvcih0YXJnZXQpO1xuICAgICAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQoZGVjb3JhdGVkKSAmJiAhSXNOdWxsKGRlY29yYXRlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFJc0NvbnN0cnVjdG9yKGRlY29yYXRlZCkpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IGRlY29yYXRlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIERlY29yYXRlUHJvcGVydHkoZGVjb3JhdG9ycywgdGFyZ2V0LCBwcm9wZXJ0eUtleSwgZGVzY3JpcHRvcikge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVjb3JhdG9yID0gZGVjb3JhdG9yc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgZGVjb3JhdGVkID0gZGVjb3JhdG9yKHRhcmdldCwgcHJvcGVydHlLZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQoZGVjb3JhdGVkKSAmJiAhSXNOdWxsKGRlY29yYXRlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdChkZWNvcmF0ZWQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdG9yID0gZGVjb3JhdGVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIEdldE9yQ3JlYXRlTWV0YWRhdGFNYXAoTywgUCwgQ3JlYXRlKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0TWV0YWRhdGEgPSBNZXRhZGF0YS5nZXQoTyk7XG4gICAgICAgICAgICBpZiAoSXNVbmRlZmluZWQodGFyZ2V0TWV0YWRhdGEpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFDcmVhdGUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdGFyZ2V0TWV0YWRhdGEgPSBuZXcgX01hcCgpO1xuICAgICAgICAgICAgICAgIE1ldGFkYXRhLnNldChPLCB0YXJnZXRNZXRhZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWV0YWRhdGFNYXAgPSB0YXJnZXRNZXRhZGF0YS5nZXQoUCk7XG4gICAgICAgICAgICBpZiAoSXNVbmRlZmluZWQobWV0YWRhdGFNYXApKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFDcmVhdGUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGFNYXAgPSBuZXcgX01hcCgpO1xuICAgICAgICAgICAgICAgIHRhcmdldE1ldGFkYXRhLnNldChQLCBtZXRhZGF0YU1hcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWV0YWRhdGFNYXA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gMy4xLjEuMSBPcmRpbmFyeUhhc01ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKVxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeWhhc21ldGFkYXRhXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5SGFzTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApIHtcbiAgICAgICAgICAgIHZhciBoYXNPd24gPSBPcmRpbmFyeUhhc093bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKTtcbiAgICAgICAgICAgIGlmIChoYXNPd24pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gT3JkaW5hcnlHZXRQcm90b3R5cGVPZihPKTtcbiAgICAgICAgICAgIGlmICghSXNOdWxsKHBhcmVudCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5SGFzTWV0YWRhdGEoTWV0YWRhdGFLZXksIHBhcmVudCwgUCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gMy4xLjIuMSBPcmRpbmFyeUhhc093bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKVxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeWhhc293bm1ldGFkYXRhXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5SGFzT3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApIHtcbiAgICAgICAgICAgIHZhciBtZXRhZGF0YU1hcCA9IEdldE9yQ3JlYXRlTWV0YWRhdGFNYXAoTywgUCwgLypDcmVhdGUqLyBmYWxzZSk7XG4gICAgICAgICAgICBpZiAoSXNVbmRlZmluZWQobWV0YWRhdGFNYXApKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBUb0Jvb2xlYW4obWV0YWRhdGFNYXAuaGFzKE1ldGFkYXRhS2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gMy4xLjMuMSBPcmRpbmFyeUdldE1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKVxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeWdldG1ldGFkYXRhXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5R2V0TWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApIHtcbiAgICAgICAgICAgIHZhciBoYXNPd24gPSBPcmRpbmFyeUhhc093bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKTtcbiAgICAgICAgICAgIGlmIChoYXNPd24pXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5R2V0T3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApO1xuICAgICAgICAgICAgdmFyIHBhcmVudCA9IE9yZGluYXJ5R2V0UHJvdG90eXBlT2YoTyk7XG4gICAgICAgICAgICBpZiAoIUlzTnVsbChwYXJlbnQpKVxuICAgICAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUdldE1ldGFkYXRhKE1ldGFkYXRhS2V5LCBwYXJlbnQsIFApO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvLyAzLjEuNC4xIE9yZGluYXJ5R2V0T3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI29yZGluYXJ5Z2V0b3dubWV0YWRhdGFcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlHZXRPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCkge1xuICAgICAgICAgICAgdmFyIG1ldGFkYXRhTWFwID0gR2V0T3JDcmVhdGVNZXRhZGF0YU1hcChPLCBQLCAvKkNyZWF0ZSovIGZhbHNlKTtcbiAgICAgICAgICAgIGlmIChJc1VuZGVmaW5lZChtZXRhZGF0YU1hcCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJldHVybiBtZXRhZGF0YU1hcC5nZXQoTWV0YWRhdGFLZXkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIDMuMS41LjEgT3JkaW5hcnlEZWZpbmVPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTWV0YWRhdGFWYWx1ZSwgTywgUClcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnlkZWZpbmVvd25tZXRhZGF0YVxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeURlZmluZU93bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBNZXRhZGF0YVZhbHVlLCBPLCBQKSB7XG4gICAgICAgICAgICB2YXIgbWV0YWRhdGFNYXAgPSBHZXRPckNyZWF0ZU1ldGFkYXRhTWFwKE8sIFAsIC8qQ3JlYXRlKi8gdHJ1ZSk7XG4gICAgICAgICAgICBtZXRhZGF0YU1hcC5zZXQoTWV0YWRhdGFLZXksIE1ldGFkYXRhVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIDMuMS42LjEgT3JkaW5hcnlNZXRhZGF0YUtleXMoTywgUClcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnltZXRhZGF0YWtleXNcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlNZXRhZGF0YUtleXMoTywgUCkge1xuICAgICAgICAgICAgdmFyIG93bktleXMgPSBPcmRpbmFyeU93bk1ldGFkYXRhS2V5cyhPLCBQKTtcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSBPcmRpbmFyeUdldFByb3RvdHlwZU9mKE8pO1xuICAgICAgICAgICAgaWYgKHBhcmVudCA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gb3duS2V5cztcbiAgICAgICAgICAgIHZhciBwYXJlbnRLZXlzID0gT3JkaW5hcnlNZXRhZGF0YUtleXMocGFyZW50LCBQKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnRLZXlzLmxlbmd0aCA8PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBvd25LZXlzO1xuICAgICAgICAgICAgaWYgKG93bktleXMubGVuZ3RoIDw9IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudEtleXM7XG4gICAgICAgICAgICB2YXIgc2V0ID0gbmV3IF9TZXQoKTtcbiAgICAgICAgICAgIHZhciBrZXlzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIG93bktleXNfMSA9IG93bktleXM7IF9pIDwgb3duS2V5c18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBvd25LZXlzXzFbX2ldO1xuICAgICAgICAgICAgICAgIHZhciBoYXNLZXkgPSBzZXQuaGFzKGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKCFoYXNLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0LmFkZChrZXkpO1xuICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBfYSA9IDAsIHBhcmVudEtleXNfMSA9IHBhcmVudEtleXM7IF9hIDwgcGFyZW50S2V5c18xLmxlbmd0aDsgX2ErKykge1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBwYXJlbnRLZXlzXzFbX2FdO1xuICAgICAgICAgICAgICAgIHZhciBoYXNLZXkgPSBzZXQuaGFzKGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKCFoYXNLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0LmFkZChrZXkpO1xuICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ga2V5cztcbiAgICAgICAgfVxuICAgICAgICAvLyAzLjEuNy4xIE9yZGluYXJ5T3duTWV0YWRhdGFLZXlzKE8sIFApXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI29yZGluYXJ5b3dubWV0YWRhdGFrZXlzXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5T3duTWV0YWRhdGFLZXlzKE8sIFApIHtcbiAgICAgICAgICAgIHZhciBrZXlzID0gW107XG4gICAgICAgICAgICB2YXIgbWV0YWRhdGFNYXAgPSBHZXRPckNyZWF0ZU1ldGFkYXRhTWFwKE8sIFAsIC8qQ3JlYXRlKi8gZmFsc2UpO1xuICAgICAgICAgICAgaWYgKElzVW5kZWZpbmVkKG1ldGFkYXRhTWFwKSlcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5cztcbiAgICAgICAgICAgIHZhciBrZXlzT2JqID0gbWV0YWRhdGFNYXAua2V5cygpO1xuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gR2V0SXRlcmF0b3Ioa2V5c09iaik7XG4gICAgICAgICAgICB2YXIgayA9IDA7XG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gSXRlcmF0b3JTdGVwKGl0ZXJhdG9yKTtcbiAgICAgICAgICAgICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5cy5sZW5ndGggPSBrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5cztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIG5leHRWYWx1ZSA9IEl0ZXJhdG9yVmFsdWUobmV4dCk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAga2V5c1trXSA9IG5leHRWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBrKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gNiBFQ01BU2NyaXB0IERhdGEgVHlwMGVzIGFuZCBWYWx1ZXNcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZWNtYXNjcmlwdC1kYXRhLXR5cGVzLWFuZC12YWx1ZXNcbiAgICAgICAgZnVuY3Rpb24gVHlwZSh4KSB7XG4gICAgICAgICAgICBpZiAoeCA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gMSAvKiBOdWxsICovO1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgeCkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjogcmV0dXJuIDAgLyogVW5kZWZpbmVkICovO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiAyIC8qIEJvb2xlYW4gKi87XG4gICAgICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiByZXR1cm4gMyAvKiBTdHJpbmcgKi87XG4gICAgICAgICAgICAgICAgY2FzZSBcInN5bWJvbFwiOiByZXR1cm4gNCAvKiBTeW1ib2wgKi87XG4gICAgICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiByZXR1cm4gNSAvKiBOdW1iZXIgKi87XG4gICAgICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOiByZXR1cm4geCA9PT0gbnVsbCA/IDEgLyogTnVsbCAqLyA6IDYgLyogT2JqZWN0ICovO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiA2IC8qIE9iamVjdCAqLztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyA2LjEuMSBUaGUgVW5kZWZpbmVkIFR5cGVcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcy11bmRlZmluZWQtdHlwZVxuICAgICAgICBmdW5jdGlvbiBJc1VuZGVmaW5lZCh4KSB7XG4gICAgICAgICAgICByZXR1cm4geCA9PT0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vIDYuMS4yIFRoZSBOdWxsIFR5cGVcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcy1udWxsLXR5cGVcbiAgICAgICAgZnVuY3Rpb24gSXNOdWxsKHgpIHtcbiAgICAgICAgICAgIHJldHVybiB4ID09PSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIDYuMS41IFRoZSBTeW1ib2wgVHlwZVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzLXN5bWJvbC10eXBlXG4gICAgICAgIGZ1bmN0aW9uIElzU3ltYm9sKHgpIHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIjtcbiAgICAgICAgfVxuICAgICAgICAvLyA2LjEuNyBUaGUgT2JqZWN0IFR5cGVcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LXR5cGVcbiAgICAgICAgZnVuY3Rpb24gSXNPYmplY3QoeCkge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcIm9iamVjdFwiID8geCAhPT0gbnVsbCA6IHR5cGVvZiB4ID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy4xIFR5cGUgQ29udmVyc2lvblxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10eXBlLWNvbnZlcnNpb25cbiAgICAgICAgLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXG4gICAgICAgIGZ1bmN0aW9uIFRvUHJpbWl0aXZlKGlucHV0LCBQcmVmZXJyZWRUeXBlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKFR5cGUoaW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwIC8qIFVuZGVmaW5lZCAqLzogcmV0dXJuIGlucHV0O1xuICAgICAgICAgICAgICAgIGNhc2UgMSAvKiBOdWxsICovOiByZXR1cm4gaW5wdXQ7XG4gICAgICAgICAgICAgICAgY2FzZSAyIC8qIEJvb2xlYW4gKi86IHJldHVybiBpbnB1dDtcbiAgICAgICAgICAgICAgICBjYXNlIDMgLyogU3RyaW5nICovOiByZXR1cm4gaW5wdXQ7XG4gICAgICAgICAgICAgICAgY2FzZSA0IC8qIFN5bWJvbCAqLzogcmV0dXJuIGlucHV0O1xuICAgICAgICAgICAgICAgIGNhc2UgNSAvKiBOdW1iZXIgKi86IHJldHVybiBpbnB1dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBoaW50ID0gUHJlZmVycmVkVHlwZSA9PT0gMyAvKiBTdHJpbmcgKi8gPyBcInN0cmluZ1wiIDogUHJlZmVycmVkVHlwZSA9PT0gNSAvKiBOdW1iZXIgKi8gPyBcIm51bWJlclwiIDogXCJkZWZhdWx0XCI7XG4gICAgICAgICAgICB2YXIgZXhvdGljVG9QcmltID0gR2V0TWV0aG9kKGlucHV0LCB0b1ByaW1pdGl2ZVN5bWJvbCk7XG4gICAgICAgICAgICBpZiAoZXhvdGljVG9QcmltICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gZXhvdGljVG9QcmltLmNhbGwoaW5wdXQsIGhpbnQpO1xuICAgICAgICAgICAgICAgIGlmIChJc09iamVjdChyZXN1bHQpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeVRvUHJpbWl0aXZlKGlucHV0LCBoaW50ID09PSBcImRlZmF1bHRcIiA/IFwibnVtYmVyXCIgOiBoaW50KTtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjEuMS4xIE9yZGluYXJ5VG9QcmltaXRpdmUoTywgaGludClcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb3JkaW5hcnl0b3ByaW1pdGl2ZVxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeVRvUHJpbWl0aXZlKE8sIGhpbnQpIHtcbiAgICAgICAgICAgIGlmIChoaW50ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRvU3RyaW5nXzEgPSBPLnRvU3RyaW5nO1xuICAgICAgICAgICAgICAgIGlmIChJc0NhbGxhYmxlKHRvU3RyaW5nXzEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0b1N0cmluZ18xLmNhbGwoTyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QocmVzdWx0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZU9mID0gTy52YWx1ZU9mO1xuICAgICAgICAgICAgICAgIGlmIChJc0NhbGxhYmxlKHZhbHVlT2YpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB2YWx1ZU9mLmNhbGwoTyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QocmVzdWx0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlT2YgPSBPLnZhbHVlT2Y7XG4gICAgICAgICAgICAgICAgaWYgKElzQ2FsbGFibGUodmFsdWVPZikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHZhbHVlT2YuY2FsbChPKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdChyZXN1bHQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHRvU3RyaW5nXzIgPSBPLnRvU3RyaW5nO1xuICAgICAgICAgICAgICAgIGlmIChJc0NhbGxhYmxlKHRvU3RyaW5nXzIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0b1N0cmluZ18yLmNhbGwoTyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QocmVzdWx0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuMS4yIFRvQm9vbGVhbihhcmd1bWVudClcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLzIwMTYvI3NlYy10b2Jvb2xlYW5cbiAgICAgICAgZnVuY3Rpb24gVG9Cb29sZWFuKGFyZ3VtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gISFhcmd1bWVudDtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjEuMTIgVG9TdHJpbmcoYXJndW1lbnQpXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvc3RyaW5nXG4gICAgICAgIGZ1bmN0aW9uIFRvU3RyaW5nKGFyZ3VtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIiArIGFyZ3VtZW50O1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuMS4xNCBUb1Byb3BlcnR5S2V5KGFyZ3VtZW50KVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b3Byb3BlcnR5a2V5XG4gICAgICAgIGZ1bmN0aW9uIFRvUHJvcGVydHlLZXkoYXJndW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBUb1ByaW1pdGl2ZShhcmd1bWVudCwgMyAvKiBTdHJpbmcgKi8pO1xuICAgICAgICAgICAgaWYgKElzU3ltYm9sKGtleSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgIHJldHVybiBUb1N0cmluZyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuMiBUZXN0aW5nIGFuZCBDb21wYXJpc29uIE9wZXJhdGlvbnNcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdGVzdGluZy1hbmQtY29tcGFyaXNvbi1vcGVyYXRpb25zXG4gICAgICAgIC8vIDcuMi4yIElzQXJyYXkoYXJndW1lbnQpXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWlzYXJyYXlcbiAgICAgICAgZnVuY3Rpb24gSXNBcnJheShhcmd1bWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXlcbiAgICAgICAgICAgICAgICA/IEFycmF5LmlzQXJyYXkoYXJndW1lbnQpXG4gICAgICAgICAgICAgICAgOiBhcmd1bWVudCBpbnN0YW5jZW9mIE9iamVjdFxuICAgICAgICAgICAgICAgICAgICA/IGFyZ3VtZW50IGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICAgICAgICAgICAgOiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnQpID09PSBcIltvYmplY3QgQXJyYXldXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy4yLjMgSXNDYWxsYWJsZShhcmd1bWVudClcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXNjYWxsYWJsZVxuICAgICAgICBmdW5jdGlvbiBJc0NhbGxhYmxlKGFyZ3VtZW50KSB7XG4gICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGlzIGFuIGFwcHJveGltYXRpb24gYXMgd2UgY2Fubm90IGNoZWNrIGZvciBbW0NhbGxdXSBpbnRlcm5hbCBtZXRob2QuXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIGFyZ3VtZW50ID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy4yLjQgSXNDb25zdHJ1Y3Rvcihhcmd1bWVudClcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXNjb25zdHJ1Y3RvclxuICAgICAgICBmdW5jdGlvbiBJc0NvbnN0cnVjdG9yKGFyZ3VtZW50KSB7XG4gICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGlzIGFuIGFwcHJveGltYXRpb24gYXMgd2UgY2Fubm90IGNoZWNrIGZvciBbW0NvbnN0cnVjdF1dIGludGVybmFsIG1ldGhvZC5cbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgYXJndW1lbnQgPT09IFwiZnVuY3Rpb25cIjtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjIuNyBJc1Byb3BlcnR5S2V5KGFyZ3VtZW50KVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1pc3Byb3BlcnR5a2V5XG4gICAgICAgIGZ1bmN0aW9uIElzUHJvcGVydHlLZXkoYXJndW1lbnQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoVHlwZShhcmd1bWVudCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDMgLyogU3RyaW5nICovOiByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDQgLyogU3ltYm9sICovOiByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy4zIE9wZXJhdGlvbnMgb24gT2JqZWN0c1xuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vcGVyYXRpb25zLW9uLW9iamVjdHNcbiAgICAgICAgLy8gNy4zLjkgR2V0TWV0aG9kKFYsIFApXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWdldG1ldGhvZFxuICAgICAgICBmdW5jdGlvbiBHZXRNZXRob2QoViwgUCkge1xuICAgICAgICAgICAgdmFyIGZ1bmMgPSBWW1BdO1xuICAgICAgICAgICAgaWYgKGZ1bmMgPT09IHVuZGVmaW5lZCB8fCBmdW5jID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoIUlzQ2FsbGFibGUoZnVuYykpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy40IE9wZXJhdGlvbnMgb24gSXRlcmF0b3IgT2JqZWN0c1xuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vcGVyYXRpb25zLW9uLWl0ZXJhdG9yLW9iamVjdHNcbiAgICAgICAgZnVuY3Rpb24gR2V0SXRlcmF0b3Iob2JqKSB7XG4gICAgICAgICAgICB2YXIgbWV0aG9kID0gR2V0TWV0aG9kKG9iaiwgaXRlcmF0b3JTeW1ib2wpO1xuICAgICAgICAgICAgaWYgKCFJc0NhbGxhYmxlKG1ldGhvZCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpOyAvLyBmcm9tIENhbGxcbiAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IG1ldGhvZC5jYWxsKG9iaik7XG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KGl0ZXJhdG9yKSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICByZXR1cm4gaXRlcmF0b3I7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy40LjQgSXRlcmF0b3JWYWx1ZShpdGVyUmVzdWx0KVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvMjAxNi8jc2VjLWl0ZXJhdG9ydmFsdWVcbiAgICAgICAgZnVuY3Rpb24gSXRlcmF0b3JWYWx1ZShpdGVyUmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlclJlc3VsdC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjQuNSBJdGVyYXRvclN0ZXAoaXRlcmF0b3IpXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWl0ZXJhdG9yc3RlcFxuICAgICAgICBmdW5jdGlvbiBJdGVyYXRvclN0ZXAoaXRlcmF0b3IpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyBmYWxzZSA6IHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1pdGVyYXRvcmNsb3NlXG4gICAgICAgIGZ1bmN0aW9uIEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IpIHtcbiAgICAgICAgICAgIHZhciBmID0gaXRlcmF0b3JbXCJyZXR1cm5cIl07XG4gICAgICAgICAgICBpZiAoZilcbiAgICAgICAgICAgICAgICBmLmNhbGwoaXRlcmF0b3IpO1xuICAgICAgICB9XG4gICAgICAgIC8vIDkuMSBPcmRpbmFyeSBPYmplY3QgSW50ZXJuYWwgTWV0aG9kcyBhbmQgSW50ZXJuYWwgU2xvdHNcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb3JkaW5hcnktb2JqZWN0LWludGVybmFsLW1ldGhvZHMtYW5kLWludGVybmFsLXNsb3RzXG4gICAgICAgIC8vIDkuMS4xLjEgT3JkaW5hcnlHZXRQcm90b3R5cGVPZihPKVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vcmRpbmFyeWdldHByb3RvdHlwZW9mXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5R2V0UHJvdG90eXBlT2YoTykge1xuICAgICAgICAgICAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBPICE9PSBcImZ1bmN0aW9uXCIgfHwgTyA9PT0gZnVuY3Rpb25Qcm90b3R5cGUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3RvO1xuICAgICAgICAgICAgLy8gVHlwZVNjcmlwdCBkb2Vzbid0IHNldCBfX3Byb3RvX18gaW4gRVM1LCBhcyBpdCdzIG5vbi1zdGFuZGFyZC5cbiAgICAgICAgICAgIC8vIFRyeSB0byBkZXRlcm1pbmUgdGhlIHN1cGVyY2xhc3MgY29uc3RydWN0b3IuIENvbXBhdGlibGUgaW1wbGVtZW50YXRpb25zXG4gICAgICAgICAgICAvLyBtdXN0IGVpdGhlciBzZXQgX19wcm90b19fIG9uIGEgc3ViY2xhc3MgY29uc3RydWN0b3IgdG8gdGhlIHN1cGVyY2xhc3MgY29uc3RydWN0b3IsXG4gICAgICAgICAgICAvLyBvciBlbnN1cmUgZWFjaCBjbGFzcyBoYXMgYSB2YWxpZCBgY29uc3RydWN0b3JgIHByb3BlcnR5IG9uIGl0cyBwcm90b3R5cGUgdGhhdFxuICAgICAgICAgICAgLy8gcG9pbnRzIGJhY2sgdG8gdGhlIGNvbnN0cnVjdG9yLlxuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyBub3QgdGhlIHNhbWUgYXMgRnVuY3Rpb24uW1tQcm90b3R5cGVdXSwgdGhlbiB0aGlzIGlzIGRlZmluYXRlbHkgaW5oZXJpdGVkLlxuICAgICAgICAgICAgLy8gVGhpcyBpcyB0aGUgY2FzZSB3aGVuIGluIEVTNiBvciB3aGVuIHVzaW5nIF9fcHJvdG9fXyBpbiBhIGNvbXBhdGlibGUgYnJvd3Nlci5cbiAgICAgICAgICAgIGlmIChwcm90byAhPT0gZnVuY3Rpb25Qcm90b3R5cGUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3RvO1xuICAgICAgICAgICAgLy8gSWYgdGhlIHN1cGVyIHByb3RvdHlwZSBpcyBPYmplY3QucHJvdG90eXBlLCBudWxsLCBvciB1bmRlZmluZWQsIHRoZW4gd2UgY2Fubm90IGRldGVybWluZSB0aGUgaGVyaXRhZ2UuXG4gICAgICAgICAgICB2YXIgcHJvdG90eXBlID0gTy5wcm90b3R5cGU7XG4gICAgICAgICAgICB2YXIgcHJvdG90eXBlUHJvdG8gPSBwcm90b3R5cGUgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvdHlwZSk7XG4gICAgICAgICAgICBpZiAocHJvdG90eXBlUHJvdG8gPT0gbnVsbCB8fCBwcm90b3R5cGVQcm90byA9PT0gT2JqZWN0LnByb3RvdHlwZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvdG87XG4gICAgICAgICAgICAvLyBJZiB0aGUgY29uc3RydWN0b3Igd2FzIG5vdCBhIGZ1bmN0aW9uLCB0aGVuIHdlIGNhbm5vdCBkZXRlcm1pbmUgdGhlIGhlcml0YWdlLlxuICAgICAgICAgICAgdmFyIGNvbnN0cnVjdG9yID0gcHJvdG90eXBlUHJvdG8uY29uc3RydWN0b3I7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnN0cnVjdG9yICE9PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3RvO1xuICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBzb21lIGtpbmQgb2Ygc2VsZi1yZWZlcmVuY2UsIHRoZW4gd2UgY2Fubm90IGRldGVybWluZSB0aGUgaGVyaXRhZ2UuXG4gICAgICAgICAgICBpZiAoY29uc3RydWN0b3IgPT09IE8pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3RvO1xuICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIHByZXR0eSBnb29kIGd1ZXNzIGF0IHRoZSBoZXJpdGFnZS5cbiAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3RvcjtcbiAgICAgICAgfVxuICAgICAgICAvLyBuYWl2ZSBNYXAgc2hpbVxuICAgICAgICBmdW5jdGlvbiBDcmVhdGVNYXBQb2x5ZmlsbCgpIHtcbiAgICAgICAgICAgIHZhciBjYWNoZVNlbnRpbmVsID0ge307XG4gICAgICAgICAgICB2YXIgYXJyYXlTZW50aW5lbCA9IFtdO1xuICAgICAgICAgICAgdmFyIE1hcEl0ZXJhdG9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIE1hcEl0ZXJhdG9yKGtleXMsIHZhbHVlcywgc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzID0ga2V5cztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gdmFsdWVzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBNYXBJdGVyYXRvci5wcm90b3R5cGVbXCJAQGl0ZXJhdG9yXCJdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcbiAgICAgICAgICAgICAgICBNYXBJdGVyYXRvci5wcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcbiAgICAgICAgICAgICAgICBNYXBJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5faW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5fa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9zZWxlY3Rvcih0aGlzLl9rZXlzW2luZGV4XSwgdGhpcy5fdmFsdWVzW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggKyAxID49IHRoaXMuX2tleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kZXggPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzID0gYXJyYXlTZW50aW5lbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBhcnJheVNlbnRpbmVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiByZXN1bHQsIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgTWFwSXRlcmF0b3IucHJvdG90eXBlLnRocm93ID0gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRleCA9IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cyA9IGFycmF5U2VudGluZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBhcnJheVNlbnRpbmVsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgTWFwSXRlcmF0b3IucHJvdG90eXBlLnJldHVybiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kZXggPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXMgPSBhcnJheVNlbnRpbmVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gYXJyYXlTZW50aW5lbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogdmFsdWUsIGRvbmU6IHRydWUgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXBJdGVyYXRvcjtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICByZXR1cm4gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIE1hcCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVLZXkgPSBjYWNoZVNlbnRpbmVsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUluZGV4ID0gLTI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNYXAucHJvdG90eXBlLCBcInNpemVcIiwge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2tleXMubGVuZ3RoOyB9LFxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHRoaXMuX2ZpbmQoa2V5LCAvKmluc2VydCovIGZhbHNlKSA+PSAwOyB9O1xuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9maW5kKGtleSwgLyppbnNlcnQqLyBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleCA+PSAwID8gdGhpcy5fdmFsdWVzW2luZGV4XSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fZmluZChrZXksIC8qaW5zZXJ0Ki8gdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fZmluZChrZXksIC8qaW5zZXJ0Ki8gZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNpemUgPSB0aGlzLl9rZXlzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBpbmRleCArIDE7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzW2kgLSAxXSA9IHRoaXMuX2tleXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzW2kgLSAxXSA9IHRoaXMuX3ZhbHVlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXMubGVuZ3RoLS07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMubGVuZ3RoLS07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSB0aGlzLl9jYWNoZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlS2V5ID0gY2FjaGVTZW50aW5lbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUluZGV4ID0gLTI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUtleSA9IGNhY2hlU2VudGluZWw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlSW5kZXggPSAtMjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBNYXBJdGVyYXRvcih0aGlzLl9rZXlzLCB0aGlzLl92YWx1ZXMsIGdldEtleSk7IH07XG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTWFwSXRlcmF0b3IodGhpcy5fa2V5cywgdGhpcy5fdmFsdWVzLCBnZXRWYWx1ZSk7IH07XG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE1hcEl0ZXJhdG9yKHRoaXMuX2tleXMsIHRoaXMuX3ZhbHVlcywgZ2V0RW50cnkpOyB9O1xuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGVbXCJAQGl0ZXJhdG9yXCJdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5lbnRyaWVzKCk7IH07XG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmVudHJpZXMoKTsgfTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLl9maW5kID0gZnVuY3Rpb24gKGtleSwgaW5zZXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jYWNoZUtleSAhPT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUluZGV4ID0gdGhpcy5fa2V5cy5pbmRleE9mKHRoaXMuX2NhY2hlS2V5ID0ga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2FjaGVJbmRleCA8IDAgJiYgaW5zZXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUluZGV4ID0gdGhpcy5fa2V5cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlSW5kZXg7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWFwO1xuICAgICAgICAgICAgfSgpKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEtleShrZXksIF8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0VmFsdWUoXywgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRFbnRyeShrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtrZXksIHZhbHVlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBuYWl2ZSBTZXQgc2hpbVxuICAgICAgICBmdW5jdGlvbiBDcmVhdGVTZXRQb2x5ZmlsbCgpIHtcbiAgICAgICAgICAgIHJldHVybiAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gU2V0KCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXAgPSBuZXcgX01hcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2V0LnByb3RvdHlwZSwgXCJzaXplXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9tYXAuc2l6ZTsgfSxcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHRoaXMuX21hcC5oYXModmFsdWUpOyB9O1xuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB0aGlzLl9tYXAuc2V0KHZhbHVlLCB2YWx1ZSksIHRoaXM7IH07XG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHRoaXMuX21hcC5kZWxldGUodmFsdWUpOyB9O1xuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7IHRoaXMuX21hcC5jbGVhcigpOyB9O1xuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX21hcC5rZXlzKCk7IH07XG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9tYXAudmFsdWVzKCk7IH07XG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fbWFwLmVudHJpZXMoKTsgfTtcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlW1wiQEBpdGVyYXRvclwiXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMua2V5cygpOyB9O1xuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5rZXlzKCk7IH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIFNldDtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbmFpdmUgV2Vha01hcCBzaGltXG4gICAgICAgIGZ1bmN0aW9uIENyZWF0ZVdlYWtNYXBQb2x5ZmlsbCgpIHtcbiAgICAgICAgICAgIHZhciBVVUlEX1NJWkUgPSAxNjtcbiAgICAgICAgICAgIHZhciBrZXlzID0gSGFzaE1hcC5jcmVhdGUoKTtcbiAgICAgICAgICAgIHZhciByb290S2V5ID0gQ3JlYXRlVW5pcXVlS2V5KCk7XG4gICAgICAgICAgICByZXR1cm4gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIFdlYWtNYXAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleSA9IENyZWF0ZVVuaXF1ZUtleSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBXZWFrTWFwLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWJsZSA9IEdldE9yQ3JlYXRlV2Vha01hcFRhYmxlKHRhcmdldCwgLypjcmVhdGUqLyBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWJsZSAhPT0gdW5kZWZpbmVkID8gSGFzaE1hcC5oYXModGFibGUsIHRoaXMuX2tleSkgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFdlYWtNYXAucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhYmxlID0gR2V0T3JDcmVhdGVXZWFrTWFwVGFibGUodGFyZ2V0LCAvKmNyZWF0ZSovIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhYmxlICE9PSB1bmRlZmluZWQgPyBIYXNoTWFwLmdldCh0YWJsZSwgdGhpcy5fa2V5KSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFdlYWtNYXAucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh0YXJnZXQsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWJsZSA9IEdldE9yQ3JlYXRlV2Vha01hcFRhYmxlKHRhcmdldCwgLypjcmVhdGUqLyB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGFibGVbdGhpcy5fa2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFdlYWtNYXAucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhYmxlID0gR2V0T3JDcmVhdGVXZWFrTWFwVGFibGUodGFyZ2V0LCAvKmNyZWF0ZSovIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhYmxlICE9PSB1bmRlZmluZWQgPyBkZWxldGUgdGFibGVbdGhpcy5fa2V5XSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgV2Vha01hcC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IG5vdCBhIHJlYWwgY2xlYXIsIGp1c3QgbWFrZXMgdGhlIHByZXZpb3VzIGRhdGEgdW5yZWFjaGFibGVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5ID0gQ3JlYXRlVW5pcXVlS2V5KCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gV2Vha01hcDtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICBmdW5jdGlvbiBDcmVhdGVVbmlxdWVLZXkoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleTtcbiAgICAgICAgICAgICAgICBkb1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSBcIkBAV2Vha01hcEBAXCIgKyBDcmVhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKEhhc2hNYXAuaGFzKGtleXMsIGtleSkpO1xuICAgICAgICAgICAgICAgIGtleXNba2V5XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIEdldE9yQ3JlYXRlV2Vha01hcFRhYmxlKHRhcmdldCwgY3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFoYXNPd24uY2FsbCh0YXJnZXQsIHJvb3RLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY3JlYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcm9vdEtleSwgeyB2YWx1ZTogSGFzaE1hcC5jcmVhdGUoKSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtyb290S2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIEZpbGxSYW5kb21CeXRlcyhidWZmZXIsIHNpemUpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7ICsraSlcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyW2ldID0gTWF0aC5yYW5kb20oKSAqIDB4ZmYgfCAwO1xuICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBHZW5SYW5kb21CeXRlcyhzaXplKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBVaW50OEFycmF5ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjcnlwdG8gIT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheShzaXplKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbXNDcnlwdG8gIT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KHNpemUpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEZpbGxSYW5kb21CeXRlcyhuZXcgVWludDhBcnJheShzaXplKSwgc2l6ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBGaWxsUmFuZG9tQnl0ZXMobmV3IEFycmF5KHNpemUpLCBzaXplKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIENyZWF0ZVVVSUQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBHZW5SYW5kb21CeXRlcyhVVUlEX1NJWkUpO1xuICAgICAgICAgICAgICAgIC8vIG1hcmsgYXMgcmFuZG9tIC0gUkZDIDQxMjIgwqcgNC40XG4gICAgICAgICAgICAgICAgZGF0YVs2XSA9IGRhdGFbNl0gJiAweDRmIHwgMHg0MDtcbiAgICAgICAgICAgICAgICBkYXRhWzhdID0gZGF0YVs4XSAmIDB4YmYgfCAweDgwO1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIG9mZnNldCA9IDA7IG9mZnNldCA8IFVVSURfU0laRTsgKytvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ5dGUgPSBkYXRhW29mZnNldF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPT09IDQgfHwgb2Zmc2V0ID09PSA2IHx8IG9mZnNldCA9PT0gOClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIi1cIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ5dGUgPCAxNilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIjBcIjtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGJ5dGUudG9TdHJpbmcoMTYpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gdXNlcyBhIGhldXJpc3RpYyB1c2VkIGJ5IHY4IGFuZCBjaGFrcmEgdG8gZm9yY2UgYW4gb2JqZWN0IGludG8gZGljdGlvbmFyeSBtb2RlLlxuICAgICAgICBmdW5jdGlvbiBNYWtlRGljdGlvbmFyeShvYmopIHtcbiAgICAgICAgICAgIG9iai5fXyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGRlbGV0ZSBvYmouX187XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG4gICAgfSk7XG59KShSZWZsZWN0IHx8IChSZWZsZWN0ID0ge30pKTtcbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNNZXJnZWFibGVPYmplY3QgPSBmdW5jdGlvbiBpc01lcmdlYWJsZU9iamVjdCh2YWx1ZSkge1xuXHRyZXR1cm4gaXNOb25OdWxsT2JqZWN0KHZhbHVlKVxuXHRcdCYmICFpc1NwZWNpYWwodmFsdWUpXG59O1xuXG5mdW5jdGlvbiBpc05vbk51bGxPYmplY3QodmFsdWUpIHtcblx0cmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0J1xufVxuXG5mdW5jdGlvbiBpc1NwZWNpYWwodmFsdWUpIHtcblx0dmFyIHN0cmluZ1ZhbHVlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcblxuXHRyZXR1cm4gc3RyaW5nVmFsdWUgPT09ICdbb2JqZWN0IFJlZ0V4cF0nXG5cdFx0fHwgc3RyaW5nVmFsdWUgPT09ICdbb2JqZWN0IERhdGVdJ1xuXHRcdHx8IGlzUmVhY3RFbGVtZW50KHZhbHVlKVxufVxuXG4vLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2Jsb2IvYjVhYzk2M2ZiNzkxZDEyOThlN2YzOTYyMzYzODNiYzk1NWY5MTZjMS9zcmMvaXNvbW9ycGhpYy9jbGFzc2ljL2VsZW1lbnQvUmVhY3RFbGVtZW50LmpzI0wyMS1MMjVcbnZhciBjYW5Vc2VTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5mb3I7XG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gY2FuVXNlU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIDogMHhlYWM3O1xuXG5mdW5jdGlvbiBpc1JlYWN0RWxlbWVudCh2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRVxufVxuXG5mdW5jdGlvbiBlbXB0eVRhcmdldCh2YWwpIHtcblx0cmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKSA/IFtdIDoge31cbn1cblxuZnVuY3Rpb24gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQodmFsdWUsIG9wdGlvbnMpIHtcblx0cmV0dXJuIChvcHRpb25zLmNsb25lICE9PSBmYWxzZSAmJiBvcHRpb25zLmlzTWVyZ2VhYmxlT2JqZWN0KHZhbHVlKSlcblx0XHQ/IGRlZXBtZXJnZShlbXB0eVRhcmdldCh2YWx1ZSksIHZhbHVlLCBvcHRpb25zKVxuXHRcdDogdmFsdWVcbn1cblxuZnVuY3Rpb24gZGVmYXVsdEFycmF5TWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpIHtcblx0cmV0dXJuIHRhcmdldC5jb25jYXQoc291cmNlKS5tYXAoZnVuY3Rpb24oZWxlbWVudCkge1xuXHRcdHJldHVybiBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZChlbGVtZW50LCBvcHRpb25zKVxuXHR9KVxufVxuXG5mdW5jdGlvbiBnZXRNZXJnZUZ1bmN0aW9uKGtleSwgb3B0aW9ucykge1xuXHRpZiAoIW9wdGlvbnMuY3VzdG9tTWVyZ2UpIHtcblx0XHRyZXR1cm4gZGVlcG1lcmdlXG5cdH1cblx0dmFyIGN1c3RvbU1lcmdlID0gb3B0aW9ucy5jdXN0b21NZXJnZShrZXkpO1xuXHRyZXR1cm4gdHlwZW9mIGN1c3RvbU1lcmdlID09PSAnZnVuY3Rpb24nID8gY3VzdG9tTWVyZ2UgOiBkZWVwbWVyZ2Vcbn1cblxuZnVuY3Rpb24gZ2V0RW51bWVyYWJsZU93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpIHtcblx0cmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHNcblx0XHQ/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KS5maWx0ZXIoZnVuY3Rpb24oc3ltYm9sKSB7XG5cdFx0XHRyZXR1cm4gdGFyZ2V0LnByb3BlcnR5SXNFbnVtZXJhYmxlKHN5bWJvbClcblx0XHR9KVxuXHRcdDogW11cbn1cblxuZnVuY3Rpb24gZ2V0S2V5cyh0YXJnZXQpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKHRhcmdldCkuY29uY2F0KGdldEVudW1lcmFibGVPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSlcbn1cblxuZnVuY3Rpb24gcHJvcGVydHlJc09uT2JqZWN0KG9iamVjdCwgcHJvcGVydHkpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gcHJvcGVydHkgaW4gb2JqZWN0XG5cdH0gY2F0Y2goXykge1xuXHRcdHJldHVybiBmYWxzZVxuXHR9XG59XG5cbi8vIFByb3RlY3RzIGZyb20gcHJvdG90eXBlIHBvaXNvbmluZyBhbmQgdW5leHBlY3RlZCBtZXJnaW5nIHVwIHRoZSBwcm90b3R5cGUgY2hhaW4uXG5mdW5jdGlvbiBwcm9wZXJ0eUlzVW5zYWZlKHRhcmdldCwga2V5KSB7XG5cdHJldHVybiBwcm9wZXJ0eUlzT25PYmplY3QodGFyZ2V0LCBrZXkpIC8vIFByb3BlcnRpZXMgYXJlIHNhZmUgdG8gbWVyZ2UgaWYgdGhleSBkb24ndCBleGlzdCBpbiB0aGUgdGFyZ2V0IHlldCxcblx0XHQmJiAhKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRhcmdldCwga2V5KSAvLyB1bnNhZmUgaWYgdGhleSBleGlzdCB1cCB0aGUgcHJvdG90eXBlIGNoYWluLFxuXHRcdFx0JiYgT2JqZWN0LnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodGFyZ2V0LCBrZXkpKSAvLyBhbmQgYWxzbyB1bnNhZmUgaWYgdGhleSdyZSBub25lbnVtZXJhYmxlLlxufVxuXG5mdW5jdGlvbiBtZXJnZU9iamVjdCh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuXHR2YXIgZGVzdGluYXRpb24gPSB7fTtcblx0aWYgKG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3QodGFyZ2V0KSkge1xuXHRcdGdldEtleXModGFyZ2V0KS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuXHRcdFx0ZGVzdGluYXRpb25ba2V5XSA9IGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKHRhcmdldFtrZXldLCBvcHRpb25zKTtcblx0XHR9KTtcblx0fVxuXHRnZXRLZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcblx0XHRpZiAocHJvcGVydHlJc1Vuc2FmZSh0YXJnZXQsIGtleSkpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdGlmIChwcm9wZXJ0eUlzT25PYmplY3QodGFyZ2V0LCBrZXkpICYmIG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3Qoc291cmNlW2tleV0pKSB7XG5cdFx0XHRkZXN0aW5hdGlvbltrZXldID0gZ2V0TWVyZ2VGdW5jdGlvbihrZXksIG9wdGlvbnMpKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSwgb3B0aW9ucyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlc3RpbmF0aW9uW2tleV0gPSBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZChzb3VyY2Vba2V5XSwgb3B0aW9ucyk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIGRlc3RpbmF0aW9uXG59XG5cbmZ1bmN0aW9uIGRlZXBtZXJnZSh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0b3B0aW9ucy5hcnJheU1lcmdlID0gb3B0aW9ucy5hcnJheU1lcmdlIHx8IGRlZmF1bHRBcnJheU1lcmdlO1xuXHRvcHRpb25zLmlzTWVyZ2VhYmxlT2JqZWN0ID0gb3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdCB8fCBpc01lcmdlYWJsZU9iamVjdDtcblx0Ly8gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQgaXMgYWRkZWQgdG8gYG9wdGlvbnNgIHNvIHRoYXQgY3VzdG9tIGFycmF5TWVyZ2UoKVxuXHQvLyBpbXBsZW1lbnRhdGlvbnMgY2FuIHVzZSBpdC4gVGhlIGNhbGxlciBtYXkgbm90IHJlcGxhY2UgaXQuXG5cdG9wdGlvbnMuY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQgPSBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZDtcblxuXHR2YXIgc291cmNlSXNBcnJheSA9IEFycmF5LmlzQXJyYXkoc291cmNlKTtcblx0dmFyIHRhcmdldElzQXJyYXkgPSBBcnJheS5pc0FycmF5KHRhcmdldCk7XG5cdHZhciBzb3VyY2VBbmRUYXJnZXRUeXBlc01hdGNoID0gc291cmNlSXNBcnJheSA9PT0gdGFyZ2V0SXNBcnJheTtcblxuXHRpZiAoIXNvdXJjZUFuZFRhcmdldFR5cGVzTWF0Y2gpIHtcblx0XHRyZXR1cm4gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQoc291cmNlLCBvcHRpb25zKVxuXHR9IGVsc2UgaWYgKHNvdXJjZUlzQXJyYXkpIHtcblx0XHRyZXR1cm4gb3B0aW9ucy5hcnJheU1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKVxuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBtZXJnZU9iamVjdCh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucylcblx0fVxufVxuXG5kZWVwbWVyZ2UuYWxsID0gZnVuY3Rpb24gZGVlcG1lcmdlQWxsKGFycmF5LCBvcHRpb25zKSB7XG5cdGlmICghQXJyYXkuaXNBcnJheShhcnJheSkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2ZpcnN0IGFyZ3VtZW50IHNob3VsZCBiZSBhbiBhcnJheScpXG5cdH1cblxuXHRyZXR1cm4gYXJyYXkucmVkdWNlKGZ1bmN0aW9uKHByZXYsIG5leHQpIHtcblx0XHRyZXR1cm4gZGVlcG1lcmdlKHByZXYsIG5leHQsIG9wdGlvbnMpXG5cdH0sIHt9KVxufTtcblxudmFyIGRlZXBtZXJnZV8xID0gZGVlcG1lcmdlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZXBtZXJnZV8xO1xuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblwidXNlIHN0cmljdFwiO1xuXG5jb25zdCB1dGlsID0gcmVxdWlyZShcInV0aWxcIik7XG5cbmNvbnN0IGRlcHJlY2F0ZUNvbnRleHQgPSB1dGlsLmRlcHJlY2F0ZSgoKSA9PiB7fSxcblwiSG9vay5jb250ZXh0IGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZFwiKTtcblxuY29uc3QgQ0FMTF9ERUxFR0FURSA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcblx0dGhpcy5jYWxsID0gdGhpcy5fY3JlYXRlQ2FsbChcInN5bmNcIik7XG5cdHJldHVybiB0aGlzLmNhbGwoLi4uYXJncyk7XG59O1xuY29uc3QgQ0FMTF9BU1lOQ19ERUxFR0FURSA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcblx0dGhpcy5jYWxsQXN5bmMgPSB0aGlzLl9jcmVhdGVDYWxsKFwiYXN5bmNcIik7XG5cdHJldHVybiB0aGlzLmNhbGxBc3luYyguLi5hcmdzKTtcbn07XG5jb25zdCBQUk9NSVNFX0RFTEVHQVRFID0gZnVuY3Rpb24oLi4uYXJncykge1xuXHR0aGlzLnByb21pc2UgPSB0aGlzLl9jcmVhdGVDYWxsKFwicHJvbWlzZVwiKTtcblx0cmV0dXJuIHRoaXMucHJvbWlzZSguLi5hcmdzKTtcbn07XG5cbmNsYXNzIEhvb2sge1xuXHRjb25zdHJ1Y3RvcihhcmdzID0gW10sIG5hbWUgPSB1bmRlZmluZWQpIHtcblx0XHR0aGlzLl9hcmdzID0gYXJncztcblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xuXHRcdHRoaXMudGFwcyA9IFtdO1xuXHRcdHRoaXMuaW50ZXJjZXB0b3JzID0gW107XG5cdFx0dGhpcy5fY2FsbCA9IENBTExfREVMRUdBVEU7XG5cdFx0dGhpcy5jYWxsID0gQ0FMTF9ERUxFR0FURTtcblx0XHR0aGlzLl9jYWxsQXN5bmMgPSBDQUxMX0FTWU5DX0RFTEVHQVRFO1xuXHRcdHRoaXMuY2FsbEFzeW5jID0gQ0FMTF9BU1lOQ19ERUxFR0FURTtcblx0XHR0aGlzLl9wcm9taXNlID0gUFJPTUlTRV9ERUxFR0FURTtcblx0XHR0aGlzLnByb21pc2UgPSBQUk9NSVNFX0RFTEVHQVRFO1xuXHRcdHRoaXMuX3ggPSB1bmRlZmluZWQ7XG5cblx0XHR0aGlzLmNvbXBpbGUgPSB0aGlzLmNvbXBpbGU7XG5cdFx0dGhpcy50YXAgPSB0aGlzLnRhcDtcblx0XHR0aGlzLnRhcEFzeW5jID0gdGhpcy50YXBBc3luYztcblx0XHR0aGlzLnRhcFByb21pc2UgPSB0aGlzLnRhcFByb21pc2U7XG5cdH1cblxuXHRjb21waWxlKG9wdGlvbnMpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJBYnN0cmFjdDogc2hvdWxkIGJlIG92ZXJyaWRkZW5cIik7XG5cdH1cblxuXHRfY3JlYXRlQ2FsbCh0eXBlKSB7XG5cdFx0cmV0dXJuIHRoaXMuY29tcGlsZSh7XG5cdFx0XHR0YXBzOiB0aGlzLnRhcHMsXG5cdFx0XHRpbnRlcmNlcHRvcnM6IHRoaXMuaW50ZXJjZXB0b3JzLFxuXHRcdFx0YXJnczogdGhpcy5fYXJncyxcblx0XHRcdHR5cGU6IHR5cGVcblx0XHR9KTtcblx0fVxuXG5cdF90YXAodHlwZSwgb3B0aW9ucywgZm4pIHtcblx0XHRpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdG9wdGlvbnMgPSB7XG5cdFx0XHRcdG5hbWU6IG9wdGlvbnMudHJpbSgpXG5cdFx0XHR9O1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMgIT09IFwib2JqZWN0XCIgfHwgb3B0aW9ucyA9PT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB0YXAgb3B0aW9uc1wiKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zLm5hbWUgIT09IFwic3RyaW5nXCIgfHwgb3B0aW9ucy5uYW1lID09PSBcIlwiKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIG5hbWUgZm9yIHRhcFwiKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zLmNvbnRleHQgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdGRlcHJlY2F0ZUNvbnRleHQoKTtcblx0XHR9XG5cdFx0b3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oeyB0eXBlLCBmbiB9LCBvcHRpb25zKTtcblx0XHRvcHRpb25zID0gdGhpcy5fcnVuUmVnaXN0ZXJJbnRlcmNlcHRvcnMob3B0aW9ucyk7XG5cdFx0dGhpcy5faW5zZXJ0KG9wdGlvbnMpO1xuXHR9XG5cblx0dGFwKG9wdGlvbnMsIGZuKSB7XG5cdFx0dGhpcy5fdGFwKFwic3luY1wiLCBvcHRpb25zLCBmbik7XG5cdH1cblxuXHR0YXBBc3luYyhvcHRpb25zLCBmbikge1xuXHRcdHRoaXMuX3RhcChcImFzeW5jXCIsIG9wdGlvbnMsIGZuKTtcblx0fVxuXG5cdHRhcFByb21pc2Uob3B0aW9ucywgZm4pIHtcblx0XHR0aGlzLl90YXAoXCJwcm9taXNlXCIsIG9wdGlvbnMsIGZuKTtcblx0fVxuXG5cdF9ydW5SZWdpc3RlckludGVyY2VwdG9ycyhvcHRpb25zKSB7XG5cdFx0Zm9yIChjb25zdCBpbnRlcmNlcHRvciBvZiB0aGlzLmludGVyY2VwdG9ycykge1xuXHRcdFx0aWYgKGludGVyY2VwdG9yLnJlZ2lzdGVyKSB7XG5cdFx0XHRcdGNvbnN0IG5ld09wdGlvbnMgPSBpbnRlcmNlcHRvci5yZWdpc3RlcihvcHRpb25zKTtcblx0XHRcdFx0aWYgKG5ld09wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdG9wdGlvbnMgPSBuZXdPcHRpb25zO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvcHRpb25zO1xuXHR9XG5cblx0d2l0aE9wdGlvbnMob3B0aW9ucykge1xuXHRcdGNvbnN0IG1lcmdlT3B0aW9ucyA9IG9wdCA9PlxuXHRcdFx0T2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywgdHlwZW9mIG9wdCA9PT0gXCJzdHJpbmdcIiA/IHsgbmFtZTogb3B0IH0gOiBvcHQpO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdG5hbWU6IHRoaXMubmFtZSxcblx0XHRcdHRhcDogKG9wdCwgZm4pID0+IHRoaXMudGFwKG1lcmdlT3B0aW9ucyhvcHQpLCBmbiksXG5cdFx0XHR0YXBBc3luYzogKG9wdCwgZm4pID0+IHRoaXMudGFwQXN5bmMobWVyZ2VPcHRpb25zKG9wdCksIGZuKSxcblx0XHRcdHRhcFByb21pc2U6IChvcHQsIGZuKSA9PiB0aGlzLnRhcFByb21pc2UobWVyZ2VPcHRpb25zKG9wdCksIGZuKSxcblx0XHRcdGludGVyY2VwdDogaW50ZXJjZXB0b3IgPT4gdGhpcy5pbnRlcmNlcHQoaW50ZXJjZXB0b3IpLFxuXHRcdFx0aXNVc2VkOiAoKSA9PiB0aGlzLmlzVXNlZCgpLFxuXHRcdFx0d2l0aE9wdGlvbnM6IG9wdCA9PiB0aGlzLndpdGhPcHRpb25zKG1lcmdlT3B0aW9ucyhvcHQpKVxuXHRcdH07XG5cdH1cblxuXHRpc1VzZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMudGFwcy5sZW5ndGggPiAwIHx8IHRoaXMuaW50ZXJjZXB0b3JzLmxlbmd0aCA+IDA7XG5cdH1cblxuXHRpbnRlcmNlcHQoaW50ZXJjZXB0b3IpIHtcblx0XHR0aGlzLl9yZXNldENvbXBpbGF0aW9uKCk7XG5cdFx0dGhpcy5pbnRlcmNlcHRvcnMucHVzaChPYmplY3QuYXNzaWduKHt9LCBpbnRlcmNlcHRvcikpO1xuXHRcdGlmIChpbnRlcmNlcHRvci5yZWdpc3Rlcikge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRhcHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dGhpcy50YXBzW2ldID0gaW50ZXJjZXB0b3IucmVnaXN0ZXIodGhpcy50YXBzW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRfcmVzZXRDb21waWxhdGlvbigpIHtcblx0XHR0aGlzLmNhbGwgPSB0aGlzLl9jYWxsO1xuXHRcdHRoaXMuY2FsbEFzeW5jID0gdGhpcy5fY2FsbEFzeW5jO1xuXHRcdHRoaXMucHJvbWlzZSA9IHRoaXMuX3Byb21pc2U7XG5cdH1cblxuXHRfaW5zZXJ0KGl0ZW0pIHtcblx0XHR0aGlzLl9yZXNldENvbXBpbGF0aW9uKCk7XG5cdFx0bGV0IGJlZm9yZTtcblx0XHRpZiAodHlwZW9mIGl0ZW0uYmVmb3JlID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRiZWZvcmUgPSBuZXcgU2V0KFtpdGVtLmJlZm9yZV0pO1xuXHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpdGVtLmJlZm9yZSkpIHtcblx0XHRcdGJlZm9yZSA9IG5ldyBTZXQoaXRlbS5iZWZvcmUpO1xuXHRcdH1cblx0XHRsZXQgc3RhZ2UgPSAwO1xuXHRcdGlmICh0eXBlb2YgaXRlbS5zdGFnZSA9PT0gXCJudW1iZXJcIikge1xuXHRcdFx0c3RhZ2UgPSBpdGVtLnN0YWdlO1xuXHRcdH1cblx0XHRsZXQgaSA9IHRoaXMudGFwcy5sZW5ndGg7XG5cdFx0d2hpbGUgKGkgPiAwKSB7XG5cdFx0XHRpLS07XG5cdFx0XHRjb25zdCB4ID0gdGhpcy50YXBzW2ldO1xuXHRcdFx0dGhpcy50YXBzW2kgKyAxXSA9IHg7XG5cdFx0XHRjb25zdCB4U3RhZ2UgPSB4LnN0YWdlIHx8IDA7XG5cdFx0XHRpZiAoYmVmb3JlKSB7XG5cdFx0XHRcdGlmIChiZWZvcmUuaGFzKHgubmFtZSkpIHtcblx0XHRcdFx0XHRiZWZvcmUuZGVsZXRlKHgubmFtZSk7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGJlZm9yZS5zaXplID4gMCkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoeFN0YWdlID4gc3RhZ2UpIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cdFx0XHRpKys7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0dGhpcy50YXBzW2ldID0gaXRlbTtcblx0fVxufVxuXG5PYmplY3Quc2V0UHJvdG90eXBlT2YoSG9vay5wcm90b3R5cGUsIG51bGwpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhvb2s7XG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNsYXNzIEhvb2tDb2RlRmFjdG9yeSB7XG5cdGNvbnN0cnVjdG9yKGNvbmZpZykge1xuXHRcdHRoaXMuY29uZmlnID0gY29uZmlnO1xuXHRcdHRoaXMub3B0aW9ucyA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLl9hcmdzID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0Y3JlYXRlKG9wdGlvbnMpIHtcblx0XHR0aGlzLmluaXQob3B0aW9ucyk7XG5cdFx0bGV0IGZuO1xuXHRcdHN3aXRjaCAodGhpcy5vcHRpb25zLnR5cGUpIHtcblx0XHRcdGNhc2UgXCJzeW5jXCI6XG5cdFx0XHRcdGZuID0gbmV3IEZ1bmN0aW9uKFxuXHRcdFx0XHRcdHRoaXMuYXJncygpLFxuXHRcdFx0XHRcdCdcInVzZSBzdHJpY3RcIjtcXG4nICtcblx0XHRcdFx0XHRcdHRoaXMuaGVhZGVyKCkgK1xuXHRcdFx0XHRcdFx0dGhpcy5jb250ZW50V2l0aEludGVyY2VwdG9ycyh7XG5cdFx0XHRcdFx0XHRcdG9uRXJyb3I6IGVyciA9PiBgdGhyb3cgJHtlcnJ9O1xcbmAsXG5cdFx0XHRcdFx0XHRcdG9uUmVzdWx0OiByZXN1bHQgPT4gYHJldHVybiAke3Jlc3VsdH07XFxuYCxcblx0XHRcdFx0XHRcdFx0cmVzdWx0UmV0dXJuczogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0b25Eb25lOiAoKSA9PiBcIlwiLFxuXHRcdFx0XHRcdFx0XHRyZXRocm93SWZQb3NzaWJsZTogdHJ1ZVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiYXN5bmNcIjpcblx0XHRcdFx0Zm4gPSBuZXcgRnVuY3Rpb24oXG5cdFx0XHRcdFx0dGhpcy5hcmdzKHtcblx0XHRcdFx0XHRcdGFmdGVyOiBcIl9jYWxsYmFja1wiXG5cdFx0XHRcdFx0fSksXG5cdFx0XHRcdFx0J1widXNlIHN0cmljdFwiO1xcbicgK1xuXHRcdFx0XHRcdFx0dGhpcy5oZWFkZXIoKSArXG5cdFx0XHRcdFx0XHR0aGlzLmNvbnRlbnRXaXRoSW50ZXJjZXB0b3JzKHtcblx0XHRcdFx0XHRcdFx0b25FcnJvcjogZXJyID0+IGBfY2FsbGJhY2soJHtlcnJ9KTtcXG5gLFxuXHRcdFx0XHRcdFx0XHRvblJlc3VsdDogcmVzdWx0ID0+IGBfY2FsbGJhY2sobnVsbCwgJHtyZXN1bHR9KTtcXG5gLFxuXHRcdFx0XHRcdFx0XHRvbkRvbmU6ICgpID0+IFwiX2NhbGxiYWNrKCk7XFxuXCJcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInByb21pc2VcIjpcblx0XHRcdFx0bGV0IGVycm9ySGVscGVyVXNlZCA9IGZhbHNlO1xuXHRcdFx0XHRjb25zdCBjb250ZW50ID0gdGhpcy5jb250ZW50V2l0aEludGVyY2VwdG9ycyh7XG5cdFx0XHRcdFx0b25FcnJvcjogZXJyID0+IHtcblx0XHRcdFx0XHRcdGVycm9ySGVscGVyVXNlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRyZXR1cm4gYF9lcnJvcigke2Vycn0pO1xcbmA7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRvblJlc3VsdDogcmVzdWx0ID0+IGBfcmVzb2x2ZSgke3Jlc3VsdH0pO1xcbmAsXG5cdFx0XHRcdFx0b25Eb25lOiAoKSA9PiBcIl9yZXNvbHZlKCk7XFxuXCJcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGxldCBjb2RlID0gXCJcIjtcblx0XHRcdFx0Y29kZSArPSAnXCJ1c2Ugc3RyaWN0XCI7XFxuJztcblx0XHRcdFx0Y29kZSArPSB0aGlzLmhlYWRlcigpO1xuXHRcdFx0XHRjb2RlICs9IFwicmV0dXJuIG5ldyBQcm9taXNlKChmdW5jdGlvbihfcmVzb2x2ZSwgX3JlamVjdCkge1xcblwiO1xuXHRcdFx0XHRpZiAoZXJyb3JIZWxwZXJVc2VkKSB7XG5cdFx0XHRcdFx0Y29kZSArPSBcInZhciBfc3luYyA9IHRydWU7XFxuXCI7XG5cdFx0XHRcdFx0Y29kZSArPSBcImZ1bmN0aW9uIF9lcnJvcihfZXJyKSB7XFxuXCI7XG5cdFx0XHRcdFx0Y29kZSArPSBcImlmKF9zeW5jKVxcblwiO1xuXHRcdFx0XHRcdGNvZGUgKz1cblx0XHRcdFx0XHRcdFwiX3Jlc29sdmUoUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoZnVuY3Rpb24oKSB7IHRocm93IF9lcnI7IH0pKSk7XFxuXCI7XG5cdFx0XHRcdFx0Y29kZSArPSBcImVsc2VcXG5cIjtcblx0XHRcdFx0XHRjb2RlICs9IFwiX3JlamVjdChfZXJyKTtcXG5cIjtcblx0XHRcdFx0XHRjb2RlICs9IFwifTtcXG5cIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRjb2RlICs9IGNvbnRlbnQ7XG5cdFx0XHRcdGlmIChlcnJvckhlbHBlclVzZWQpIHtcblx0XHRcdFx0XHRjb2RlICs9IFwiX3N5bmMgPSBmYWxzZTtcXG5cIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRjb2RlICs9IFwifSkpO1xcblwiO1xuXHRcdFx0XHRmbiA9IG5ldyBGdW5jdGlvbih0aGlzLmFyZ3MoKSwgY29kZSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHR0aGlzLmRlaW5pdCgpO1xuXHRcdHJldHVybiBmbjtcblx0fVxuXG5cdHNldHVwKGluc3RhbmNlLCBvcHRpb25zKSB7XG5cdFx0aW5zdGFuY2UuX3ggPSBvcHRpb25zLnRhcHMubWFwKHQgPT4gdC5mbik7XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHt7IHR5cGU6IFwic3luY1wiIHwgXCJwcm9taXNlXCIgfCBcImFzeW5jXCIsIHRhcHM6IEFycmF5PFRhcD4sIGludGVyY2VwdG9yczogQXJyYXk8SW50ZXJjZXB0b3I+IH19IG9wdGlvbnNcblx0ICovXG5cdGluaXQob3B0aW9ucykge1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdFx0dGhpcy5fYXJncyA9IG9wdGlvbnMuYXJncy5zbGljZSgpO1xuXHR9XG5cblx0ZGVpbml0KCkge1xuXHRcdHRoaXMub3B0aW9ucyA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLl9hcmdzID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0Y29udGVudFdpdGhJbnRlcmNlcHRvcnMob3B0aW9ucykge1xuXHRcdGlmICh0aGlzLm9wdGlvbnMuaW50ZXJjZXB0b3JzLmxlbmd0aCA+IDApIHtcblx0XHRcdGNvbnN0IG9uRXJyb3IgPSBvcHRpb25zLm9uRXJyb3I7XG5cdFx0XHRjb25zdCBvblJlc3VsdCA9IG9wdGlvbnMub25SZXN1bHQ7XG5cdFx0XHRjb25zdCBvbkRvbmUgPSBvcHRpb25zLm9uRG9uZTtcblx0XHRcdGxldCBjb2RlID0gXCJcIjtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vcHRpb25zLmludGVyY2VwdG9ycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb25zdCBpbnRlcmNlcHRvciA9IHRoaXMub3B0aW9ucy5pbnRlcmNlcHRvcnNbaV07XG5cdFx0XHRcdGlmIChpbnRlcmNlcHRvci5jYWxsKSB7XG5cdFx0XHRcdFx0Y29kZSArPSBgJHt0aGlzLmdldEludGVyY2VwdG9yKGkpfS5jYWxsKCR7dGhpcy5hcmdzKHtcblx0XHRcdFx0XHRcdGJlZm9yZTogaW50ZXJjZXB0b3IuY29udGV4dCA/IFwiX2NvbnRleHRcIiA6IHVuZGVmaW5lZFxuXHRcdFx0XHRcdH0pfSk7XFxuYDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Y29kZSArPSB0aGlzLmNvbnRlbnQoXG5cdFx0XHRcdE9iamVjdC5hc3NpZ24ob3B0aW9ucywge1xuXHRcdFx0XHRcdG9uRXJyb3I6XG5cdFx0XHRcdFx0XHRvbkVycm9yICYmXG5cdFx0XHRcdFx0XHQoZXJyID0+IHtcblx0XHRcdFx0XHRcdFx0bGV0IGNvZGUgPSBcIlwiO1xuXHRcdFx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5pbnRlcmNlcHRvcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBpbnRlcmNlcHRvciA9IHRoaXMub3B0aW9ucy5pbnRlcmNlcHRvcnNbaV07XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGludGVyY2VwdG9yLmVycm9yKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb2RlICs9IGAke3RoaXMuZ2V0SW50ZXJjZXB0b3IoaSl9LmVycm9yKCR7ZXJyfSk7XFxuYDtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0Y29kZSArPSBvbkVycm9yKGVycik7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBjb2RlO1xuXHRcdFx0XHRcdFx0fSksXG5cdFx0XHRcdFx0b25SZXN1bHQ6XG5cdFx0XHRcdFx0XHRvblJlc3VsdCAmJlxuXHRcdFx0XHRcdFx0KHJlc3VsdCA9PiB7XG5cdFx0XHRcdFx0XHRcdGxldCBjb2RlID0gXCJcIjtcblx0XHRcdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMuaW50ZXJjZXB0b3JzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgaW50ZXJjZXB0b3IgPSB0aGlzLm9wdGlvbnMuaW50ZXJjZXB0b3JzW2ldO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChpbnRlcmNlcHRvci5yZXN1bHQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvZGUgKz0gYCR7dGhpcy5nZXRJbnRlcmNlcHRvcihpKX0ucmVzdWx0KCR7cmVzdWx0fSk7XFxuYDtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0Y29kZSArPSBvblJlc3VsdChyZXN1bHQpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gY29kZTtcblx0XHRcdFx0XHRcdH0pLFxuXHRcdFx0XHRcdG9uRG9uZTpcblx0XHRcdFx0XHRcdG9uRG9uZSAmJlxuXHRcdFx0XHRcdFx0KCgpID0+IHtcblx0XHRcdFx0XHRcdFx0bGV0IGNvZGUgPSBcIlwiO1xuXHRcdFx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5pbnRlcmNlcHRvcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBpbnRlcmNlcHRvciA9IHRoaXMub3B0aW9ucy5pbnRlcmNlcHRvcnNbaV07XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGludGVyY2VwdG9yLmRvbmUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvZGUgKz0gYCR7dGhpcy5nZXRJbnRlcmNlcHRvcihpKX0uZG9uZSgpO1xcbmA7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGNvZGUgKz0gb25Eb25lKCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBjb2RlO1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gY29kZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHRoaXMuY29udGVudChvcHRpb25zKTtcblx0XHR9XG5cdH1cblxuXHRoZWFkZXIoKSB7XG5cdFx0bGV0IGNvZGUgPSBcIlwiO1xuXHRcdGlmICh0aGlzLm5lZWRDb250ZXh0KCkpIHtcblx0XHRcdGNvZGUgKz0gXCJ2YXIgX2NvbnRleHQgPSB7fTtcXG5cIjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29kZSArPSBcInZhciBfY29udGV4dDtcXG5cIjtcblx0XHR9XG5cdFx0Y29kZSArPSBcInZhciBfeCA9IHRoaXMuX3g7XFxuXCI7XG5cdFx0aWYgKHRoaXMub3B0aW9ucy5pbnRlcmNlcHRvcnMubGVuZ3RoID4gMCkge1xuXHRcdFx0Y29kZSArPSBcInZhciBfdGFwcyA9IHRoaXMudGFwcztcXG5cIjtcblx0XHRcdGNvZGUgKz0gXCJ2YXIgX2ludGVyY2VwdG9ycyA9IHRoaXMuaW50ZXJjZXB0b3JzO1xcblwiO1xuXHRcdH1cblx0XHRyZXR1cm4gY29kZTtcblx0fVxuXG5cdG5lZWRDb250ZXh0KCkge1xuXHRcdGZvciAoY29uc3QgdGFwIG9mIHRoaXMub3B0aW9ucy50YXBzKSBpZiAodGFwLmNvbnRleHQpIHJldHVybiB0cnVlO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGNhbGxUYXAodGFwSW5kZXgsIHsgb25FcnJvciwgb25SZXN1bHQsIG9uRG9uZSwgcmV0aHJvd0lmUG9zc2libGUgfSkge1xuXHRcdGxldCBjb2RlID0gXCJcIjtcblx0XHRsZXQgaGFzVGFwQ2FjaGVkID0gZmFsc2U7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMuaW50ZXJjZXB0b3JzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBpbnRlcmNlcHRvciA9IHRoaXMub3B0aW9ucy5pbnRlcmNlcHRvcnNbaV07XG5cdFx0XHRpZiAoaW50ZXJjZXB0b3IudGFwKSB7XG5cdFx0XHRcdGlmICghaGFzVGFwQ2FjaGVkKSB7XG5cdFx0XHRcdFx0Y29kZSArPSBgdmFyIF90YXAke3RhcEluZGV4fSA9ICR7dGhpcy5nZXRUYXAodGFwSW5kZXgpfTtcXG5gO1xuXHRcdFx0XHRcdGhhc1RhcENhY2hlZCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29kZSArPSBgJHt0aGlzLmdldEludGVyY2VwdG9yKGkpfS50YXAoJHtcblx0XHRcdFx0XHRpbnRlcmNlcHRvci5jb250ZXh0ID8gXCJfY29udGV4dCwgXCIgOiBcIlwiXG5cdFx0XHRcdH1fdGFwJHt0YXBJbmRleH0pO1xcbmA7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGNvZGUgKz0gYHZhciBfZm4ke3RhcEluZGV4fSA9ICR7dGhpcy5nZXRUYXBGbih0YXBJbmRleCl9O1xcbmA7XG5cdFx0Y29uc3QgdGFwID0gdGhpcy5vcHRpb25zLnRhcHNbdGFwSW5kZXhdO1xuXHRcdHN3aXRjaCAodGFwLnR5cGUpIHtcblx0XHRcdGNhc2UgXCJzeW5jXCI6XG5cdFx0XHRcdGlmICghcmV0aHJvd0lmUG9zc2libGUpIHtcblx0XHRcdFx0XHRjb2RlICs9IGB2YXIgX2hhc0Vycm9yJHt0YXBJbmRleH0gPSBmYWxzZTtcXG5gO1xuXHRcdFx0XHRcdGNvZGUgKz0gXCJ0cnkge1xcblwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChvblJlc3VsdCkge1xuXHRcdFx0XHRcdGNvZGUgKz0gYHZhciBfcmVzdWx0JHt0YXBJbmRleH0gPSBfZm4ke3RhcEluZGV4fSgke3RoaXMuYXJncyh7XG5cdFx0XHRcdFx0XHRiZWZvcmU6IHRhcC5jb250ZXh0ID8gXCJfY29udGV4dFwiIDogdW5kZWZpbmVkXG5cdFx0XHRcdFx0fSl9KTtcXG5gO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvZGUgKz0gYF9mbiR7dGFwSW5kZXh9KCR7dGhpcy5hcmdzKHtcblx0XHRcdFx0XHRcdGJlZm9yZTogdGFwLmNvbnRleHQgPyBcIl9jb250ZXh0XCIgOiB1bmRlZmluZWRcblx0XHRcdFx0XHR9KX0pO1xcbmA7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCFyZXRocm93SWZQb3NzaWJsZSkge1xuXHRcdFx0XHRcdGNvZGUgKz0gXCJ9IGNhdGNoKF9lcnIpIHtcXG5cIjtcblx0XHRcdFx0XHRjb2RlICs9IGBfaGFzRXJyb3Ike3RhcEluZGV4fSA9IHRydWU7XFxuYDtcblx0XHRcdFx0XHRjb2RlICs9IG9uRXJyb3IoXCJfZXJyXCIpO1xuXHRcdFx0XHRcdGNvZGUgKz0gXCJ9XFxuXCI7XG5cdFx0XHRcdFx0Y29kZSArPSBgaWYoIV9oYXNFcnJvciR7dGFwSW5kZXh9KSB7XFxuYDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAob25SZXN1bHQpIHtcblx0XHRcdFx0XHRjb2RlICs9IG9uUmVzdWx0KGBfcmVzdWx0JHt0YXBJbmRleH1gKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAob25Eb25lKSB7XG5cdFx0XHRcdFx0Y29kZSArPSBvbkRvbmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIXJldGhyb3dJZlBvc3NpYmxlKSB7XG5cdFx0XHRcdFx0Y29kZSArPSBcIn1cXG5cIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJhc3luY1wiOlxuXHRcdFx0XHRsZXQgY2JDb2RlID0gXCJcIjtcblx0XHRcdFx0aWYgKG9uUmVzdWx0KVxuXHRcdFx0XHRcdGNiQ29kZSArPSBgKGZ1bmN0aW9uKF9lcnIke3RhcEluZGV4fSwgX3Jlc3VsdCR7dGFwSW5kZXh9KSB7XFxuYDtcblx0XHRcdFx0ZWxzZSBjYkNvZGUgKz0gYChmdW5jdGlvbihfZXJyJHt0YXBJbmRleH0pIHtcXG5gO1xuXHRcdFx0XHRjYkNvZGUgKz0gYGlmKF9lcnIke3RhcEluZGV4fSkge1xcbmA7XG5cdFx0XHRcdGNiQ29kZSArPSBvbkVycm9yKGBfZXJyJHt0YXBJbmRleH1gKTtcblx0XHRcdFx0Y2JDb2RlICs9IFwifSBlbHNlIHtcXG5cIjtcblx0XHRcdFx0aWYgKG9uUmVzdWx0KSB7XG5cdFx0XHRcdFx0Y2JDb2RlICs9IG9uUmVzdWx0KGBfcmVzdWx0JHt0YXBJbmRleH1gKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAob25Eb25lKSB7XG5cdFx0XHRcdFx0Y2JDb2RlICs9IG9uRG9uZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNiQ29kZSArPSBcIn1cXG5cIjtcblx0XHRcdFx0Y2JDb2RlICs9IFwifSlcIjtcblx0XHRcdFx0Y29kZSArPSBgX2ZuJHt0YXBJbmRleH0oJHt0aGlzLmFyZ3Moe1xuXHRcdFx0XHRcdGJlZm9yZTogdGFwLmNvbnRleHQgPyBcIl9jb250ZXh0XCIgOiB1bmRlZmluZWQsXG5cdFx0XHRcdFx0YWZ0ZXI6IGNiQ29kZVxuXHRcdFx0XHR9KX0pO1xcbmA7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInByb21pc2VcIjpcblx0XHRcdFx0Y29kZSArPSBgdmFyIF9oYXNSZXN1bHQke3RhcEluZGV4fSA9IGZhbHNlO1xcbmA7XG5cdFx0XHRcdGNvZGUgKz0gYHZhciBfcHJvbWlzZSR7dGFwSW5kZXh9ID0gX2ZuJHt0YXBJbmRleH0oJHt0aGlzLmFyZ3Moe1xuXHRcdFx0XHRcdGJlZm9yZTogdGFwLmNvbnRleHQgPyBcIl9jb250ZXh0XCIgOiB1bmRlZmluZWRcblx0XHRcdFx0fSl9KTtcXG5gO1xuXHRcdFx0XHRjb2RlICs9IGBpZiAoIV9wcm9taXNlJHt0YXBJbmRleH0gfHwgIV9wcm9taXNlJHt0YXBJbmRleH0udGhlbilcXG5gO1xuXHRcdFx0XHRjb2RlICs9IGAgIHRocm93IG5ldyBFcnJvcignVGFwIGZ1bmN0aW9uICh0YXBQcm9taXNlKSBkaWQgbm90IHJldHVybiBwcm9taXNlIChyZXR1cm5lZCAnICsgX3Byb21pc2Uke3RhcEluZGV4fSArICcpJyk7XFxuYDtcblx0XHRcdFx0Y29kZSArPSBgX3Byb21pc2Uke3RhcEluZGV4fS50aGVuKChmdW5jdGlvbihfcmVzdWx0JHt0YXBJbmRleH0pIHtcXG5gO1xuXHRcdFx0XHRjb2RlICs9IGBfaGFzUmVzdWx0JHt0YXBJbmRleH0gPSB0cnVlO1xcbmA7XG5cdFx0XHRcdGlmIChvblJlc3VsdCkge1xuXHRcdFx0XHRcdGNvZGUgKz0gb25SZXN1bHQoYF9yZXN1bHQke3RhcEluZGV4fWApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChvbkRvbmUpIHtcblx0XHRcdFx0XHRjb2RlICs9IG9uRG9uZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvZGUgKz0gYH0pLCBmdW5jdGlvbihfZXJyJHt0YXBJbmRleH0pIHtcXG5gO1xuXHRcdFx0XHRjb2RlICs9IGBpZihfaGFzUmVzdWx0JHt0YXBJbmRleH0pIHRocm93IF9lcnIke3RhcEluZGV4fTtcXG5gO1xuXHRcdFx0XHRjb2RlICs9IG9uRXJyb3IoYF9lcnIke3RhcEluZGV4fWApO1xuXHRcdFx0XHRjb2RlICs9IFwifSk7XFxuXCI7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRyZXR1cm4gY29kZTtcblx0fVxuXG5cdGNhbGxUYXBzU2VyaWVzKHtcblx0XHRvbkVycm9yLFxuXHRcdG9uUmVzdWx0LFxuXHRcdHJlc3VsdFJldHVybnMsXG5cdFx0b25Eb25lLFxuXHRcdGRvbmVSZXR1cm5zLFxuXHRcdHJldGhyb3dJZlBvc3NpYmxlXG5cdH0pIHtcblx0XHRpZiAodGhpcy5vcHRpb25zLnRhcHMubGVuZ3RoID09PSAwKSByZXR1cm4gb25Eb25lKCk7XG5cdFx0Y29uc3QgZmlyc3RBc3luYyA9IHRoaXMub3B0aW9ucy50YXBzLmZpbmRJbmRleCh0ID0+IHQudHlwZSAhPT0gXCJzeW5jXCIpO1xuXHRcdGNvbnN0IHNvbWV0aGluZ1JldHVybnMgPSByZXN1bHRSZXR1cm5zIHx8IGRvbmVSZXR1cm5zO1xuXHRcdGxldCBjb2RlID0gXCJcIjtcblx0XHRsZXQgY3VycmVudCA9IG9uRG9uZTtcblx0XHRsZXQgdW5yb2xsQ291bnRlciA9IDA7XG5cdFx0Zm9yIChsZXQgaiA9IHRoaXMub3B0aW9ucy50YXBzLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XG5cdFx0XHRjb25zdCBpID0gajtcblx0XHRcdGNvbnN0IHVucm9sbCA9XG5cdFx0XHRcdGN1cnJlbnQgIT09IG9uRG9uZSAmJlxuXHRcdFx0XHQodGhpcy5vcHRpb25zLnRhcHNbaV0udHlwZSAhPT0gXCJzeW5jXCIgfHwgdW5yb2xsQ291bnRlcisrID4gMjApO1xuXHRcdFx0aWYgKHVucm9sbCkge1xuXHRcdFx0XHR1bnJvbGxDb3VudGVyID0gMDtcblx0XHRcdFx0Y29kZSArPSBgZnVuY3Rpb24gX25leHQke2l9KCkge1xcbmA7XG5cdFx0XHRcdGNvZGUgKz0gY3VycmVudCgpO1xuXHRcdFx0XHRjb2RlICs9IGB9XFxuYDtcblx0XHRcdFx0Y3VycmVudCA9ICgpID0+IGAke3NvbWV0aGluZ1JldHVybnMgPyBcInJldHVybiBcIiA6IFwiXCJ9X25leHQke2l9KCk7XFxuYDtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRvbmUgPSBjdXJyZW50O1xuXHRcdFx0Y29uc3QgZG9uZUJyZWFrID0gc2tpcERvbmUgPT4ge1xuXHRcdFx0XHRpZiAoc2tpcERvbmUpIHJldHVybiBcIlwiO1xuXHRcdFx0XHRyZXR1cm4gb25Eb25lKCk7XG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgY29udGVudCA9IHRoaXMuY2FsbFRhcChpLCB7XG5cdFx0XHRcdG9uRXJyb3I6IGVycm9yID0+IG9uRXJyb3IoaSwgZXJyb3IsIGRvbmUsIGRvbmVCcmVhayksXG5cdFx0XHRcdG9uUmVzdWx0OlxuXHRcdFx0XHRcdG9uUmVzdWx0ICYmXG5cdFx0XHRcdFx0KHJlc3VsdCA9PiB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gb25SZXN1bHQoaSwgcmVzdWx0LCBkb25lLCBkb25lQnJlYWspO1xuXHRcdFx0XHRcdH0pLFxuXHRcdFx0XHRvbkRvbmU6ICFvblJlc3VsdCAmJiBkb25lLFxuXHRcdFx0XHRyZXRocm93SWZQb3NzaWJsZTpcblx0XHRcdFx0XHRyZXRocm93SWZQb3NzaWJsZSAmJiAoZmlyc3RBc3luYyA8IDAgfHwgaSA8IGZpcnN0QXN5bmMpXG5cdFx0XHR9KTtcblx0XHRcdGN1cnJlbnQgPSAoKSA9PiBjb250ZW50O1xuXHRcdH1cblx0XHRjb2RlICs9IGN1cnJlbnQoKTtcblx0XHRyZXR1cm4gY29kZTtcblx0fVxuXG5cdGNhbGxUYXBzTG9vcGluZyh7IG9uRXJyb3IsIG9uRG9uZSwgcmV0aHJvd0lmUG9zc2libGUgfSkge1xuXHRcdGlmICh0aGlzLm9wdGlvbnMudGFwcy5sZW5ndGggPT09IDApIHJldHVybiBvbkRvbmUoKTtcblx0XHRjb25zdCBzeW5jT25seSA9IHRoaXMub3B0aW9ucy50YXBzLmV2ZXJ5KHQgPT4gdC50eXBlID09PSBcInN5bmNcIik7XG5cdFx0bGV0IGNvZGUgPSBcIlwiO1xuXHRcdGlmICghc3luY09ubHkpIHtcblx0XHRcdGNvZGUgKz0gXCJ2YXIgX2xvb3BlciA9IChmdW5jdGlvbigpIHtcXG5cIjtcblx0XHRcdGNvZGUgKz0gXCJ2YXIgX2xvb3BBc3luYyA9IGZhbHNlO1xcblwiO1xuXHRcdH1cblx0XHRjb2RlICs9IFwidmFyIF9sb29wO1xcblwiO1xuXHRcdGNvZGUgKz0gXCJkbyB7XFxuXCI7XG5cdFx0Y29kZSArPSBcIl9sb29wID0gZmFsc2U7XFxuXCI7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMuaW50ZXJjZXB0b3JzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBpbnRlcmNlcHRvciA9IHRoaXMub3B0aW9ucy5pbnRlcmNlcHRvcnNbaV07XG5cdFx0XHRpZiAoaW50ZXJjZXB0b3IubG9vcCkge1xuXHRcdFx0XHRjb2RlICs9IGAke3RoaXMuZ2V0SW50ZXJjZXB0b3IoaSl9Lmxvb3AoJHt0aGlzLmFyZ3Moe1xuXHRcdFx0XHRcdGJlZm9yZTogaW50ZXJjZXB0b3IuY29udGV4dCA/IFwiX2NvbnRleHRcIiA6IHVuZGVmaW5lZFxuXHRcdFx0XHR9KX0pO1xcbmA7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGNvZGUgKz0gdGhpcy5jYWxsVGFwc1Nlcmllcyh7XG5cdFx0XHRvbkVycm9yLFxuXHRcdFx0b25SZXN1bHQ6IChpLCByZXN1bHQsIG5leHQsIGRvbmVCcmVhaykgPT4ge1xuXHRcdFx0XHRsZXQgY29kZSA9IFwiXCI7XG5cdFx0XHRcdGNvZGUgKz0gYGlmKCR7cmVzdWx0fSAhPT0gdW5kZWZpbmVkKSB7XFxuYDtcblx0XHRcdFx0Y29kZSArPSBcIl9sb29wID0gdHJ1ZTtcXG5cIjtcblx0XHRcdFx0aWYgKCFzeW5jT25seSkgY29kZSArPSBcImlmKF9sb29wQXN5bmMpIF9sb29wZXIoKTtcXG5cIjtcblx0XHRcdFx0Y29kZSArPSBkb25lQnJlYWsodHJ1ZSk7XG5cdFx0XHRcdGNvZGUgKz0gYH0gZWxzZSB7XFxuYDtcblx0XHRcdFx0Y29kZSArPSBuZXh0KCk7XG5cdFx0XHRcdGNvZGUgKz0gYH1cXG5gO1xuXHRcdFx0XHRyZXR1cm4gY29kZTtcblx0XHRcdH0sXG5cdFx0XHRvbkRvbmU6XG5cdFx0XHRcdG9uRG9uZSAmJlxuXHRcdFx0XHQoKCkgPT4ge1xuXHRcdFx0XHRcdGxldCBjb2RlID0gXCJcIjtcblx0XHRcdFx0XHRjb2RlICs9IFwiaWYoIV9sb29wKSB7XFxuXCI7XG5cdFx0XHRcdFx0Y29kZSArPSBvbkRvbmUoKTtcblx0XHRcdFx0XHRjb2RlICs9IFwifVxcblwiO1xuXHRcdFx0XHRcdHJldHVybiBjb2RlO1xuXHRcdFx0XHR9KSxcblx0XHRcdHJldGhyb3dJZlBvc3NpYmxlOiByZXRocm93SWZQb3NzaWJsZSAmJiBzeW5jT25seVxuXHRcdH0pO1xuXHRcdGNvZGUgKz0gXCJ9IHdoaWxlKF9sb29wKTtcXG5cIjtcblx0XHRpZiAoIXN5bmNPbmx5KSB7XG5cdFx0XHRjb2RlICs9IFwiX2xvb3BBc3luYyA9IHRydWU7XFxuXCI7XG5cdFx0XHRjb2RlICs9IFwifSk7XFxuXCI7XG5cdFx0XHRjb2RlICs9IFwiX2xvb3BlcigpO1xcblwiO1xuXHRcdH1cblx0XHRyZXR1cm4gY29kZTtcblx0fVxuXG5cdGNhbGxUYXBzUGFyYWxsZWwoe1xuXHRcdG9uRXJyb3IsXG5cdFx0b25SZXN1bHQsXG5cdFx0b25Eb25lLFxuXHRcdHJldGhyb3dJZlBvc3NpYmxlLFxuXHRcdG9uVGFwID0gKGksIHJ1bikgPT4gcnVuKClcblx0fSkge1xuXHRcdGlmICh0aGlzLm9wdGlvbnMudGFwcy5sZW5ndGggPD0gMSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuY2FsbFRhcHNTZXJpZXMoe1xuXHRcdFx0XHRvbkVycm9yLFxuXHRcdFx0XHRvblJlc3VsdCxcblx0XHRcdFx0b25Eb25lLFxuXHRcdFx0XHRyZXRocm93SWZQb3NzaWJsZVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGxldCBjb2RlID0gXCJcIjtcblx0XHRjb2RlICs9IFwiZG8ge1xcblwiO1xuXHRcdGNvZGUgKz0gYHZhciBfY291bnRlciA9ICR7dGhpcy5vcHRpb25zLnRhcHMubGVuZ3RofTtcXG5gO1xuXHRcdGlmIChvbkRvbmUpIHtcblx0XHRcdGNvZGUgKz0gXCJ2YXIgX2RvbmUgPSAoZnVuY3Rpb24oKSB7XFxuXCI7XG5cdFx0XHRjb2RlICs9IG9uRG9uZSgpO1xuXHRcdFx0Y29kZSArPSBcIn0pO1xcblwiO1xuXHRcdH1cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy50YXBzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBkb25lID0gKCkgPT4ge1xuXHRcdFx0XHRpZiAob25Eb25lKSByZXR1cm4gXCJpZigtLV9jb3VudGVyID09PSAwKSBfZG9uZSgpO1xcblwiO1xuXHRcdFx0XHRlbHNlIHJldHVybiBcIi0tX2NvdW50ZXI7XCI7XG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgZG9uZUJyZWFrID0gc2tpcERvbmUgPT4ge1xuXHRcdFx0XHRpZiAoc2tpcERvbmUgfHwgIW9uRG9uZSkgcmV0dXJuIFwiX2NvdW50ZXIgPSAwO1xcblwiO1xuXHRcdFx0XHRlbHNlIHJldHVybiBcIl9jb3VudGVyID0gMDtcXG5fZG9uZSgpO1xcblwiO1xuXHRcdFx0fTtcblx0XHRcdGNvZGUgKz0gXCJpZihfY291bnRlciA8PSAwKSBicmVhaztcXG5cIjtcblx0XHRcdGNvZGUgKz0gb25UYXAoXG5cdFx0XHRcdGksXG5cdFx0XHRcdCgpID0+XG5cdFx0XHRcdFx0dGhpcy5jYWxsVGFwKGksIHtcblx0XHRcdFx0XHRcdG9uRXJyb3I6IGVycm9yID0+IHtcblx0XHRcdFx0XHRcdFx0bGV0IGNvZGUgPSBcIlwiO1xuXHRcdFx0XHRcdFx0XHRjb2RlICs9IFwiaWYoX2NvdW50ZXIgPiAwKSB7XFxuXCI7XG5cdFx0XHRcdFx0XHRcdGNvZGUgKz0gb25FcnJvcihpLCBlcnJvciwgZG9uZSwgZG9uZUJyZWFrKTtcblx0XHRcdFx0XHRcdFx0Y29kZSArPSBcIn1cXG5cIjtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGNvZGU7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0b25SZXN1bHQ6XG5cdFx0XHRcdFx0XHRcdG9uUmVzdWx0ICYmXG5cdFx0XHRcdFx0XHRcdChyZXN1bHQgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGxldCBjb2RlID0gXCJcIjtcblx0XHRcdFx0XHRcdFx0XHRjb2RlICs9IFwiaWYoX2NvdW50ZXIgPiAwKSB7XFxuXCI7XG5cdFx0XHRcdFx0XHRcdFx0Y29kZSArPSBvblJlc3VsdChpLCByZXN1bHQsIGRvbmUsIGRvbmVCcmVhayk7XG5cdFx0XHRcdFx0XHRcdFx0Y29kZSArPSBcIn1cXG5cIjtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gY29kZTtcblx0XHRcdFx0XHRcdFx0fSksXG5cdFx0XHRcdFx0XHRvbkRvbmU6XG5cdFx0XHRcdFx0XHRcdCFvblJlc3VsdCAmJlxuXHRcdFx0XHRcdFx0XHQoKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBkb25lKCk7XG5cdFx0XHRcdFx0XHRcdH0pLFxuXHRcdFx0XHRcdFx0cmV0aHJvd0lmUG9zc2libGVcblx0XHRcdFx0XHR9KSxcblx0XHRcdFx0ZG9uZSxcblx0XHRcdFx0ZG9uZUJyZWFrXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRjb2RlICs9IFwifSB3aGlsZShmYWxzZSk7XFxuXCI7XG5cdFx0cmV0dXJuIGNvZGU7XG5cdH1cblxuXHRhcmdzKHsgYmVmb3JlLCBhZnRlciB9ID0ge30pIHtcblx0XHRsZXQgYWxsQXJncyA9IHRoaXMuX2FyZ3M7XG5cdFx0aWYgKGJlZm9yZSkgYWxsQXJncyA9IFtiZWZvcmVdLmNvbmNhdChhbGxBcmdzKTtcblx0XHRpZiAoYWZ0ZXIpIGFsbEFyZ3MgPSBhbGxBcmdzLmNvbmNhdChhZnRlcik7XG5cdFx0aWYgKGFsbEFyZ3MubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gXCJcIjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGFsbEFyZ3Muam9pbihcIiwgXCIpO1xuXHRcdH1cblx0fVxuXG5cdGdldFRhcEZuKGlkeCkge1xuXHRcdHJldHVybiBgX3hbJHtpZHh9XWA7XG5cdH1cblxuXHRnZXRUYXAoaWR4KSB7XG5cdFx0cmV0dXJuIGBfdGFwc1ske2lkeH1dYDtcblx0fVxuXG5cdGdldEludGVyY2VwdG9yKGlkeCkge1xuXHRcdHJldHVybiBgX2ludGVyY2VwdG9yc1ske2lkeH1dYDtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhvb2tDb2RlRmFjdG9yeTtcbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cInVzZSBzdHJpY3RcIjtcblxuY29uc3QgSG9vayA9IHJlcXVpcmUoXCIuL0hvb2tcIik7XG5jb25zdCBIb29rQ29kZUZhY3RvcnkgPSByZXF1aXJlKFwiLi9Ib29rQ29kZUZhY3RvcnlcIik7XG5cbmNsYXNzIFN5bmNIb29rQ29kZUZhY3RvcnkgZXh0ZW5kcyBIb29rQ29kZUZhY3Rvcnkge1xuXHRjb250ZW50KHsgb25FcnJvciwgb25Eb25lLCByZXRocm93SWZQb3NzaWJsZSB9KSB7XG5cdFx0cmV0dXJuIHRoaXMuY2FsbFRhcHNTZXJpZXMoe1xuXHRcdFx0b25FcnJvcjogKGksIGVycikgPT4gb25FcnJvcihlcnIpLFxuXHRcdFx0b25Eb25lLFxuXHRcdFx0cmV0aHJvd0lmUG9zc2libGVcblx0XHR9KTtcblx0fVxufVxuXG5jb25zdCBmYWN0b3J5ID0gbmV3IFN5bmNIb29rQ29kZUZhY3RvcnkoKTtcblxuY29uc3QgVEFQX0FTWU5DID0gKCkgPT4ge1xuXHR0aHJvdyBuZXcgRXJyb3IoXCJ0YXBBc3luYyBpcyBub3Qgc3VwcG9ydGVkIG9uIGEgU3luY0hvb2tcIik7XG59O1xuXG5jb25zdCBUQVBfUFJPTUlTRSA9ICgpID0+IHtcblx0dGhyb3cgbmV3IEVycm9yKFwidGFwUHJvbWlzZSBpcyBub3Qgc3VwcG9ydGVkIG9uIGEgU3luY0hvb2tcIik7XG59O1xuXG5jb25zdCBDT01QSUxFID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXHRmYWN0b3J5LnNldHVwKHRoaXMsIG9wdGlvbnMpO1xuXHRyZXR1cm4gZmFjdG9yeS5jcmVhdGUob3B0aW9ucyk7XG59O1xuXG5mdW5jdGlvbiBTeW5jSG9vayhhcmdzID0gW10sIG5hbWUgPSB1bmRlZmluZWQpIHtcblx0Y29uc3QgaG9vayA9IG5ldyBIb29rKGFyZ3MsIG5hbWUpO1xuXHRob29rLmNvbnN0cnVjdG9yID0gU3luY0hvb2s7XG5cdGhvb2sudGFwQXN5bmMgPSBUQVBfQVNZTkM7XG5cdGhvb2sudGFwUHJvbWlzZSA9IFRBUF9QUk9NSVNFO1xuXHRob29rLmNvbXBpbGUgPSBDT01QSUxFO1xuXHRyZXR1cm4gaG9vaztcbn1cblxuU3luY0hvb2sucHJvdG90eXBlID0gbnVsbDtcblxubW9kdWxlLmV4cG9ydHMgPSBTeW5jSG9vaztcbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cInVzZSBzdHJpY3RcIjtcblxuY29uc3QgSG9vayA9IHJlcXVpcmUoXCIuL0hvb2tcIik7XG5jb25zdCBIb29rQ29kZUZhY3RvcnkgPSByZXF1aXJlKFwiLi9Ib29rQ29kZUZhY3RvcnlcIik7XG5cbmNsYXNzIFN5bmNCYWlsSG9va0NvZGVGYWN0b3J5IGV4dGVuZHMgSG9va0NvZGVGYWN0b3J5IHtcblx0Y29udGVudCh7IG9uRXJyb3IsIG9uUmVzdWx0LCByZXN1bHRSZXR1cm5zLCBvbkRvbmUsIHJldGhyb3dJZlBvc3NpYmxlIH0pIHtcblx0XHRyZXR1cm4gdGhpcy5jYWxsVGFwc1Nlcmllcyh7XG5cdFx0XHRvbkVycm9yOiAoaSwgZXJyKSA9PiBvbkVycm9yKGVyciksXG5cdFx0XHRvblJlc3VsdDogKGksIHJlc3VsdCwgbmV4dCkgPT5cblx0XHRcdFx0YGlmKCR7cmVzdWx0fSAhPT0gdW5kZWZpbmVkKSB7XFxuJHtvblJlc3VsdChcblx0XHRcdFx0XHRyZXN1bHRcblx0XHRcdFx0KX07XFxufSBlbHNlIHtcXG4ke25leHQoKX19XFxuYCxcblx0XHRcdHJlc3VsdFJldHVybnMsXG5cdFx0XHRvbkRvbmUsXG5cdFx0XHRyZXRocm93SWZQb3NzaWJsZVxuXHRcdH0pO1xuXHR9XG59XG5cbmNvbnN0IGZhY3RvcnkgPSBuZXcgU3luY0JhaWxIb29rQ29kZUZhY3RvcnkoKTtcblxuY29uc3QgVEFQX0FTWU5DID0gKCkgPT4ge1xuXHR0aHJvdyBuZXcgRXJyb3IoXCJ0YXBBc3luYyBpcyBub3Qgc3VwcG9ydGVkIG9uIGEgU3luY0JhaWxIb29rXCIpO1xufTtcblxuY29uc3QgVEFQX1BST01JU0UgPSAoKSA9PiB7XG5cdHRocm93IG5ldyBFcnJvcihcInRhcFByb21pc2UgaXMgbm90IHN1cHBvcnRlZCBvbiBhIFN5bmNCYWlsSG9va1wiKTtcbn07XG5cbmNvbnN0IENPTVBJTEUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG5cdGZhY3Rvcnkuc2V0dXAodGhpcywgb3B0aW9ucyk7XG5cdHJldHVybiBmYWN0b3J5LmNyZWF0ZShvcHRpb25zKTtcbn07XG5cbmZ1bmN0aW9uIFN5bmNCYWlsSG9vayhhcmdzID0gW10sIG5hbWUgPSB1bmRlZmluZWQpIHtcblx0Y29uc3QgaG9vayA9IG5ldyBIb29rKGFyZ3MsIG5hbWUpO1xuXHRob29rLmNvbnN0cnVjdG9yID0gU3luY0JhaWxIb29rO1xuXHRob29rLnRhcEFzeW5jID0gVEFQX0FTWU5DO1xuXHRob29rLnRhcFByb21pc2UgPSBUQVBfUFJPTUlTRTtcblx0aG9vay5jb21waWxlID0gQ09NUElMRTtcblx0cmV0dXJuIGhvb2s7XG59XG5cblN5bmNCYWlsSG9vay5wcm90b3R5cGUgPSBudWxsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bmNCYWlsSG9vaztcbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cInVzZSBzdHJpY3RcIjtcblxuY29uc3QgSG9vayA9IHJlcXVpcmUoXCIuL0hvb2tcIik7XG5jb25zdCBIb29rQ29kZUZhY3RvcnkgPSByZXF1aXJlKFwiLi9Ib29rQ29kZUZhY3RvcnlcIik7XG5cbmNsYXNzIFN5bmNXYXRlcmZhbGxIb29rQ29kZUZhY3RvcnkgZXh0ZW5kcyBIb29rQ29kZUZhY3Rvcnkge1xuXHRjb250ZW50KHsgb25FcnJvciwgb25SZXN1bHQsIHJlc3VsdFJldHVybnMsIHJldGhyb3dJZlBvc3NpYmxlIH0pIHtcblx0XHRyZXR1cm4gdGhpcy5jYWxsVGFwc1Nlcmllcyh7XG5cdFx0XHRvbkVycm9yOiAoaSwgZXJyKSA9PiBvbkVycm9yKGVyciksXG5cdFx0XHRvblJlc3VsdDogKGksIHJlc3VsdCwgbmV4dCkgPT4ge1xuXHRcdFx0XHRsZXQgY29kZSA9IFwiXCI7XG5cdFx0XHRcdGNvZGUgKz0gYGlmKCR7cmVzdWx0fSAhPT0gdW5kZWZpbmVkKSB7XFxuYDtcblx0XHRcdFx0Y29kZSArPSBgJHt0aGlzLl9hcmdzWzBdfSA9ICR7cmVzdWx0fTtcXG5gO1xuXHRcdFx0XHRjb2RlICs9IGB9XFxuYDtcblx0XHRcdFx0Y29kZSArPSBuZXh0KCk7XG5cdFx0XHRcdHJldHVybiBjb2RlO1xuXHRcdFx0fSxcblx0XHRcdG9uRG9uZTogKCkgPT4gb25SZXN1bHQodGhpcy5fYXJnc1swXSksXG5cdFx0XHRkb25lUmV0dXJuczogcmVzdWx0UmV0dXJucyxcblx0XHRcdHJldGhyb3dJZlBvc3NpYmxlXG5cdFx0fSk7XG5cdH1cbn1cblxuY29uc3QgZmFjdG9yeSA9IG5ldyBTeW5jV2F0ZXJmYWxsSG9va0NvZGVGYWN0b3J5KCk7XG5cbmNvbnN0IFRBUF9BU1lOQyA9ICgpID0+IHtcblx0dGhyb3cgbmV3IEVycm9yKFwidGFwQXN5bmMgaXMgbm90IHN1cHBvcnRlZCBvbiBhIFN5bmNXYXRlcmZhbGxIb29rXCIpO1xufTtcblxuY29uc3QgVEFQX1BST01JU0UgPSAoKSA9PiB7XG5cdHRocm93IG5ldyBFcnJvcihcInRhcFByb21pc2UgaXMgbm90IHN1cHBvcnRlZCBvbiBhIFN5bmNXYXRlcmZhbGxIb29rXCIpO1xufTtcblxuY29uc3QgQ09NUElMRSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0ZmFjdG9yeS5zZXR1cCh0aGlzLCBvcHRpb25zKTtcblx0cmV0dXJuIGZhY3RvcnkuY3JlYXRlKG9wdGlvbnMpO1xufTtcblxuZnVuY3Rpb24gU3luY1dhdGVyZmFsbEhvb2soYXJncyA9IFtdLCBuYW1lID0gdW5kZWZpbmVkKSB7XG5cdGlmIChhcmdzLmxlbmd0aCA8IDEpXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiV2F0ZXJmYWxsIGhvb2tzIG11c3QgaGF2ZSBhdCBsZWFzdCBvbmUgYXJndW1lbnRcIik7XG5cdGNvbnN0IGhvb2sgPSBuZXcgSG9vayhhcmdzLCBuYW1lKTtcblx0aG9vay5jb25zdHJ1Y3RvciA9IFN5bmNXYXRlcmZhbGxIb29rO1xuXHRob29rLnRhcEFzeW5jID0gVEFQX0FTWU5DO1xuXHRob29rLnRhcFByb21pc2UgPSBUQVBfUFJPTUlTRTtcblx0aG9vay5jb21waWxlID0gQ09NUElMRTtcblx0cmV0dXJuIGhvb2s7XG59XG5cblN5bmNXYXRlcmZhbGxIb29rLnByb3RvdHlwZSA9IG51bGw7XG5cbm1vZHVsZS5leHBvcnRzID0gU3luY1dhdGVyZmFsbEhvb2s7XG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IEhvb2sgPSByZXF1aXJlKFwiLi9Ib29rXCIpO1xuY29uc3QgSG9va0NvZGVGYWN0b3J5ID0gcmVxdWlyZShcIi4vSG9va0NvZGVGYWN0b3J5XCIpO1xuXG5jbGFzcyBTeW5jTG9vcEhvb2tDb2RlRmFjdG9yeSBleHRlbmRzIEhvb2tDb2RlRmFjdG9yeSB7XG5cdGNvbnRlbnQoeyBvbkVycm9yLCBvbkRvbmUsIHJldGhyb3dJZlBvc3NpYmxlIH0pIHtcblx0XHRyZXR1cm4gdGhpcy5jYWxsVGFwc0xvb3Bpbmcoe1xuXHRcdFx0b25FcnJvcjogKGksIGVycikgPT4gb25FcnJvcihlcnIpLFxuXHRcdFx0b25Eb25lLFxuXHRcdFx0cmV0aHJvd0lmUG9zc2libGVcblx0XHR9KTtcblx0fVxufVxuXG5jb25zdCBmYWN0b3J5ID0gbmV3IFN5bmNMb29wSG9va0NvZGVGYWN0b3J5KCk7XG5cbmNvbnN0IFRBUF9BU1lOQyA9ICgpID0+IHtcblx0dGhyb3cgbmV3IEVycm9yKFwidGFwQXN5bmMgaXMgbm90IHN1cHBvcnRlZCBvbiBhIFN5bmNMb29wSG9va1wiKTtcbn07XG5cbmNvbnN0IFRBUF9QUk9NSVNFID0gKCkgPT4ge1xuXHR0aHJvdyBuZXcgRXJyb3IoXCJ0YXBQcm9taXNlIGlzIG5vdCBzdXBwb3J0ZWQgb24gYSBTeW5jTG9vcEhvb2tcIik7XG59O1xuXG5jb25zdCBDT01QSUxFID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXHRmYWN0b3J5LnNldHVwKHRoaXMsIG9wdGlvbnMpO1xuXHRyZXR1cm4gZmFjdG9yeS5jcmVhdGUob3B0aW9ucyk7XG59O1xuXG5mdW5jdGlvbiBTeW5jTG9vcEhvb2soYXJncyA9IFtdLCBuYW1lID0gdW5kZWZpbmVkKSB7XG5cdGNvbnN0IGhvb2sgPSBuZXcgSG9vayhhcmdzLCBuYW1lKTtcblx0aG9vay5jb25zdHJ1Y3RvciA9IFN5bmNMb29wSG9vaztcblx0aG9vay50YXBBc3luYyA9IFRBUF9BU1lOQztcblx0aG9vay50YXBQcm9taXNlID0gVEFQX1BST01JU0U7XG5cdGhvb2suY29tcGlsZSA9IENPTVBJTEU7XG5cdHJldHVybiBob29rO1xufVxuXG5TeW5jTG9vcEhvb2sucHJvdG90eXBlID0gbnVsbDtcblxubW9kdWxlLmV4cG9ydHMgPSBTeW5jTG9vcEhvb2s7XG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IEhvb2sgPSByZXF1aXJlKFwiLi9Ib29rXCIpO1xuY29uc3QgSG9va0NvZGVGYWN0b3J5ID0gcmVxdWlyZShcIi4vSG9va0NvZGVGYWN0b3J5XCIpO1xuXG5jbGFzcyBBc3luY1BhcmFsbGVsSG9va0NvZGVGYWN0b3J5IGV4dGVuZHMgSG9va0NvZGVGYWN0b3J5IHtcblx0Y29udGVudCh7IG9uRXJyb3IsIG9uRG9uZSB9KSB7XG5cdFx0cmV0dXJuIHRoaXMuY2FsbFRhcHNQYXJhbGxlbCh7XG5cdFx0XHRvbkVycm9yOiAoaSwgZXJyLCBkb25lLCBkb25lQnJlYWspID0+IG9uRXJyb3IoZXJyKSArIGRvbmVCcmVhayh0cnVlKSxcblx0XHRcdG9uRG9uZVxuXHRcdH0pO1xuXHR9XG59XG5cbmNvbnN0IGZhY3RvcnkgPSBuZXcgQXN5bmNQYXJhbGxlbEhvb2tDb2RlRmFjdG9yeSgpO1xuXG5jb25zdCBDT01QSUxFID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXHRmYWN0b3J5LnNldHVwKHRoaXMsIG9wdGlvbnMpO1xuXHRyZXR1cm4gZmFjdG9yeS5jcmVhdGUob3B0aW9ucyk7XG59O1xuXG5mdW5jdGlvbiBBc3luY1BhcmFsbGVsSG9vayhhcmdzID0gW10sIG5hbWUgPSB1bmRlZmluZWQpIHtcblx0Y29uc3QgaG9vayA9IG5ldyBIb29rKGFyZ3MsIG5hbWUpO1xuXHRob29rLmNvbnN0cnVjdG9yID0gQXN5bmNQYXJhbGxlbEhvb2s7XG5cdGhvb2suY29tcGlsZSA9IENPTVBJTEU7XG5cdGhvb2suX2NhbGwgPSB1bmRlZmluZWQ7XG5cdGhvb2suY2FsbCA9IHVuZGVmaW5lZDtcblx0cmV0dXJuIGhvb2s7XG59XG5cbkFzeW5jUGFyYWxsZWxIb29rLnByb3RvdHlwZSA9IG51bGw7XG5cbm1vZHVsZS5leHBvcnRzID0gQXN5bmNQYXJhbGxlbEhvb2s7XG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IEhvb2sgPSByZXF1aXJlKFwiLi9Ib29rXCIpO1xuY29uc3QgSG9va0NvZGVGYWN0b3J5ID0gcmVxdWlyZShcIi4vSG9va0NvZGVGYWN0b3J5XCIpO1xuXG5jbGFzcyBBc3luY1BhcmFsbGVsQmFpbEhvb2tDb2RlRmFjdG9yeSBleHRlbmRzIEhvb2tDb2RlRmFjdG9yeSB7XG5cdGNvbnRlbnQoeyBvbkVycm9yLCBvblJlc3VsdCwgb25Eb25lIH0pIHtcblx0XHRsZXQgY29kZSA9IFwiXCI7XG5cdFx0Y29kZSArPSBgdmFyIF9yZXN1bHRzID0gbmV3IEFycmF5KCR7dGhpcy5vcHRpb25zLnRhcHMubGVuZ3RofSk7XFxuYDtcblx0XHRjb2RlICs9IFwidmFyIF9jaGVja0RvbmUgPSBmdW5jdGlvbigpIHtcXG5cIjtcblx0XHRjb2RlICs9IFwiZm9yKHZhciBpID0gMDsgaSA8IF9yZXN1bHRzLmxlbmd0aDsgaSsrKSB7XFxuXCI7XG5cdFx0Y29kZSArPSBcInZhciBpdGVtID0gX3Jlc3VsdHNbaV07XFxuXCI7XG5cdFx0Y29kZSArPSBcImlmKGl0ZW0gPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xcblwiO1xuXHRcdGNvZGUgKz0gXCJpZihpdGVtLnJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XFxuXCI7XG5cdFx0Y29kZSArPSBvblJlc3VsdChcIml0ZW0ucmVzdWx0XCIpO1xuXHRcdGNvZGUgKz0gXCJyZXR1cm4gdHJ1ZTtcXG5cIjtcblx0XHRjb2RlICs9IFwifVxcblwiO1xuXHRcdGNvZGUgKz0gXCJpZihpdGVtLmVycm9yKSB7XFxuXCI7XG5cdFx0Y29kZSArPSBvbkVycm9yKFwiaXRlbS5lcnJvclwiKTtcblx0XHRjb2RlICs9IFwicmV0dXJuIHRydWU7XFxuXCI7XG5cdFx0Y29kZSArPSBcIn1cXG5cIjtcblx0XHRjb2RlICs9IFwifVxcblwiO1xuXHRcdGNvZGUgKz0gXCJyZXR1cm4gZmFsc2U7XFxuXCI7XG5cdFx0Y29kZSArPSBcIn1cXG5cIjtcblx0XHRjb2RlICs9IHRoaXMuY2FsbFRhcHNQYXJhbGxlbCh7XG5cdFx0XHRvbkVycm9yOiAoaSwgZXJyLCBkb25lLCBkb25lQnJlYWspID0+IHtcblx0XHRcdFx0bGV0IGNvZGUgPSBcIlwiO1xuXHRcdFx0XHRjb2RlICs9IGBpZigke2l9IDwgX3Jlc3VsdHMubGVuZ3RoICYmICgoX3Jlc3VsdHMubGVuZ3RoID0gJHtpICtcblx0XHRcdFx0XHQxfSksIChfcmVzdWx0c1ske2l9XSA9IHsgZXJyb3I6ICR7ZXJyfSB9KSwgX2NoZWNrRG9uZSgpKSkge1xcbmA7XG5cdFx0XHRcdGNvZGUgKz0gZG9uZUJyZWFrKHRydWUpO1xuXHRcdFx0XHRjb2RlICs9IFwifSBlbHNlIHtcXG5cIjtcblx0XHRcdFx0Y29kZSArPSBkb25lKCk7XG5cdFx0XHRcdGNvZGUgKz0gXCJ9XFxuXCI7XG5cdFx0XHRcdHJldHVybiBjb2RlO1xuXHRcdFx0fSxcblx0XHRcdG9uUmVzdWx0OiAoaSwgcmVzdWx0LCBkb25lLCBkb25lQnJlYWspID0+IHtcblx0XHRcdFx0bGV0IGNvZGUgPSBcIlwiO1xuXHRcdFx0XHRjb2RlICs9IGBpZigke2l9IDwgX3Jlc3VsdHMubGVuZ3RoICYmICgke3Jlc3VsdH0gIT09IHVuZGVmaW5lZCAmJiAoX3Jlc3VsdHMubGVuZ3RoID0gJHtpICtcblx0XHRcdFx0XHQxfSksIChfcmVzdWx0c1ske2l9XSA9IHsgcmVzdWx0OiAke3Jlc3VsdH0gfSksIF9jaGVja0RvbmUoKSkpIHtcXG5gO1xuXHRcdFx0XHRjb2RlICs9IGRvbmVCcmVhayh0cnVlKTtcblx0XHRcdFx0Y29kZSArPSBcIn0gZWxzZSB7XFxuXCI7XG5cdFx0XHRcdGNvZGUgKz0gZG9uZSgpO1xuXHRcdFx0XHRjb2RlICs9IFwifVxcblwiO1xuXHRcdFx0XHRyZXR1cm4gY29kZTtcblx0XHRcdH0sXG5cdFx0XHRvblRhcDogKGksIHJ1biwgZG9uZSwgZG9uZUJyZWFrKSA9PiB7XG5cdFx0XHRcdGxldCBjb2RlID0gXCJcIjtcblx0XHRcdFx0aWYgKGkgPiAwKSB7XG5cdFx0XHRcdFx0Y29kZSArPSBgaWYoJHtpfSA+PSBfcmVzdWx0cy5sZW5ndGgpIHtcXG5gO1xuXHRcdFx0XHRcdGNvZGUgKz0gZG9uZSgpO1xuXHRcdFx0XHRcdGNvZGUgKz0gXCJ9IGVsc2Uge1xcblwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvZGUgKz0gcnVuKCk7XG5cdFx0XHRcdGlmIChpID4gMCkgY29kZSArPSBcIn1cXG5cIjtcblx0XHRcdFx0cmV0dXJuIGNvZGU7XG5cdFx0XHR9LFxuXHRcdFx0b25Eb25lXG5cdFx0fSk7XG5cdFx0cmV0dXJuIGNvZGU7XG5cdH1cbn1cblxuY29uc3QgZmFjdG9yeSA9IG5ldyBBc3luY1BhcmFsbGVsQmFpbEhvb2tDb2RlRmFjdG9yeSgpO1xuXG5jb25zdCBDT01QSUxFID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXHRmYWN0b3J5LnNldHVwKHRoaXMsIG9wdGlvbnMpO1xuXHRyZXR1cm4gZmFjdG9yeS5jcmVhdGUob3B0aW9ucyk7XG59O1xuXG5mdW5jdGlvbiBBc3luY1BhcmFsbGVsQmFpbEhvb2soYXJncyA9IFtdLCBuYW1lID0gdW5kZWZpbmVkKSB7XG5cdGNvbnN0IGhvb2sgPSBuZXcgSG9vayhhcmdzLCBuYW1lKTtcblx0aG9vay5jb25zdHJ1Y3RvciA9IEFzeW5jUGFyYWxsZWxCYWlsSG9vaztcblx0aG9vay5jb21waWxlID0gQ09NUElMRTtcblx0aG9vay5fY2FsbCA9IHVuZGVmaW5lZDtcblx0aG9vay5jYWxsID0gdW5kZWZpbmVkO1xuXHRyZXR1cm4gaG9vaztcbn1cblxuQXN5bmNQYXJhbGxlbEJhaWxIb29rLnByb3RvdHlwZSA9IG51bGw7XG5cbm1vZHVsZS5leHBvcnRzID0gQXN5bmNQYXJhbGxlbEJhaWxIb29rO1xuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBIb29rID0gcmVxdWlyZShcIi4vSG9va1wiKTtcbmNvbnN0IEhvb2tDb2RlRmFjdG9yeSA9IHJlcXVpcmUoXCIuL0hvb2tDb2RlRmFjdG9yeVwiKTtcblxuY2xhc3MgQXN5bmNTZXJpZXNIb29rQ29kZUZhY3RvcnkgZXh0ZW5kcyBIb29rQ29kZUZhY3Rvcnkge1xuXHRjb250ZW50KHsgb25FcnJvciwgb25Eb25lIH0pIHtcblx0XHRyZXR1cm4gdGhpcy5jYWxsVGFwc1Nlcmllcyh7XG5cdFx0XHRvbkVycm9yOiAoaSwgZXJyLCBuZXh0LCBkb25lQnJlYWspID0+IG9uRXJyb3IoZXJyKSArIGRvbmVCcmVhayh0cnVlKSxcblx0XHRcdG9uRG9uZVxuXHRcdH0pO1xuXHR9XG59XG5cbmNvbnN0IGZhY3RvcnkgPSBuZXcgQXN5bmNTZXJpZXNIb29rQ29kZUZhY3RvcnkoKTtcblxuY29uc3QgQ09NUElMRSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0ZmFjdG9yeS5zZXR1cCh0aGlzLCBvcHRpb25zKTtcblx0cmV0dXJuIGZhY3RvcnkuY3JlYXRlKG9wdGlvbnMpO1xufTtcblxuZnVuY3Rpb24gQXN5bmNTZXJpZXNIb29rKGFyZ3MgPSBbXSwgbmFtZSA9IHVuZGVmaW5lZCkge1xuXHRjb25zdCBob29rID0gbmV3IEhvb2soYXJncywgbmFtZSk7XG5cdGhvb2suY29uc3RydWN0b3IgPSBBc3luY1Nlcmllc0hvb2s7XG5cdGhvb2suY29tcGlsZSA9IENPTVBJTEU7XG5cdGhvb2suX2NhbGwgPSB1bmRlZmluZWQ7XG5cdGhvb2suY2FsbCA9IHVuZGVmaW5lZDtcblx0cmV0dXJuIGhvb2s7XG59XG5cbkFzeW5jU2VyaWVzSG9vay5wcm90b3R5cGUgPSBudWxsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFzeW5jU2VyaWVzSG9vaztcbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cInVzZSBzdHJpY3RcIjtcblxuY29uc3QgSG9vayA9IHJlcXVpcmUoXCIuL0hvb2tcIik7XG5jb25zdCBIb29rQ29kZUZhY3RvcnkgPSByZXF1aXJlKFwiLi9Ib29rQ29kZUZhY3RvcnlcIik7XG5cbmNsYXNzIEFzeW5jU2VyaWVzQmFpbEhvb2tDb2RlRmFjdG9yeSBleHRlbmRzIEhvb2tDb2RlRmFjdG9yeSB7XG5cdGNvbnRlbnQoeyBvbkVycm9yLCBvblJlc3VsdCwgcmVzdWx0UmV0dXJucywgb25Eb25lIH0pIHtcblx0XHRyZXR1cm4gdGhpcy5jYWxsVGFwc1Nlcmllcyh7XG5cdFx0XHRvbkVycm9yOiAoaSwgZXJyLCBuZXh0LCBkb25lQnJlYWspID0+IG9uRXJyb3IoZXJyKSArIGRvbmVCcmVhayh0cnVlKSxcblx0XHRcdG9uUmVzdWx0OiAoaSwgcmVzdWx0LCBuZXh0KSA9PlxuXHRcdFx0XHRgaWYoJHtyZXN1bHR9ICE9PSB1bmRlZmluZWQpIHtcXG4ke29uUmVzdWx0KFxuXHRcdFx0XHRcdHJlc3VsdFxuXHRcdFx0XHQpfVxcbn0gZWxzZSB7XFxuJHtuZXh0KCl9fVxcbmAsXG5cdFx0XHRyZXN1bHRSZXR1cm5zLFxuXHRcdFx0b25Eb25lXG5cdFx0fSk7XG5cdH1cbn1cblxuY29uc3QgZmFjdG9yeSA9IG5ldyBBc3luY1Nlcmllc0JhaWxIb29rQ29kZUZhY3RvcnkoKTtcblxuY29uc3QgQ09NUElMRSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0ZmFjdG9yeS5zZXR1cCh0aGlzLCBvcHRpb25zKTtcblx0cmV0dXJuIGZhY3RvcnkuY3JlYXRlKG9wdGlvbnMpO1xufTtcblxuZnVuY3Rpb24gQXN5bmNTZXJpZXNCYWlsSG9vayhhcmdzID0gW10sIG5hbWUgPSB1bmRlZmluZWQpIHtcblx0Y29uc3QgaG9vayA9IG5ldyBIb29rKGFyZ3MsIG5hbWUpO1xuXHRob29rLmNvbnN0cnVjdG9yID0gQXN5bmNTZXJpZXNCYWlsSG9vaztcblx0aG9vay5jb21waWxlID0gQ09NUElMRTtcblx0aG9vay5fY2FsbCA9IHVuZGVmaW5lZDtcblx0aG9vay5jYWxsID0gdW5kZWZpbmVkO1xuXHRyZXR1cm4gaG9vaztcbn1cblxuQXN5bmNTZXJpZXNCYWlsSG9vay5wcm90b3R5cGUgPSBudWxsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFzeW5jU2VyaWVzQmFpbEhvb2s7XG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IEhvb2sgPSByZXF1aXJlKFwiLi9Ib29rXCIpO1xuY29uc3QgSG9va0NvZGVGYWN0b3J5ID0gcmVxdWlyZShcIi4vSG9va0NvZGVGYWN0b3J5XCIpO1xuXG5jbGFzcyBBc3luY1Nlcmllc0xvb3BIb29rQ29kZUZhY3RvcnkgZXh0ZW5kcyBIb29rQ29kZUZhY3Rvcnkge1xuXHRjb250ZW50KHsgb25FcnJvciwgb25Eb25lIH0pIHtcblx0XHRyZXR1cm4gdGhpcy5jYWxsVGFwc0xvb3Bpbmcoe1xuXHRcdFx0b25FcnJvcjogKGksIGVyciwgbmV4dCwgZG9uZUJyZWFrKSA9PiBvbkVycm9yKGVycikgKyBkb25lQnJlYWsodHJ1ZSksXG5cdFx0XHRvbkRvbmVcblx0XHR9KTtcblx0fVxufVxuXG5jb25zdCBmYWN0b3J5ID0gbmV3IEFzeW5jU2VyaWVzTG9vcEhvb2tDb2RlRmFjdG9yeSgpO1xuXG5jb25zdCBDT01QSUxFID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXHRmYWN0b3J5LnNldHVwKHRoaXMsIG9wdGlvbnMpO1xuXHRyZXR1cm4gZmFjdG9yeS5jcmVhdGUob3B0aW9ucyk7XG59O1xuXG5mdW5jdGlvbiBBc3luY1Nlcmllc0xvb3BIb29rKGFyZ3MgPSBbXSwgbmFtZSA9IHVuZGVmaW5lZCkge1xuXHRjb25zdCBob29rID0gbmV3IEhvb2soYXJncywgbmFtZSk7XG5cdGhvb2suY29uc3RydWN0b3IgPSBBc3luY1Nlcmllc0xvb3BIb29rO1xuXHRob29rLmNvbXBpbGUgPSBDT01QSUxFO1xuXHRob29rLl9jYWxsID0gdW5kZWZpbmVkO1xuXHRob29rLmNhbGwgPSB1bmRlZmluZWQ7XG5cdHJldHVybiBob29rO1xufVxuXG5Bc3luY1Nlcmllc0xvb3BIb29rLnByb3RvdHlwZSA9IG51bGw7XG5cbm1vZHVsZS5leHBvcnRzID0gQXN5bmNTZXJpZXNMb29wSG9vaztcbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cInVzZSBzdHJpY3RcIjtcblxuY29uc3QgSG9vayA9IHJlcXVpcmUoXCIuL0hvb2tcIik7XG5jb25zdCBIb29rQ29kZUZhY3RvcnkgPSByZXF1aXJlKFwiLi9Ib29rQ29kZUZhY3RvcnlcIik7XG5cbmNsYXNzIEFzeW5jU2VyaWVzV2F0ZXJmYWxsSG9va0NvZGVGYWN0b3J5IGV4dGVuZHMgSG9va0NvZGVGYWN0b3J5IHtcblx0Y29udGVudCh7IG9uRXJyb3IsIG9uUmVzdWx0LCBvbkRvbmUgfSkge1xuXHRcdHJldHVybiB0aGlzLmNhbGxUYXBzU2VyaWVzKHtcblx0XHRcdG9uRXJyb3I6IChpLCBlcnIsIG5leHQsIGRvbmVCcmVhaykgPT4gb25FcnJvcihlcnIpICsgZG9uZUJyZWFrKHRydWUpLFxuXHRcdFx0b25SZXN1bHQ6IChpLCByZXN1bHQsIG5leHQpID0+IHtcblx0XHRcdFx0bGV0IGNvZGUgPSBcIlwiO1xuXHRcdFx0XHRjb2RlICs9IGBpZigke3Jlc3VsdH0gIT09IHVuZGVmaW5lZCkge1xcbmA7XG5cdFx0XHRcdGNvZGUgKz0gYCR7dGhpcy5fYXJnc1swXX0gPSAke3Jlc3VsdH07XFxuYDtcblx0XHRcdFx0Y29kZSArPSBgfVxcbmA7XG5cdFx0XHRcdGNvZGUgKz0gbmV4dCgpO1xuXHRcdFx0XHRyZXR1cm4gY29kZTtcblx0XHRcdH0sXG5cdFx0XHRvbkRvbmU6ICgpID0+IG9uUmVzdWx0KHRoaXMuX2FyZ3NbMF0pXG5cdFx0fSk7XG5cdH1cbn1cblxuY29uc3QgZmFjdG9yeSA9IG5ldyBBc3luY1Nlcmllc1dhdGVyZmFsbEhvb2tDb2RlRmFjdG9yeSgpO1xuXG5jb25zdCBDT01QSUxFID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXHRmYWN0b3J5LnNldHVwKHRoaXMsIG9wdGlvbnMpO1xuXHRyZXR1cm4gZmFjdG9yeS5jcmVhdGUob3B0aW9ucyk7XG59O1xuXG5mdW5jdGlvbiBBc3luY1Nlcmllc1dhdGVyZmFsbEhvb2soYXJncyA9IFtdLCBuYW1lID0gdW5kZWZpbmVkKSB7XG5cdGlmIChhcmdzLmxlbmd0aCA8IDEpXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiV2F0ZXJmYWxsIGhvb2tzIG11c3QgaGF2ZSBhdCBsZWFzdCBvbmUgYXJndW1lbnRcIik7XG5cdGNvbnN0IGhvb2sgPSBuZXcgSG9vayhhcmdzLCBuYW1lKTtcblx0aG9vay5jb25zdHJ1Y3RvciA9IEFzeW5jU2VyaWVzV2F0ZXJmYWxsSG9vaztcblx0aG9vay5jb21waWxlID0gQ09NUElMRTtcblx0aG9vay5fY2FsbCA9IHVuZGVmaW5lZDtcblx0aG9vay5jYWxsID0gdW5kZWZpbmVkO1xuXHRyZXR1cm4gaG9vaztcbn1cblxuQXN5bmNTZXJpZXNXYXRlcmZhbGxIb29rLnByb3RvdHlwZSA9IG51bGw7XG5cbm1vZHVsZS5leHBvcnRzID0gQXN5bmNTZXJpZXNXYXRlcmZhbGxIb29rO1xuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblwidXNlIHN0cmljdFwiO1xuXG5jb25zdCB1dGlsID0gcmVxdWlyZShcInV0aWxcIik7XG5cbmNvbnN0IGRlZmF1bHRGYWN0b3J5ID0gKGtleSwgaG9vaykgPT4gaG9vaztcblxuY2xhc3MgSG9va01hcCB7XG5cdGNvbnN0cnVjdG9yKGZhY3RvcnksIG5hbWUgPSB1bmRlZmluZWQpIHtcblx0XHR0aGlzLl9tYXAgPSBuZXcgTWFwKCk7XG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcblx0XHR0aGlzLl9mYWN0b3J5ID0gZmFjdG9yeTtcblx0XHR0aGlzLl9pbnRlcmNlcHRvcnMgPSBbXTtcblx0fVxuXG5cdGdldChrZXkpIHtcblx0XHRyZXR1cm4gdGhpcy5fbWFwLmdldChrZXkpO1xuXHR9XG5cblx0Zm9yKGtleSkge1xuXHRcdGNvbnN0IGhvb2sgPSB0aGlzLmdldChrZXkpO1xuXHRcdGlmIChob29rICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiBob29rO1xuXHRcdH1cblx0XHRsZXQgbmV3SG9vayA9IHRoaXMuX2ZhY3Rvcnkoa2V5KTtcblx0XHRjb25zdCBpbnRlcmNlcHRvcnMgPSB0aGlzLl9pbnRlcmNlcHRvcnM7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpbnRlcmNlcHRvcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdG5ld0hvb2sgPSBpbnRlcmNlcHRvcnNbaV0uZmFjdG9yeShrZXksIG5ld0hvb2spO1xuXHRcdH1cblx0XHR0aGlzLl9tYXAuc2V0KGtleSwgbmV3SG9vayk7XG5cdFx0cmV0dXJuIG5ld0hvb2s7XG5cdH1cblxuXHRpbnRlcmNlcHQoaW50ZXJjZXB0b3IpIHtcblx0XHR0aGlzLl9pbnRlcmNlcHRvcnMucHVzaChcblx0XHRcdE9iamVjdC5hc3NpZ24oXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRmYWN0b3J5OiBkZWZhdWx0RmFjdG9yeVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRpbnRlcmNlcHRvclxuXHRcdFx0KVxuXHRcdCk7XG5cdH1cbn1cblxuSG9va01hcC5wcm90b3R5cGUudGFwID0gdXRpbC5kZXByZWNhdGUoZnVuY3Rpb24oa2V5LCBvcHRpb25zLCBmbikge1xuXHRyZXR1cm4gdGhpcy5mb3Ioa2V5KS50YXAob3B0aW9ucywgZm4pO1xufSwgXCJIb29rTWFwI3RhcChrZXks4oCmKSBpcyBkZXByZWNhdGVkLiBVc2UgSG9va01hcCNmb3Ioa2V5KS50YXAo4oCmKSBpbnN0ZWFkLlwiKTtcblxuSG9va01hcC5wcm90b3R5cGUudGFwQXN5bmMgPSB1dGlsLmRlcHJlY2F0ZShmdW5jdGlvbihrZXksIG9wdGlvbnMsIGZuKSB7XG5cdHJldHVybiB0aGlzLmZvcihrZXkpLnRhcEFzeW5jKG9wdGlvbnMsIGZuKTtcbn0sIFwiSG9va01hcCN0YXBBc3luYyhrZXks4oCmKSBpcyBkZXByZWNhdGVkLiBVc2UgSG9va01hcCNmb3Ioa2V5KS50YXBBc3luYyjigKYpIGluc3RlYWQuXCIpO1xuXG5Ib29rTWFwLnByb3RvdHlwZS50YXBQcm9taXNlID0gdXRpbC5kZXByZWNhdGUoZnVuY3Rpb24oa2V5LCBvcHRpb25zLCBmbikge1xuXHRyZXR1cm4gdGhpcy5mb3Ioa2V5KS50YXBQcm9taXNlKG9wdGlvbnMsIGZuKTtcbn0sIFwiSG9va01hcCN0YXBQcm9taXNlKGtleSzigKYpIGlzIGRlcHJlY2F0ZWQuIFVzZSBIb29rTWFwI2ZvcihrZXkpLnRhcFByb21pc2Uo4oCmKSBpbnN0ZWFkLlwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBIb29rTWFwO1xuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5TeW5jSG9vayA9IHJlcXVpcmUoXCIuL1N5bmNIb29rXCIpO1xuZXhwb3J0cy5TeW5jQmFpbEhvb2sgPSByZXF1aXJlKFwiLi9TeW5jQmFpbEhvb2tcIik7XG5leHBvcnRzLlN5bmNXYXRlcmZhbGxIb29rID0gcmVxdWlyZShcIi4vU3luY1dhdGVyZmFsbEhvb2tcIik7XG5leHBvcnRzLlN5bmNMb29wSG9vayA9IHJlcXVpcmUoXCIuL1N5bmNMb29wSG9va1wiKTtcbmV4cG9ydHMuQXN5bmNQYXJhbGxlbEhvb2sgPSByZXF1aXJlKFwiLi9Bc3luY1BhcmFsbGVsSG9va1wiKTtcbmV4cG9ydHMuQXN5bmNQYXJhbGxlbEJhaWxIb29rID0gcmVxdWlyZShcIi4vQXN5bmNQYXJhbGxlbEJhaWxIb29rXCIpO1xuZXhwb3J0cy5Bc3luY1Nlcmllc0hvb2sgPSByZXF1aXJlKFwiLi9Bc3luY1Nlcmllc0hvb2tcIik7XG5leHBvcnRzLkFzeW5jU2VyaWVzQmFpbEhvb2sgPSByZXF1aXJlKFwiLi9Bc3luY1Nlcmllc0JhaWxIb29rXCIpO1xuZXhwb3J0cy5Bc3luY1Nlcmllc0xvb3BIb29rID0gcmVxdWlyZShcIi4vQXN5bmNTZXJpZXNMb29wSG9va1wiKTtcbmV4cG9ydHMuQXN5bmNTZXJpZXNXYXRlcmZhbGxIb29rID0gcmVxdWlyZShcIi4vQXN5bmNTZXJpZXNXYXRlcmZhbGxIb29rXCIpO1xuZXhwb3J0cy5Ib29rTWFwID0gcmVxdWlyZShcIi4vSG9va01hcFwiKTtcbmV4cG9ydHMuTXVsdGlIb29rID0gcmVxdWlyZShcIi4vTXVsdGlIb29rXCIpO1xuIiwiaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuL0ZpZWxkJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWV0aG9kIHtcblxufVxuXG5leHBvcnQgdHlwZSBNZXRob2ROYW1lID0ga2V5b2YgdHlwZW9mIE1ldGhvZFxuXG5leHBvcnQgZW51bSBNZXRob2Qge1xuICAgIGNvbm5lY3QgPSAnQ09OTkVDVCcsXG4gICAgZGVsZXRlICA9ICdERUxFVEUnLFxuICAgIGdldCAgICAgPSAnR0VUJyxcbiAgICBoZWFkICAgID0gJ0hFQUQnLFxuICAgIG9wdGlvbnMgPSAnT1BUSU9OUycsXG4gICAgcGF0Y2ggICA9ICdQQVRDSCcsXG4gICAgcG9zdCAgICA9ICdQT1NUJyxcbiAgICBwdXQgICAgID0gJ1BVVCcsXG4gICAgdHJhY2UgICA9ICdUUkFDRScsXG59XG5cblxuZXhwb3J0IHR5cGUgVVJMU2VhcmNoUGFyYW1zRnVuY3Rpb25OYW1lID0ga2V5b2YgVVJMU2VhcmNoUGFyYW1zXG5leHBvcnQgdHlwZSBVUkxTZWFyY2hQYXJhbXNJbml0ID1cbiAgICBzdHJpbmdbXVtdXG4gICAgfCBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+XG4gICAgfCBzdHJpbmdcbiAgICB8IFVSTFNlYXJjaFBhcmFtc1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2xpZW50Q29uZmlndXJhdGlvbiB7XG4gICAgYmFzZVVSTDogc3RyaW5nO1xuICAgIGhlYWRlcnM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuICAgIHJlcXVlc3Q/OiBSZXF1ZXN0SW5pdDtcblxufVxuXG5leHBvcnQgdHlwZSBDb25zdHJ1Y3RvcjxUeXBlID0gYW55PiA9IG5ldyAoLi4uYXJnczogYW55W10pID0+IFR5cGVcblxuXG5leHBvcnQgaW50ZXJmYWNlIEFwaUNvbmZpZ3VyYXRpb24gZXh0ZW5kcyBDbGllbnRDb25maWd1cmF0aW9uIHtcblxuICAgIENsaWVudDogQ29uc3RydWN0b3I8YW55PjtcbiAgICBIdHRwOiBDb25zdHJ1Y3Rvcjxhbnk+O1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdENvbmZpZyBleHRlbmRzIFJlcXVlc3RJbml0IHtcbiAgICBwYXJhbXM/OiBVUkxTZWFyY2hQYXJhbXNJbml0O1xuICAgIHVybD86IHN0cmluZztcbiAgICBtZXRob2Q/OiBNZXRob2ROYW1lIHwgTWV0aG9kO1xuICAgIGRhdGE/OiBvYmplY3Q7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0cmVhbU1ldGEge1xuICAgIHBhcmFtZXRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gICAgcXVlcnk6IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgdHlwZSBJU3RyZWFtTGlua3M8Sz4gPSB7XG4gICAgW1QgaW4ga2V5b2YgS106IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTdHJlYW1SZXNwb25zZTxUIGV4dGVuZHMgYW55ID0gYW55LCBNRVRBIGV4dGVuZHMgSVN0cmVhbU1ldGEgPSBJU3RyZWFtTWV0YSwgTElOS1MgPSBJU3RyZWFtTGlua3M8J3NlbGYnIHwgJ2VudHJpZXMnPj4ge1xuICAgIGRhdGE6IFQ7XG4gICAgbWV0YTogTUVUQTtcbiAgICBsaW5rczogTElOS1M7XG4gICAgZXJyb3JzPzogc3RyaW5nW10gfCBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VTdHJlYW08SUQgZXh0ZW5kcyBzdHJpbmcgPSBzdHJpbmc+IHtcbiAgICBpZDogSURcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmdcbiAgICB1cGRhdGVkX2F0OiBzdHJpbmdcbiAgICBuYW1lOiBzdHJpbmdcbiAgICBzb3VyY2U6IHtcbiAgICAgICAgdHlwZTogc3RyaW5nXG4gICAgICAgIFsga2V5OiBzdHJpbmcgXTogYW55XG4gICAgfSxcbiAgICBmaWVsZHM6IFJlY29yZDxzdHJpbmcsIGZpZWxkcy5UeXBlIHwgRmllbGQ+XG4gICAgcnVsZXM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCBvYmplY3Q+XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBJU3RyZWFtPElEIGV4dGVuZHMgc3RyaW5nID0gc3RyaW5nPiBleHRlbmRzIElCYXNlU3RyZWFtPElEPiB7XG4gICAgaGFuZGxlPzogSURcbiAgICByb3V0ZXM/OiBBcnJheTxhbnk+LFxuICAgIHZhbGlkYXRvcnM/OiBBcnJheTxhbnk+LFxuICAgIGNvbmZpZz86IFJlY29yZDxzdHJpbmcsIGFueT5cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSB1aSB7XG4gICAgZXhwb3J0IG5hbWVzcGFjZSB0YWJsZSB7XG4gICAgICAgIGV4cG9ydCBpbnRlcmZhY2UgQnV0dG9uIHtcbiAgICAgICAgICAgIGhyZWY/OiBzdHJpbmc7XG4gICAgICAgIH1cblxuICAgICAgICBleHBvcnQgdHlwZSBCdXR0b25zPFQgZXh0ZW5kcyBzdHJpbmdbXT4gPSB7XG4gICAgICAgICAgICBbUCBpbiBrZXlvZiBUXTogQnV0dG9uXG4gICAgICAgIH1cblxuICAgICAgICBleHBvcnQgaW50ZXJmYWNlIFRhYmxlPENPTFVNTlMgZXh0ZW5kcyBzdHJpbmdbXSxcbiAgICAgICAgICAgIEJVVFRPTlMgZXh0ZW5kcyBzdHJpbmdbXSxcbiAgICAgICAgICAgID4ge1xuICAgICAgICAgICAgY29sdW1uczogQ09MVU1OUyxcbiAgICAgICAgICAgIGJ1dHRvbnM6IEJ1dHRvbnM8QlVUVE9OUz5cblxuICAgICAgICAgICAgWyBrZXk6IHN0cmluZyBdOiBhbnlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJU3RyZWFtcyB7XG4gICAgdXNlcnM6IHN0cmVhbXMuVXNlcnM7XG4gICAgcGFnZXM6IHN0cmVhbXMuUGFnZXM7XG4gICAgYWRkb25zOiBJQmFzZVN0cmVhbTwnYWRkb25zJz47XG4gICAgZG9jczogSUJhc2VTdHJlYW08J2RvY3MnPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRW50cmllcyB7XG4gICAgdXNlcnM6IGVudHJpZXMuVXNlcnM7XG4gICAgcGFnZXM6IGVudHJpZXMuUGFnZXM7XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgZmllbGRzIHtcbiAgICBleHBvcnQgdHlwZSBSZWxhdGlvbnNoaXA8UkVMQVRFRCBleHRlbmRzIGtleW9mIElFbnRyaWVzPiA9IElFbnRyaWVzW1JFTEFURURdXG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIFR5cGVzIHtcbiAgICAgICAgc3RyaW5nOiBzdHJpbmc7XG4gICAgICAgIHVybDogc3RyaW5nO1xuICAgICAgICB0ZXh0OiBzdHJpbmc7XG4gICAgICAgIGhhc2g6IHN0cmluZztcbiAgICAgICAgc2x1Zzogc3RyaW5nO1xuICAgICAgICBlbWFpbDogc3RyaW5nO1xuICAgICAgICBtYXJrZG93bjogc3RyaW5nO1xuICAgICAgICB0ZW1wbGF0ZTogc3RyaW5nO1xuICAgICAgICBudW1iZXI6IG51bWJlcjtcbiAgICAgICAgaW50ZWdlcjogbnVtYmVyO1xuICAgICAgICBmbG9hdDogbnVtYmVyO1xuICAgICAgICBkZWNpbWFsOiBudW1iZXI7XG4gICAgICAgIGJvb2xlYW46IGJvb2xlYW47XG4gICAgICAgIGFycmF5OiBBcnJheTxhbnk+O1xuICAgICAgICBwcm90b3R5cGU6IG9iamVjdDtcbiAgICAgICAgb2JqZWN0OiBvYmplY3Q7XG4gICAgICAgIGltYWdlOiBhbnk7XG4gICAgICAgIGZpbGU6IGFueTtcbiAgICAgICAgZGF0ZXRpbWU6IHN0cmluZztcbiAgICAgICAgZGF0ZTogc3RyaW5nO1xuICAgICAgICB0aW1lOiBzdHJpbmc7XG4gICAgICAgIHNlbGVjdDogc3RyaW5nO1xuICAgICAgICBtdWx0aXNlbGVjdDogc3RyaW5nW107XG4gICAgICAgIGNvbGxlY3Rpb246IEFycmF5PGFueT47XG4gICAgICAgIGVudHJ5OiBhbnk7XG4gICAgICAgIGVudHJpZXM6IGFueTtcbiAgICAgICAgbXVsdGlwbGU6IGFueTtcbiAgICAgICAgcG9seW1vcnBoaWM6IGFueTtcbiAgICAgICAgcmVsYXRpb25zaGlwOiBhbnk7XG4gICAgICAgIGNvbG9yOiBhbnk7XG4gICAgfVxuXG4gICAgZXhwb3J0IHR5cGUgVHlwZSA9IGtleW9mIFR5cGVzXG59XG5cbmV4cG9ydCBuYW1lc3BhY2Ugc3RyZWFtcyB7XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIFVzZXJzIGV4dGVuZHMgSUJhc2VTdHJlYW08J3VzZXJzJz4ge1xuICAgICAgICB1aToge1xuICAgICAgICAgICAgdGFibGU6IHVpLnRhYmxlLlRhYmxlPFsgJ2lkJywgJ2VtYWlsJyBdLCBbICdlZGl0JyBdPlxuICAgICAgICAgICAgZm9ybTogYW55W11cbiAgICAgICAgICAgIFsga2V5OiBzdHJpbmcgXTogYW55XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBQYWdlcyBleHRlbmRzIElCYXNlU3RyZWFtPCdwYWdlcyc+IHtcbiAgICAgICAgdWk6IHtcbiAgICAgICAgICAgIHRhYmxlOiB1aS50YWJsZS5UYWJsZTxbICdpZCcsICdlbWFpbCcgXSwgWyAnZWRpdCcgXT5cbiAgICAgICAgICAgIGZvcm06IGFueVtdXG4gICAgICAgICAgICBbIGtleTogc3RyaW5nIF06IGFueVxuICAgICAgICB9O1xuICAgIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBlbnRyaWVzIHtcbiAgICBleHBvcnQgaW50ZXJmYWNlIFVzZXJzIHtcbiAgICAgICAgaWQ6IG51bWJlcjtcbiAgICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgICBlbWFpbDogc3RyaW5nO1xuICAgICAgICBwYXNzd29yZDogc3RyaW5nO1xuICAgICAgICByZWxhdGl2ZTogZmllbGRzLlJlbGF0aW9uc2hpcDwndXNlcnMnPjtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIFBhZ2VzIHt9XG59XG4iLCJcbmV4cG9ydCBjbGFzcyBIVFRQRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHJlc3BvbnNlOiBSZXNwb25zZSwgcHVibGljIHJlcXVlc3Q/OlJlcXVlc3QpIHtcbiAgICAgICAgc3VwZXIoYEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9IEVycm9yOiAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgICAgIHRoaXMubmFtZSA9ICdIVFRQRXJyb3InO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBTdHIge1xuICAgIHB1YmxpYyBzdGF0aWMgcmFuZG9tKGxlbmd0aCA9IDE1KSB7XG4gICAgICAgIGxldCB0ZXh0ICAgICAgID0gJyc7XG4gICAgICAgIGNvbnN0IHBvc3NpYmxlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5JztcbiAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICsrICkge1xuICAgICAgICAgICAgdGV4dCArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBlbnN1cmVMZWZ0KHN0cjogc3RyaW5nLCBsZWZ0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIGZhbHNlID09PSBzdHIuc3RhcnRzV2l0aChsZWZ0KSApIHtcbiAgICAgICAgICAgIHJldHVybiBsZWZ0ICsgc3RyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBlbnN1cmVSaWdodChzdHI6IHN0cmluZywgcmlnaHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICggZmFsc2UgPT09IHN0ci5lbmRzV2l0aChyaWdodCkgKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyICsgcmlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHN0cmlwTGVmdChzdHI6IHN0cmluZywgbGVmdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCBzdHIuc3RhcnRzV2l0aChsZWZ0KSApIHtcbiAgICAgICAgICAgIHJldHVybiBzdHIuc3Vic3RyKGxlZnQubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc3RyaXBSaWdodChzdHI6IHN0cmluZywgcmlnaHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICggc3RyLmVuZHNXaXRoKHJpZ2h0KSApIHtcbiAgICAgICAgICAgIHJldHVybiBzdHIuc3Vic3RyKDAsIHN0ci5sZW5ndGggLSByaWdodC5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyB1Y2ZpcnN0KHN0cmluZykge1xuICAgICAgICByZXR1cm4gc3RyaW5nWyAwIF0udG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGxjZmlyc3Qoc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmdbIDAgXS50b0xvd2VyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcGFyYW1ldGVycyhzdHI6IHN0cmluZywgcGFyYW1zOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KSB7XG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHBhcmFtcykuZm9yRWFjaCgoWyBrZXksIHZhbHVlIF0pID0+IHN0ciA9IHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoJzonK2tleSwnZycpLCB2YWx1ZSkpO1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxufVxuLyoqXG4gKlxuICogQHBhcmFtIG9ialxuICogQHBhcmFtIGtcbiAqIEBwYXJhbSB2XG4gKiBAZXhhbXBsZVxuICpcbiAqIHBhcmFtcyA9IE9iamVjdC5lbnRyaWVzKHBhcmFtcykuZmlsdGVyKChbIGtleSwgdmFsdWUgXSkgPT4ge1xuICogICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA+IDA7XG4gKiB9KS5yZWR1Y2UodXRpbHMub2JqZWN0aWZ5LCB7fSk7XG4gKlxuICovXG5leHBvcnQgY29uc3Qgb2JqZWN0aWZ5ID0gKG9iaiwgWyBrLCB2IF0pID0+ICh7IC4uLm9iaiwgWyBrIF06IHYgfSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHByZXNlcnZlQ2FtZWxDYXNlID0gKHN0cmluZywgbG9jYWxlKSA9PiB7XG5cdGxldCBpc0xhc3RDaGFyTG93ZXIgPSBmYWxzZTtcblx0bGV0IGlzTGFzdENoYXJVcHBlciA9IGZhbHNlO1xuXHRsZXQgaXNMYXN0TGFzdENoYXJVcHBlciA9IGZhbHNlO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3QgY2hhcmFjdGVyID0gc3RyaW5nW2ldO1xuXG5cdFx0aWYgKGlzTGFzdENoYXJMb3dlciAmJiAvW1xccHtMdX1dL3UudGVzdChjaGFyYWN0ZXIpKSB7XG5cdFx0XHRzdHJpbmcgPSBzdHJpbmcuc2xpY2UoMCwgaSkgKyAnLScgKyBzdHJpbmcuc2xpY2UoaSk7XG5cdFx0XHRpc0xhc3RDaGFyTG93ZXIgPSBmYWxzZTtcblx0XHRcdGlzTGFzdExhc3RDaGFyVXBwZXIgPSBpc0xhc3RDaGFyVXBwZXI7XG5cdFx0XHRpc0xhc3RDaGFyVXBwZXIgPSB0cnVlO1xuXHRcdFx0aSsrO1xuXHRcdH0gZWxzZSBpZiAoaXNMYXN0Q2hhclVwcGVyICYmIGlzTGFzdExhc3RDaGFyVXBwZXIgJiYgL1tcXHB7TGx9XS91LnRlc3QoY2hhcmFjdGVyKSkge1xuXHRcdFx0c3RyaW5nID0gc3RyaW5nLnNsaWNlKDAsIGkgLSAxKSArICctJyArIHN0cmluZy5zbGljZShpIC0gMSk7XG5cdFx0XHRpc0xhc3RMYXN0Q2hhclVwcGVyID0gaXNMYXN0Q2hhclVwcGVyO1xuXHRcdFx0aXNMYXN0Q2hhclVwcGVyID0gZmFsc2U7XG5cdFx0XHRpc0xhc3RDaGFyTG93ZXIgPSB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpc0xhc3RDaGFyTG93ZXIgPSBjaGFyYWN0ZXIudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKSA9PT0gY2hhcmFjdGVyICYmIGNoYXJhY3Rlci50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpICE9PSBjaGFyYWN0ZXI7XG5cdFx0XHRpc0xhc3RMYXN0Q2hhclVwcGVyID0gaXNMYXN0Q2hhclVwcGVyO1xuXHRcdFx0aXNMYXN0Q2hhclVwcGVyID0gY2hhcmFjdGVyLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSkgPT09IGNoYXJhY3RlciAmJiBjaGFyYWN0ZXIudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKSAhPT0gY2hhcmFjdGVyO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBzdHJpbmc7XG59O1xuXG5jb25zdCBwcmVzZXJ2ZUNvbnNlY3V0aXZlVXBwZXJjYXNlID0gaW5wdXQgPT4ge1xuXHRyZXR1cm4gaW5wdXQucmVwbGFjZSgvXltcXHB7THV9XSg/IVtcXHB7THV9XSkvZ3UsIG0xID0+IG0xLnRvTG93ZXJDYXNlKCkpO1xufTtcblxuY29uc3QgcG9zdFByb2Nlc3MgPSAoaW5wdXQsIG9wdGlvbnMpID0+IHtcblx0cmV0dXJuIGlucHV0LnJlcGxhY2UoL1tfLlxcLSBdKyhbXFxwe0FscGhhfVxccHtOfV9dfCQpL2d1LCAoXywgcDEpID0+IHAxLnRvTG9jYWxlVXBwZXJDYXNlKG9wdGlvbnMubG9jYWxlKSlcblx0XHQucmVwbGFjZSgvXFxkKyhbXFxwe0FscGhhfVxccHtOfV9dfCQpL2d1LCBtID0+IG0udG9Mb2NhbGVVcHBlckNhc2Uob3B0aW9ucy5sb2NhbGUpKTtcbn07XG5cbmNvbnN0IGNhbWVsQ2FzZSA9IChpbnB1dCwgb3B0aW9ucykgPT4ge1xuXHRpZiAoISh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnIHx8IEFycmF5LmlzQXJyYXkoaW5wdXQpKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHRoZSBpbnB1dCB0byBiZSBgc3RyaW5nIHwgc3RyaW5nW11gJyk7XG5cdH1cblxuXHRvcHRpb25zID0ge1xuXHRcdHBhc2NhbENhc2U6IGZhbHNlLFxuXHRcdHByZXNlcnZlQ29uc2VjdXRpdmVVcHBlcmNhc2U6IGZhbHNlLFxuXHRcdC4uLm9wdGlvbnNcblx0fTtcblxuXHRpZiAoQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcblx0XHRpbnB1dCA9IGlucHV0Lm1hcCh4ID0+IHgudHJpbSgpKVxuXHRcdFx0LmZpbHRlcih4ID0+IHgubGVuZ3RoKVxuXHRcdFx0LmpvaW4oJy0nKTtcblx0fSBlbHNlIHtcblx0XHRpbnB1dCA9IGlucHV0LnRyaW0oKTtcblx0fVxuXG5cdGlmIChpbnB1dC5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRpZiAoaW5wdXQubGVuZ3RoID09PSAxKSB7XG5cdFx0cmV0dXJuIG9wdGlvbnMucGFzY2FsQ2FzZSA/IGlucHV0LnRvTG9jYWxlVXBwZXJDYXNlKG9wdGlvbnMubG9jYWxlKSA6IGlucHV0LnRvTG9jYWxlTG93ZXJDYXNlKG9wdGlvbnMubG9jYWxlKTtcblx0fVxuXG5cdGNvbnN0IGhhc1VwcGVyQ2FzZSA9IGlucHV0ICE9PSBpbnB1dC50b0xvY2FsZUxvd2VyQ2FzZShvcHRpb25zLmxvY2FsZSk7XG5cblx0aWYgKGhhc1VwcGVyQ2FzZSkge1xuXHRcdGlucHV0ID0gcHJlc2VydmVDYW1lbENhc2UoaW5wdXQsIG9wdGlvbnMubG9jYWxlKTtcblx0fVxuXG5cdGlucHV0ID0gaW5wdXQucmVwbGFjZSgvXltfLlxcLSBdKy8sICcnKTtcblxuXHRpZiAob3B0aW9ucy5wcmVzZXJ2ZUNvbnNlY3V0aXZlVXBwZXJjYXNlKSB7XG5cdFx0aW5wdXQgPSBwcmVzZXJ2ZUNvbnNlY3V0aXZlVXBwZXJjYXNlKGlucHV0KTtcblx0fSBlbHNlIHtcblx0XHRpbnB1dCA9IGlucHV0LnRvTG9jYWxlTG93ZXJDYXNlKCk7XG5cdH1cblxuXHRpZiAob3B0aW9ucy5wYXNjYWxDYXNlKSB7XG5cdFx0aW5wdXQgPSBpbnB1dC5jaGFyQXQoMCkudG9Mb2NhbGVVcHBlckNhc2Uob3B0aW9ucy5sb2NhbGUpICsgaW5wdXQuc2xpY2UoMSk7XG5cdH1cblxuXHRyZXR1cm4gcG9zdFByb2Nlc3MoaW5wdXQsIG9wdGlvbnMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjYW1lbENhc2U7XG4vLyBUT0RPOiBSZW1vdmUgdGhpcyBmb3IgdGhlIG5leHQgbWFqb3IgcmVsZWFzZVxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGNhbWVsQ2FzZTtcbiIsImltcG9ydCBkZWVwbWVyZ2UgZnJvbSAnZGVlcG1lcmdlJztcbmltcG9ydCB7IEFzeW5jU2VyaWVzV2F0ZXJmYWxsSG9vaywgU3luY1dhdGVyZmFsbEhvb2sgfSBmcm9tICd0YXBhYmxlJztcbmltcG9ydCB7IENsaWVudENvbmZpZ3VyYXRpb24sIENvbnN0cnVjdG9yLCBNZXRob2QsIE1ldGhvZE5hbWUsIFJlcXVlc3RDb25maWcsIFVSTFNlYXJjaFBhcmFtc0luaXQgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IEhUVFBFcnJvciB9IGZyb20gJy4vSFRUUEVycm9yJztcbmltcG9ydCB7IG9iamVjdGlmeSwgU3RyIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgY2FtZWxjYXNlIGZyb20gJ2NhbWVsY2FzZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2xpZW50SGVhZGVycyBleHRlbmRzIEhlYWRlcnMge1xuICAgIFtrZXk6c3RyaW5nXTphbnlcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDbGllbnRSZXNwb25zZSBleHRlbmRzIFJlc3BvbnNlIHtcbiAgICByZWFkb25seSBoZWFkZXJzOkNsaWVudEhlYWRlcnNcbn1cblxuZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UocmVzcG9uc2U6UmVzcG9uc2UpOkNsaWVudFJlc3BvbnNlIHtcbiAgICBjb25zdCB0cmFuc2Zvcm1lZDpDbGllbnRSZXNwb25zZSA9IHJlc3BvbnNlLmNsb25lKCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRyYW5zZm9ybWVkLCdoZWFkZXJzJyx7dmFsdWU6e319KVxuICAgIGxldCBoZWFkZXJFbnRyaWVzID0gQXJyYXkuZnJvbShyZXNwb25zZS5oZWFkZXJzWydlbnRyaWVzJ10oKSk7XG4gICAgT2JqZWN0LmVudHJpZXMoZGVlcG1lcmdlLmFsbChbXG4gICAgICAgIGhlYWRlckVudHJpZXMubWFwKChba2V5LHZhbHVlXSkgPT4gKFtjYW1lbGNhc2Uoa2V5KSwgdmFsdWVdKSkucmVkdWNlKG9iamVjdGlmeSwge30pLFxuICAgICAgICBoZWFkZXJFbnRyaWVzLm1hcCgoW2tleSx2YWx1ZV0pID0+IChba2V5LnNwbGl0KCctJykubWFwKHNlZyA9PiBTdHIudWNmaXJzdChzZWcpKS5qb2luKCctJyksIHZhbHVlXSkpLnJlZHVjZShvYmplY3RpZnksIHt9KSxcbiAgICAgICAgaGVhZGVyRW50cmllcy5yZWR1Y2Uob2JqZWN0aWZ5LCB7fSlcbiAgICBdKSkuZm9yRWFjaCgoW2tleSx2YWx1ZV0pID0+IHtcbiAgICAgICAgdHJhbnNmb3JtZWQuaGVhZGVyc1trZXldID0gdmFsdWU7XG4gICAgICAgIHRyYW5zZm9ybWVkLmhlYWRlcnMuc2V0KGtleSx2YWx1ZSk7XG4gICAgfSlcblxuICAgIHJldHVybiB0cmFuc2Zvcm1lZDtcbn1cblxuZXhwb3J0IGNsYXNzIENsaWVudCB7XG4gICAgcHVibGljIHJlYWRvbmx5IGhvb2tzID0ge1xuICAgICAgICBjcmVhdGVSZXF1ZXN0OiBuZXcgU3luY1dhdGVyZmFsbEhvb2s8UmVxdWVzdENvbmZpZ1NldHRlcj4oWyAnZmFjdG9yeScgXSksXG4gICAgICAgIHJlcXVlc3QgICAgICA6IG5ldyBTeW5jV2F0ZXJmYWxsSG9vazxSZXF1ZXN0PihbICdyZXF1ZXN0JyBdKSxcbiAgICAgICAgcmVzcG9uc2UgICAgIDogbmV3IEFzeW5jU2VyaWVzV2F0ZXJmYWxsSG9vazxbUmVzcG9uc2UsIFJlcXVlc3RdPihbICdyZXNwb25zZScsICdyZXF1ZXN0JyBdKSxcbiAgICB9O1xuICAgIHB1YmxpYyBjb25maWc6IENsaWVudENvbmZpZ3VyYXRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENsaWVudENvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgdGhpcy5jb25maWcgPSBkZWVwbWVyZ2Uoe1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXF1ZXN0OiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kICAgICA6ICdHRVQnLFxuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LCBjb25maWcpO1xuICAgIH1cblxuXG4gICAgcHVibGljIGFzeW5jIHJlcXVlc3QobWV0aG9kOiBNZXRob2ROYW1lLCB1cmk6IHN0cmluZywgY29uZmlnOiBSZXF1ZXN0Q29uZmlnID0ge30pOiBQcm9taXNlPFJlc3BvbnNlPiB7XG4gICAgICAgIGxldCByZXF1ZXN0ICA9IHRoaXMuY3JlYXRlUmVxdWVzdChtZXRob2QsIHVyaSwgY29uZmlnKTtcbiAgICAgICAgcmVxdWVzdCAgICAgID0gdGhpcy5ob29rcy5yZXF1ZXN0LmNhbGwocmVxdWVzdCk7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBmZXRjaChyZXF1ZXN0KTtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gdHJhbnNmb3JtUmVzcG9uc2UocmVzKTtcbiAgICAgICAgcmVzcG9uc2UgICAgID0gYXdhaXQgdGhpcy5ob29rcy5yZXNwb25zZS5wcm9taXNlKHJlc3BvbnNlLCByZXF1ZXN0KTtcbiAgICAgICAgaWYgKCAhcmVzcG9uc2Uub2sgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSFRUUEVycm9yKHJlc3BvbnNlLCByZXF1ZXN0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVJlcXVlc3QobWV0aG9kOiBNZXRob2ROYW1lLCB1cmk6IHN0cmluZywgY29uZmlnOiBSZXF1ZXN0Q29uZmlnID0ge30pOiBSZXF1ZXN0IHtcbiAgICAgICAgbGV0IGZhY3RvcnkgPSB0aGlzLmNyZWF0ZVJlcXVlc3RGYWN0b3J5KG1ldGhvZCwgdXJpLCBjb25maWcpO1xuICAgICAgICBmYWN0b3J5LmhlYWRlcnModGhpcy5jb25maWcuaGVhZGVycyk7XG4gICAgICAgIGZhY3RvcnkgICAgID0gdGhpcy5ob29rcy5jcmVhdGVSZXF1ZXN0LmNhbGwoZmFjdG9yeSk7XG4gICAgICAgIHJldHVybiBmYWN0b3J5Lm1ha2UoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3JlYXRlUmVxdWVzdEZhY3RvcnkobWV0aG9kOiBNZXRob2ROYW1lLCB1cmk6IHN0cmluZywgY29uZmlnOiBSZXF1ZXN0Q29uZmlnID0ge30pOiBSZXF1ZXN0Q29uZmlnU2V0dGVyIHtcbiAgICAgICAgY29uZmlnICAgICAgICA9IHRoaXMuZ2V0UmVxdWVzdENvbmZpZyhjb25maWcpO1xuICAgICAgICBjb25maWcubWV0aG9kID0gTWV0aG9kWyBtZXRob2QgXTtcbiAgICAgICAgY29uZmlnLnVybCA9IHVyaTtcblxuICAgICAgICByZXR1cm4gY3JlYXRlUmVxdWVzdEZhY3RvcnkodGhpcy5jb25maWcpLm1lcmdlKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldFJlcXVlc3RDb25maWcoY29uZmlnOiBSZXF1ZXN0Q29uZmlnID0ge30pOiBSZXF1ZXN0Q29uZmlnIHtcbiAgICAgICAgcmV0dXJuIGRlZXBtZXJnZSh0aGlzLmNvbmZpZy5yZXF1ZXN0IGFzIGFueSwgY29uZmlnIGFzIGFueSwgeyBjbG9uZTogdHJ1ZSB9KSBhcyBSZXF1ZXN0Q29uZmlnO1xuICAgIH1cbn1cblxuXG5leHBvcnQgdHlwZSBSZXF1ZXN0Q29uZmlnU2V0dGVyPFQgZXh0ZW5kcyBSZXF1ZXN0ID0gUmVxdWVzdCwgSyBleHRlbmRzIGtleW9mIFJlcXVlc3RDb25maWcgPSBrZXlvZiBSZXF1ZXN0Q29uZmlnPiA9XG4gICAge1xuICAgICAgICBbUCBpbiBLXTogKHZhbHVlOiBSZXF1ZXN0Q29uZmlnW1BdKSA9PiBSZXF1ZXN0Q29uZmlnU2V0dGVyPFQsIEs+XG4gICAgfVxuICAgICYgUmVxdWVzdEZhY3Rvcnk8VD5cblxuZXhwb3J0IGNsYXNzIFJlcXVlc3RGYWN0b3J5PFQgZXh0ZW5kcyBSZXF1ZXN0ID0gUmVxdWVzdD4ge1xuICAgIF9jb25maWc6IFJlcXVlc3RDb25maWcgPSB7fTtcbiAgICBfcGFyYW1zICAgICAgICAgICAgICAgID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgIF9oZWFkZXJzICAgICAgICAgICAgICAgPSBuZXcgSGVhZGVycygpO1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9jbGllbnRDb25maWc6IENsaWVudENvbmZpZ3VyYXRpb24sIHByb3RlY3RlZCBfUmVxdWVzdDogQ29uc3RydWN0b3I8VD4pIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkodGhpcywge1xuICAgICAgICAgICAgZ2V0PEMgZXh0ZW5kcyBrZXlvZiBSZXF1ZXN0Q29uZmlnPih0YXJnZXQ6IFJlcXVlc3RGYWN0b3J5PFQ+LCBwOiBDLCByZWNlaXZlcjogYW55KTogYW55IHtcbiAgICAgICAgICAgICAgICBpZiAoIFJlZmxlY3QuaGFzKHRhcmdldCwgcCkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQsIHAsIHJlY2VpdmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9AZm9ybWF0dGVyOm9uXG4gICAgICAgICAgICAgICAgcmV0dXJuICh2YWx1ZTogUmVxdWVzdENvbmZpZ1tDXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuX2NvbmZpZ1sgcCBdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodGFyZ2V0OiBSZXF1ZXN0RmFjdG9yeTxUPiwgcDogc3RyaW5nIHwgc3ltYm9sLCB2YWx1ZTogYW55LCByZWNlaXZlcjogYW55KTogYm9vbGVhbiB7XG4gICAgICAgICAgICAgICAgaWYgKCB0eXBlb2YgdGFyZ2V0WyBwIF0gPT09ICdmdW5jdGlvbicgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRbIHAgXSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LnNldCh0YXJnZXQsIHAsIHZhbHVlLCByZWNlaXZlcik7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1lcmdlKGNvbmZpZzogUGFydGlhbDxSZXF1ZXN0Q29uZmlnPikge1xuICAgICAgICBPYmplY3QuZW50cmllcyhjb25maWcpLmZvckVhY2goKFsga2V5LCB2YWx1ZSBdKSA9PiB0aGlzWyBrZXkgXSh2YWx1ZSkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXRDb25maWcoKTogUmVxdWVzdENvbmZpZyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50aGlzLl9jb25maWcsXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgICAgICAgcGFyYW1zIDogdGhpcy5fcGFyYW1zLFxuICAgICAgICAgICAgdXJsICAgIDogdGhpcy5fY29uZmlnLnVybCA/IHRoaXMuZ2V0VXJpKHRoaXMuX2NvbmZpZy51cmwpIDogdGhpcy5fY29uZmlnLnVybCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoZWFkZXIobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2hlYWRlcnMuc2V0KG5hbWUsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcGFyYW0obmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2hlYWRlcnMuc2V0KG5hbWUsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaGVhZGVycyhoZWFkZXJzOiBIZWFkZXJzSW5pdCkge1xuICAgICAgICBtZXJnZUhlYWRlcnMoaGVhZGVycywgdGhpcy5faGVhZGVycyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHBhcmFtcyhwYXJhbXM6IFVSTFNlYXJjaFBhcmFtc0luaXQpIHtcbiAgICAgICAgbWVyZ2VVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCB0aGlzLl9wYXJhbXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBkYXRhKHZhbHVlOiBvYmplY3QpIHtcbiAgICAgICAgdGhpcy5faGVhZGVycy5zZXQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgIHRoaXMuX2NvbmZpZy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0VXJpKHVyaTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBwYXJhbXMgPSB0aGlzLl9wYXJhbXMudG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKCBwYXJhbXMubGVuZ3RoICkge1xuICAgICAgICAgICAgcGFyYW1zID0gJz8nICsgcGFyYW1zO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTdHIuZW5zdXJlUmlnaHQodGhpcy5fY2xpZW50Q29uZmlnLmJhc2VVUkwsICcvJykgKyBTdHIuc3RyaXBMZWZ0KHVyaSwgJy8nKSArIHBhcmFtcztcbiAgICB9XG5cbiAgICBiYXNpYyh1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhvcml6YXRpb24oJ0Jhc2ljJywgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKSk7XG4gICAgfVxuXG4gICAgYmVhcmVyKHRva2VuOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aG9yaXphdGlvbignQmVhcmVyJywgdG9rZW4pO1xuICAgIH1cblxuICAgIGF1dGhvcml6YXRpb24oa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCBrZXkgKyAnICcgKyB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgbWFrZSgpOiBUIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXRDb25maWcoKTtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzLl9SZXF1ZXN0KGNvbmZpZy51cmwsIGNvbmZpZyk7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJlcXVlc3RGYWN0b3J5PFQgZXh0ZW5kcyBSZXF1ZXN0PihjbGllbnRDb25maWc6IENsaWVudENvbmZpZ3VyYXRpb24sIF9SZXF1ZXN0OiBDb25zdHJ1Y3RvcjxUPiA9IFJlcXVlc3QgYXMgYW55KTogUmVxdWVzdENvbmZpZ1NldHRlcjxUPiB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0RmFjdG9yeShjbGllbnRDb25maWcsIF9SZXF1ZXN0KSBhcyBSZXF1ZXN0Q29uZmlnU2V0dGVyPFQ+O1xufVxuXG5mdW5jdGlvbiBtZXJnZUhlYWRlcnMoc291cmNlOiBIZWFkZXJzSW5pdCwgZGVzdGluYXRpb246IEhlYWRlcnMpIHtcbiAgICAobmV3IEhlYWRlcnMoc291cmNlKSkuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4gZGVzdGluYXRpb24uc2V0KGtleSwgdmFsdWUpKTtcbiAgICByZXR1cm4gZGVzdGluYXRpb247XG59XG5cbmZ1bmN0aW9uIG1lcmdlVVJMU2VhcmNoUGFyYW1zKHNvdXJjZTogVVJMU2VhcmNoUGFyYW1zSW5pdCwgZGVzdGluYXRpb246IFVSTFNlYXJjaFBhcmFtcykge1xuICAgIChuZXcgVVJMU2VhcmNoUGFyYW1zKHNvdXJjZSkpLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IGRlc3RpbmF0aW9uLnNldChrZXksIHZhbHVlKSk7XG4gICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xufVxuIiwiZXhwb3J0IGNsYXNzIENvbGxlY3Rpb248VHlwZT4gZXh0ZW5kcyBBcnJheTxUeXBlPiBpbXBsZW1lbnRzIEFycmF5PFR5cGU+IHtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBjb2xsZWN0aW9uIGluc3RhbmNlLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBpdGVtcyBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciguLi5pdGVtczogVHlwZVtdKSB7XG5cbiAgICAgICAgc3VwZXIoLi4uaXRlbXMpO1xuXG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBBcnJheS5wcm90b3R5cGUpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEh0dHAgfSBmcm9tICcuL0h0dHAnO1xuaW1wb3J0IHsgIFN0cmVhbSB9IGZyb20gJy4vU3RyZWFtJztcbi8vIGV4cG9ydCBpbnRlcmZhY2UgRW50cnk8SUQgZXh0ZW5kcyBzdHJpbmcgPSBzdHJpbmc+IHtcbi8vICAgICBpZDogc3RyaW5nO1xuLy8gfVxuZXhwb3J0IHR5cGUgSUVudHJ5PFQsIElEIGV4dGVuZHMgc3RyaW5nID0gc3RyaW5nPiA9XG4gICAgRW50cnk8SUQ+XG4gICAgJiBUO1xuXG5leHBvcnQgY2xhc3MgRW50cnk8SUQgZXh0ZW5kcyBzdHJpbmcgPSBzdHJpbmc+IHtcbiAgICBnZXQgaHR0cCgpOiBIdHRwIHtyZXR1cm4gdGhpcy5fc3RyZWFtLnN0cmVhbXMuaHR0cDt9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIF9zdHJlYW06IFN0cmVhbTxJRD4sXG4gICAgICAgIHByb3RlY3RlZCBfZGF0YTogYW55ICAgICAgPSB7fSxcbiAgICAgICAgcHJvdGVjdGVkIF9mcmVzaDogYm9vbGVhbiA9IHRydWUsXG4gICAgKSB7XG4gICAgICAgIGxldCBwcm94eSA9IG5ldyBQcm94eSh0aGlzLCB7XG4gICAgICAgICAgICBnZXQodGFyZ2V0OiBFbnRyeTxJRD4sIHA6IHN0cmluZyB8IHN5bWJvbCwgcmVjZWl2ZXI6IGFueSk6IGFueSB7XG4gICAgICAgICAgICAgICAgaWYgKCBSZWZsZWN0Lmhhcyh0YXJnZXQsIHApICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwLCByZWNlaXZlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICggUmVmbGVjdC5oYXModGFyZ2V0Ll9kYXRhLCBwKSApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldC5fZGF0YSwgcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh0YXJnZXQ6IEVudHJ5PElEPiwgcDogc3RyaW5nIHwgc3ltYm9sLCB2YWx1ZTogYW55LCByZWNlaXZlcjogYW55KTogYm9vbGVhbiB7XG4gICAgICAgICAgICAgICAgaWYgKCBSZWZsZWN0Lmhhcyh0YXJnZXQsIHApICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5zZXQodGFyZ2V0LCBwLCB2YWx1ZSwgcmVjZWl2ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5zZXQodGFyZ2V0Ll9kYXRhLCBwLCB2YWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb3h5O1xuICAgIH1cblxuICAgIGdldCBzdHJlYW0oKTogU3RyZWFtPElEPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdHJlYW07XG4gICAgfVxuXG4gICAgYXN5bmMgc2F2ZSgpOiBQcm9taXNlPEJvb2xlYW4+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICggdGhpcy5fZnJlc2ggKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5odHRwLnBvc3RFbnRyeSh0aGlzLl9zdHJlYW0uaWQsIHRoaXMuX2RhdGEpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5odHRwLnBhdGNoRW50cnkodGhpcy5fc3RyZWFtLmlkLCB0aGlzLl9kYXRhLmlkLCB0aGlzLl9kYXRhKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0b3IoKSB7XG5cbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEVudHJ5LCBJRW50cnkgfSBmcm9tICcuL0VudHJ5JztcbmltcG9ydCB7IENvbGxlY3Rpb24gfSBmcm9tICcuL0NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgSVN0cmVhbUxpbmtzLCBJU3RyZWFtTWV0YSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgU3RyZWFtIH0gZnJvbSAnLi9TdHJlYW0nO1xuaW1wb3J0IHsgSHR0cCB9IGZyb20gJy4vSHR0cCc7XG5cblxuZXhwb3J0IHR5cGUgSUVudHJpZXNMaW5rcyA9IElTdHJlYW1MaW5rczwnc2VsZicgfCAnc3RyZWFtcycgfCAnc3RyZWFtJz47XG5leHBvcnQgdHlwZSBJUGFnaW5hdGVkRW50cmllc0xpbmtzID0gSVN0cmVhbUxpbmtzPCduZXh0X3BhZ2UnIHwgJ3ByZXZpb3VzX3BhZ2UnIHwgJ3NlbGYnIHwgJ2ZpcnN0X3BhZ2UnIHwgJ3N0cmVhbXMnIHwgJ3N0cmVhbSc+O1xuXG5leHBvcnQgaW50ZXJmYWNlIElFbnRyaWVzTWV0YSBleHRlbmRzIElTdHJlYW1NZXRhIHtcbiAgICB0b3RhbDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElQYWdpbmF0ZWRFbnRyaWVzTWV0YSBleHRlbmRzIElTdHJlYW1NZXRhIHtcbiAgICBjdXJyZW50X3BhZ2U6IG51bWJlcjtcbiAgICBsYXN0X3BhZ2U6IG51bWJlcjtcbiAgICBwZXJfcGFnZTogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgRW50cnlDb2xsZWN0aW9uPFQ9YW55PiBleHRlbmRzIENvbGxlY3Rpb248SUVudHJ5PFQ+PiB7XG4gICAgY29uc3RydWN0b3IoZW50cmllczogSUVudHJ5PFQ+W10sIHB1YmxpYyByZWFkb25seSBtZXRhPzogSUVudHJpZXNNZXRhLCBwdWJsaWMgcmVhZG9ubHkgbGlua3M/OiBJRW50cmllc0xpbmtzKSB7XG4gICAgICAgIHN1cGVyKC4uLmVudHJpZXMgYXMgYW55W10pO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tUmVzcG9uc2U8VD4ocmVzcG9uc2U6IEh0dHAuUmVzcG9uc2VzPFRbXT5bJ2VudHJpZXMnXSwgc3RyZWFtOiBTdHJlYW0pOiBFbnRyeUNvbGxlY3Rpb248VD4ge1xuICAgICAgICBjb25zdCBlbnRyaWVzID0gT2JqZWN0LnZhbHVlcyhyZXNwb25zZS5kYXRhKS5tYXAoZW50cnkgPT4gbmV3IEVudHJ5KHN0cmVhbSwgZW50cnksIGZhbHNlKSk7XG4gICAgICAgIHJldHVybiBuZXcgRW50cnlDb2xsZWN0aW9uPFQ+KGVudHJpZXMgYXMgYW55LCByZXNwb25zZS5tZXRhLCByZXNwb25zZS5saW5rcyk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGFnaW5hdGVkRW50cnlDb2xsZWN0aW9uPFQ9YW55PiBleHRlbmRzIENvbGxlY3Rpb248SUVudHJ5PFQ+PiB7XG4gICAgY29uc3RydWN0b3IoZW50cmllczogSUVudHJ5PFQ+W10sIHB1YmxpYyByZWFkb25seSBtZXRhPzogSVBhZ2luYXRlZEVudHJpZXNNZXRhLCBwdWJsaWMgcmVhZG9ubHkgbGlua3M/OiBJUGFnaW5hdGVkRW50cmllc0xpbmtzKSB7XG4gICAgICAgIHN1cGVyKC4uLmVudHJpZXMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tUmVzcG9uc2U8VD4ocmVzcG9uc2U6IEh0dHAuUmVzcG9uc2VzPFRbXT5bJ3BhZ2luYXRlZCddLCBzdHJlYW06IFN0cmVhbSk6IFBhZ2luYXRlZEVudHJ5Q29sbGVjdGlvbjxUPiB7XG4gICAgICAgIGNvbnN0IGVudHJpZXMgPSBPYmplY3QudmFsdWVzKHJlc3BvbnNlLmRhdGEpLm1hcChlbnRyeSA9PiBuZXcgRW50cnkoc3RyZWFtLCBlbnRyeSwgZmFsc2UpKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQYWdpbmF0ZWRFbnRyeUNvbGxlY3Rpb248VD4oZW50cmllcyBhcyBhbnksIHJlc3BvbnNlLm1ldGEsIHJlc3BvbnNlLmxpbmtzKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTdHJlYW0gfSBmcm9tICcuL1N0cmVhbSc7XG5pbXBvcnQgeyBFbnRyeSB9IGZyb20gJy4vRW50cnknO1xuaW1wb3J0IHsgRW50cnlDb2xsZWN0aW9uLCBQYWdpbmF0ZWRFbnRyeUNvbGxlY3Rpb24gfSBmcm9tICcuL0VudHJ5Q29sbGVjdGlvbic7XG5pbXBvcnQgeyBJQmFzZVN0cmVhbSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgSHR0cCB9IGZyb20gJy4vSHR0cCc7XG5cbmV4cG9ydCB0eXBlIE9yZGVyQnlEaXJlY3Rpb24gPVxuICAgICdhc2MnXG4gICAgfCAnZGVzYyc7XG5cbmV4cG9ydCB0eXBlIENvbXBhcmlzb25PcGVyYXRvciA9XG4gICAgfCAnPidcbiAgICB8ICc8J1xuICAgIHwgJz09J1xuICAgIHwgJyE9J1xuICAgIHwgJz49J1xuICAgIHwgJzw9J1xuICAgIHwgJyE8J1xuICAgIHwgJyE+J1xuICAgIHwgJzw+JztcblxuZXhwb3J0IGNvbnN0IGNvbXBhcmlzb25PcGVyYXRvcnM6IENvbXBhcmlzb25PcGVyYXRvcltdID0gWyAnPicsICc8JywgJz09JywgJyE9JywgJz49JywgJzw9JywgJyE8JywgJyE+JywgJzw+JyBdO1xuXG5leHBvcnQgdHlwZSBMb2dpY2FsT3BlcmF0b3IgPVxuICAgIHwgJ0JFVFdFRU4nXG4gICAgfCAnRVhJU1RTJ1xuICAgIHwgJ09SJ1xuICAgIHwgJ0FORCdcbiAgICB8ICdOT1QnXG4gICAgfCAnSU4nXG4gICAgfCAnQUxMJ1xuICAgIHwgJ0FOWSdcbiAgICB8ICdMSUtFJ1xuICAgIHwgJ0lTIE5VTEwnXG4gICAgfCAnVU5JUVVFJztcblxuZXhwb3J0IGNvbnN0IGxvZ2ljYWxPcGVyYXRvcnM6IExvZ2ljYWxPcGVyYXRvcltdID0gWyAnQkVUV0VFTicsICdFWElTVFMnLCAnT1InLCAnQU5EJywgJ05PVCcsICdJTicsICdBTEwnLCAnQU5ZJywgJ0xJS0UnLCAnSVMgTlVMTCcsICdVTklRVUUnIF07XG5cbmV4cG9ydCBjb25zdCBvcGVyYXRvcnM6IE9wZXJhdG9yW10gPSBbXS5jb25jYXQoY29tcGFyaXNvbk9wZXJhdG9ycykuY29uY2F0KGxvZ2ljYWxPcGVyYXRvcnMpO1xuXG5leHBvcnQgdHlwZSBPcGVyYXRvciA9XG4gICAgQ29tcGFyaXNvbk9wZXJhdG9yXG4gICAgfCBMb2dpY2FsT3BlcmF0b3I7XG5cbmNvbnN0IGlzT3BlcmF0b3IgPSAodmFsdWU6IGFueSk6IHZhbHVlIGlzIE9wZXJhdG9yID0+IG9wZXJhdG9ycy5pbmNsdWRlcyh2YWx1ZSk7XG5cbmNvbnN0IGVuc3VyZUFycmF5ID0gKHZhbHVlOiBhbnkpID0+IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbIHZhbHVlIF07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3JpdGVyaWFQYXJhbWV0ZXIge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB2YWx1ZTogYW55O1xuICAgIC8vIFtrZXk6c3RyaW5nXTogYW55XG59XG5cbmV4cG9ydCBjbGFzcyBDcml0ZXJpYTxJRCBleHRlbmRzIHN0cmluZyA9IHN0cmluZz4ge1xuXG4gICAgcGFyYW1ldGVyczogQ3JpdGVyaWFQYXJhbWV0ZXJbXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHN0cmVhbVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzdHJlYW06IFN0cmVhbSkgeyB9XG5cbiAgICBnZXQgaHR0cCgpOkh0dHB7cmV0dXJuIHRoaXMuc3RyZWFtLnN0cmVhbXMuaHR0cH1cblxuICAgIC8qKlxuICAgICAqIEZpbmQgYW4gZW50cnkgYnkgSUQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWRcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIGFzeW5jIGZpbmQ8SUQgZXh0ZW5kcyBzdHJpbmc+KGlkOiBJRCk6IFByb21pc2U8RW50cnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2hlcmUoJ2lkJywgaWQpLmZpcnN0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBmaXJzdCByZXN1bHQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIGFzeW5jIGZpcnN0KCk6IFByb21pc2U8RW50cnk8SUQ+ICYgSUJhc2VTdHJlYW08SUQ+PiB7XG5cbiAgICAgICAgbGV0IGNvbGxlY3Rpb24gPSBhd2FpdCB0aGlzLmxpbWl0KDEpLmdldCgpO1xuXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uWyAwIF07XG4gICAgfVxuXG4gICAgY2FjaGUoKTogdGhpcyB7IHJldHVybiB0aGlzOyB9XG5cbiAgICAvKipcbiAgICAgKiBPcmRlciB0aGUgcXVlcnkgYnkgZmllbGQvZGlyZWN0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEBwYXJhbSBkaXJlY3Rpb25cbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIG9yZGVyQnkoa2V5OiBzdHJpbmcsIGRpcmVjdGlvbjogT3JkZXJCeURpcmVjdGlvbiA9ICdkZXNjJyk6IHRoaXMge1xuXG4gICAgICAgIHRoaXMuYWRkUGFyYW1ldGVyKCdvcmRlckJ5JywgWyBrZXksIGRpcmVjdGlvbiBdKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMaW1pdCB0aGUgZW50cmllcyByZXR1cm5lZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgbGltaXQodmFsdWU6IG51bWJlcik6IHRoaXMge1xuXG4gICAgICAgIHRoaXMuYWRkUGFyYW1ldGVyKCdsaW1pdCcsIHZhbHVlKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJhaW4gdGhlIHF1ZXJ5IGJ5IGEgdHlwaWNhbFxuICAgICAqIGZpZWxkLCBvcGVyYXRvciwgdmFsdWUgYXJndW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG4gICAgd2hlcmUoa2V5OiBzdHJpbmcsIG9wZXJhdG9yOiBPcGVyYXRvciwgdmFsdWU6IGFueSwgbmVzdGVkOiBhbnkpOiB0aGlzXG4gICAgd2hlcmUoa2V5OiBzdHJpbmcsIG9wZXJhdG9yOiBPcGVyYXRvciwgdmFsdWU6IGFueSk6IHRoaXNcbiAgICB3aGVyZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHRoaXNcbiAgICB3aGVyZSguLi5hcmdzKTogdGhpcyB7XG5cbiAgICAgICAgbGV0IGtleTogc3RyaW5nLFxuICAgICAgICAgICAgb3BlcmF0b3I6IE9wZXJhdG9yLFxuICAgICAgICAgICAgdmFsdWU6IGFueSxcbiAgICAgICAgICAgIG5lc3RlZDogbnVsbDtcblxuICAgICAgICBpZiAoIGFyZ3MubGVuZ3RoID09PSAyICkge1xuICAgICAgICAgICAga2V5ICAgICAgPSBhcmdzWyAwIF07XG4gICAgICAgICAgICBvcGVyYXRvciA9ICc9PSc7XG4gICAgICAgICAgICB2YWx1ZSAgICA9IGFyZ3NbIDEgXTtcbiAgICAgICAgfSBlbHNlIGlmICggYXJncy5sZW5ndGggPT09IDMgKSB7XG4gICAgICAgICAgICBrZXkgICAgICA9IGFyZ3NbIDAgXTtcbiAgICAgICAgICAgIG9wZXJhdG9yID0gYXJnc1sgMSBdO1xuICAgICAgICAgICAgdmFsdWUgICAgPSBhcmdzWyAyIF07XG4gICAgICAgIH0gZWxzZSBpZiAoIGFyZ3MubGVuZ3RoID09PSA0ICkge1xuICAgICAgICAgICAga2V5ICAgICAgPSBhcmdzWyAwIF07XG4gICAgICAgICAgICBvcGVyYXRvciA9IGFyZ3NbIDEgXTtcbiAgICAgICAgICAgIHZhbHVlICAgID0gYXJnc1sgMiBdO1xuICAgICAgICAgICAgbmVzdGVkICAgPSBhcmdzWyAzIF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoICFpc09wZXJhdG9yKG9wZXJhdG9yKSApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ3JpdGVyaWEgd2hlcmUoKSBvcGVyYXRvciBcIiR7b3BlcmF0b3J9XCIgbm90IHZhbGlkIGApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hZGRQYXJhbWV0ZXIoJ3doZXJlJywgWyBrZXksIG9wZXJhdG9yLCB2YWx1ZSwgbmVzdGVkIF0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIG9yV2hlcmUoa2V5OiBzdHJpbmcsIG9wZXJhdG9yOiBPcGVyYXRvciwgdmFsdWU6IGFueSk6IHRoaXNcbiAgICBvcldoZXJlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdGhpc1xuICAgIG9yV2hlcmUoLi4uYXJncyk6IHRoaXMge1xuXG4gICAgICAgIGxldCBrZXk6IHN0cmluZyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiBPcGVyYXRvcixcbiAgICAgICAgICAgIHZhbHVlOiBhbnk7XG5cbiAgICAgICAgaWYgKCBhcmdzLmxlbmd0aCA9PT0gMiApIHtcbiAgICAgICAgICAgIGtleSAgICAgID0gYXJnc1sgMCBdO1xuICAgICAgICAgICAgb3BlcmF0b3IgPSAnPT0nO1xuICAgICAgICAgICAgdmFsdWUgICAgPSBhcmdzWyAxIF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrZXkgICAgICA9IGFyZ3NbIDAgXTtcbiAgICAgICAgICAgIG9wZXJhdG9yID0gYXJnc1sgMSBdO1xuICAgICAgICAgICAgdmFsdWUgICAgPSBhcmdzWyAyIF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoICFpc09wZXJhdG9yKG9wZXJhdG9yKSApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ3JpdGVyaWEgb3JXaGVyZSgpIG9wZXJhdG9yIFwiJHtvcGVyYXRvcn1cIiBub3QgdmFsaWQgYCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZFBhcmFtZXRlcignd2hlcmUnLCBbIGtleSwgb3BlcmF0b3IsIHZhbHVlLCAnb3InIF0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3JpdGVyaWEgcmVzdWx0cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgYXN5bmMgZ2V0PFQ+KCk6IFByb21pc2U8RW50cnlDb2xsZWN0aW9uPiB7XG5cbiAgICAgICAgbGV0IHF1ZXJ5ID0gdGhpcy5jb21waWxlU3RhdGVtZW50cygpO1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldEVudHJpZXM8VFtdLCAnZW50cmllcyc+KHRoaXMuc3RyZWFtLmlkLCB7IHF1ZXJ5IH0sIHt9KTtcblxuICAgICAgICByZXR1cm4gRW50cnlDb2xsZWN0aW9uLmZyb21SZXNwb25zZTxUPihyZXNwb25zZSwgdGhpcy5zdHJlYW0pO1xuICAgIH1cblxuICAgIC8vY291bnQoKTogbnVtYmVyIHsgcmV0dXJuIDA7IH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBlbnRyeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhdHRyaWJ1dGVzXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICBhc3luYyBjcmVhdGUoYXR0cmlidXRlczogYW55KTogUHJvbWlzZTxFbnRyeT4ge1xuXG4gICAgICAgIGxldCBlbnRyeSA9IHRoaXMubmV3SW5zdGFuY2UoYXR0cmlidXRlcyk7XG5cbiAgICAgICAgYXdhaXQgZW50cnkuc2F2ZSgpO1xuXG4gICAgICAgIHJldHVybiBlbnRyeTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTYXZlIGFuIGVudHJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGVudHJ5XG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICBhc3luYyBzYXZlKGVudHJ5OiBFbnRyeSk6IFByb21pc2U8Qm9vbGVhbj4ge1xuXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBlbnRyeS5zYXZlKCk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBkZWxldGUoKTogdGhpcyB7IHJldHVybiB0aGlzOyB9XG5cbiAgICAvL3RydW5jYXRlKCk6IHRoaXMgeyByZXR1cm4gdGhpczsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHBhZ2luYXRlZCBjcml0ZXJpYSByZXN1bHRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBlcl9wYWdlXG4gICAgICogQHBhcmFtIHBhZ2VcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIGFzeW5jIHBhZ2luYXRlPFQ+KHBlcl9wYWdlOiBudW1iZXIgPSAxMDAsIHBhZ2U6IG51bWJlciA9IDEpOiBQcm9taXNlPFBhZ2luYXRlZEVudHJ5Q29sbGVjdGlvbj4ge1xuXG4gICAgICAgIGxldCBxdWVyeSA9IHRoaXMuY29tcGlsZVN0YXRlbWVudHMoKTtcblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXRFbnRyaWVzPFRbXSwgJ3BhZ2luYXRlZCc+KHRoaXMuc3RyZWFtLmlkLCB7IHF1ZXJ5IH0sIHsgcGFnaW5hdGU6IHRydWUsIHBlcl9wYWdlLCBwYWdlIH0pO1xuXG4gICAgICAgIHJldHVybiBQYWdpbmF0ZWRFbnRyeUNvbGxlY3Rpb24uZnJvbVJlc3BvbnNlPFQ+KHJlc3BvbnNlLCB0aGlzLnN0cmVhbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGFuIGVudHJ5IGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGF0dHJpYnV0ZXNcbiAgICAgKiBAcmV0dXJucyBFbnRyeVxuICAgICAqL1xuICAgIHB1YmxpYyBuZXdJbnN0YW5jZShhdHRyaWJ1dGVzOiBhbnkpOiBFbnRyeSB7XG4gICAgICAgIHJldHVybiBuZXcgRW50cnkodGhpcy5zdHJlYW0sIGF0dHJpYnV0ZXMsIHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcGFyYW1ldGVycy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgcHVibGljIGdldFBhcmFtZXRlcnMoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyYW1ldGVycztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHBhcmFtZXRlcnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgcHVibGljIHNldFBhcmFtZXRlcnMocGFyYW1ldGVyczogYW55KTogdGhpcyB7XG5cbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBzdGF0ZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFkZFBhcmFtZXRlcihuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkgfCBhbnlbXSkge1xuXG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5wdXNoKHsgbmFtZSwgdmFsdWUgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHN0YW5kYXJkaXplZCBwYXJhbWV0ZXJzLlxuICAgICAqXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICBwdWJsaWMgY29tcGlsZVN0YXRlbWVudHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmFtZXRlcnMubWFwKHN0YXRlbWVudCA9PiAoeyBbIHN0YXRlbWVudC5uYW1lIF06IGVuc3VyZUFycmF5KHN0YXRlbWVudC52YWx1ZSkgfSkpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGZpZWxkcyB9IGZyb20gJy4vdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBGaWVsZCB7XG4gICAgY29uZmlnPzpSZWNvcmQ8c3RyaW5nLGFueT5cbiAgICBoYW5kbGU6c3RyaW5nXG4gICAgaW5wdXQ6UmVjb3JkPHN0cmluZyxhbnk+ICYge1xuICAgICAgICB0eXBlOiBmaWVsZHMuVHlwZVxuICAgIH1cbiAgICBydWxlczphbnlbXVxuICAgIHR5cGU6IGZpZWxkcy5UeXBlXG59XG5leHBvcnQgY2xhc3MgRmllbGQge1xuICAgIGNvbnN0cnVjdG9yKGZpZWxkOiBhbnkpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBmaWVsZCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuL0ZpZWxkJztcbmltcG9ydCB7IENvbGxlY3Rpb24gfSBmcm9tICcuL0NvbGxlY3Rpb24nO1xuXG5leHBvcnQgY2xhc3MgRmllbGRDb2xsZWN0aW9uIGV4dGVuZHMgQ29sbGVjdGlvbjxGaWVsZD4ge1xufVxuIiwiaW1wb3J0IHsgSUVudHJpZXNMaW5rcywgSUVudHJpZXNNZXRhLCBJUGFnaW5hdGVkRW50cmllc0xpbmtzLCBJUGFnaW5hdGVkRW50cmllc01ldGEgfSBmcm9tICcuL0VudHJ5Q29sbGVjdGlvbic7XG5pbXBvcnQgeyBJQmFzZVN0cmVhbSwgSVN0cmVhbUxpbmtzLCBJU3RyZWFtTWV0YSwgSVN0cmVhbVJlc3BvbnNlLCBNZXRob2ROYW1lLCBSZXF1ZXN0Q29uZmlnLCBBcGlDb25maWd1cmF0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBTdHJlYW1zIH0gZnJvbSAnLi9TdHJlYW1zJztcbmltcG9ydCB7IFN0ciB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSAnLi9DbGllbnQnO1xuXG5cbmV4cG9ydCBjbGFzcyBIdHRwIHtcbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgc3RyZWFtczogU3RyZWFtcykge31cblxuICAgIGdldCBjbGllbnQoKTogQ2xpZW50IHtyZXR1cm4gdGhpcy5zdHJlYW1zLmNsaWVudDt9XG5cbiAgICBnZXQgY29uZmlnKCk6IEFwaUNvbmZpZ3VyYXRpb24geyByZXR1cm4gdGhpcy5zdHJlYW1zLmNvbmZpZzsgfVxuXG4gICAgYXN5bmMgZ2V0U3RyZWFtcyhwYXJhbXM6IGFueSA9IHt9LCBjb25maWc6IFJlcXVlc3RDb25maWcgPSB7fSkge1xuICAgICAgICBjb25maWcucGFyYW1zID0gcGFyYW1zO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoJy9zdHJlYW1zJywgY29uZmlnKTtcbiAgICB9XG5cbiAgICBhc3luYyBwb3N0U3RyZWFtPFQ+KGRhdGE6IFQsIGNvbmZpZzogUmVxdWVzdENvbmZpZyA9IHt9KTogUHJvbWlzZTxJU3RyZWFtUmVzcG9uc2U8VD4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdDxUPignL3N0cmVhbXMnLCBkYXRhLCBjb25maWcpO1xuICAgIH1cblxuICAgIGFzeW5jIGdldFN0cmVhbTxJRCBleHRlbmRzIHN0cmluZz4oc3RyZWFtOiBJRCwgcGFyYW1zOiBhbnkgPSB7fSwgY29uZmlnOiBSZXF1ZXN0Q29uZmlnID0ge30pIHtcbiAgICAgICAgY29uZmlnLnBhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0PElCYXNlU3RyZWFtPElEPj4oYC9zdHJlYW1zLyR7c3RyZWFtfWAsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgYXN5bmMgcGF0Y2hTdHJlYW08SUQgZXh0ZW5kcyBzdHJpbmc+KHN0cmVhbTogSUQsIGRhdGE6IGFueSA9IHt9LCBjb25maWc6IFJlcXVlc3RDb25maWcgPSB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRjaDxJQmFzZVN0cmVhbTxJRD4+KGAvc3RyZWFtcy8ke3N0cmVhbX1gLCBkYXRhLCBjb25maWcpO1xuICAgIH1cblxuICAgIGFzeW5jIHB1dFN0cmVhbTxJRCBleHRlbmRzIHN0cmluZz4oc3RyZWFtOiBJRCwgZGF0YTogYW55ID0ge30sIGNvbmZpZzogUmVxdWVzdENvbmZpZyA9IHt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnB1dDxJQmFzZVN0cmVhbTxJRD4+KGAvc3RyZWFtcy8ke3N0cmVhbX1gLCBkYXRhLCBjb25maWcpO1xuICAgIH1cblxuICAgIGFzeW5jIGRlbGV0ZVN0cmVhbTxJRCBleHRlbmRzIHN0cmluZz4oc3RyZWFtOiBJRCwgY29uZmlnOiBSZXF1ZXN0Q29uZmlnID0ge30pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlPElCYXNlU3RyZWFtPElEPj4oYC9zdHJlYW1zLyR7c3RyZWFtfWAsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0RW50cmllczxEQVRBLCBUWVBFIGV4dGVuZHMga2V5b2YgSHR0cC5SZXNwb25zZXM8REFUQT4gPSAnZW50cmllcycsIElEIGV4dGVuZHMgc3RyaW5nID0gc3RyaW5nPihzdHJlYW06IElELCBkYXRhOiBhbnkgPSB7fSwgcGFyYW1zOiBhbnkgPSB7fSwgY29uZmlnOiBSZXF1ZXN0Q29uZmlnID0ge30pOiBQcm9taXNlPEh0dHAuUmVzcG9uc2VzPERBVEE+W1RZUEVdPiB7XG4gICAgICAgIGNvbmZpZy5ib2R5ICAgPSBkYXRhO1xuICAgICAgICBjb25maWcucGFyYW1zID0gcGFyYW1zO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQ8REFUQVtdLCBIdHRwLlJlc3BvbnNlczxEQVRBPltUWVBFXT4oYC9zdHJlYW1zLyR7c3RyZWFtfS9lbnRyaWVzYCwge1xuICAgICAgICAgICAgLi4uY29uZmlnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYyBwb3N0RW50cnk8SUQgZXh0ZW5kcyBzdHJpbmc+KHN0cmVhbTogSUQsIGRhdGE6IGFueSA9IHt9LCBjb25maWc6IFJlcXVlc3RDb25maWcgPSB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0PGFueT4oYC9zdHJlYW1zLyR7c3RyZWFtfS9lbnRyaWVzYCwgZGF0YSwgY29uZmlnKTtcbiAgICB9XG5cblxuICAgIGFzeW5jIGdldEVudHJ5PElEIGV4dGVuZHMgc3RyaW5nLCBFSUQgZXh0ZW5kcyBzdHJpbmc+KHN0cmVhbTogSUQsIGVudHJ5OiBFSUQsIGNvbmZpZzogUmVxdWVzdENvbmZpZyA9IHt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldDxhbnk+KGAvc3RyZWFtcy8ke3N0cmVhbX0vZW50cmllcy8ke2VudHJ5fWAsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgYXN5bmMgcGF0Y2hFbnRyeTxJRCBleHRlbmRzIHN0cmluZywgRUlEIGV4dGVuZHMgc3RyaW5nPihzdHJlYW06IElELCBlbnRyeTogRUlELCBkYXRhOiBhbnkgPSB7fSwgY29uZmlnOiBSZXF1ZXN0Q29uZmlnID0ge30pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0Y2g8YW55PihgL3N0cmVhbXMvJHtzdHJlYW19L2VudHJpZXMvJHtlbnRyeX1gLCBkYXRhLCBjb25maWcpO1xuICAgIH1cblxuICAgIGFzeW5jIHB1dEVudHJ5PElEIGV4dGVuZHMgc3RyaW5nLCBFSUQgZXh0ZW5kcyBzdHJpbmc+KHN0cmVhbTogSUQsIGVudHJ5OiBFSUQsIGRhdGE6IGFueSA9IHt9LCBjb25maWc6IFJlcXVlc3RDb25maWcgPSB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wdXQ8YW55PihgL3N0cmVhbXMvJHtzdHJlYW19L2VudHJpZXMvJHtlbnRyeX1gLCBkYXRhLCBjb25maWcpO1xuICAgIH1cblxuICAgIGFzeW5jIGRlbGV0ZUVudHJ5PElEIGV4dGVuZHMgc3RyaW5nLCBFSUQgZXh0ZW5kcyBzdHJpbmc+KHN0cmVhbTogSUQsIGVudHJ5OiBFSUQsIGNvbmZpZzogUmVxdWVzdENvbmZpZyA9IHt9KSB7XG4gICAgICAgIFN0ci5wYXJhbWV0ZXJzKCcvc3RyZWFtcy86c3RyZWFtL2VudHJpZXMvOmVudHJ5JywgeyBzdHJlYW0sIGVudHJ5IH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRjaDxhbnk+KGAvc3RyZWFtcy8ke3N0cmVhbX0vZW50cmllcy8ke2VudHJ5fWAsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0PFQgPSBhbnksIFIgPSBJU3RyZWFtUmVzcG9uc2U8VD4+KHVybDogc3RyaW5nLCBjb25maWc6IFJlcXVlc3RDb25maWcgPSB7fSk6IFByb21pc2U8Uj4geyByZXR1cm4gdGhpcy5yZXF1ZXN0PFQsIFI+KCdnZXQnLCB1cmwsIGNvbmZpZyk7IH1cblxuICAgIGFzeW5jIGRlbGV0ZTxUID0gYW55LCBSID0gSVN0cmVhbVJlc3BvbnNlPFQ+Pih1cmw6IHN0cmluZywgY29uZmlnOiBSZXF1ZXN0Q29uZmlnID0ge30pOiBQcm9taXNlPFI+IHsgcmV0dXJuIHRoaXMucmVxdWVzdDxULCBSPignZGVsZXRlJywgdXJsLCBjb25maWcpOyB9XG5cbiAgICBhc3luYyBoZWFkPFQgPSBhbnksIFIgPSBJU3RyZWFtUmVzcG9uc2U8VD4+KHVybDogc3RyaW5nLCBjb25maWc6IFJlcXVlc3RDb25maWcgPSB7fSk6IFByb21pc2U8Uj4geyByZXR1cm4gdGhpcy5yZXF1ZXN0PFQsIFI+KCdoZWFkJywgdXJsLCBjb25maWcpOyB9XG5cbiAgICBhc3luYyBvcHRpb25zPFQgPSBhbnksIFIgPSBJU3RyZWFtUmVzcG9uc2U8VD4+KHVybDogc3RyaW5nLCBjb25maWc6IFJlcXVlc3RDb25maWcgPSB7fSk6IFByb21pc2U8Uj4geyByZXR1cm4gdGhpcy5yZXF1ZXN0PFQsIFI+KCdvcHRpb25zJywgdXJsLCBjb25maWcpOyB9XG5cbiAgICBhc3luYyBwb3N0PFQgPSBhbnksIFIgPSBJU3RyZWFtUmVzcG9uc2U8VD4+KHVybDogc3RyaW5nLCBkYXRhPzogYW55LCBjb25maWc6IFJlcXVlc3RDb25maWcgPSB7fSk6IFByb21pc2U8Uj4geyByZXR1cm4gdGhpcy5yZXF1ZXN0PFQsIFI+KCdwb3N0JywgdXJsLCB7ZGF0YSwgLi4uY29uZmlnIH0pOyB9XG5cbiAgICBhc3luYyBwdXQ8VCA9IGFueSwgUiA9IElTdHJlYW1SZXNwb25zZTxUPj4odXJsOiBzdHJpbmcsIGRhdGE/OiBhbnksIGNvbmZpZzogUmVxdWVzdENvbmZpZyA9IHt9KTogUHJvbWlzZTxSPiB7IHJldHVybiB0aGlzLnJlcXVlc3Q8VCwgUj4oJ3B1dCcsIHVybCwgeyAgZGF0YSwgLi4uY29uZmlnIH0pOyB9XG5cbiAgICBhc3luYyBwYXRjaDxUID0gYW55LCBSID0gSVN0cmVhbVJlc3BvbnNlPFQ+Pih1cmw6IHN0cmluZywgZGF0YT86IGFueSwgY29uZmlnOiBSZXF1ZXN0Q29uZmlnID0ge30pOiBQcm9taXNlPFI+IHtyZXR1cm4gdGhpcy5yZXF1ZXN0PFQsIFI+KCdwYXRjaCcsIHVybCwgeyBkYXRhLCAuLi5jb25maWcgfSk7IH1cblxuICAgIGFzeW5jIHJlcXVlc3Q8VCA9IGFueSwgUiA9IElTdHJlYW1SZXNwb25zZTxUPj4obWV0aG9kOiBNZXRob2ROYW1lLCB1cmw6IHN0cmluZywgY29uZmlnOiBSZXF1ZXN0Q29uZmlnKTogUHJvbWlzZTxSPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2xpZW50LnJlcXVlc3QobWV0aG9kLCB1cmwsIGNvbmZpZyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UgYXMgYW55O1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuZXhwb3J0IG5hbWVzcGFjZSBIdHRwIHtcbiAgICBleHBvcnQgaW50ZXJmYWNlIFN0cmVhbVJlc3BvbnNlPFQsIE0gZXh0ZW5kcyBJU3RyZWFtTWV0YSwgTCA9IElTdHJlYW1MaW5rczxhbnk+PiBleHRlbmRzIElTdHJlYW1SZXNwb25zZTxULCBNLCBMPiB7XG5cbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIFJlc3BvbnNlczxUPiB7XG4gICAgICAgIGVudHJpZXM6IFN0cmVhbVJlc3BvbnNlPFQsIElFbnRyaWVzTWV0YSwgSUVudHJpZXNMaW5rcz47XG4gICAgICAgIHBhZ2luYXRlZDogU3RyZWFtUmVzcG9uc2U8VCwgSVBhZ2luYXRlZEVudHJpZXNNZXRhLCBJUGFnaW5hdGVkRW50cmllc0xpbmtzPjtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IFN0cmVhbSB9IGZyb20gJy4vU3RyZWFtJztcbmltcG9ydCB7IENyaXRlcmlhIH0gZnJvbSAnLi9Dcml0ZXJpYSc7XG5pbXBvcnQgeyBFbnRyeUNvbGxlY3Rpb24gfSBmcm9tICcuL0VudHJ5Q29sbGVjdGlvbic7XG5pbXBvcnQgeyBFbnRyeSB9IGZyb20gJy4vRW50cnknO1xuXG5cbmV4cG9ydCBjbGFzcyBSZXBvc2l0b3J5PElEIGV4dGVuZHMgc3RyaW5nID0gc3RyaW5nPiB7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgcmVwb3NpdG9yeSBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzdHJlYW1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgc3RyZWFtOiBTdHJlYW0pIHsgfVxuXG4gICAgZ2V0IGh0dHAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0cmVhbS5zdHJlYW1zLmh0dHA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGFsbCBpdGVtcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEVudHJ5Q29sbGVjdGlvblxuICAgICAqL1xuICAgIGFzeW5jIGFsbCgpOiBQcm9taXNlPEVudHJ5Q29sbGVjdGlvbj4ge1xuXG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXRFbnRyaWVzPGFueT4odGhpcy5zdHJlYW0uaWQpO1xuXG4gICAgICAgIGxldCBlbnRyaWVzID0gcmVzcG9uc2UuZGF0YS5tYXAoZW50cnkgPT4gbmV3IEVudHJ5KHRoaXMuc3RyZWFtLCBlbnRyeSwgZmFsc2UpKTtcblxuICAgICAgICByZXR1cm4gbmV3IEVudHJ5Q29sbGVjdGlvbihlbnRyaWVzLCByZXNwb25zZS5tZXRhIGFzIGFueSwgcmVzcG9uc2UubGlua3MgYXMgYW55KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kIGFuIGVudHJ5IGJ5IElELlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkXG4gICAgICogQHJldHVybnMgRW50cnlcbiAgICAgKi9cbiAgICBhc3luYyBmaW5kPElEIGV4dGVuZHMgc3RyaW5nPihpZDogSUQpOiBQcm9taXNlPEVudHJ5PiB7XG5cbiAgICAgICAgbGV0IGNyaXRlcmlhID0gdGhpcy5zdHJlYW0uZW50cmllcygpO1xuXG4gICAgICAgIHJldHVybiBjcml0ZXJpYS53aGVyZSgnaWQnLCBpZCkuZmlyc3QoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kIGFsbCByZWNvcmRzIGJ5IElEcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZHNcbiAgICAgKiBAcmV0dXJucyBFbnRyeUNvbGxlY3Rpb25cbiAgICAgKi9cbiAgICBhc3luYyBmaW5kQWxsKGlkcyk6IFByb21pc2U8RW50cnlDb2xsZWN0aW9uPiB7XG5cbiAgICAgICAgbGV0IGNyaXRlcmlhID0gdGhpcy5zdHJlYW0uZW50cmllcygpO1xuXG4gICAgICAgIHJldHVybiBjcml0ZXJpYS53aGVyZSgnaWQnLCAnSU4nLCBpZHMpLmdldCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmQgYW4gZW50cnkgYnkgYSBmaWVsZCB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIEVudHJ5XG4gICAgICovXG4gICAgYXN5bmMgZmluZEJ5PElEIGV4dGVuZHMgc3RyaW5nLCBWSUQgZXh0ZW5kcyBzdHJpbmc+KGZpZWxkOiBJRCwgdmFsdWU6IFZJRCk6IFByb21pc2U8RW50cnk+IHtcblxuICAgICAgICBsZXQgY3JpdGVyaWEgPSB0aGlzLnN0cmVhbS5lbnRyaWVzKCk7XG5cbiAgICAgICAgcmV0dXJuIGNyaXRlcmlhLndoZXJlKGZpZWxkLCB2YWx1ZSkuZmlyc3QoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kIGFsbCBlbnRyaWVzIGJ5IGZpZWxkIHZhbHVlLlxuICAgICAqXG4gICAgICogQHBhcmFtICRmaWVsZFxuICAgICAqIEBwYXJhbSAkb3BlcmF0b3JcbiAgICAgKiBAcGFyYW0gJHZhbHVlXG4gICAgICogQHJldHVybiBFbnRyeUNvbGxlY3Rpb25cbiAgICAgKi9cbiAgICBhc3luYyBmaW5kQWxsV2hlcmU8SUQgZXh0ZW5kcyBzdHJpbmcsIFZJRCBleHRlbmRzIHN0cmluZz4oZmllbGQ6IElELCB2YWx1ZTogVklEKTogUHJvbWlzZTxFbnRyeUNvbGxlY3Rpb24+IHtcblxuICAgICAgICBsZXQgY3JpdGVyaWEgPSB0aGlzLnN0cmVhbS5lbnRyaWVzKCk7XG5cbiAgICAgICAgcmV0dXJuIGNyaXRlcmlhLndoZXJlKGZpZWxkLCB2YWx1ZSkuZ2V0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGVudHJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGF0dHJpYnV0ZXNcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIGFzeW5jIGNyZWF0ZShhdHRyaWJ1dGVzOiBhbnkpOiBQcm9taXNlPEJvb2xlYW4+IHtcblxuICAgICAgICBsZXQgZW50cnkgPSB0aGlzLm5ld0NyaXRlcmlhKCkubmV3SW5zdGFuY2UoYXR0cmlidXRlcyk7XG5cbiAgICAgICAgcmV0dXJuIGVudHJ5LnNhdmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTYXZlIGFuIGVudHJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGVudHJ5XG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICBhc3luYyBzYXZlKGVudHJ5OiBFbnRyeSk6IFByb21pc2U8Qm9vbGVhbj4ge1xuXG4gICAgICAgIHJldHVybiBlbnRyeS5zYXZlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2F2ZSBhbiBlbnRyeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbnRyeVxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgYXN5bmMgZGVsZXRlKGVudHJ5OiBhbnkpOiBQcm9taXNlPEJvb2xlYW4+IHtcblxuICAgICAgICBhd2FpdCB0aGlzLmh0dHAuZGVsZXRlRW50cnkodGhpcy5zdHJlYW0uaWQsIGVudHJ5LmlkKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB0cnVuY2F0ZSgpOiB0aGlzIHsgcmV0dXJuIHRoaXM7IH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIG5ldyBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhdHRyaWJ1dGVzXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICBuZXdJbnN0YW5jZShhdHRyaWJ1dGVzOiBhbnkpOiBFbnRyeSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5ld0NyaXRlcmlhKCkubmV3SW5zdGFuY2UoYXR0cmlidXRlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgbmV3IGVudHJ5IGNyaXRlcmlhLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQ3JpdGVyaWFcbiAgICAgKi9cbiAgICBuZXdDcml0ZXJpYSgpOiBDcml0ZXJpYTxJRD4ge1xuICAgICAgICByZXR1cm4gbmV3IENyaXRlcmlhPElEPih0aGlzLnN0cmVhbSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuL0ZpZWxkJztcbmltcG9ydCB7IFJlcG9zaXRvcnkgfSBmcm9tICcuL1JlcG9zaXRvcnknO1xuaW1wb3J0IHsgQ3JpdGVyaWEgfSBmcm9tICcuL0NyaXRlcmlhJztcbmltcG9ydCB7IElCYXNlU3RyZWFtLCBJU3RyZWFtTGlua3MsIElTdHJlYW1NZXRhIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBTdHJlYW1zIH0gZnJvbSAnLi9TdHJlYW1zJztcblxuZXhwb3J0IGludGVyZmFjZSBTdHJlYW08SUQgZXh0ZW5kcyBzdHJpbmcgPSBzdHJpbmc+IGV4dGVuZHMgT21pdDxJQmFzZVN0cmVhbTxJRD4sICdmaWVsZHMnPiB7IH1cblxuZXhwb3J0IGNsYXNzIFN0cmVhbTxJRCBleHRlbmRzIHN0cmluZyA9IHN0cmluZz4ge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBzdHJlYW1zOlN0cmVhbXMsXG4gICAgICAgIHN0cmVhbTogSUJhc2VTdHJlYW08SUQ+LFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbWV0YT86IElTdHJlYW1NZXRhLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbGlua3M/OiBJU3RyZWFtTGlua3M8J3NlbGYnIHwgJ2VudHJpZXMnPixcbiAgICApIHtcblxuICAgICAgICBpZiAoc3RyZWFtLmZpZWxkcykge1xuICAgICAgICAgICAgdGhpcy5maWVsZHMgPSBuZXcgTWFwKE9iamVjdC5lbnRyaWVzKHN0cmVhbS5maWVsZHMpLm1hcCgoW2tleSwgZmllbGRdKSA9PiBba2V5LCBuZXcgRmllbGQoZmllbGQpXSkpXG4gICAgICAgICAgICBkZWxldGUgc3RyZWFtLmZpZWxkcztcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgc3RyZWFtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcmVwb3NpdG9yeSBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX3JlcG9zaXRvcnk6IFJlcG9zaXRvcnk8SUQ+O1xuXG4gICAgLyoqXG4gICAgICogU3RyZWFtIHZhbGlkYXRpb24gcnVsZXMuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9ydWxlczogQXJyYXk8YW55PjtcblxuICAgIC8qKlxuICAgICAqIEN1c3RvbSBzdHJlYW0gdmFsaWRhdG9ycy5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX3ZhbGlkYXRvcnM6IEFycmF5PGFueT47XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3RyZWFtIGZpZWxkcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZmllbGRzOiBNYXA8c3RyaW5nLCBGaWVsZD5cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgZW50cmllcyByZXBvc2l0b3J5LlxuICAgICAqXG4gICAgICogQHJldHVybnMgUmVwb3NpdG9yeVxuICAgICAqL1xuICAgICBnZXQgcmVwb3NpdG9yeSgpOiBSZXBvc2l0b3J5PElEPiB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9yZXBvc2l0b3J5KSB7XG4gICAgICAgICAgICB0aGlzLl9yZXBvc2l0b3J5ID0gbmV3IFJlcG9zaXRvcnk8SUQ+KHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcG9zaXRvcnk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgZW50cmllcyBjcml0ZXJpYS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIENyaXRlcmlhXG4gICAgICovXG4gICAgZW50cmllcygpOiBDcml0ZXJpYTxJRD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXBvc2l0b3J5Lm5ld0NyaXRlcmlhKCk7XG4gICAgfTtcblxuICAgIC8vIHZhbGlkYXRvcjtcbiAgICAvLyBoYXNSdWxlO1xuICAgIC8vIGdldFJ1bGU7XG4gICAgLy8gcnVsZVBhcmFtZXRlcnM7XG4gICAgaXNSZXF1aXJlZDtcbiAgICBjb25maWc7XG4gICAgY2FjaGVkO1xuICAgIGNhY2hlO1xuICAgIGZvcmdldDtcbiAgICBmbHVzaDtcbiAgICB0b0FycmF5O1xuICAgIHRvSnNvbjtcbiAgICBqc29uU2VyaWFsaXplO1xuICAgIF9fdG9TdHJpbmc7XG4gICAgb25Jbml0aWFsaXppbmc7XG4gICAgb25Jbml0aWFsaXplZDtcbiAgICBleHRlbmRJbnB1dDtcbiAgICBpbXBvcnRJbnB1dDtcbiAgICBub3JtYWxpemVJbnB1dDtcbiAgICBmaWVsZHNJbnB1dDtcbiAgICBtZXJnZTtcblxufVxuIiwiaW1wb3J0IHsgU3RyZWFtIH0gZnJvbSAnLi9TdHJlYW0nO1xuaW1wb3J0IHsgQ3JpdGVyaWEgfSBmcm9tICcuL0NyaXRlcmlhJztcbmltcG9ydCB7IFJlcG9zaXRvcnkgfSBmcm9tICcuL1JlcG9zaXRvcnknO1xuaW1wb3J0IHsgSUJhc2VTdHJlYW0sIElTdHJlYW0sIElTdHJlYW1SZXNwb25zZSwgQXBpQ29uZmlndXJhdGlvbiB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgSHR0cCB9IGZyb20gJy4vSHR0cCc7XG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tICcuL0NsaWVudCc7XG5pbXBvcnQgeyBBc3luY1Nlcmllc1dhdGVyZmFsbEhvb2ssIFN5bmNIb29rIH0gZnJvbSAndGFwYWJsZSc7XG5cblxuZXhwb3J0IGNsYXNzIFN0cmVhbXMge1xuICAgIHB1YmxpYyByZWFkb25seSBob29rcyA9IHtcbiAgICAgICAgYWxsICAgIDogbmV3IEFzeW5jU2VyaWVzV2F0ZXJmYWxsSG9vazxJU3RyZWFtUmVzcG9uc2U8SUJhc2VTdHJlYW1bXT4+KFsgJ2RhdGEnIF0pLFxuICAgICAgICBtYWtlICAgOiBuZXcgQXN5bmNTZXJpZXNXYXRlcmZhbGxIb29rPElTdHJlYW0+KFsgJ2RhdGEnIF0pLFxuICAgICAgICBtYWtlZCAgOiBuZXcgU3luY0hvb2s8U3RyZWFtPihbICdzdHJlYW0nIF0pLFxuICAgICAgICBjcmVhdGUgOiBuZXcgQXN5bmNTZXJpZXNXYXRlcmZhbGxIb29rPElTdHJlYW0+KFsgJ2RhdGEnIF0pLFxuICAgICAgICBjcmVhdGVkOiBuZXcgU3luY0hvb2s8U3RyZWFtPihbICdzdHJlYW0nIF0pLFxuICAgIH07XG4gICAgcHVibGljIHJlYWRvbmx5IGh0dHA6IEh0dHA7XG4gICAgcHVibGljIHJlYWRvbmx5IGNsaWVudDogQ2xpZW50O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGNvbmZpZzogQXBpQ29uZmlndXJhdGlvbikge1xuICAgICAgICB0aGlzLmNsaWVudCA9IG5ldyBjb25maWcuQ2xpZW50KHRoaXMuY29uZmlnKTtcbiAgICAgICAgdGhpcy5odHRwICAgPSBuZXcgY29uZmlnLkh0dHAodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGFsbCBzdHJlYW1zLlxuICAgICAqXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgYWxsKCk6IFByb21pc2U8U3RyZWFtW10+IHtcblxuICAgICAgICBjb25zdCByZXNwb25zZSAgICAgICAgICA9IGF3YWl0IHRoaXMuaHR0cC5nZXRTdHJlYW1zKCk7XG4gICAgICAgIGNvbnN0IHN0cmVhbXM6IFN0cmVhbVtdID0gW107XG4gICAgICAgIGZvciAoIGxldCBkYXRhIG9mIHJlc3BvbnNlLmRhdGEgKSB7XG4gICAgICAgICAgICBkYXRhICAgICAgICAgPSBhd2FpdCB0aGlzLmhvb2tzLmFsbC5wcm9taXNlKGRhdGEpO1xuICAgICAgICAgICAgY29uc3Qgc3RyZWFtID0gbmV3IFN0cmVhbSh0aGlzLCBkYXRhKTtcbiAgICAgICAgICAgIHN0cmVhbXMucHVzaChzdHJlYW0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHJlYW1zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ha2UgYSBzdHJlYW0gaW5zdGFuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWRcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBtYWtlKGlkOiBzdHJpbmcpOiBQcm9taXNlPFN0cmVhbT4ge1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldFN0cmVhbShpZCk7XG4gICAgICAgIGNvbnN0IGRhdGEgICAgID0gYXdhaXQgdGhpcy5ob29rcy5tYWtlLnByb21pc2UocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgIGNvbnN0IHN0cmVhbSAgID0gbmV3IFN0cmVhbSh0aGlzLCByZXNwb25zZS5kYXRhLCByZXNwb25zZS5tZXRhLCByZXNwb25zZS5saW5rcyk7XG4gICAgICAgIHRoaXMuaG9va3MubWFrZWQuY2FsbChzdHJlYW0pO1xuICAgICAgICByZXR1cm4gc3RyZWFtO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBjcmVhdGUoaWQ6IHN0cmluZywgc3RyZWFtRGF0YTogYW55KTogUHJvbWlzZTxTdHJlYW0+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdFN0cmVhbSh7IGlkLCBuYW1lOiBpZCwgLi4uc3RyZWFtRGF0YSB9KTtcbiAgICAgICAgY29uc3QgZGF0YSAgICAgPSBhd2FpdCB0aGlzLmhvb2tzLmNyZWF0ZS5wcm9taXNlKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICBjb25zdCBzdHJlYW0gICA9IG5ldyBTdHJlYW0odGhpcywgcmVzcG9uc2UuZGF0YSwgcmVzcG9uc2UubWV0YSwgcmVzcG9uc2UubGlua3MpO1xuICAgICAgICB0aGlzLmhvb2tzLmNyZWF0ZWQuY2FsbChzdHJlYW0pO1xuICAgICAgICByZXR1cm4gc3RyZWFtO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBlbnRyaWVzPElEIGV4dGVuZHMgc3RyaW5nPihpZDogSUQpOiBQcm9taXNlPENyaXRlcmlhPiB7XG4gICAgICAgIGNvbnN0IHN0cmVhbSA9IGF3YWl0IHRoaXMubWFrZShpZCk7XG4gICAgICAgIHJldHVybiBuZXcgQ3JpdGVyaWEoc3RyZWFtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYW4gZW50cnkgcmVwb3NpdG9yeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZFxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHJlcG9zaXRvcnk8SUQgZXh0ZW5kcyBzdHJpbmc+KGlkOiBJRCk6IFByb21pc2U8UmVwb3NpdG9yeT4ge1xuICAgICAgICBjb25zdCBzdHJlYW0gPSBhd2FpdCB0aGlzLm1ha2UoaWQpO1xuICAgICAgICByZXR1cm4gbmV3IFJlcG9zaXRvcnkoc3RyZWFtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIFN0cmVhbXMgY29sbGVjdGlvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgY29sbGVjdGlvbigpIHtcbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuX2NvbGxlY3Rpb25cbiAgICB9XG59XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG4iLCJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIGN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckN0b3IucHJvdG90eXBlLCB7XG4gICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIG9sZCBzY2hvb2wgc2hpbSBmb3Igb2xkIGJyb3dzZXJzXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgIFRlbXBDdG9yLnByb3RvdHlwZSA9IHN1cGVyQ3Rvci5wcm90b3R5cGVcbiAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpXG4gICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNCdWZmZXIoYXJnKSB7XG4gIHJldHVybiBhcmcgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCdcbiAgICAmJiB0eXBlb2YgYXJnLmNvcHkgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLmZpbGwgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLnJlYWRVSW50OCA9PT0gJ2Z1bmN0aW9uJztcbn0iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIGZvcm1hdFJlZ0V4cCA9IC8lW3NkaiVdL2c7XG5leHBvcnRzLmZvcm1hdCA9IGZ1bmN0aW9uKGYpIHtcbiAgaWYgKCFpc1N0cmluZyhmKSkge1xuICAgIHZhciBvYmplY3RzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9iamVjdHMucHVzaChpbnNwZWN0KGFyZ3VtZW50c1tpXSkpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0cy5qb2luKCcgJyk7XG4gIH1cblxuICB2YXIgaSA9IDE7XG4gIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICB2YXIgbGVuID0gYXJncy5sZW5ndGg7XG4gIHZhciBzdHIgPSBTdHJpbmcoZikucmVwbGFjZShmb3JtYXRSZWdFeHAsIGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAoeCA9PT0gJyUlJykgcmV0dXJuICclJztcbiAgICBpZiAoaSA+PSBsZW4pIHJldHVybiB4O1xuICAgIHN3aXRjaCAoeCkge1xuICAgICAgY2FzZSAnJXMnOiByZXR1cm4gU3RyaW5nKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclZCc6IHJldHVybiBOdW1iZXIoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVqJzpcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYXJnc1tpKytdKTtcbiAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgIHJldHVybiAnW0NpcmN1bGFyXSc7XG4gICAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgfSk7XG4gIGZvciAodmFyIHggPSBhcmdzW2ldOyBpIDwgbGVuOyB4ID0gYXJnc1srK2ldKSB7XG4gICAgaWYgKGlzTnVsbCh4KSB8fCAhaXNPYmplY3QoeCkpIHtcbiAgICAgIHN0ciArPSAnICcgKyB4O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgKz0gJyAnICsgaW5zcGVjdCh4KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn07XG5cblxuLy8gTWFyayB0aGF0IGEgbWV0aG9kIHNob3VsZCBub3QgYmUgdXNlZC5cbi8vIFJldHVybnMgYSBtb2RpZmllZCBmdW5jdGlvbiB3aGljaCB3YXJucyBvbmNlIGJ5IGRlZmF1bHQuXG4vLyBJZiAtLW5vLWRlcHJlY2F0aW9uIGlzIHNldCwgdGhlbiBpdCBpcyBhIG5vLW9wLlxuZXhwb3J0cy5kZXByZWNhdGUgPSBmdW5jdGlvbihmbiwgbXNnKSB7XG4gIC8vIEFsbG93IGZvciBkZXByZWNhdGluZyB0aGluZ3MgaW4gdGhlIHByb2Nlc3Mgb2Ygc3RhcnRpbmcgdXAuXG4gIGlmIChpc1VuZGVmaW5lZChnbG9iYWwucHJvY2VzcykpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZXhwb3J0cy5kZXByZWNhdGUoZm4sIG1zZykuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKHByb2Nlc3Mubm9EZXByZWNhdGlvbiA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIHZhciB3YXJuZWQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gZGVwcmVjYXRlZCgpIHtcbiAgICBpZiAoIXdhcm5lZCkge1xuICAgICAgaWYgKHByb2Nlc3MudGhyb3dEZXByZWNhdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy50cmFjZURlcHJlY2F0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICAgIH1cbiAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIGRlcHJlY2F0ZWQ7XG59O1xuXG5cbnZhciBkZWJ1Z3MgPSB7fTtcbnZhciBkZWJ1Z0Vudmlyb247XG5leHBvcnRzLmRlYnVnbG9nID0gZnVuY3Rpb24oc2V0KSB7XG4gIGlmIChpc1VuZGVmaW5lZChkZWJ1Z0Vudmlyb24pKVxuICAgIGRlYnVnRW52aXJvbiA9IHByb2Nlc3MuZW52Lk5PREVfREVCVUcgfHwgJyc7XG4gIHNldCA9IHNldC50b1VwcGVyQ2FzZSgpO1xuICBpZiAoIWRlYnVnc1tzZXRdKSB7XG4gICAgaWYgKG5ldyBSZWdFeHAoJ1xcXFxiJyArIHNldCArICdcXFxcYicsICdpJykudGVzdChkZWJ1Z0Vudmlyb24pKSB7XG4gICAgICB2YXIgcGlkID0gcHJvY2Vzcy5waWQ7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbXNnID0gZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignJXMgJWQ6ICVzJywgc2V0LCBwaWQsIG1zZyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge307XG4gICAgfVxuICB9XG4gIHJldHVybiBkZWJ1Z3Nbc2V0XTtcbn07XG5cblxuLyoqXG4gKiBFY2hvcyB0aGUgdmFsdWUgb2YgYSB2YWx1ZS4gVHJ5cyB0byBwcmludCB0aGUgdmFsdWUgb3V0XG4gKiBpbiB0aGUgYmVzdCB3YXkgcG9zc2libGUgZ2l2ZW4gdGhlIGRpZmZlcmVudCB0eXBlcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcHJpbnQgb3V0LlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgT3B0aW9uYWwgb3B0aW9ucyBvYmplY3QgdGhhdCBhbHRlcnMgdGhlIG91dHB1dC5cbiAqL1xuLyogbGVnYWN5OiBvYmosIHNob3dIaWRkZW4sIGRlcHRoLCBjb2xvcnMqL1xuZnVuY3Rpb24gaW5zcGVjdChvYmosIG9wdHMpIHtcbiAgLy8gZGVmYXVsdCBvcHRpb25zXG4gIHZhciBjdHggPSB7XG4gICAgc2VlbjogW10sXG4gICAgc3R5bGl6ZTogc3R5bGl6ZU5vQ29sb3JcbiAgfTtcbiAgLy8gbGVnYWN5Li4uXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDMpIGN0eC5kZXB0aCA9IGFyZ3VtZW50c1syXTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gNCkgY3R4LmNvbG9ycyA9IGFyZ3VtZW50c1szXTtcbiAgaWYgKGlzQm9vbGVhbihvcHRzKSkge1xuICAgIC8vIGxlZ2FjeS4uLlxuICAgIGN0eC5zaG93SGlkZGVuID0gb3B0cztcbiAgfSBlbHNlIGlmIChvcHRzKSB7XG4gICAgLy8gZ290IGFuIFwib3B0aW9uc1wiIG9iamVjdFxuICAgIGV4cG9ydHMuX2V4dGVuZChjdHgsIG9wdHMpO1xuICB9XG4gIC8vIHNldCBkZWZhdWx0IG9wdGlvbnNcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5zaG93SGlkZGVuKSkgY3R4LnNob3dIaWRkZW4gPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5kZXB0aCkpIGN0eC5kZXB0aCA9IDI7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY29sb3JzKSkgY3R4LmNvbG9ycyA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmN1c3RvbUluc3BlY3QpKSBjdHguY3VzdG9tSW5zcGVjdCA9IHRydWU7XG4gIGlmIChjdHguY29sb3JzKSBjdHguc3R5bGl6ZSA9IHN0eWxpemVXaXRoQ29sb3I7XG4gIHJldHVybiBmb3JtYXRWYWx1ZShjdHgsIG9iaiwgY3R4LmRlcHRoKTtcbn1cbmV4cG9ydHMuaW5zcGVjdCA9IGluc3BlY3Q7XG5cblxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BTlNJX2VzY2FwZV9jb2RlI2dyYXBoaWNzXG5pbnNwZWN0LmNvbG9ycyA9IHtcbiAgJ2JvbGQnIDogWzEsIDIyXSxcbiAgJ2l0YWxpYycgOiBbMywgMjNdLFxuICAndW5kZXJsaW5lJyA6IFs0LCAyNF0sXG4gICdpbnZlcnNlJyA6IFs3LCAyN10sXG4gICd3aGl0ZScgOiBbMzcsIDM5XSxcbiAgJ2dyZXknIDogWzkwLCAzOV0sXG4gICdibGFjaycgOiBbMzAsIDM5XSxcbiAgJ2JsdWUnIDogWzM0LCAzOV0sXG4gICdjeWFuJyA6IFszNiwgMzldLFxuICAnZ3JlZW4nIDogWzMyLCAzOV0sXG4gICdtYWdlbnRhJyA6IFszNSwgMzldLFxuICAncmVkJyA6IFszMSwgMzldLFxuICAneWVsbG93JyA6IFszMywgMzldXG59O1xuXG4vLyBEb24ndCB1c2UgJ2JsdWUnIG5vdCB2aXNpYmxlIG9uIGNtZC5leGVcbmluc3BlY3Quc3R5bGVzID0ge1xuICAnc3BlY2lhbCc6ICdjeWFuJyxcbiAgJ251bWJlcic6ICd5ZWxsb3cnLFxuICAnYm9vbGVhbic6ICd5ZWxsb3cnLFxuICAndW5kZWZpbmVkJzogJ2dyZXknLFxuICAnbnVsbCc6ICdib2xkJyxcbiAgJ3N0cmluZyc6ICdncmVlbicsXG4gICdkYXRlJzogJ21hZ2VudGEnLFxuICAvLyBcIm5hbWVcIjogaW50ZW50aW9uYWxseSBub3Qgc3R5bGluZ1xuICAncmVnZXhwJzogJ3JlZCdcbn07XG5cblxuZnVuY3Rpb24gc3R5bGl6ZVdpdGhDb2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICB2YXIgc3R5bGUgPSBpbnNwZWN0LnN0eWxlc1tzdHlsZVR5cGVdO1xuXG4gIGlmIChzdHlsZSkge1xuICAgIHJldHVybiAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzBdICsgJ20nICsgc3RyICtcbiAgICAgICAgICAgJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVsxXSArICdtJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG59XG5cblxuZnVuY3Rpb24gc3R5bGl6ZU5vQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgcmV0dXJuIHN0cjtcbn1cblxuXG5mdW5jdGlvbiBhcnJheVRvSGFzaChhcnJheSkge1xuICB2YXIgaGFzaCA9IHt9O1xuXG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24odmFsLCBpZHgpIHtcbiAgICBoYXNoW3ZhbF0gPSB0cnVlO1xuICB9KTtcblxuICByZXR1cm4gaGFzaDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRWYWx1ZShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMpIHtcbiAgLy8gUHJvdmlkZSBhIGhvb2sgZm9yIHVzZXItc3BlY2lmaWVkIGluc3BlY3QgZnVuY3Rpb25zLlxuICAvLyBDaGVjayB0aGF0IHZhbHVlIGlzIGFuIG9iamVjdCB3aXRoIGFuIGluc3BlY3QgZnVuY3Rpb24gb24gaXRcbiAgaWYgKGN0eC5jdXN0b21JbnNwZWN0ICYmXG4gICAgICB2YWx1ZSAmJlxuICAgICAgaXNGdW5jdGlvbih2YWx1ZS5pbnNwZWN0KSAmJlxuICAgICAgLy8gRmlsdGVyIG91dCB0aGUgdXRpbCBtb2R1bGUsIGl0J3MgaW5zcGVjdCBmdW5jdGlvbiBpcyBzcGVjaWFsXG4gICAgICB2YWx1ZS5pbnNwZWN0ICE9PSBleHBvcnRzLmluc3BlY3QgJiZcbiAgICAgIC8vIEFsc28gZmlsdGVyIG91dCBhbnkgcHJvdG90eXBlIG9iamVjdHMgdXNpbmcgdGhlIGNpcmN1bGFyIGNoZWNrLlxuICAgICAgISh2YWx1ZS5jb25zdHJ1Y3RvciAmJiB2YWx1ZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgPT09IHZhbHVlKSkge1xuICAgIHZhciByZXQgPSB2YWx1ZS5pbnNwZWN0KHJlY3Vyc2VUaW1lcywgY3R4KTtcbiAgICBpZiAoIWlzU3RyaW5nKHJldCkpIHtcbiAgICAgIHJldCA9IGZvcm1hdFZhbHVlKGN0eCwgcmV0LCByZWN1cnNlVGltZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLy8gUHJpbWl0aXZlIHR5cGVzIGNhbm5vdCBoYXZlIHByb3BlcnRpZXNcbiAgdmFyIHByaW1pdGl2ZSA9IGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKTtcbiAgaWYgKHByaW1pdGl2ZSkge1xuICAgIHJldHVybiBwcmltaXRpdmU7XG4gIH1cblxuICAvLyBMb29rIHVwIHRoZSBrZXlzIG9mIHRoZSBvYmplY3QuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuICB2YXIgdmlzaWJsZUtleXMgPSBhcnJheVRvSGFzaChrZXlzKTtcblxuICBpZiAoY3R4LnNob3dIaWRkZW4pIHtcbiAgICBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsdWUpO1xuICB9XG5cbiAgLy8gSUUgZG9lc24ndCBtYWtlIGVycm9yIGZpZWxkcyBub24tZW51bWVyYWJsZVxuICAvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaWUvZHd3NTJzYnQodj12cy45NCkuYXNweFxuICBpZiAoaXNFcnJvcih2YWx1ZSlcbiAgICAgICYmIChrZXlzLmluZGV4T2YoJ21lc3NhZ2UnKSA+PSAwIHx8IGtleXMuaW5kZXhPZignZGVzY3JpcHRpb24nKSA+PSAwKSkge1xuICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICAvLyBTb21lIHR5cGUgb2Ygb2JqZWN0IHdpdGhvdXQgcHJvcGVydGllcyBjYW4gYmUgc2hvcnRjdXR0ZWQuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgdmFyIG5hbWUgPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW0Z1bmN0aW9uJyArIG5hbWUgKyAnXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfVxuICAgIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdkYXRlJyk7XG4gICAgfVxuICAgIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgYmFzZSA9ICcnLCBhcnJheSA9IGZhbHNlLCBicmFjZXMgPSBbJ3snLCAnfSddO1xuXG4gIC8vIE1ha2UgQXJyYXkgc2F5IHRoYXQgdGhleSBhcmUgQXJyYXlcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgYXJyYXkgPSB0cnVlO1xuICAgIGJyYWNlcyA9IFsnWycsICddJ107XG4gIH1cblxuICAvLyBNYWtlIGZ1bmN0aW9ucyBzYXkgdGhhdCB0aGV5IGFyZSBmdW5jdGlvbnNcbiAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgdmFyIG4gPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICBiYXNlID0gJyBbRnVuY3Rpb24nICsgbiArICddJztcbiAgfVxuXG4gIC8vIE1ha2UgUmVnRXhwcyBzYXkgdGhhdCB0aGV5IGFyZSBSZWdFeHBzXG4gIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZGF0ZXMgd2l0aCBwcm9wZXJ0aWVzIGZpcnN0IHNheSB0aGUgZGF0ZVxuICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBEYXRlLnByb3RvdHlwZS50b1VUQ1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZXJyb3Igd2l0aCBtZXNzYWdlIGZpcnN0IHNheSB0aGUgZXJyb3JcbiAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCAmJiAoIWFycmF5IHx8IHZhbHVlLmxlbmd0aCA9PSAwKSkge1xuICAgIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgYnJhY2VzWzFdO1xuICB9XG5cbiAgaWYgKHJlY3Vyc2VUaW1lcyA8IDApIHtcbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tPYmplY3RdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cblxuICBjdHguc2Vlbi5wdXNoKHZhbHVlKTtcblxuICB2YXIgb3V0cHV0O1xuICBpZiAoYXJyYXkpIHtcbiAgICBvdXRwdXQgPSBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKTtcbiAgfSBlbHNlIHtcbiAgICBvdXRwdXQgPSBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGN0eC5zZWVuLnBvcCgpO1xuXG4gIHJldHVybiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ3VuZGVmaW5lZCcsICd1bmRlZmluZWQnKTtcbiAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgIHZhciBzaW1wbGUgPSAnXFwnJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKS5yZXBsYWNlKC9eXCJ8XCIkL2csICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKSArICdcXCcnO1xuICAgIHJldHVybiBjdHguc3R5bGl6ZShzaW1wbGUsICdzdHJpbmcnKTtcbiAgfVxuICBpZiAoaXNOdW1iZXIodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnbnVtYmVyJyk7XG4gIGlmIChpc0Jvb2xlYW4odmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnYm9vbGVhbicpO1xuICAvLyBGb3Igc29tZSByZWFzb24gdHlwZW9mIG51bGwgaXMgXCJvYmplY3RcIiwgc28gc3BlY2lhbCBjYXNlIGhlcmUuXG4gIGlmIChpc051bGwodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnbnVsbCcsICdudWxsJyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0RXJyb3IodmFsdWUpIHtcbiAgcmV0dXJuICdbJyArIEVycm9yLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSArICddJztcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkodmFsdWUsIFN0cmluZyhpKSkpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAgU3RyaW5nKGkpLCB0cnVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dC5wdXNoKCcnKTtcbiAgICB9XG4gIH1cbiAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgIGlmICgha2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBrZXksIHRydWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0O1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpIHtcbiAgdmFyIG5hbWUsIHN0ciwgZGVzYztcbiAgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodmFsdWUsIGtleSkgfHwgeyB2YWx1ZTogdmFsdWVba2V5XSB9O1xuICBpZiAoZGVzYy5nZXQpIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyL1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmICghaGFzT3duUHJvcGVydHkodmlzaWJsZUtleXMsIGtleSkpIHtcbiAgICBuYW1lID0gJ1snICsga2V5ICsgJ10nO1xuICB9XG4gIGlmICghc3RyKSB7XG4gICAgaWYgKGN0eC5zZWVuLmluZGV4T2YoZGVzYy52YWx1ZSkgPCAwKSB7XG4gICAgICBpZiAoaXNOdWxsKHJlY3Vyc2VUaW1lcykpIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgcmVjdXJzZVRpbWVzIC0gMSk7XG4gICAgICB9XG4gICAgICBpZiAoc3RyLmluZGV4T2YoJ1xcbicpID4gLTEpIHtcbiAgICAgICAgaWYgKGFycmF5KSB7XG4gICAgICAgICAgc3RyID0gc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpLnN1YnN0cigyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHIgPSAnXFxuJyArIHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tDaXJjdWxhcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoaXNVbmRlZmluZWQobmFtZSkpIHtcbiAgICBpZiAoYXJyYXkgJiYga2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgbmFtZSA9IEpTT04uc3RyaW5naWZ5KCcnICsga2V5KTtcbiAgICBpZiAobmFtZS5tYXRjaCgvXlwiKFthLXpBLVpfXVthLXpBLVpfMC05XSopXCIkLykpIHtcbiAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cigxLCBuYW1lLmxlbmd0aCAtIDIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICduYW1lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oXlwifFwiJCkvZywgXCInXCIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICdzdHJpbmcnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmFtZSArICc6ICcgKyBzdHI7XG59XG5cblxuZnVuY3Rpb24gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpIHtcbiAgdmFyIG51bUxpbmVzRXN0ID0gMDtcbiAgdmFyIGxlbmd0aCA9IG91dHB1dC5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY3VyKSB7XG4gICAgbnVtTGluZXNFc3QrKztcbiAgICBpZiAoY3VyLmluZGV4T2YoJ1xcbicpID49IDApIG51bUxpbmVzRXN0Kys7XG4gICAgcmV0dXJuIHByZXYgKyBjdXIucmVwbGFjZSgvXFx1MDAxYlxcW1xcZFxcZD9tL2csICcnKS5sZW5ndGggKyAxO1xuICB9LCAwKTtcblxuICBpZiAobGVuZ3RoID4gNjApIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICtcbiAgICAgICAgICAgKGJhc2UgPT09ICcnID8gJycgOiBiYXNlICsgJ1xcbiAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIG91dHB1dC5qb2luKCcsXFxuICAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIGJyYWNlc1sxXTtcbiAgfVxuXG4gIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgJyAnICsgb3V0cHV0LmpvaW4oJywgJykgKyAnICcgKyBicmFjZXNbMV07XG59XG5cblxuLy8gTk9URTogVGhlc2UgdHlwZSBjaGVja2luZyBmdW5jdGlvbnMgaW50ZW50aW9uYWxseSBkb24ndCB1c2UgYGluc3RhbmNlb2ZgXG4vLyBiZWNhdXNlIGl0IGlzIGZyYWdpbGUgYW5kIGNhbiBiZSBlYXNpbHkgZmFrZWQgd2l0aCBgT2JqZWN0LmNyZWF0ZSgpYC5cbmZ1bmN0aW9uIGlzQXJyYXkoYXIpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXIpO1xufVxuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcblxuZnVuY3Rpb24gaXNCb29sZWFuKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG5cbmZ1bmN0aW9uIGlzTnVsbChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsID0gaXNOdWxsO1xuXG5mdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGxPclVuZGVmaW5lZCA9IGlzTnVsbE9yVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xuXG5mdW5jdGlvbiBpc1N0cmluZyhhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuXG5mdW5jdGlvbiBpc1N5bWJvbChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnO1xufVxuZXhwb3J0cy5pc1N5bWJvbCA9IGlzU3ltYm9sO1xuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc1JlZ0V4cChyZSkge1xuICByZXR1cm4gaXNPYmplY3QocmUpICYmIG9iamVjdFRvU3RyaW5nKHJlKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59XG5leHBvcnRzLmlzUmVnRXhwID0gaXNSZWdFeHA7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0RhdGUoZCkge1xuICByZXR1cm4gaXNPYmplY3QoZCkgJiYgb2JqZWN0VG9TdHJpbmcoZCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cbmV4cG9ydHMuaXNEYXRlID0gaXNEYXRlO1xuXG5mdW5jdGlvbiBpc0Vycm9yKGUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGUpICYmXG4gICAgICAob2JqZWN0VG9TdHJpbmcoZSkgPT09ICdbb2JqZWN0IEVycm9yXScgfHwgZSBpbnN0YW5jZW9mIEVycm9yKTtcbn1cbmV4cG9ydHMuaXNFcnJvciA9IGlzRXJyb3I7XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcblxuZnVuY3Rpb24gaXNQcmltaXRpdmUoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGwgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3ltYm9sJyB8fCAgLy8gRVM2IHN5bWJvbFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG5cbmV4cG9ydHMuaXNCdWZmZXIgPSByZXF1aXJlKCcuL3N1cHBvcnQvaXNCdWZmZXInKTtcblxuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufVxuXG5cbmZ1bmN0aW9uIHBhZChuKSB7XG4gIHJldHVybiBuIDwgMTAgPyAnMCcgKyBuLnRvU3RyaW5nKDEwKSA6IG4udG9TdHJpbmcoMTApO1xufVxuXG5cbnZhciBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJyxcbiAgICAgICAgICAgICAgJ09jdCcsICdOb3YnLCAnRGVjJ107XG5cbi8vIDI2IEZlYiAxNjoxOTozNFxuZnVuY3Rpb24gdGltZXN0YW1wKCkge1xuICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gIHZhciB0aW1lID0gW3BhZChkLmdldEhvdXJzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRNaW51dGVzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRTZWNvbmRzKCkpXS5qb2luKCc6Jyk7XG4gIHJldHVybiBbZC5nZXREYXRlKCksIG1vbnRoc1tkLmdldE1vbnRoKCldLCB0aW1lXS5qb2luKCcgJyk7XG59XG5cblxuLy8gbG9nIGlzIGp1c3QgYSB0aGluIHdyYXBwZXIgdG8gY29uc29sZS5sb2cgdGhhdCBwcmVwZW5kcyBhIHRpbWVzdGFtcFxuZXhwb3J0cy5sb2cgPSBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2coJyVzIC0gJXMnLCB0aW1lc3RhbXAoKSwgZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKSk7XG59O1xuXG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyLlxuICpcbiAqIFRoZSBGdW5jdGlvbi5wcm90b3R5cGUuaW5oZXJpdHMgZnJvbSBsYW5nLmpzIHJld3JpdHRlbiBhcyBhIHN0YW5kYWxvbmVcbiAqIGZ1bmN0aW9uIChub3Qgb24gRnVuY3Rpb24ucHJvdG90eXBlKS4gTk9URTogSWYgdGhpcyBmaWxlIGlzIHRvIGJlIGxvYWRlZFxuICogZHVyaW5nIGJvb3RzdHJhcHBpbmcgdGhpcyBmdW5jdGlvbiBuZWVkcyB0byBiZSByZXdyaXR0ZW4gdXNpbmcgc29tZSBuYXRpdmVcbiAqIGZ1bmN0aW9ucyBhcyBwcm90b3R5cGUgc2V0dXAgdXNpbmcgbm9ybWFsIEphdmFTY3JpcHQgZG9lcyBub3Qgd29yayBhc1xuICogZXhwZWN0ZWQgZHVyaW5nIGJvb3RzdHJhcHBpbmcgKHNlZSBtaXJyb3IuanMgaW4gcjExNDkwMykuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB3aGljaCBuZWVkcyB0byBpbmhlcml0IHRoZVxuICogICAgIHByb3RvdHlwZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBpbmhlcml0IHByb3RvdHlwZSBmcm9tLlxuICovXG5leHBvcnRzLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxuZXhwb3J0cy5fZXh0ZW5kID0gZnVuY3Rpb24ob3JpZ2luLCBhZGQpIHtcbiAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgYWRkIGlzbid0IGFuIG9iamVjdFxuICBpZiAoIWFkZCB8fCAhaXNPYmplY3QoYWRkKSkgcmV0dXJuIG9yaWdpbjtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFkZCk7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICBvcmlnaW5ba2V5c1tpXV0gPSBhZGRba2V5c1tpXV07XG4gIH1cbiAgcmV0dXJuIG9yaWdpbjtcbn07XG5cbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcInN0cmVhbXNcIl1bXCJjb3JlXCJdOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn0iLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuICB9O1xuICByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pO1xufSIsImltcG9ydCBzZXRQcm90b3R5cGVPZiBmcm9tIFwiLi9zZXRQcm90b3R5cGVPZi5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpO1xufSIsImltcG9ydCBfdHlwZW9mIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZlwiO1xuaW1wb3J0IGFzc2VydFRoaXNJbml0aWFsaXplZCBmcm9tIFwiLi9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcbiAgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICByZXR1cm4gY2FsbDtcbiAgfSBlbHNlIGlmIChjYWxsICE9PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRGVyaXZlZCBjb25zdHJ1Y3RvcnMgbWF5IG9ubHkgcmV0dXJuIG9iamVjdCBvciB1bmRlZmluZWRcIik7XG4gIH1cblxuICByZXR1cm4gYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gIF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICAgIG8uX19wcm90b19fID0gcDtcbiAgICByZXR1cm4gbztcbiAgfTtcblxuICByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHtcbiAgICBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBBcGlDb25maWd1cmF0aW9uLCBDbGllbnRDb25maWd1cmF0aW9uLCBTdHJlYW1zIH0gZnJvbSAnQGxhcmF2ZWwtc3RyZWFtcy9zdHJlYW1zLWFwaSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vQXBpU2VydmljZVByb3ZpZGVyJztcbmV4cG9ydCAqIGZyb20gJy4vRVRhZyc7XG5leHBvcnQgKiBmcm9tICcuL0VUYWdDYWNoZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RyZWFtc0FwaUNvbmZpZ3VyYXRpb24gZXh0ZW5kcyBBcGlDb25maWd1cmF0aW9uIHtcbiAgICBldGFnPzoge1xuICAgICAgICBlbmFibGVkPzogYm9vbGVhblxuICAgICAgICBtYW5pZmVzdEtleT86IHN0cmluZ1xuICAgIH07XG59XG5cblxuZGVjbGFyZSBtb2R1bGUgJ0BsYXJhdmVsLXN0cmVhbXMvY29yZScge1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgQ29uZmlndXJhdGlvbiB7XG4gICAgICAgIGFwaT86IFN0cmVhbXNBcGlDb25maWd1cmF0aW9uICYgQ2xpZW50Q29uZmlndXJhdGlvbiAmIEFwaUNvbmZpZ3VyYXRpb247XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBBcHBsaWNhdGlvbiB7XG4gICAgICAgIHN0cmVhbXM/OiBTdHJlYW1zO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
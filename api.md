# Browser Worker

## Summary

- Methods
  - [BrowserWorker.addRoute()](#BrowserWorker.addRoute)
  - [BrowserWorker.addRoutes()](#BrowserWorker.addRoutes)
  - [BrowserWorker.debugEnabled()](#BrowserWorker.debugEnabled)
  - [BrowserWorker.deleteRoute()](#BrowserWorker.deleteRoute)
  - [BrowserWorker.deleteRoutes()](#BrowserWorker.deleteRoutes)
  - [BrowserWorker.disableWaitingOtherInstances()](#BrowserWorker.disableWaitingOtherInstances)
  - [BrowserWorker.enableControlOverAllTabs()](#BrowserWorker.enableControlOverAllTabs)
  - [BrowserWorker.enableDebug()](#BrowserWorker.enableDebug)
  - [BrowserWorker.getCacheStrategy()](#BrowserWorker.getCacheStrategy)
  - [BrowserWorker.getRoutes()](#BrowserWorker.getRoutes)
  - [BrowserWorker.hasRoute()](#BrowserWorker.hasRoute)
  - [BrowserWorker.registerServiceWorker()](#BrowserWorker.registerServiceWorker)
  - [BrowserWorker.setCacheStrategy()](#BrowserWorker.setCacheStrategy)
  - [BrowserWorker.setServiceWorkerPath()](#BrowserWorker.setServiceWorkerPath)
  - [CacheStrategy.getSupportedStrategies()](#CacheStrategy.getSupportedStrategies)
- Constants
  - [CacheStrategy.CACHE_FIRST](#CacheStrategy.CACHE_FIRST)
  - [CacheStrategy.NETWORK_FIRST](#CacheStrategy.NETWORK_FIRST)
  - [Route.ASSETS](#Route.ASSETS)
  - [Route.AUDIOS](#Route.AUDIOS)
  - [Route.IMAGES](#Route.IMAGES)
  - [Route.VIDEOS](#Route.VIDEOS)


### BrowserWorker.addRoute()

Register a route under the current strategy.

**since**: v0.1.0

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST).addRoute("/");
```

### BrowserWorker.addRoutes()

Add multiple routes under the current strategy.

**since**: v0.1.0

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);BrowserWorker.addRoutes([ "/", "/about", "/contact-us"]);
```

### BrowserWorker.debugEnabled()

Returns true if the debug mode has been enabled, else returns false.

**since**: v0.1.0

**returns** Boolean

**examples**

```javascript
import { BrowserWorker } from "@khalyomede/browser-worker";BrowserWorker.debugEnabled(); // false
```

### BrowserWorker.deleteRoute()

Removes a route by its name or its regexp.

**since**: v0.1.0

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);BrowserWorker.addRoute("/");BrowserWorker.deleteRoute("/");
```

### BrowserWorker.deleteRoutes()

Delete all routes.

**since**: v0.1.0

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);BrowserWorker.addRoute("/").addRoute("/about");BrowserWorker.deleteRoutes();
```

### BrowserWorker.disableWaitingOtherInstances()

Disable the waiting step before actually applying your strategies.

**since**: v0.1.0

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker } from "@khalyomede/browser-worker";BrowserWorker.disableWaitingOtherInstances();
```

### BrowserWorker.enableControlOverAllTabs()

Take control on all other active service worker for the next actions.

**since**: v0.1.0

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker } from "@khalyomede/browser-worker";BrowserWorker.enableControlOverAllTabs();
```

### BrowserWorker.enableDebug()

Logs in console what is BrowserWorker doing.

**since**: v0.1.0

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker } from "@khalyomede/browser-worker";BrowserWorker.enableDebug();
```

### BrowserWorker.getCacheStrategy()

Get the current cache strategy.

**since**: v0.1.0

**returns** String

**examples**

```javascript
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST).getCacheStrategy();
```

### BrowserWorker.getRoutes()

Get the routes.

**since**: v0.1.0

**returns** Array.<Route>

**examples**

```javascript
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);BrowserWorker.addRoute("/").addRoute("/about");const routes = BrowserWorker.getRoutes();
```

### BrowserWorker.hasRoute()

Returns true if at least one route matches the route or the regexp, else returns false.

**since**: v0.1.0

**returns** Boolean

**examples**

```javascript
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);BrowserWorker.addRoute("/");if (BrowserWorker.hasRoute("/")) { console.log("has route /");} else { console.log("has not route /");}
```

### BrowserWorker.registerServiceWorker()

Registers the service worker. Should be used in your main javascript file (and not in the service worker file itself).

**since**: v0.1.0

**returns** Void

**examples**

```javascript
import { BrowserWorker } from "@khalyomede/browser-worker";BrowserWorker.setServiceWorkerPath("/service-worker.js").registerServiceWorker();
```

### BrowserWorker.setCacheStrategy()

Sets the current cache strategy.

**since**: v0.1.0

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);
```

### BrowserWorker.setServiceWorkerPath()

Set the path to register the service worker. You should use it on the javascript file that you service to your client, not in the service worker itself.

**since**: v0.1.0

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker } from "@khalyomede/browser-worker";BrowserWorker.setServiceWorkerPath("/service-worker.js")
```

### CacheStrategy.getSupportedStrategies()

Returns an array of string of the supported caches strategies by BrowserWorker.

**since**: v0.1.0

**returns** Array.<String>

**examples**

```javascript
import { CacheStrategy } from "browser-worker";const supported = CacheStrategy.getSupportedStrategies();
```



### CacheStrategy.CACHE_FIRST

Instruct the service worker to treat the requests from the cache in priority. If the request is not cached yet, the service worker will fetch it from the network and cache it once. Suitable for resources that are not business critical, do not change a lot over time, and take a long time to download, like descriptives images, cover images, ...

**since**: v0.1.0

**type** String

**examples**

```javascript
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);
```

### CacheStrategy.NETWORK_FIRST

Instruct the service worker to treat the requests from the network first, then cache them (in case the network is down). Suitable for resources that need to be the most up to date, like assets, business critical resource like product images, ...

**since**: v0.1.0

**type** String

**examples**

```javascript
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);
```

### Route.ASSETS

Captures assets, which means Javascript, CSS and HTML files.

**since**: v0.1.0

**type** RegExp

**examples**

```javascript
import { BrowserWorker, Route } from "@khalyomede/browser-worker";BrowserWorker.addRoute(Route.ASSETS);
```

### Route.AUDIOS

Captures audios resources.

**since**: v0.1.0

**type** RegExp

**examples**

```javascript
import { BrowserWorker, Route } from "@khalyomede/browser-worker";BrowserWorker.addRoute(Route.AUDIOS);
```

### Route.IMAGES

Captures images resources, including gif and webp.

**since**: v0.1.0

**type** RegExp

**examples**

```javascript
import { BrowserWorker, Route } from "@khalyomede/browser-worker";BrowserWorker.addRoute(Route.IMAGES);
```

### Route.VIDEOS

Captures videos resources, including webm.

**since**: v0.1.0

**type** RegExp

**examples**

```javascript
import { BrowserWorker, Route } from "@khalyomede/browser-worker";BrowserWorker.addRoute(Route.VIDEOS);
```


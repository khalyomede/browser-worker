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
  - [BrowserWorker.setCacheStrategy()](#BrowserWorker.setCacheStrategy)
  - [BrowserWorker.setServiceWorkerPath()](#BrowserWorker.setServiceWorkerPath)

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


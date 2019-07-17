# Browser Worker

## Summary

- Methods
  - [BrowserWorker.addResourceToCache()](#browserworkeraddresourcetocache)
  - [BrowserWorker.addResourcesToCache()](#browserworkeraddresourcestocache)
  - [BrowserWorker.addRoute()](#browserworkeraddroute)
  - [BrowserWorker.addRoutes()](#browserworkeraddroutes)
  - [BrowserWorker.debugEnabled()](#browserworkerdebugenabled)
  - [BrowserWorker.deleteRoute()](#browserworkerdeleteroute)
  - [BrowserWorker.deleteRoutes()](#browserworkerdeleteroutes)
  - [BrowserWorker.disableDebug()](#browserworkerdisabledebug)
  - [BrowserWorker.disableWaitingOtherInstances()](#browserworkerdisablewaitingotherinstances)
  - [BrowserWorker.enableControlOverAllTabs()](#browserworkerenablecontroloveralltabs)
  - [BrowserWorker.enableDebug()](#browserworkerenabledebug)
  - [BrowserWorker.enableWaitingOtherInstances()](#browserworkerenablewaitingotherinstances)
  - [BrowserWorker.getCacheStrategy()](#browserworkergetcachestrategy)
  - [BrowserWorker.getRoutes()](#browserworkergetroutes)
  - [BrowserWorker.hasRoute()](#browserworkerhasroute)
  - [BrowserWorker.registerServiceWorker()](#browserworkerregisterserviceworker)
  - [BrowserWorker.removeCaches()](#browserworkerremovecaches)
  - [BrowserWorker.removeServiceWorker()](#browserworkerremoveserviceworker)
  - [BrowserWorker.reset()](#browserworkerreset)
  - [BrowserWorker.resetCacheStrategy()](#browserworkerresetcachestrategy)
  - [BrowserWorker.resetRoutes()](#browserworkerresetroutes)
  - [BrowserWorker.setCacheStrategy()](#browserworkersetcachestrategy)
  - [BrowserWorker.setServiceWorkerPath()](#browserworkersetserviceworkerpath)
  - [CacheStrategy.getSupportedStrategies()](#cachestrategygetsupportedstrategies)
- Constants
  - [CacheStrategy.CACHE_FIRST](#cachestrategycache_first)
  - [CacheStrategy.CACHE_ONLY](#cachestrategycache_only)
  - [CacheStrategy.NETWORK_FIRST](#cachestrategynetwork_first)
  - [Route.ASSETS](#routeassets)
  - [Route.AUDIOS](#routeaudios)
  - [Route.FONTS](#routefonts)
  - [Route.IMAGES](#routeimages)
  - [Route.VIDEOS](#routevideos)


### BrowserWorker.addResourceToCache()

Adds the resource to the cache. The route still reacts to your strategies (if it matches).

**since**: v0.1.1

**parameters**

- route (String): undefined

**returns** Promise.<Void>

**examples**

```javascript
import { BrowserWorker } from "@khalyomede/browser-worker";BrowserWorker.setCacheName("cache-only-v1").addResourceToCache("/about");
```

### BrowserWorker.addResourcesToCache()

Adds multiple resources to the cache. Goes along very well with a Cache First strategy.

**since**: v0.7.0

**parameters**

- routes (Array.<String>): The routes urls to put in the cache.

**returns** Promise.<Void>

**examples**

```javascript
import { BrowserWorker } from "@khalyomede/browser-worker";BrowserWorker.setCacheName("cache-only-v1").addResourcesToCache(["/", "/contact", "/js/main.min.js"]);
```

### BrowserWorker.addRoute()

Register a route under the current strategy. If you add a route using the cache first strategy, it will also be appended to the cache (so you do not have to call BrowserWorker.addResourceToCache() manually).

**since**: v0.1.0

**parameters**

- route (String|RegExp): The route or the regular expression representing the routes to catch.

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST).addRoute("/");
```

### BrowserWorker.addRoutes()

Add multiple routes under the current strategy.

**since**: v0.1.0

**parameters**

No parameters.

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);BrowserWorker.addRoutes([ "/", "/about", "/contact-us"]);
```

### BrowserWorker.debugEnabled()

Returns true if the debug mode has been enabled, else returns false.

**since**: v0.1.0

**parameters**

No parameters.

**returns** Boolean

**examples**

```javascript
import { BrowserWorker } from "@khalyomede/browser-worker";BrowserWorker.debugEnabled(); // false
```

### BrowserWorker.deleteRoute()

Removes a route by its name or its regexp.

**since**: v0.3.0

**parameters**

- route (String|RegExp): The route to remove.

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);BrowserWorker.addRoute("/");BrowserWorker.deleteRoute("/");
```

### BrowserWorker.deleteRoutes()

Delete all routes.

**since**: v0.3.0

**parameters**

- searchedRoutes (Array.<(String|RegExp)>): The routes to remove.

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);BrowserWorker.addRoute("/").addRoute("/about");BrowserWorker.deleteRoutes();
```

### BrowserWorker.disableDebug()

Prevent logging in console what BrowserWorker is doing.

**since**: v0.3.0

**parameters**

No parameters.

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker } from "@khalyomede/browser-worker";BrowserWorker.disableDebug();
```

### BrowserWorker.disableWaitingOtherInstances()

Disable the waiting step before actually applying your strategies.

**since**: v0.1.0

**parameters**

No parameters.

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker } from "@khalyomede/browser-worker";BrowserWorker.disableWaitingOtherInstances();
```

### BrowserWorker.enableControlOverAllTabs()

Take control on all other active service worker for the next actions.

**since**: v0.1.0

**parameters**

No parameters.

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker } from "@khalyomede/browser-worker";BrowserWorker.enableControlOverAllTabs();
```

### BrowserWorker.enableDebug()

Logs in console what is BrowserWorker doing.

**since**: v0.1.0

**parameters**

No parameters.

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker } from "@khalyomede/browser-worker";BrowserWorker.enableDebug();
```

### BrowserWorker.enableWaitingOtherInstances()

Enable waiting others previously installed service workers before installing the new one.

**since**: v0.3.0

**parameters**

No parameters.

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker } from "@khalyomede/browser-worker";BrowserWorker.enableWaitingOtherInstances();
```

### BrowserWorker.getCacheStrategy()

Get the current cache strategy.

**since**: v0.1.0

**parameters**

No parameters.

**returns** String

**examples**

```javascript
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST).getCacheStrategy();
```

### BrowserWorker.getRoutes()

Get the routes.

**since**: v0.1.0

**parameters**

No parameters.

**returns** Array.<Route>

**examples**

```javascript
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);BrowserWorker.addRoute("/").addRoute("/about");const routes = BrowserWorker.getRoutes();
```

### BrowserWorker.hasRoute()

Returns true if at least one route matches the route or the regexp, else returns false.

**since**: v0.4.0

**parameters**

- searchedRoute (String|RegExp): The route to search for.

**returns** Boolean

**examples**

```javascript
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);BrowserWorker.addRoute("/");if (BrowserWorker.hasRoute("/")) { console.log("has route /");} else { console.log("has not route /");}
```

### BrowserWorker.registerServiceWorker()

Registers the service worker. Should be used in your main javascript file (and not in the service worker file itself).

**since**: v0.1.0

**parameters**

No parameters.

**returns** Void

**examples**

```javascript
import { BrowserWorker } from "@khalyomede/browser-worker";BrowserWorker.setServiceWorkerPath("/service-worker.js").registerServiceWorker();
```

### BrowserWorker.removeCaches()

Removes all the caches generated from BrowserWorker. We know they have been generated by this library because we suffix all our cache name by default by "-browser-worker". See BrowserWorker.removeServiceWorker() if you want a fresh start. If you need to just update the service worker, use BrowserWorker.setCacheName() and change it to make your service worker update itself the next time the user browse your web app.

**since**: v0.5.0

**parameters**

No parameters.

**returns** Promise.<BrowserWorker>

**examples**

```javascript
import { BrowserWorker } from "@khalyomede/browser-worker";BrowserWorker.removeCaches();
```

### BrowserWorker.removeServiceWorker()

Unregisters the service workers. See BrowserWorker.removeCaches() if you also want to wipe out caches to fresh start again. If you need to just update the service worker, use BrowserWorker.setCacheName() and change it to make your service worker update itself the next time the user browse your web app.

**since**: v0.5.0

**parameters**

No parameters.

**returns** Promise.<BrowserWorker>

**examples**

```javascript
import { BrowserWorker } from "@khalyomede/browser-worker";BrowserWorker.removeServiceWorker();
```

### BrowserWorker.reset()

Reset the entire BrowserWorker state (e.g. setting its properties to their default values).

**since**: v0.3.0

**parameters**

No parameters.

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker } from "@khalyomede/browser-worker";BrowserWorker.reset();
```

### BrowserWorker.resetCacheStrategy()

Reset the cache strategy by setting its default value to empty.

**since**: v0.2.0

**parameters**

No parameters.

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);BrowserWorker.resetCacheStrategy();console.log(BrowserWorker.getCacheStrategy()); // ""
```

### BrowserWorker.resetRoutes()

Reset the routes by settings the default value to an empty array.

**since**: v0.2.0

**parameters**

No parameters.

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST)	.addRoute("/");BrowserWorker.resetRoutes();console.log(BrowserWorker.getRoutes()); // []
```

### BrowserWorker.setCacheStrategy()

Sets the current cache strategy.

**since**: v0.1.0

**parameters**

- strategy (String): The name of the strategy.

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);
```

### BrowserWorker.setServiceWorkerPath()

Set the path to register the service worker. You should use it on the javascript file that you service to your client, not in the service worker itself.

**since**: v0.1.0

**parameters**

- path (String): The path where the service worker is located.

**returns** BrowserWorker

**examples**

```javascript
import { BrowserWorker } from "@khalyomede/browser-worker";BrowserWorker.setServiceWorkerPath("/service-worker.js")
```

### CacheStrategy.getSupportedStrategies()

Returns an array of string of the supported caches strategies by BrowserWorker.

**since**: v0.1.0

**parameters**

No parameters.

**returns** Array.<String>

**examples**

```javascript
import { CacheStrategy } from "browser-worker";const supported = CacheStrategy.getSupportedStrategies();
```



### CacheStrategy.CACHE_FIRST

Instruct the service worker to fetch the requests from the cache in priority. If the request is not cached yet, the service worker will fetch it from the network and cache it once. Suitable for resources that are not business critical, do not change a lot over time, and take a long time to download, like descriptives images, cover images, ...

**since**: v0.1.0

**type** String

**examples**

```javascript
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);
```

### CacheStrategy.CACHE_ONLY

Instruct the service worker to fetch the requests only from the cache. Suitable if you use BrowserWorker.addResourceToCache(), for resource to browse later for example.

**since**: v0.7.0

**type** String

**examples**

```javascript
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";BrowserWorker.setCacheStrategy(CacheStrategy.CACHE_ONLY);
```

### CacheStrategy.NETWORK_FIRST

Instruct the service worker to fetch the requests from the network first, then cache them (in case the network is down). Suitable for resources that need to be the most up to date, like assets, business critical resource like product images, ...

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

### Route.FONTS

Captures fonts resources.

**since**: v0.2.0

**type** RegExp

**examples**

```javascript
import { BrowserWorker, Route } from "@khalyomede/browser-worker";BrowserWorker.addRoute(Route.FONTS);
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


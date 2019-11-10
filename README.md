# BrowserWorker

Simplify scaffolding a service worker.

![https://www.npmjs.com/package/@khalyomede/browser-worker](https://img.shields.io/npm/v/@khalyomede/browser-worker.svg) ![https://bundlephobia.com/result?p=@khalyomede/browser-worker@0.6.1](https://badgen.net/bundlephobia/minzip/@khalyomede/browser-worker) ![https://github.com/khalyomede/browser-worker/blob/master/LICENSE](https://img.shields.io/npm/l/@khalyomede/browser-worker.svg)

[![Build Status](https://travis-ci.com/khalyomede/browser-worker.svg?branch=master)](https://travis-ci.com/khalyomede/browser-worker) [![codecov](https://codecov.io/gh/khalyomede/browser-worker/branch/master/graph/badge.svg)](https://codecov.io/gh/khalyomede/browser-worker) ![Stryker mutation score](https://badge.stryker-mutator.io/github.com/khalyomede/browser-worker/master) [![Maintainability](https://api.codeclimate.com/v1/badges/2f06a7bdd6a1e5d549fa/maintainability)](https://codeclimate.com/github/khalyomede/browser-worker/maintainability) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@khalyomede/browser-worker.svg) ![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/@khalyomede/browser-worker)

## Summary

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Advices](#advices)
- [API](api.md)
- [Contributing](#contributing)

## About

BrowserWorker is a library that helps you to build services workers without the hassle of taming the hardness of this technology. You only focus on how your service worker should handle your requests, and let the library scaffold everything for you.

Services Workers is a mecanism between your client browser and your server, to help you finely manage how requests should be fetch. It can help you set up offline modes, and is a criteria to pass [LightHouse](https://developers.google.com/web/tools/lighthouse/) tests for the [Progressive Web App](https://developers.google.com/web/progressive-web-apps/) section. Learn more on these articles:

- ["Using Service Workers" by Mozilla Developper Network](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)
- ["Service Workers: an introduction" by Matt Gaunt from Google Developper](https://developers.google.com/web/fundamentals/primers/service-workers/)

## Features

Here is all you can do with this library:

- Register a service worker (both from your main file and your service worker, using a single API)
- Configure your service worker to manage request cache using network strategies (see [all the strategies](api.md#cachestrategycache_first)) for certain routes by matching using a string or a regular expression
- Provide "read later offline" features to your user easily
- Emergency remove the service worker and the generated cache in case it is needed

Lean more by reading the [Usage](#usage) section.

## Installation

- [NPM](#with-npm)
- [Browser](#browser)

### NPM

On your project root folder, install the dependency:

```bash
npm install --save-dev @khalyomede/browser-worker
```

### Browser

Since the version `0.6.1`, you can include these files in your head tag to install your service worker:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Document</title>
		<script
			type="text/javascript"
			src="https://unpkg.com/@khalyomede/browser-worker@0.*/dist/browser-worker.min.js"
			defer="true"
		></script>
		<script type="text/javascript" src="/js/register-service-worker.js" defer="true"></script>
	</head>
	<body>
		<!-- ... -->
	</body>
</html>
```

Once your page loads, the objects will be stored in the global `window` variable, and you will have access to those:

```javascript
// myapp/js/register-service-worker.js

BrowserWorker.enableDebug();

// ...
```

Here is a link to all the CDNs:

- [BrowserWorker](https://unpkg.com/@khalyomede/browser-worker@0.*/dist/browser-worker.js)
- [BrowserWorker (minified)](https://unpkg.com/@khalyomede/browser-worker@0.*/dist/browser-worker.min.js)

## Usage

- [Register your service worker](#register-your-service-worker)
- [Skip waiting other service workers before installing the new one](#skip-waiting-other-service-workers-before-installing-the-new-one)
- [Register a route and use a cache strategy](#register-a-route-and-use-a-cache-strategy)
- [Add a resource to cache dynamically](#add-a-resource-to-cache-dynamically)
- [Enable the debug mode to see what is happening from the console](#enable-the-debug-mode-to-see-what-is-happening-from-the-console)
- [Emergency remove the service worker in case something went wrong](#emergency-remove-the-service-worker-in-case-something-went-wrong)

### Register your service worker

In this example, we will inform the browser that our service worker is ready to work, if the browser support this technology (this check is done for you).

```javascript
// myapp/js/main.js

import { BrowserWorker } from "@khalyomede/browser-worker";

BrowserWorker.setServiceWorkerPath("/service-worker.js").registerServiceWorker();
```

By default, the service worker path is set to `/service-worker.js`, so you can ommit it if this default path suits your needs:

```javascript
import { BrowserWorker } from "@khalyomede/browser-worker";

BrowserWorker.registerServiceWorker();
```

### Skip waiting other service workers before installing the new one

In this example, you will be able to tell your browser to install your service worker when at page load as soon as possible.

This is very useful if you want to make sure your service worker is always at the latest version. Without this, new service workers wouls have to wait before installing, which could defer any changes you perform (I personnaly always use it).

```javascript
// myapp/service-worker.js
import { BrowserWorker } from "@khalyomede/browser-worker";

BrowserWorker.enableControlOverAllTabs(); // Every changes below will be applied to all active service workers in any others tabs.
BrowserWorker.disableWaitingOtherInstances(); // Installs as soon as possible.

// ...
```

### Register a route and use a cache strategy

In this example, we will ask our service worker to fetch the home page (`/`) from the network first, and from the cache if there is no network available (network first).

```javascript
// myapp/service-worker.js
import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";

BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST)
	.setCacheName("network-first-v1")
	.addRoute("/");

BrowserWorker.listenRequests();
```

Learn more about every possible cache strategies by reading the [API documentation](api.md).

### Add a resource to cache dynamically

In this example, we will simulate the "read later" button that you might see in some Progressive Web App to let you browse a content offline, by caching it ahead of time (without having the user to browser the resource first).

```javascript
// myapp/js/main.js
import { BrowserWorker } from "@khalyomede/browser-worker";

document.addEventListener("DOMContentLoaded", () => {
	document.querySelector("#read-later-button").addEventListener("click", async () => {
		BrowserWorker.setCacheName("cache-only-v1");

		await BrowserWorker.addResourceToCache("/article/use-webp-now");

		alert("Article saved.");
	});
});
```

Note: if the resource matches one of your service worker strategy, it will behave depending of this strategy (so if you are caching a route ahead of time using this technique, but this exact same resource is reacting to a network first strategy, it will be fetched first from the network, and not from the cache).

### Enable the debug mode to see what is happening from the console

In this example, we will enable the debug mode both for the registration of the service worker, and the service worker itself, in order to see what BrowserWorker is doing.

```javascript
// myapp/js/main.js
import { BrowserWorker } from "@khalyomede/browser-worker";

BrowserWorker.enableDebug();

BrowserWorker.setServiceWorkerPath("/service-worker.js").registerServiceWorker();
```

```javascript
// myapp/service-worker.js
import { BrowserWorker, CacheStrategy, Route } from "@khalyomede/browser-worker";

BrowserWorker.enableDebug();

BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST)
	.setCacheName("network-first-v1")
	.addRoute("/");

BrowserWorker.listenRequests();
```

You should see something like this if you open the developer console:

```
[BrowserWorker][22:38:31.140] service worker registered (scope: http://localhost:3000/).
[BrowserWorker][22:38:31.142] skipped waiting for other instances to finish.
[BrowserWorker][22:38:31.144] controlling all tabs.
[BrowserWorker][22:38:31.145] cleaned old caches.
```

### Emergency remove the service worker in case something went wrong

In this example, we will completly remove a service worker and all the generated caches. Use it if you think something went wrong or you want a new fresh start. Do not use it if you only want to update your service worker.

```javascript
// myapp/js/main.js
import { BrowserWorker } from "@khalyomede/browser-worker";

BrowserWorker.enableControlOverAllTabs(); // Use it to apply the changes for all the user's tabs.

BrowserWorker.disableWaitingOtherInstances(); // Better use it anyway, to apply the changes as fast as possible.
BrowserWorker.removeServiceWorker();
BrowserWorker.removeCaches();
```

You do not have to necessary remove your file `/service-worker.js`, because it will not be called anymore.

## Advices

This are some tips I dare to give you because I went through issues and whished to knew how to prevent those before.

1. Separate the code that registers you service worker from the rest of your app

For example if your app folder looks like this:

```bash
myapp/
  src/
    js/
      main.js
    service-worker.js
```

Do not put your service worker registration step besides your app. So **the code below is not adviced**:

```javascript
import Vue from "vue";
import { BrowserWorker } from "@khalyomede/browser-worker";

BrowserWorker.setServiceWorkerPath("/service-worker.js").registerServiceWorker(); // not safe!

new Vue({
	el: "#app",
	router: new VueRouter({
		mode: "history",
		routes: []
	})
});
```

It is not safe, because if you will use a _cache-first_ strategy on your route `/js/main.js`, and you would changed the path where the service worker is located for example, this file will never be fetched from the network again so your service worker will be stucked in your customer's browsers for a long time (browsers implements an algorithm that will force a verification to see if your files changed [every 24 hours](https://stackoverflow.com/a/38854905/3753055))... Here is below **the adviced code**:

```bash
myapp/
  src/
    js/
      main.js
      on-load-register-service-worker.js
    service-worker.js
```

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Document</title>
		<script type="text/javascript" src="/js/on-load-register-service-worker.js" async="true"></script>
	</head>
	<body>
		<script type="text/javascript" src="/js/main.js"></script>
	</body>
</html>
```

This is better because now, having in mind to never catch this file in a route from your service worker, you will be able to reduce the risk this file gets stuck in the cache.

```javascript
// myapp/src/js/on-load-register-service-worker.js
import { BrowserWorker } from "@khalyomede/browser-worker";

BrowserWorker.setServiceWorkerPath("/service-worker.js").registerServiceWorker();
```

2. Ask your server to send information to prevent caching the service worker related files on your user's browser

With this technique, you make sure, in addition to the advice below, your service worker files are not cached by the browser, thus preventing any issue when you want to edit your service worker.

For example, with Apache, you can write this:

```conf
# myapp/dist/.htaccess

# Prevents the browser from caching those files
<Files "js/on-load-register-service-worker.js">
  FileETag None
  <ifModule mod_headers.c>
     Header unset ETag
     Header set Cache-Control "max-age=0, no-cache, no-store, must-revalidate"
     Header set Pragma "no-cache"
     Header set Expires "Wed, 11 Jan 1984 05:00:00 GMT"
  </ifModule>
</Files>
<Files "service-worker.js">
  FileETag None
  <ifModule mod_headers.c>
     Header unset ETag
     Header set Cache-Control "max-age=0, no-cache, no-store, must-revalidate"
     Header set Pragma "no-cache"
     Header set Expires "Wed, 11 Jan 1984 05:00:00 GMT"
  </ifModule>
</Files>
```

3. Update the cache name of your strategy if you update it

If you want to add, edit or remove a route, the best way to ensure the changes are applied as soon as possible it to update the cache name of your strategy. For example, let us say you are adding `/` using network first:

```javascript
// myapp/src/js/service-worker.js

import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";

BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST)
	.setCacheName("network-first-v1")
	.addRoute("/");

BrowserWorker.listenRequests();
```

And in one week, you finished your `/about` page and want to add it to the service worker under the same strategy:

```javascript
// myapp/src/js/service-worker.js

import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";

BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST)
	.setCacheName("network-first-v2") // changed!
	.addRoute("/")
	.addRoute("/about");

BrowserWorker.listenRequests();
```

By just changing the name of the cache name, you make sure your service worker invalidate the last version and install the new one as soon as possible. Browser Worker will clean the old cache so that there is no conflict.

## Contributing

If you want to add value to the library, here is the steps I advice you to follow to create a pull request in the bests conditions:

1. Click on the fork button (it will create a clone of this repository, in your GitHub account)
2. Clone your own version of this project in your computer

```bash
git clone https://github.com/you/browser-worker
```

3. Move into the directory, and "start" the project:

```bash
yarn install && yarn start
```

_(it uses yarn, which is easily downloadable: [Yarn installation page](https://yarnpkg.com/en/docs/install), but you can also use npm if you prefer)_

4. Perform your changes/improvements
5. Test that your changes are safe to push:

```bash
yarn test
```

6. Check if the documentation needs to change:

```bash
yarn documentation
```

7. If you added a new file in the `src` folder, do not forget to add it on the dedicated array in the `package.json`:

```javascript
// package.json

...
"files": [
  "lib/BrowserWorker.js",
  "lib/Cache.js",
  "lib/CacheStrategy.js",
  "lib/Console.js",
  "lib/main.js",
  "lib/Response.js",
  "lib/Route.js",
  "lib/YOUR_NEW_FILE_HERE.js"
]
```

8. Push your changes to your project
9. Make a Pull Request by choosing from your branch to the master branch of this library in the [Pull Request GitHub dedicated page](https://github.com/khalyomede/browser-worker/compare).

Thank you a lot for your time!

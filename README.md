# BrowserWorker

Simplify scaffolding a service worker.

![npm](https://img.shields.io/npm/v/@khalyomede/browser-worker.svg) ![NPM](https://img.shields.io/npm/l/@khalyomede/browser-worker.svg)

[![Build Status](https://travis-ci.com/khalyomede/browser-worker.svg?branch=master)](https://travis-ci.com/khalyomede/browser-worker) [![codecov](https://codecov.io/gh/khalyomede/browser-worker/branch/master/graph/badge.svg)](https://codecov.io/gh/khalyomede/browser-worker) ![Stryker mutation score](https://badge.stryker-mutator.io/github.com/khalyomede/browser-worker/master) [![Maintainability](https://api.codeclimate.com/v1/badges/2f06a7bdd6a1e5d549fa/maintainability)](https://codeclimate.com/github/khalyomede/browser-worker/maintainability) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@khalyomede/browser-worker.svg)

## Summary

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API](api.md)
- [Contributing](#contributing)

## About

BrowserWorker is a library that help you to build services workers without the hassle of taming the hardness of this technology. You only focus on how your service worker should behave against your requests, and let the library scaffold everything for you.

Services Workers is a mecanism between your client browser and your server, to help you finely manage how requests should be fetch. It can help you set up offline modes, and is a criteria to pass [LightHouse](https://developers.google.com/web/tools/lighthouse/) tests for the [Progressive Web App](https://developers.google.com/web/progressive-web-apps/) section. Learn more on these articles:

- ["Using Service Workers" by Mozilla Developper Network](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)
- ["Service Workers: an introduction" by Matt Gaunt from Google Developper](https://developers.google.com/web/fundamentals/primers/service-workers/)

## Features

Here is all you can do with this library:

- Register a service worker
- Configure your service worker to set up cache cache strategies (network-first, cache-first) for certain routes by matching using a string or a regular expression
- Provide "read later offline" features to your user easily

Lean more by reading the [Usage](#usage) section.

## Installation

- [NPM](#with-npm)
- [Browser](#browser)

### NPM

On your project root folder, install the dependency:

```bash
npm install --save-dev browser-worker
```

### Browser

In development.

## Usage

- [Register your service worker](#register-your-service-worker)
- [Register a route and use a cache strategy](#register-a-route-and-use-a-cache-strategy)
- [Add a resource to cache dynamically](#add-a-resource-to-cache-dynamically)
- [Enable the debug mode to see what is happening from the console](#enable-the-debug-mode-to-see-what-is-happening-from-the-console)

### Register your service worker

In this example, we will inform the browser that our service worker is ready to work, if the browser support this technology (this check is done for you, you do not need to check it).

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

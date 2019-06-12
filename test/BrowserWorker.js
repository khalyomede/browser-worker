import { expect } from "chai";
import { BrowserWorker, CacheStrategy } from "../lib/main";

afterEach(() => {
	BrowserWorker.reset();
});

describe("BrowserWorker", () => {
	describe("addRoute", () => {
		it("should return a BrowserWorker object", () =>
			expect(BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST).addRoute("/")).to.be.equal(BrowserWorker));

		it("should store the route on the property", () =>
			expect(BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST).addRoute("/")._routes).to.be.deep.equal([
				{ cacheName: "", route: "/", strategy: "network-first" }
			]));

		it("should stack with previous routes", () => {
			expect(
				BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST)
					.addRoute("/")
					.addRoute("/about")._routes
			).to.be.deep.equal([
				{ cacheName: "", route: "/", strategy: "network-first" },
				{ cacheName: "", route: "/about", strategy: "network-first" }
			]);
		});

		it("should throw a TypeError if the route is not a String nor a RegExp", () =>
			expect(function() {
				BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST).addRoute(42);
			}).to.throw(TypeError));

		it("should throw a TypeError message if the route is not a String nor a RegExp", () =>
			expect(function() {
				BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST).addRoute(42);
			}).to.throw("expected route to be either string or regexp (number given)"));

		it("should throw an Error if the route is an empty String", () =>
			expect(function() {
				BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST).addRoute("");
			}).to.throw(Error));

		it("should throw an Error message if the route is an empty string", () =>
			expect(function() {
				BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST).addRoute("");
			}).to.throw("expected route string not to be empty"));
	});

	describe("addRoutes", () => {
		it("should return a BrowserWorker object", () =>
			expect(BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST).addRoutes(["/", "/about"])).to.be.equal(
				BrowserWorker
			));

		it("should store the routes on the property", () =>
			expect(
				BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST).addRoutes(["/", "/about"])._routes
			).to.be.deep.equal([
				{ cacheName: "", route: "/", strategy: "network-first" },
				{ cacheName: "", route: "/about", strategy: "network-first" }
			]));

		it("should stack with previous routes", () =>
			expect(
				BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST)
					.addRoute("/")
					.addRoutes(["/about", "/contact"])._routes
			).to.be.deep.equal([
				{ cacheName: "", route: "/", strategy: "network-first" },
				{ cacheName: "", route: "/about", strategy: "network-first" },
				{ cacheName: "", route: "/contact", strategy: "network-first" }
			]));
	});

	describe("debugEnabled", () => {
		it("should return false by default", () => expect(BrowserWorker.debugEnabled()).to.be.false);

		it("should return true if debug has been enabled", () =>
			expect(BrowserWorker.enableDebug().debugEnabled()).to.be.true);

		it("should return false if debug has been enabled, then disabled", () =>
			expect(
				BrowserWorker.enableDebug()
					.disableDebug()
					.debugEnabled()
			).to.be.false);
	});

	describe("deleteRoute", () => {
		it("should return a BrowserWorker instance", () =>
			expect(
				BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST)
					.addRoute("/")
					.deleteRoute("/")
			).to.be.equal(BrowserWorker));

		it("should correctly delete the route", () =>
			expect(
				BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST)
					.addRoute("/")
					.deleteRoute("/")._routes
			).to.be.deep.equal([]));

		it("should correctly delete all the occurence of the same route", () =>
			expect(
				BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST)
					.addRoute("/")
					.setCacheStrategy(CacheStrategy.CACHE_FIRST)
					.addRoute("/")
					.deleteRoute("/")._routes
			).to.be.deep.equal([]));

		it("should correctly delete the regexp route", () => {
			const route = /\.(jpg|jpeg|png|svg|webp)$/;

			expect(
				BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST)
					.addRoute(route)
					.deleteRoute(route)._routes
			).to.be.deep.equal([]);
		});

		it("should correctly delete all the occurence of the regexp route", () => {
			const route = /\.(jpg|jpeg|png|svg|webp)$/;

			expect(
				BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST)
					.addRoute(route)
					.setCacheStrategy(CacheStrategy.CACHE_FIRST)
					.addRoute(route)
					.deleteRoute(route)._routes
			).to.be.deep.equal([]);
		});
	});

	describe("deleteRoutes", () => {
		it("should return a BrowserWorker instance", () =>
			expect(
				BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST)
					.addRoutes(["/", "/about"])
					.deleteRoutes(["/", "/about"])
			).to.be.equal(BrowserWorker));
	});

	describe("disableWaitingOtherInstances", () => {
		it("should return a BrowserWorker instance", () =>
			expect(BrowserWorker.disableWaitingOtherInstances()).to.be.equal(BrowserWorker));

		it("should return true by default", () => expect(BrowserWorker._waitOtherInstances).to.be.true);

		it("should return false if the option has been disabled", () =>
			expect(BrowserWorker.disableWaitingOtherInstances()._waitOtherInstances).to.be.false);

		it("should return true if the option has been enabled", () =>
			expect(BrowserWorker.enableWaitingOtherInstances()._waitOtherInstances).to.be.true);

		it("should return true if the option has been disabled then enabled", () =>
			expect(BrowserWorker.disableWaitingOtherInstances().enableWaitingOtherInstances()._waitOtherInstances).to.be
				.true);
	});

	describe("enableControlOverAllTabs", () => {
		it("should return an instance of BrowserWorker", () =>
			expect(BrowserWorker.enableControlOverAllTabs()).to.be.equal(BrowserWorker));
	});

	describe("enableDebug", () => {
		it("should return an instance of BrowserWorker", () =>
			expect(BrowserWorker.enableDebug()).to.be.equal(BrowserWorker));
	});

	describe("getCacheStrategy", () => {
		it("should return empty by default", () => expect(BrowserWorker.getCacheStrategy()).to.be.equal(""));
	});

	describe("getRoutes", () => {
		it("should return an empty array by default", () => expect(BrowserWorker.getRoutes()).to.be.deep.equal([]));
	});

	describe("hasRoute", () => {
		it("should return false by default", () => expect(BrowserWorker.hasRoute("/")).to.be.false);
	});

	describe("registerServiceWorker", () => {});

	describe("setCacheStrategy", () => {
		it("should return an instance of BrowserWorker", () =>
			expect(BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST)).to.be.equal(BrowserWorker));
	});

	describe("setServiceWorkerPath", () => {
		it("should return an instance of BrowserWorker", () =>
			expect(BrowserWorker.setServiceWorkerPath("/service-worker.js")).to.be.equal(BrowserWorker));
	});
});

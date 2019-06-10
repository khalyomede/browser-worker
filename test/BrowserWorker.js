import { expect } from "chai";
import { BrowserWorker, CacheStrategy } from "../lib/main";

afterEach(() => {
	BrowserWorker.resetCacheStrategy();
	BrowserWorker.resetRoutes();
});

describe("BrowserWorker", () => {
	describe("addRoute", () => {
		it("should return a BrowserWorker object", () =>
			expect(BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST).addRoute("/")).to.be.equal(BrowserWorker));

		it("should store the route on the property", () =>
			expect(BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST).addRoute("/")._routes).to.be.deep.equal([
				{ cacheName: "", route: "/", strategy: "network-first" }
			]));

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
	});

	describe("debugEnabled", () => {
		it("should return false by default", () => expect(BrowserWorker.debugEnabled()).to.be.false);
	});

	describe("deleteRoute", () => {
		it("should return a BrowserWorker instance", () =>
			expect(
				BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST)
					.addRoute("/")
					.deleteRoute("/")
			).to.be.equal(BrowserWorker));
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

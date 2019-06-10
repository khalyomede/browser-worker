import { expect } from "chai";
import { CacheStrategy } from "../lib/main";

describe("CacheStrategy", () => {
	describe("getSupportedStrategies", () => {
		it("should return an array of supported strategies as string", () =>
			expect(CacheStrategy.getSupportedStrategies()).to.be.deep.equal(["network-first", "cache-first"]));
	});

	describe("constants", () => {
		it("should return network-first for the constant", () =>
			expect(CacheStrategy.NETWORK_FIRST).to.be.equal("network-first"));

		it("should return cache-first for the constant", () =>
			expect(CacheStrategy.CACHE_FIRST).to.be.equal("cache-first"));
	});
});

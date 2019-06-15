import { expect } from "chai";
import { Route } from "../lib/main";
import {
	imageTests,
	imageTestsWithExtensionsInCaps,
	videoTests,
	videoTestsWithExtensionsInCaps,
	audioTests,
	audioTestsWithExtensionsInCaps,
	assetTests,
	assetTestsWithExtensionsInCaps,
	fontTests,
	fontTestsWithExtensionInCaps,
	imageTestsWithQueryStrings,
	videoTestsWithQueryStrings,
	audioTestsWithQueryStrings,
	assetTestsWithQueryStrings,
	fontTestsWithQueryStrings
} from "./sample/Route";

describe("Route", () => {
	describe("images", () => {
		for (const imageTest of imageTests) {
			it(`should capture ${imageTest.name}`, () => expect(Route.IMAGES.test(imageTest.url)).to.be.true);
		}

		for (const imageTest of imageTestsWithExtensionsInCaps) {
			it(`should capture ${imageTest.name} even if the extension is in caps`, () =>
				expect(Route.IMAGES.test(imageTest.url)).to.be.true);
		}

		for (const imageTest of imageTestsWithQueryStrings) {
			it(`should capture ${imageTest.name} with query strings`, () =>
				expect(Route.IMAGES.test(imageTest.url)).to.be.true);
		}
	});

	describe("videos", () => {
		for (const videoTest of videoTests) {
			it(`should capture ${videoTest.name}`, () => expect(Route.VIDEOS.test(videoTest.url)).to.be.true);
		}

		for (const videoTest of videoTestsWithExtensionsInCaps) {
			it(`should capture ${videoTest.name} event if the extension is in caps`, () =>
				expect(Route.VIDEOS.test(videoTest.url)).to.be.true);
		}

		for (const videoTest of videoTestsWithQueryStrings) {
			it(`should capture ${videoTest.name} with query strings`, () =>
				expect(Route.VIDEOS.test(videoTest.url)).to.be.true);
		}
	});

	describe("audios", () => {
		for (const audioTest of audioTests) {
			it(`should capture ${audioTest.name}`, () => expect(Route.AUDIOS.test(audioTest.url)).to.be.true);
		}

		for (const audioTest of audioTestsWithExtensionsInCaps) {
			it(`should capture ${audioTest.name} event if the extension is in caps`, () =>
				expect(Route.AUDIOS.test(audioTest.url)).to.be.true);
		}

		for (const audioTest of audioTestsWithQueryStrings) {
			it(`should capture ${audioTest.name} with query strings`, () =>
				expect(Route.AUDIOS.test(audioTest.url)).to.be.true);
		}
	});

	describe("assets", () => {
		for (const assetTest of assetTests) {
			it(`should capture ${assetTest.name}`, () => expect(Route.ASSETS.test(assetTest.url)).to.be.true);
		}

		for (const assetTest of assetTestsWithExtensionsInCaps) {
			it(`should capture ${assetTest.name} event if the extension is in caps`, () =>
				expect(Route.ASSETS.test(assetTest.url)).to.be.true);
		}

		for (const assetTest of assetTestsWithQueryStrings) {
			it(`should capture ${assetTest.name} with query strings`, () =>
				expect(Route.ASSETS.test(assetTest.url)).to.be.true);
		}
	});

	describe("fonts", () => {
		for (const fontTest of fontTests) {
			it(`should capture ${fontTest.name}`, () => expect(Route.FONTS.test(fontTest.url)).to.be.true);
		}

		for (const fontTest of fontTestsWithExtensionInCaps) {
			it(`should capture ${fontTest.name} event if the extension is in caps`, () =>
				expect(Route.FONTS.test(fontTest.url)).to.be.true);
		}

		for (const fontTest of fontTestsWithQueryStrings) {
			it(`should capture ${fontTest.name} with query strings`, () => expect(Route.FONTS.test(fontTest.url)).to.be.true);
		}
	});

	describe("constructor", () => {
		it("should properly save the route on the property", () => expect(new Route("/").route).to.be.equal("/"));

		it("should properly save the regexp route on the property", () =>
			expect(new Route(Route.ASSETS).route).to.be.equal(Route.ASSETS));
	});

	describe("matches", () => {
		it("should return true if the url matches the route", () =>
			expect(new Route("/").matches("http://localhost:3000/")).to.be.true);

		it("should return false if the url does not match the route", () =>
			expect(new Route("/").matches("http://localhost:3000/contact")).to.be.false);

		it("should return true if the url matches the regexp route", () =>
			expect(new Route(Route.ASSETS).matches("http://localhost:3000/js/main.min.js")).to.be.true);

		it("should return false if the url does not match the regex route", () =>
			expect(new Route(Route.ASSETS).matches("http://localhost:3000/font/Simple-Line-Icons.ttf")));
	});

	describe("isFilled", () => {
		it("should return true if the route is a non empty string", () => expect(Route.isFilled("/")).to.be.true);

		it("should return true if the route is a non empty regular expression", () =>
			expect(Route.isFilled(Route.ASSETS)).to.be.true);

		it("should return false if the route is an empty string", () => expect(Route.isFilled("")).to.be.false);

		it("should return true if the route is an empty regular expression", () =>
			expect(Route.isFilled(new RegExp())).to.be.false);

		it("should return false if the route is neither string nor regular expression", () =>
			expect(Route.isFilled(42)).to.be.false);
	});

	describe("isValid", () => {
		it("should return true if the route is a string", () => expect(Route.isValid("/")).to.be.true);

		it("should return true if the route is a regular expression", () => expect(Route.isValid(Route.ASSETS)).to.be.true);

		it("should return false if the route is neither string nor regular expression", () =>
			expect(Route.isValid(42)).to.be.false);
	});
});

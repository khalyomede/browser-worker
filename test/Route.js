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
});

import { src, dest, watch, series, parallel } from "gulp";
import browserify from "gulp-bro";
import plumber from "gulp-plumber";
import clean from "gulp-clean";
import ifEnv from "gulp-if-env";
import rename from "gulp-rename";
import sha from "gulp-sha";
import babel from "gulp-babel";
import kebabCase from "just-kebab-case";
import npmCheck from "gulp-npm-check";

const lib = () =>
	src(["src/*.js", "!src/*.browser.js"])
		.pipe(plumber())
		.pipe(babel())
		.pipe(dest("lib"));

const check = done => {
	npmCheck(done);
};

const cleanLib = () =>
	src("lib", { allowEmpty: true })
		.pipe(plumber())
		.pipe(clean());

const cleanDist = () =>
	src("dist", { allowEmpty: true })
		.pipe(plumber())
		.pipe(clean());

const exampleMain = () =>
	src("example/js/main.js")
		.pipe(plumber())
		.pipe(
			browserify({
				transform: [
					[
						"babelify",
						{
							presets: ["@babel/preset-env"],
							plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-runtime"]
						}
					]
				]
			})
		)
		.pipe(
			rename({
				suffix: ".min"
			})
		)
		.pipe(dest("example/js"));
const exampleServiceWorker = () =>
	src("example/service-worker.js")
		.pipe(plumber())
		.pipe(
			browserify({
				transform: [
					[
						"babelify",
						{
							presets: ["@babel/preset-env"],
							plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-runtime"]
						}
					]
				]
			})
		)
		.pipe(
			rename({
				suffix: ".min"
			})
		)
		.pipe(dest("example"));

const dist = () =>
	src("src/*.browser.js")
		.pipe(plumber())
		.pipe(
			browserify({
				transform: ["babelify"]
			})
		)
		.pipe(rename(path => (path.basename = kebabCase(path.basename.replace(".browser", "")))))
		.pipe(dest("dist"));

const distMin = () =>
	src("src/*.browser.js")
		.pipe(plumber())
		.pipe(
			browserify({
				transform: ["babelify"],
				plugin: ["tinyify"]
			})
		)
		.pipe(
			rename(path => {
				path.basename = kebabCase(path.basename.replace(".browser", "")) + ".min";
			})
		)
		.pipe(dest("dist"));

const example = parallel(exampleMain, exampleServiceWorker);

const start = () => {
	watch(["src/**/*.js", "!src/**/*.browser.js"], lib);
};

const build = parallel(check, series(cleanLib, lib));

export { start, build, example, cleanDist, dist, distMin };

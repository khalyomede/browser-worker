import { src, dest, watch, series, parallel } from "gulp";
import browserify from "gulp-bro";
import plumber from "gulp-plumber";
import clean from "gulp-clean";
import ifEnv from "gulp-if-env";
import rename from "gulp-rename";
import sha from "gulp-sha";
import babel from "gulp-babel";

const lib = () =>
	src("src/*.js")
		.pipe(plumber())
		.pipe(babel())
		.pipe(dest("lib"));

const cleanLib = () =>
	src("lib", { allowEmpty: true })
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

const example = parallel(exampleMain, exampleServiceWorker);

const start = () => {
	watch("src/**/*.js", lib);
};

const build = parallel(series(cleanLib, lib));

export { start, build, example };

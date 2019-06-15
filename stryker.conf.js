module.exports = function(config) {
	config.set({
		mutator: "javascript",
		packageManager: "yarn",
		reporters: ["clear-text", "progress", "dashboard"],
		testRunner: "mocha",
		transpilers: ["babel"],
		testFramework: "mocha",
		coverageAnalysis: "off",
		babel: {
			optionsFile: ".babelrc"
		},
		mutate: ["lib/**/*.js"]
	});
};

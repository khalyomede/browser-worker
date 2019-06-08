const { writeFileSync } = require("fs");
const jsdoc = require("jsdoc-api");

const explainations = jsdoc
	.explainSync({
		files: [
			__dirname + "/../src/BrowserWorker.js",
			__dirname + "/../src/CacheStrategy.js",
			__dirname + "/../src/Route.js"
		]
	})
	.filter(
		explaination =>
			!explaination.undocumented &&
			explaination.kind !== "package" &&
			!explaination.name.startsWith("_") &&
			"since" in explaination &&
			"examples" in explaination &&
			"returns" in explaination &&
			"description" in explaination
	);

let markdown = `# Browser Worker\n\n## Summary\n\n- Methods\n`;

const methods = explainations
	.filter(explaination => explaination.kind === "function")
	.sort((a, b) => {
		if (a.name < b.name) return -1;
		if (a.name > b.name) return 1;
		return 0;
	});

for (const method of methods) {
	markdown += `  - [${method.longname}()](#${method.longname})\n`;
}

markdown += "\n";

/**
 * @todo grab constants here, add comment to undocumented methods
 */

for (const method of methods) {
	const methodName = `${method.longname}()`;
	const since = method.since;
	const description = method.description;
	const returns = method.returns.map(entry => entry.type.names.join(" | ")).join(" | ");
	const examples = method.examples.map(example => "```javascript\n" + example + "\n```").join("\n\n");

	markdown += `### ${methodName}\n\n${description}\n\n**since**: v${since}\n\n**returns** ${returns}\n\n**examples**\n\n${examples}\n\n`;
}

writeFileSync(__dirname + "/../api.md", markdown);

const { writeFileSync } = require("fs");
const jsdoc = require("jsdoc-api");
const sortBy = require("sort-by");

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
			("returns" in explaination || "type" in explaination) &&
			"description" in explaination
	);

let markdown = `# Browser Worker\n\n## Summary\n\n- Methods\n`;

const methods = explainations.filter(explaination => explaination.kind === "function").sort(sortBy("memberof", "name"));
const constants = explainations.filter(explaination => explaination.kind === "member").sort(sortBy("memberof", "name"));

for (const method of methods) {
	const name = method.longname;
	const link = name.replace(/(\.|\(|\))/, "").toLowerCase();

	markdown += `  - [${name}()](#${link})\n`;
}

markdown += "- Constants\n";

for (const constant of constants) {
	const name = constant.longname.replace("#", ".");
	const link = name.replace(/(\.|\(|\))/, "").toLowerCase();

	markdown += `  - [${name}](#${link})\n`;
}

markdown += "\n\n";

/**
 * @todo grab constants here, add comment to undocumented methods
 */

for (const method of methods) {
	const methodName = `${method.longname}()`;
	const since = method.since;
	const description = method.description;
	const returns = method.returns.map(entry => entry.type.names.join(" | ")).join(" | ");
	const examples = method.examples.map(example => "```javascript\n" + example + "\n```").join("\n\n");
	const parameters =
		method.params.length > 0
			? method.params.map(
					parameter => `- ${parameter.name} (${parameter.type.names.join("|")}): ${parameter.description}`
			  )
			: "No parameters.";

	markdown += `### ${methodName}\n\n${description}\n\n**since**: v${since}\n\n**parameters**\n\n${parameters}\n\n**returns** ${returns}\n\n**examples**\n\n${examples}\n\n`;
}

markdown += "\n\n";

for (const constant of constants) {
	const name = constant.longname.replace("#", ".");
	const since = constant.since;
	const description = constant.description;
	const types = constant.type.names.join(" | ");
	const examples = constant.examples.map(example => "```javascript\n" + example + "\n```").join("\n\n");

	markdown += `### ${name}\n\n${description}\n\n**since**: v${since}\n\n**type** ${types}\n\n**examples**\n\n${examples}\n\n`;
}

writeFileSync(__dirname + "/../api.md", markdown);

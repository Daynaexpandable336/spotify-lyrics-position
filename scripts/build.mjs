import { readFileSync } from "node:fs";
import * as esbuild from "esbuild";

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
// The release workflow passes the version entered on GitHub via this env var,
// since package.json no longer carries a version of its own.
const version = process.env.LYPOS_VERSION || pkg.version || "dev";

await esbuild.build({
	entryPoints: ["src/main.ts"],
	bundle: true,
	outfile: "dist/lyrics-position.js",
	format: "iife",
	loader: { ".css": "text" },
	banner: {
		js: [
			"// NAME: Lyrics Position",
			`// VERSION: ${version}`,
			"// AUTHOR: pineapple",
			"// DESCRIPTION: Show lyrics in a sidebar card, popup, or separate window. Hooks the official lyrics button.",
		].join("\n"),
	},
});

console.log(`built: dist/lyrics-position.js (v${version})`);

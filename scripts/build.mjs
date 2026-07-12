import { readFileSync } from "node:fs";
import * as esbuild from "esbuild";

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

await esbuild.build({
	entryPoints: ["src/main.ts"],
	bundle: true,
	outfile: "dist/lyrics-position.js",
	format: "iife",
	loader: { ".css": "text" },
	banner: {
		js: [
			"// NAME: Lyrics Position",
			`// VERSION: ${pkg.version}`,
			"// AUTHOR: pineapple",
			"// DESCRIPTION: Show lyrics in a sidebar card, popup, or separate window. Hooks the official lyrics button.",
		].join("\n"),
	},
});

console.log(`built: dist/lyrics-position.js (v${pkg.version})`);

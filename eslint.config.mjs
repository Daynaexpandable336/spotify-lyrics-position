import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{ ignores: ["dist/", "node_modules/"] },
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	prettier,
	{
		rules: {
			"no-empty": ["error", { allowEmptyCatch: true }],
			"@typescript-eslint/no-explicit-any": "off",
		},
	},
	{
		files: ["scripts/**"],
		languageOptions: {
			globals: { console: "readonly", process: "readonly", URL: "readonly" },
		},
	},
);

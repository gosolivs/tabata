module.exports = {
	preset: "@vue/cli-plugin-unit-jest/presets/typescript",

	transform: {
		"^.+\\.vue$": "vue-jest",
		"^.+\\.jsx?$": require.resolve("ts-jest"),
	},

	testMatch: [
		"**/tests/unit/**/*.spec.js",
		"**/__tests__/*.spec.js",
		"**/*.spec.js",
	],

	testURL: "http://localhost/",
};

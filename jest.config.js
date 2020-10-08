module.exports = {
	preset: "@vue/cli-plugin-unit-jest/presets/typescript",

	transform: {
		"^.+\\.vue$": "vue-jest",
		"^.+\\.jsx?$": require.resolve("ts-jest"),
	},

	testMatch: ["**/*.spec.(ts|js)"],

	testURL: "http://localhost/",
};

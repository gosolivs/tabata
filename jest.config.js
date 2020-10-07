module.exports = {
	preset: "@vue/cli-plugin-unit-jest/presets/typescript",

	transform: {
		"^.+\\.vue$": "vue-jest",
		"^.+\\.jsx?$": require.resolve("ts-jest"),
	},

	// moduleFileExtensions: ["js", "json", "vue"],
	// collectCoverage: true,
	//
	// transform: {
	// 	"^.+\\.vue$": "jest-vue-preprocessor",
	// 	".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
	// 		"jest-transform-stub",
	// 	"^.+\\.js$": "babel-jest",
	// },
	//
	// moduleNameMapper: {
	// 	"^@/(.*)$": "<rootDir>/src/$1",
	// },
	//
	// snapshotSerializers: ["jest-serializer-vue"],

	testMatch: [
		"**/tests/unit/**/*.spec.js",
		"**/__tests__/*.spec.js",
		"**/*.spec.js",
	],

	testURL: "http://localhost/",
};

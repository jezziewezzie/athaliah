module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		'xo',
		'prettier',
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'prettier',
	],
	rules: {
	},
};

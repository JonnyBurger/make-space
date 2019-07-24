module.exports = {
	parserOptions: {
		ecmaVersion: 2017,
		ecmaFeatures: {
			arrowFunctions: true
		},
		sourceType: 'module'
	},
	settings: {
		react: {
			pragma: 'h'
		}
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	rules: {
		'react/prop-types': 0,
		'no-console': 0,
		'react/no-deprecated': 0
	},
	env: {
		es6: true,
		node: true
	},
	overrides: [
		{
			files: ['website/*'],
			settings: {
				react: {
					pragma: 'React'
				}
			}
		}
	],
	globals: {
		$: true,
		document: true
	}
};

module.exports = {
	globals: {
		'ts-jest': {
			tsConfig: './src/tsconfig.spec.json',
			stringifyContentPathRegex: '\\.html$',
			astTransformers: [
				"jest-preset-angular/build/InlineFilesTransformer",
				"jest-preset-angular/build/StripStylesTransformer"
			]
		}
	},
	setupFilesAfterEnv: [
		'<rootDir>/node_modules/@angular-builders/jest/dist/jest-config/setup.js'
	],
	transform: {
		'^.+\\.(ts|js|html)$': 'ts-jest'
	},
	testMatch: [
		'**/__tests__/**/*.+(ts|js)?(x)',
		'**/+(*.)+(spec|test).+(ts|js)?(x)'
	],
	testEnvironment: 'jest-environment-jsdom-thirteen',
	moduleNameMapper: {
		'@core/(.*)': '<rootDir>/src/app/core/$1',
		'@shared/(.*)': '<rootDir>/src/app/shared/$1'
	},
	transformIgnorePatterns: ['node_modules/(?!@ngrx)'],
	collectCoverageFrom: [
		'src/app/**/*.ts',
		'!src/app/**/*.module.ts',
		'!src/app/**/*.compose.ts',
		'!src/app/fragmentTypes.ts'
	],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/', 'src/app/*.{js}'],
	snapshotSerializers: [
		'jest-preset-angular/build/AngularSnapshotSerializer.js',
		'jest-preset-angular/build/HTMLCommentSerializer.js'
	]
};
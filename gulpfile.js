const {dest, src, watch, series} = require('gulp');
const gulpEsbuild = require('gulp-esbuild');
const prettier = require('gulp-prettier');
const prettiercfg = require('./.prettierrc');
const filesForPrettier = ['test/*.js', '*.js', '.*.js', '!*.min.js'];

/**
 * format code using prettier
 */
exports.prettierCheck = function () {
	return (
		src(filesForPrettier)
			//.pipe(debug())
			.pipe(prettier.check(prettiercfg))
			.pipe(dest(file => file.base))
	);
};

/**
 * format code using prettier
 */
exports.prettier = function () {
	return src(filesForPrettier)
		.pipe(prettier(prettiercfg))
		.pipe(dest(file => file.base));
};

/**
 * Esbuild minify + bundle css and js files
 */
exports.bundle = function () {
	return src('./uts46.js')
		.pipe(
			gulpEsbuild({
				outfile: 'uts46bundle.min.js',
				bundle: true,
				minify: true,
				format: 'iife',
				platform: 'browser',
				globalName: 'ispapiIdnconverter',
				sourcemap: true,
				target: 'es2015',
				resolveExtensions: ['.js'],
				allowOverwrite: true,
			}),
		)
		.pipe(dest('.'));
};

/**
 * watch for any changes, minify + bundle + concatinate
 */

exports.watcher = function () {
	watch('./uts46.js', series(exports.prettier, exports.bundle));
};

const {dest, src, watch, series} = require('gulp');
const gulpEsbuild = require('gulp-esbuild');
const rename = require('gulp-rename');
const terser = require('gulp-terser');
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
exports.prettier = function prettify() {
	return src(filesForPrettier)
		.pipe(prettier(prettiercfg))
		.pipe(dest(file => file.base));
};

/**
 * Esbuild minify + bundle css and js files
 */
exports.bundle = function bundle() {
	return src('./uts46.min.js')
		.pipe(
			gulpEsbuild({
				outfile: 'uts46bundle.min.js',
				bundle: true,
				minify: true,
				format: 'iife',
				platform: 'browser',
				globalName: 'ispapiIdnconverter',
				sourcemap: true,
				target: 'es2015', // ES6
				resolveExtensions: ['.js'],
				allowOverwrite: true,
			}),
		)
		.pipe(dest('.'));
};

exports.minify = function minify() {
	return src(['./idna-map.js', './uts46.js'])
		.pipe(
			terser({
				ecma: 2015,
				compress: true,
				mangle: true,
			}),
		)
		.pipe(
			rename(function (path) {
				path.basename += '.min';
			}),
		)
		.pipe(dest('.'));
};

/**
 * watch for any changes, minify + bundle + concatenate
 */
exports.watcher = function () {
	watch('./uts46.js', series(exports.prettier, exports.minify, exports.bundle));
};

exports.build = series(exports.minify, exports.bundle);

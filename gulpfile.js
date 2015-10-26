'use strict';

let gulp = require('gulp');
let eslint = require('gulp-eslint');
let mocha = require('gulp-mocha');

gulp.task('lint', () => {
	gulp.src('./api/**/*.js')
		.pipe(eslint({
			useEslintrc: true
		}))
		.pipe(eslint.format());
});

gulp.task('tests',() => {
	gulp.src('./tests/**/*.js')
		.pipe(mocha({reporter: 'spec'}));
});

gulp.task('default', ['lint','tests'], () => {
	gulp.watch('./api/**/*.js',['lint','tests']);
	gulp.watch('./tests/**/*.js',['tests']);
});
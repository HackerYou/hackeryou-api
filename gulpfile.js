'use strict';

let gulp = require('gulp');
let eslint = require('gulp-eslint');
let mocha = require('gulp-mocha');
let notify = require('gulp-notify');

gulp.task('lint', () => {
	gulp.src('./api/**/*.js')
		.pipe(eslint({
			useEslintrc: true
		}))
		.pipe(eslint.format());
});

gulp.task('tests',() => {
	gulp.src('./tests/**/*.js')
		.pipe(mocha({reporter: 'spec'}))
		.on('error', (err) => {
			notify(err.message);
		});
});

gulp.task('default', ['lint','tests'], () => {
	gulp.watch('./api/**/*.js',['lint','tests']);
	gulp.watch('./tests/**/*.js',['tests']);
});
"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // run a local dev server
var open = require('gulp-open'); // open a url in web browser

var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		dist: './dist'
	}
};

//start a local development server
gulp.task('connect', function () {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], function () {
	gulp.src('dist/index.html')
		.pipe(open({url: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function () {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(config.paths.html, ['html']);
});

gulp.task('default', ['html', 'open', 'watch']);
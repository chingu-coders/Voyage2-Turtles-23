'use strict'
var gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	rigger = require('gulp-rigger'),
	webpack = require('webpack'),
	uglify = require('gulp-uglify'),
	mincss = require('gulp-minify-css'),
	del = require('del');

var path = {
	src: {
		fonts: 'src/assets/fonts',
		images: 'src/assets/images'
		icons: 'src/assets/imahes',
		html: 'src/html.index.html',
		style: 'src/sass/styles.scss',
		js: 'src/js/app.js',
	},
	build: {
		fonts: '',
		images: '',
		icons: '',
		html: '',
		style: '',
		js: ''
	},
	watch: {
		html: '',
		style: '',
		js: ''
	},
	clean: ''
};

var isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('html', function(callback) {
	gulp.src(path.src.html)
	.pipe(rigger())
	.pipe(gulp.dest(path.build.html));

});

gulp.task('styles', function(callback) {
	gulp.src(path.src.style)
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(prefixer())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(path.build.style))
});

gulp.task('scripts', function(callback) {

});

gulp.task('icons', function(callback) {

});

gulp.task('fonts', function(callback) {

});

gulp.task('images', function() {

});

gulp.task('clear', function(callback) {
	
});

gulp.task('assets', function(callback) {

});


gulp.task('watch', function(callback) {

});

gulp.task('build', function(callback) {

});

gulp.task('dev', function(callback) {

});

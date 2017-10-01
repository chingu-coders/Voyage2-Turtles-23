'use strict'
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    prefixer = require('gulp-autoprefixer'),
    rigger = require('gulp-rigger'),
    webpack = require('webpack'),
    uglify = require('gulp-uglify'),
    mincss = require('gulp-minify-css'),
    del = require('del');

var path = {
    src: {
        fonts: 'src/assets/fonts/**/*.*',
        images: 'src/assets/images/**/*.*',
        icons: 'src/assets/icons/*.*',
        html: 'src/html/nexttab.html',
        style: 'src/sass/styles.scss',
        js: 'src/js/app.js',
        manifest: 'src/manifest.json'
    },
    build: {
        fonts: 'next-tab/fonts/',
        images: 'next-tab/images/',
        icons: 'next-tab/',
        html: 'next-tab/',
        style: 'next-tab/',
        js: 'next-tab/app.bundle.js',
        manifest: 'next-tab/'
    },
    watch: {
        html: 'src/html/**/*.*',
        style: 'src/sass/**/*.*',
        js: 'src/js/**/*.*',
        assets: 'src/assets/**/*.*'
    },
    clean: 'next-tab/*'
};

var isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('html', function(callback) {
    return gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html));

});

gulp.task('styles', function(callback) {
    return gulp.src(path.src.style)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.style));
});

gulp.task('scripts', function(callback) {
    return gulp.src(path.src.js)
    .pipe(gulp.dest(path.build.js));
});

gulp.task('icons', function(callback) {
    return gulp.src(path.src.icons)
    .pipe(gulp.dest(path.build.icons));
});

gulp.task('fonts', function(callback) {
    return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts));
});

gulp.task('images', function() {
    return gulp.src(path.src.images)
    .pipe(gulp.dest(path.build.images));
});

gulp.task('manifest', function() {
    return gulp.src(path.src.manifest)
    .pipe(gulp.dest(path.build.manifest))
});

gulp.task('clear', function(callback) {
    return del(path.clean);
});

gulp.task('assets', gulp.parallel('manifest', 'icons', 'fonts', 'images'));

gulp.task('watch', function() {
    gulp.watch(path.watch.html, gulp.series('html'));
    gulp.watch(path.watch.styles, gulp.series('styles'));
    gulp.watch(path.watch.js, gulp.series('scripts'));
    gulp.watch(path.watch.assets, gulp.series('assets'));
});

gulp.task('build', gulp.series('clear', gulp.parallel('html', 'styles', 'assets')));

gulp.task('dev', gulp.series('build', 'watch'));

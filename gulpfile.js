'use strict'
const gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    prefixer = require('gulp-autoprefixer'),
    rigger = require('gulp-rigger'),
    webpack = require('webpack'),
    uglify = require('gulp-uglify'),
    mincss = require('gulp-minify-css'),
    del = require('del'),
    notify = require('gulp-notify'),
    combine = require('stream-combiner2').obj,
    ospath = require('path'),
    notifier = require('node-notifier'),
    gulplog = require('gulp-log');

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
        js: {
            filename: 'app.bundle.js',
            path: ospath.resolve(__dirname,'next-tab')
        
        },
        manifest: 'next-tab/'
    },
    watch: {
        html: 'src/html/**/*.*',
        styles: 'src/sass/**/*.*',
        js: 'src/js/**/*.*',
        assets: 'src/assets/**/*.*'
    },
    clean: 'next-tab/*'
};

var isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('html', function(callback) {
    return combine(
        gulp.src(path.src.html),
        rigger(),
        gulp.dest(path.build.html))
    .on('error', notify.onError());

});

gulp.task('styles', function(callback) {
    return combine(
        gulp.src(path.src.style),
        sourcemaps.init(),
        sass(),
        prefixer(),
        sourcemaps.write(),
        gulp.dest(path.build.style))
        .on('error', notify.onError(function(error) {
            return {
                title: 'Styles Error',
                message: error.message
            };
        }));
});

gulp.task('scripts', function(callback) {
    const options = {
        entry: './' + path.src.js,
        output: {
            filename: path.build.js.filename,
            path: path.build.js.path
        },
        watch: isDev,
        devtool: isDev ? 'source-map': null,
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                }
            ]
        },
        plugins: [
            new webpack.NoErrorsPlugin()
        ]
    };

    if(!isDev) {
        options.plugin.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warning: false,
                    unsafe: true
                }
            })
        )
    }
    webpack(options, function(error, stats) {
        if (!error) { // no hard error
            //try to get a soft error
            error = stats.toJson().errors[0];
        }

        if (error) {
            notifier.notify({
                title: 'Webpack',
                message: error
            });
            //gulplog.error(error);
        } else {
            //gulplog.info(stats.toString({colors: true}));
        }

        if(!options.watch && error) {
            callback(error);
        } else {
            callback()
        }
    });
});

gulp.task('icons', function(callback) {
    return gulp.src(path.src.icons, {since: gulp.lastRun('icons')})
    .pipe(gulp.dest(path.build.icons));
});

gulp.task('fonts', function(callback) {
    return gulp.src(path.src.fonts, {since: gulp.lastRun('fonts')})
    .pipe(gulp.dest(path.build.fonts));
});

gulp.task('images', function() {
    return gulp.src(path.src.images, {since: gulp.lastRun('images')})
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

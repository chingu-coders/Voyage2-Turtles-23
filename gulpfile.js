'use strict'
const gulp = require('gulp'),
    watch = require('gulp-watch'),
    //styles
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    prefixer = require('gulp-autoprefixer'),
    mincss = require('gulp-minify-css'),
    // html
    rigger = require('gulp-rigger'),
    // scripts
    webpack = require('webpack'),
    uglify = require('gulp-uglify'),
    eslint = require('gulp-eslint'),
    // chrome build extensions
    manifest = require('gulp-chrome-manifest'),
    bump = require('gulp-bump'),
    zip = require('gulp-zip'),
    // clear
    del = require('del'),
    // loggers and notifiers
    notify = require('gulp-notify'),
    notifier = require('node-notifier'),
    gulplog = require('gulplog'),
    //accessory
    ospath = require('path'),
    combine = require('stream-combiner2').obj,
    gulpIf = require('gulp-if');

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
    lint: {
        js: 'src/js/**/*.js'
    },
    watch: {
        html: 'src/html/**/*.*',
        styles: 'src/sass/**/*.[scss,css]',
        js: 'src/js/**/*.js',
        assets: 'src/assets/**/*.*'
    },
    package: 'next-tab/**',
    clean: 'next-tab/*'
};

//for production use NODE_ENV=production gulp <task>
var isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

/* compile html from partial */
gulp.task('html', function(callback) {
    return combine( // make container
        gulp.src(path.src.html), // find html
        rigger(), // apply includes !!! add file before included !!!, it may crush task
        gulp.dest(path.build.html)) // put to ext folder
    .on('error', notify.onError()); // show message if error
});

/* Compile CSS from SCSS */
gulp.task('styles', function(callback) {
    return combine(
        gulp.src(path.src.style),
        gulpIf(isDev, sourcemaps.init()), // start sourcemap if development
        sass(), // start sass preprocessor
        prefixer(), // add browser prefixes
        gulpIf(isDev, sourcemaps.write(), mincss()), // write sourcemap if development, or minify file
        gulp.dest(path.build.style))
        .on('error', notify.onError(function(error) {
            return {
                title: 'Styles Error',
                message: error.message
            };
        }));
});

/* make script bundle */
gulp.task('scripts', function(callback) {
    const options = {
        entry: './' + path.src.js,
        output: {
            filename: path.build.js.filename,
            path: path.build.js.path
        },
        watch: isDev,
        devtool: isDev ? 'source-map': false,
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                }
            ]
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin()
        ]
    };

    if(!isDev) {
        options.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
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
            gulplog.error(error);
        } else {
            gulplog.info(stats.toString({colors: true}));
        }

        if(!options.watch && error) {
            callback(error);
        } else {
            callback()
        }
    });
});

/* Check syntax errors */
gulp.task('lint:js', function() {
    return gulp.src(path.lint.js)
        .pipe(eslint())
        .pipe(eslint.format());
});

/* Copy icons */
gulp.task('icons', function(callback) {
    return gulp.src(path.src.icons, {since: gulp.lastRun('icons')})
    .pipe(gulp.dest(path.build.icons));
});

/* Copy fonts */
gulp.task('fonts', function(callback) {
    return gulp.src(path.src.fonts, {since: gulp.lastRun('fonts')})
    .pipe(gulp.dest(path.build.fonts));
});

/* Copy images */
gulp.task('images', function() {
    return gulp.src(path.src.images, {since: gulp.lastRun('images')})
    .pipe(gulp.dest(path.build.images));
});

/* copy manifest.json */
gulp.task('manifest', function() {
    return gulp.src(path.src.manifest)
    .pipe(gulp.dest(path.build.manifest))
});

/* Should increment version but do not work for me */ 
gulp.task('ext:manifest', function() {
    return gulp.src(path.src.manifest)
        .pipe(manifest({
            buildnumber: true
        }))
        .pipe(gulp.dest(path.build.manifest))
});

/* Increment patch number in semver for package.json and manifest.json */
gulp.task('patch', function(){
    return gulp.src(['./package.json', './' + path.src.manifest])
      .pipe(bump())
      .pipe(gulpIf('manifest.json', gulp.dest('src'), gulp.dest('./')));
});
/* Make ZIP archive */
gulp.task('package', function () {
      let manifest = require('./' + path.build.manifest + 'manifest.json');
      return gulp.src(path.package)
          .pipe(zip(manifest.name + '_' + manifest.version + '.zip'))
          .pipe(gulp.dest('package'));
});

/* For production only! build Extension */
gulp.task('ext:build', function(done) {
    if(!isDev) {
        return gulp.series('patch', 'build', 'package')(done);
    } else {
        notifier.notify({
            message: "Not production ENV"
        });
        done(new Error("Development env"));
    }
});
/* clean dist folder */
gulp.task('clear', function(callback) {
    return del(path.clean);
});
/* Run copy tasks */
gulp.task('assets', gulp.parallel('manifest', 'icons', 'fonts', 'images'));

gulp.task('watch', function() {
    gulp.watch(path.watch.html, gulp.series('html'));
    gulp.watch(path.watch.styles, gulp.series('styles'));
    gulp.watch(path.watch.js, gulp.series('lint:js','scripts'));
    gulp.watch(path.watch.assets, gulp.series('assets'));
});

gulp.task('build', gulp.series('clear', gulp.parallel('html', 'styles', 'scripts', 'assets')));

gulp.task('dev', gulp.series('build', 'watch'));

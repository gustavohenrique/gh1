'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var babelify = require('babelify');


gulp.task('styles', function() {
    return gulp.src('app/styles/*.css')
        .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
        .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('compile-scripts', function() {
    var b = browserify('app/scripts/index.jsx', {
        debug: false,
        transform: ['babelify', 'reactify'],
        presets: ['es2015', 'react']
    });
    // b.external('react');
    // b.external('react-dom');
    return b.bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('.tmp'));
});

gulp.task('copy-html', function() {
    return gulp.src('app/*.html').pipe(gulp.dest('.tmp'));
});

gulp.task('pre-build', ['compile-scripts', 'copy-html', 'styles'], function() {
    var assets = $.useref({ searchPath: ['.tmp', '.'] });
    return gulp.src(['.tmp/*.html', '.tmp/*.js'])
        .pipe(assets)
        .pipe($.if('*.css', $.csso()))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.useref())
        .pipe($.if('*.html', $.minifyHtml({
            conditionals: true,
            loose: true
        })))
        .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function () {
    return gulp.src('node_modules/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('build', ['fonts', 'pre-build', 'images'], function() {
    return gulp.src('dist/**/*').pipe($.size({
        title: 'build',
        gzip: true
    }));
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*')
        .pipe($.if($.if.isFile, $.cache($.imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{cleanupIDs: false}]
        }))
        .on('error', function (err) {
            console.log(err);
            this.end();
        })))
        .pipe(gulp.dest('dist/images'));
});


// gulp.task('webdriver', $.protractor.webdriver_standalone);

// gulp.task('e2e', function() {
//     gulp.src(['./tests/e2e/*.js'])
//         .pipe($.protractor.protractor({
//             configFile: 'tests/protractor.conf.js',
//             args: ['--baseUrl', 'http://127.0.0.1:8000'],
//             debug: false
//         }))
//         .on('error', function(e) {
//             throw e
//         })
// });

gulp.task('connect', ['styles'], function() {
    var serveStatic = require('serve-static');
    var serveIndex = require('serve-index');
    var app = require('connect')()
        .use(require('connect-livereload')({
            port: 35729
        }))
        .use(serveStatic('.tmp'))
        .use(serveStatic('app'))
        .use(serveIndex('app'))
        .use('/node_modules', serveStatic('node_modules'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function() {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('serve', ['compile-scripts', 'connect', 'watch'], function() {
    //require('opn')('http://localhost:9000');
});

gulp.task('watch', ['connect'], function() {
    $.livereload.listen();
    gulp.watch([
        'app/*.html',
        '.tmp/styles/**/*.css',
        '.tmp/main.js'
    ]).on('change', $.livereload.changed);

    gulp.watch('app/styles/**/*.css', ['styles']);
    gulp.watch([
        'app/scripts/**/*.js',
        'app/scripts/**/*.jsx'
    ], [
        'compile-scripts'
    ]);
});

gulp.task('default', function() {
    gulp.start('build');
});

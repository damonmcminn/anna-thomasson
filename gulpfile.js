'use strict';

const gulp = require('gulp');
const connect = require('gulp-connect');
const livereload = require('gulp-livereload');
const jade = require('gulp-jade');
const minifyCSS = require('gulp-minify-css');
const sass = require('gulp-sass');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');

gulp.task('webserver', () => {
  connect.server({
    root: 'dist',
    livereload: true,
  });
});

gulp.task('js', () => {
  return browserify('./src/js/app.js')
    .transform('babelify', { presets: ['es2015']})
    .bundle()
    .pipe(source('annat.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('html', () => {
  return gulp.src('src/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('sass', () => {
  return gulp.src('src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/style'))
    .pipe(livereload());
});

gulp.task('watch', () => {
  livereload.listen();
  gulp.watch('src/**/*.jade', ['html']);
  gulp.watch('src/js/*.js', ['js']).on('changed', livereload.changed);
  gulp.watch('src/styles/*.scss', ['sass']).on('changed', livereload.changed);
});

const buildTasks = ['html', 'sass', 'js'];

gulp.task('default', ['webserver', 'watch', ...buildTasks]);

gulp.task('build', buildTasks);

'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var jade = require('gulp-jade');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');

gulp.task('webserver', function() {
  connect.server({
    root: 'dist',
    livereload: true,
  });
});

gulp.task('html', function() {
  return gulp.src('src/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('sass', function () {
  gulp.src('src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/style'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/**/*.jade', ['html']);
  gulp.watch('src/styles/*.scss', ['sass']).on('changed', livereload.changed);
});

gulp.task('default', ['webserver', 'watch', 'html', 'sass']);

gulp.task('build', ['html', 'sass']);

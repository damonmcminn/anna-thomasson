var gulp = require('gulp');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var jade = require('gulp-jade');
var minifyCSS = require('gulp-minify-css');

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

gulp.task('css', function() {
  return gulp.src('src/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/style'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/*.jade', ['html']);
  gulp.watch('src/css/*.css', ['css']);
});

gulp.task('default', ['webserver', 'watch', 'html', 'css']);

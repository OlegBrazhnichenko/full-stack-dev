
var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var gulp_watch_jade = require('gulp-watch-jade');
var prettify = require('gulp-prettify');

gulp.task('watch_scss', function(){
  gulp.src('../sass/**/*.scss')
    .pipe(watch('../sass/**/*.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('../css'));
});

gulp.task('watch_jade', function () {
  gulp.src('../**/*.jade')
    .pipe(watch('../**/*.jade'))
    .pipe(gulp_watch_jade('../**/*.jade', { delay: 100 }))
    .pipe(jade())
    .pipe(prettify({
      unformatted: []
    }))
    .pipe(gulp.dest('../'));
});

gulp.task('watch', ['watch_jade','watch_scss']);

gulp.task('default', ['watch']);

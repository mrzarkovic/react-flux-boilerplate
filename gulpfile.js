const gulp = require('gulp');
const browerify = require('browserify');
const reactify = require('reactify');
const source = require('vinyl-source-stream');

gulp.task('browserify', function() {
    browerify('./src/js/main.js')
        .transform('reactify')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function() {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('dist'));
    gulp.src('./src/css/*.*')
        .pipe(gulp.dest('dist/css'));
    gulp.src('./src/images/*.*')
        .pipe(gulp.dest('dist/images'));
    gulp.src('./src/js/vendors/*.*')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['browserify', 'copy'], function() {
    return gulp.watch('./src/**/*.*', ['browserify', 'copy']);
});
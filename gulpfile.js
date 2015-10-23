/* jshint unused: true */

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    runSequence = require('run-sequence'),
    templateCache = require('gulp-angular-templatecache'),
    postcss = require('gulp-postcss');

gulp.task('default', function() {
    return runSequence('sass', 'templates');
});

gulp.task('sass', function() {
    return gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(postcss([require('autoprefixer')]))
        .pipe(gulp.dest('./css'));
});

gulp.task('templates', function() {
    return gulp.src('./example/*.html')
        .pipe(templateCache('templates.js', {
            root: 'example/',
            module: 'ExampleApp'
        }))
        .pipe(gulp.dest('./example'));
});

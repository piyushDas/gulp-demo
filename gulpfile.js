// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var del = require('del');

gulp.task('default', function() {
  // place code for default task here
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/custom/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify({ message: 'Linting task complete' }));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({ message: 'Sass task complete' }));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/custom/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('vendors', function() {
    return gulp.src('js/lib/*.js')
        .pipe(concat('vendor_all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('vendor_all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'Vendors task complete' }));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Clean Task
gulp.task('clean', function() {
  return del(['dist/css', 'dist/js', 'dist/images', 'dist']);
});

// Default Task
gulp.task('default', ['watch']);

// Build task
gulp.task('build', ['clean', 'lint', 'sass', 'scripts', 'vendors'], function(){
  //  return notify({message:'GULP Build completed'});
});

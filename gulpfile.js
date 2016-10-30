var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var pixrem = require('pixrem');

gulp.task('css', function(){
  var processors = [
    autoprefixer({browsers: 'last 2 versions', remove: false})/*,
    pixrem()*/
  ];
  return gulp.src('./build/assets/css/**/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./build/assets/css'));
});

gulp.task('copy', function () {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./build'));
    gulp.src('./src/images/**/*.*')
        .pipe(gulp.dest('./build/assets/images'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./build"
    });

    gulp.watch("src/scss/**/*.scss", ['sass']);
    gulp.watch("src/*.html", ['copy']).on('change', browserSync.reload);
});

gulp.task('sass', function() {
  var processors = [
    autoprefixer({browsers: 'last 2 versions', remove: false}),
    pixrem()
  ];

  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./build/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['copy','serve']);

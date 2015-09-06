var autoprefixer = require('gulp-autoprefixer');
var bower = require('gulp-bower');
var bowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var debug = require('gulp-debug');
var del = require('del');
var es = require('event-stream');
var gulp = require('gulp');
var inject = require('gulp-inject');
var livereload = require('gulp-livereload');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

var appStream = gulp.src(['./static/css/*.css', './static/js/**/*.js', '!./static/js/test/*']);
var bowerStream = gulp.src(bowerFiles(), {read: false});
var indexHTML = gulp.src('./templates/index.html');

gulp.task('bower', function(){
  return bower()
    .pipe(gulp.dest('static/components'));
});

gulp.task('styles', function(){
  gulp.src('static/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('static/css/'))
    .pipe(livereload());
});

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('static/sass/**/*.sass', ['styles']);
});

gulp.task('build-dev',['bower', 'styles'], function(){
  indexHTML
	.pipe(inject(es.merge(bowerStream, appStream)))
	.pipe(gulp.dest('./templates'));
});

gulp.task('build-release', ['build-dev'], function(){
  del('./static/dist');
  var bowerJsStream = gulp.src(bowerFiles('**/*.js'))
	.pipe(uglify())
    .pipe(concat('libs.min.js'))
    .pipe(gulp.dest('./static/dist/js/'));

  var bowerCssStream = gulp.src(bowerFiles('**/*.css'))
    .pipe(minifyCss())
    .pipe(concat('libs.min.css'))
    .pipe(gulp.dest('./static/dist/css/'));

  var appCssStream = gulp.src('./static/css/*.css')
    .pipe(minifyCss())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('./static/dist/css/'));

  var appJsStream = gulp.src(['./static/js/**/*.js', '!./static/js/test/**/*.js'])
	.pipe(uglify())
	.pipe(concat('app.min.js'))
	.pipe(gulp.dest('./static/dist/js'));
	indexHTML
      .pipe(inject(es.merge(bowerJsStream, appJsStream, bowerCssStream, appCssStream)))
      .pipe(gulp.dest('./templates'));
});

gulp.task('default', ['build-dev', 'styles', 'watch'], function(){
   // Perform bower and styles then watch server
});

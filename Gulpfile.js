var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var bower = require('gulp-bower');
var bowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var livereload = require('gulp-livereload');
var es = require('event-stream');

gulp.task('styles', function(){
    gulp.src('static/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('static/css/'))
		.pipe(livereload());
});
gulp.task('bower', function(){
	return bower()
		.pipe(gulp.dest('static/components'))
});

gulp.task('watch', function(){
	livereload.listen();
    gulp.watch('static/sass/**/*.sass', ['styles']);
});
gulp.task('bdev', ['bower', 'styles'], function(){
    var target = gulp.src('./templates/index.html');
    var custom = gulp.src(['./static/css/*.css', './static/js/**/*.js', '!./static/js/test/*'], {read: false});
    var bowerfiles = gulp.src(bowerFiles(), {read: false});
    return target.pipe(inject(bowerfiles, {name: 'bower'})).
		pipe(inject(es.merge(custom), {name: 'custom'})).
		pipe(gulp.dest('./templates'));
});
gulp.task('default', ['bdev', 'styles', 'watch'], function(){
   // Perform bower and styles then watch server 
});

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var bower = require('gulp-bower');

gulp.task('styles', function(){
    gulp.src('static/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('static/css/'));
});
gulp.task('bower', function(){
	return bower()
		.pipe(gulp.dest('static/components'))
});

gulp.task('watch', function(){
    gulp.watch('static/sass/**/*.sass', ['styles']);
});

gulp.task('default', ['bower', 'styles', 'watch'], function(){
   // Perform bower and styles then watch server 
});

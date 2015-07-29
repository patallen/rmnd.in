var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function(){
    gulp.src('static/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('static/css/'));
});

gulp.task('watch', function(){
    gulp.watch('static/sass/**/*.sass', ['styles']);
});

gulp.task('default', ['watch'], function(){
    
});
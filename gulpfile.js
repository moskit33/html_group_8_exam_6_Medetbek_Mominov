var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var pug = require('gulp-pug');
var data = require('gulp-data');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var csscomb = require('gulp-csscomb');
var prettify = require('gulp-html-prettify');

gulp.task('styles', function(){
	gulp.src('app/sass/style.sass')
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(prefix())
		.pipe(csscomb())
		.pipe(gulp.dest('app/css/'))
});

gulp.task('views', function(){
	gulp.src('app/templates/*.pug')
		.pipe(data(function(file){
			return require('./app/templates/data/data.json')
		}))
		.pipe(pug())
		.pipe(prettify())
		.pipe(gulp.dest('app/'))
});

gulp.task('compress', function(){
	gulp.src(['app/js/**/*.js', '!app/js/*min.js'])
		.pipe(uglify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest('app/js/'))
});

gulp.task('watch', function(){
	gulp.watch('app/sass/**/*.sass', ['styles']);
	gulp.watch('app/templates/**/*.pug', ['views']);
	gulp.watch('app/js/**/*.js', ['compress']);
});



gulp.task('default', ['styles', 'views', 'watch', 'compress']);
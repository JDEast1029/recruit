
const path = require('path');
const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const gutil = require('gulp-util');
const combiner = require('stream-combiner2');
const runSequence = require('run-sequence');
const colors = require('colors');
 
// 指定要编译的目录
const handleError = function(err) {
	console.log('\n');
	gutil.log(colors.red('Error!'));
	gutil.log('fileName: ' + colors.red(err.fileName));
	gutil.log('lineNumber: ' + colors.red(err.lineNumber));
	gutil.log('message: ' + err.message);
	gutil.log('plugin: ' + colors.yellow(err.plugin));
};

gulp.task('clean', () => {
	return del(['../code/scss/**'], { force: true });
});

gulp.task('sass:dev', () => {
	runSequence(
		"sass",
		'watch'
	);
})

gulp.task('sass', ['clean'], () => {
	let combined = combiner.obj([
		gulp.src(['./scss/**/*.scss']),
		sass().on('error', sass.logError),
		autoprefixer([
			'iOS >= 8',
			'Android >= 4.1'
		]),
		rename((path) => path.extname = '.css'),
		gulp.dest('../code/scss/')
	]);

	combined.on('error', handleError);
});

gulp.task('watch', () => {
	 gulp.watch('./scss/**/*.scss', ['sass']);
});
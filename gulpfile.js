var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var gjslint = require('gulp-gjslint');
var notify = require('gulp-notify');
var exec = require('child_process').exec;
const modulesPath = path.join(__dirname, 'node_modules');

const gulpHelper =
    require(path.join(modulesPath, '/clobl/gulp-helper.js'))
        .use(gulp)
        .setPath({
            root: __dirname,
            blocks: path.join(__dirname, '/app/blocks')
        })
        .setSoyPath({
            root: 'build'
        });

var errorHandler = function (error) {
  notify.onError({
    message:  "Error: <%= error.message %>",
  })(error);
}


gulp.task('gjslint', function(){
	return gulp.src(path.join(__dirname, '/app/blocks/js/*.js'))
	.pipe(gjslint())
	.pipe(gjslint.reporter('console'));
	
});

gulp.task('sass', function(){
  return gulp.src(path.join(__dirname, '/app/blocks/**/*.scss'))
  .pipe(sass())
  .pipe(concat('all.css'))
  .pipe(gulp.dest(path.join(__dirname, '/public/css')))
});

gulp.task('watch', function() {
    gulp.watch(path.join(__dirname, '/app/blocks/**/*.scss'), ['sass'])
});

gulp.task('images', function () {
    return gulp.src(path.join(__dirname, '/app/blocks/i-profession/*.png'))
    .pipe(gulp.dest(path.join(__dirname, 'public/img')))
});

gulp.task('soy', function () {
    return gulpHelper.soy.build();
});

gulp.task('scripts', ['soy', 'gjslint'], function () {
    return gulpHelper.js.build({
        outputFiles: [
            {
                entryPoint: 'bMain.Main',
                fileName: 'scripts.js'
            }
        ]
        //,compile: true
    });
});


gulp.task('default', ['gjslint', 'sass', 'images', 'scripts']);
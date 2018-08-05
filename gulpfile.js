const gulp = require('gulp');
const ts = require('gulp-typescript');
const merge = require('merge2');
const tsProject = ts.createProject('tsconfig.json', { declaration: true });
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const postcssUrl = require('postcss-url');

gulp.task('assets', function() {
  return gulp.src(['src/**/*.html']).pipe(gulp.dest('build'));
});

gulp.task('sass', function() {
  return gulp
    .src('src/style/*.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'compact'
      }).on('error', sass.logError)
    )
    .pipe(postcss([cssnext(), postcssUrl({ url: 'inline' })]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/style'));
});

gulp.task('ts', function() {
  const result = gulp.src(['src/**/*.ts', '!src/**/__tests__/*.ts']).pipe(tsProject());

  const resultJs = result.js
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['babel-preset-env'],
        plugins: ['transform-remove-console']
      })
    )
    .pipe(sourcemaps.write(''));

  const resultDts = result.dts;
  return merge([resultJs.pipe(gulp.dest('build')), resultDts.pipe(gulp.dest('build'))]);
});

gulp.task('default', ['ts', 'assets', 'sass']);

gulp.task('dev', () => {
  gulp.watch('src/style/**/*', ['sass']);
});

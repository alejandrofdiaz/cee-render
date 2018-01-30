const gulp = require('gulp');
const ts = require('gulp-typescript');
const merge = require('merge2');
const tsProject = ts.createProject('tsconfig.json', { declaration: true });
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function() {
  const result = gulp.src(['src/**/*.ts', '!src/**/__tests__/*.ts']).pipe(tsProject());

  const resultJs = result.js
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['babel-preset-env', 'babel-preset-minify'],
        plugins: ['transform-remove-console', 'babel-plugin-lodash']
      })
    )
    .pipe(sourcemaps.write(''));

  const resultDts = result.dts;
  return merge([resultJs.pipe(gulp.dest('build')), resultDts.pipe(gulp.dest('build'))]);
});

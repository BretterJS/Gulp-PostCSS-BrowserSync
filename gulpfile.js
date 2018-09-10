//PostCSS with BrowserSync

let postcss = require('gulp-postcss');
let gulp = require('gulp');
let cssnano = require('cssnano');
let sourcemaps = require('gulp-sourcemaps');
let babel = require('gulp-babel');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let imagemin = require('gulp-imagemin');
let eslint = require('gulp-eslint');
let browserSync = require('browser-sync').create();

gulp.task('serve', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
});

 
gulp.task('css', () => {
    let plugins = [
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
    ];
    return gulp.src('./src/css/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
        
});

gulp.task('es6', () => {
    gulp.src('./src/js/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(uglify())
      .pipe(concat('bundle.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist/js'))
      .pipe(browserSync.stream());
  });
  
  gulp.task('html', () => {
    gulp.src('./src/html/*.html')
    .pipe(gulp.dest('dist/html'))
    .pipe(browserSync.stream());
  });


  gulp.task('images', () =>
    gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
  );
  

   gulp.task('watch', () => {
       gulp.watch('./src/html/*.html').on('change', browserSync.reload);
       gulp.watch('./src/css/*.css').on('change', browserSync.reload);
       gulp.watch('./src/js/*js').on('change', browserSync.reload);
   });

   gulp.task('eslint', () => {
    return gulp.src(['./src/js/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


gulp.task('default', ['css', 'es6', 'eslint', 'html', 'images', 'watch', 'serve']);

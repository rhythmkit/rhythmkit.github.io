var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-ruby-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var please      = require('gulp-pleeease');
var rename      = require("gulp-rename");


// 'html',
// 'js',
// 'sass',
// 'autoprefixer',
// 'watch'


var pleaseOptions = {
  autoprefixer: {  //autoprefixer-core
    browsers: [
      'ie >= 8',
      'ie_mob >= 10',
      'ff >= 3.6',
      'chrome >= 10',
      'safari >= 5.1',
      'opera >= 11',
      'ios >= 7',
      'android >= 4.1',
      'bb >= 10'
    ]},
  filters: true,
  rem: true, //pixrem
  pseudoElements: true,
  opacity: true,
  import: true,
  minifier: false, //csswring (and source maps)
  mqpacker: true, //css-mqpacker
  next: false
};

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
  return gulp.src('./_scss/main.scss')
    .pipe(sass({style: 'expanded', sourcemapPath: './_scss'}))
    .on('error', function (err) { browserSync.notify })
    //.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    //.pipe(please(pleaseOptions))
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('css'));
});

gulp.task('please', function () {
  gulp.src('_site/css/main.css')
  .pipe(please(pleaseOptions))
    .pipe(rename({
      suffix: '.min',
      extname: '.css'
    }))
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.reload({stream:true}))
  });

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('_scss/*.scss', ['sass']);
    gulp.watch('_site/css/main.css', ['please']);
    gulp.watch(['index.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);

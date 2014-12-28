var gulp = require('gulp'),
    //JS
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    //Pre-procesor
    sass = require('gulp-ruby-sass'),
    //Helpers
    changed = require('gulp-changed'),
    cp = require('child_process'),
    del = require('del'),
    notify = require('gulp-notify'),
    rename = require("gulp-rename"),
    //Post-processor
    prefix = require('gulp-autoprefixer'),
    please = require('gulp-pleeease'),
    //Image optimization
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    //Pagespeed insights
    psi = require('psi'),
    site = 'http://integritystl.com',
    key = '',
    // BrowserSync
    browserSync = require('browser-sync');

    // 'html',
    // 'images',
    // 'js',
    // 'sass',
    // 'autoprefixer',
    // 'watch'


gulp.task('scripts', function() {
  var jsSrc = './src/js/**/*.js',
      jsBld = './build/js';
  return gulp.src(jsSrc)
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'))
  .pipe(concat('main.js'))
  .pipe(gulp.dest(jsBld))
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest(jsBld))
  .pipe(notify({ message: 'Scripts task complete' }));
});


// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './src/img/**/*',
      imgBld = './build/img';

  return gulp.src(imgSrc)
  .pipe(changed(imgBld))
  //.pipe(imagemin())
  .pipe(imagemin({
    //optimizationLevel: 3, //PNG optimization
    progressive: true,    //JPG optimization
    interlaced: true,     //GIF optimizaiton
    svgoPlugins: [        //SVG optimization
      { removeViewBox: false }, // don't remove the viewbox atribute from the SVG
      { removeUselessStrokeAndFill: false },  // don't remove Useless Strokes and Fills
      { removeEmptyAttrs: false } ],
    use: [pngquant({quality: '65-80', speed: 4 })]
  }))
  .pipe(gulp.dest(imgBld));
});


// Build the Jekyll Site
gulp.task('jekyll-build', function (done) {
  var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
  };
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
    .on('close', done);
});


// Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});


// Wait for jekyll-build, then launch the Server
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});


// Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
gulp.task('sass', function () {
  var scssSrc = './_scss/main.scss',
      sccBld = './_site/css';

  return gulp.src(scssSrc)
    .pipe(sass({style: 'expanded', sourcemapPath: './_scss'}))
    .on('error', function (err) { browserSync.notify })
    //.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    //.pipe(please(pleaseOptions))
    .pipe(gulp.dest(sccBld))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('css'));
});


// CSS post-processing
gulp.task('please', function () {
  var cssSrc = './_site/css/main.css',
      cssBld = './_site/css',
      pleaseOptions = {
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
          rem: true, //px fallback for REMs in IE8
          pseudoElements: true, // reverts :: to : for IE8
          opacity: true, //Opacity fix for IE8
          import: true,
          minifier: false, //csswring (and source maps)
          mqpacker: true, //css-mqpacker
          next: false
      };

  return gulp.src(cssSrc)
  .pipe(please(pleaseOptions))
    .pipe(rename({
      suffix: '.min',
      extname: '.css'
    }))
    .pipe(gulp.dest(cssBld))
    .pipe(browserSync.reload({stream:true}))
});


// Please feel free to use the `nokey` option to try out PageSpeed
// Insights as part of your build process. For more frequent use,
// we recommend registering for your own API key. For more info:
// https://developers.google.com/speed/docs/insights/v1/getting_started
gulp.task('mobile', function (cb) {

  psi({
    // key: key
    nokey: 'true',
    url: site,
    strategy: 'mobile',
    threshold: 60        // optional
  }, cb);
});

gulp.task('desktop', function (cb) {
  psi({
    // key: key,
    nokey: 'true',
    url: site,
    strategy: 'desktop',
    threshold: 60        // optional
  }, cb);
});


//Watch scss files for changes & recompile
//Watch html/md files, run jekyll & reload BrowserSync
gulp.task('watch', function () {
  gulp.watch('_scss/*.scss', ['sass']);
  gulp.watch('_site/css/main.css', ['please']);
  gulp.watch(['index.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});


// Default task, running just `gulp` will compile the sass,
// compile the jekyll site, launch BrowserSync & watch files.
gulp.task('default', ['browser-sync', 'watch']);

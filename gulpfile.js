// What to learn GULP?
// Just read these articles:
    // https://github.com/shakyShane/jekyll-gulp-sass-browser-sync
    // http://markgoodyear.com/2014/01/getting-started-with-gulp/
    // http://www.sitepoint.com/introduction-gulp-js/
    // https://github.com/google/web-starter-kit/blob/master/gulpfile.js
    // http://www.smashingmagazine.com/2014/06/11/building-with-gulp/
    // http://alistapart.com/blog/post/getting-started-with-gulp
    // http://www.browsersync.io/docs/gulp/

var gulp = require('gulp'),
    //JS
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    //Pre-procesor
    sass = require('gulp-ruby-sass'),
    frontMatter = require('gulp-front-matter'),
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
    //SVG to PNG
    svg2png = require('gulp-svg2png'),
    //Pagespeed insights
    psi = require('psi'),
    site = 'http://solvm.com',
    key = '',
    // BrowserSync
    browserSync = require('browser-sync');

    // 'html',
    // 'images',
    // 'js',
    // 'sass',
    // 'autoprefixer',
    // 'watch'


gulp.task('front', function() {
  gulp.src('./css/style.scss')
  .pipe(frontMatter({ // optional configuration
    remove: true // should we remove front-matter header?
  }))
  .pipe(gulp.dest('./css')) // you may want to take a look at gulp-marked at this point
});

gulp.task('scripts', function() {
  var jsSrc = './js/src/**/*.js',
      jsBld = './js';
  return gulp.src(jsSrc)
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'))
  .pipe(concat('style.js'))
  .pipe(gulp.dest(jsBld))
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest(jsBld))
  .pipe(notify({ message: 'Scripts task complete' }));
});


// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './img/**/*',
      imgBld = './img';

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


// SVG to PNG
gulp.task('svng', function () {
  var svgSrc = './img/**/*.svg',
      pngBld = './img';
  return  gulp.src(svgSrc)
  .pipe(svg2png())
  .pipe(gulp.dest(pngBld));
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


// Compile files from _scss into both _site/css (for live injecting) and CSS (for future jekyll builds)
gulp.task('sass', function () {
  var scssSrc = './css/style.scss',
      srcBld = './_site/css';

  return gulp.src(scssSrc)
    .pipe(frontMatter({ remove: true })) // Remove frontmatter header to run Gulp-Ruby-Sass
    .pipe(sass({loadPath: '_scss', style: 'expanded', sourcemapPath: srcBld}))
    .on('error', function (err) { browserSync.notify })
    .pipe(rename({ extname: '.css' })) //
    .pipe(gulp.dest(srcBld))
    .pipe(browserSync.reload({stream:true}));
});


// CSS post-processing
gulp.task('please', function () {
  var cssSrc = './_site/css/style.css',
      cssBld1 = './_site/css',
      pleaseOptions = {
        autoprefixer: {
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
          rem: true,            //px fallback for REMs in IE8
          pseudoElements: true, // reverts :: to : for IE8
          opacity: true,        //Opacity fix for IE8
          import: true,
          minifier: true,       //csswring (and source maps)
          mqpacker: true,       //css-mqpacker
          next: false
      };

  return gulp.src(cssSrc)
  .pipe(please(pleaseOptions))
    // .pipe(rename({ suffix: '.min', extname: '.css'  })) // create a style.min.css
    .pipe(gulp.dest(cssBld1))
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
  gulp.watch([
    'css/style.scss',
    '_scss/**/*.scss'
    ],
    ['sass']);

  gulp.watch('_site/css/style.css', ['please']);

  gulp.watch([
    '_config.yml',
    'index.html',
    '_includes/**/*.html',
    '_layouts/*.html',
    '_posts/*.md',
    '_data/*.yml',
    'js/**/*.js'
    ],
    ['jekyll-rebuild']);
});


// Default task, running just `gulp` will compile the sass,
// compile the jekyll site, launch BrowserSync & watch files.
gulp.task('default', ['browser-sync', 'watch']);

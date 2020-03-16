var gulp = require("gulp"),
  plumber = require("gulp-plumber"),
  pug = require("gulp-pug"),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  replace = require("gulp-replace"),
  debug = require("gulp-debug"),
  notify = require("gulp-notify"),
  uglify = require("gulp-uglify"),
  postcss = require("gulp-postcss"),
  mmq = require("gulp-merge-media-queries"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("gulp-cssnano"),
  cleanCss = require("gulp-clean-css"),
  imagemin = require("gulp-imagemin"),
  cache = require("gulp-cache"),
  del = require("del"),
  babel = require("gulp-babel"),
  babelMinify = require("gulp-babel-minify");
  eslint = require("gulp-eslint"),
  changed = require("gulp-changed"),
  rename = require("gulp-rename"),
  srcset = require("gulp-sugar-srcset"),
  sassGlob = require("gulp-sass-glob"),
  pugOptions = {
    pretty: true,
    basedir: "resources/pug/"
  }, // pug options
  sassOptions = {
    outputStyle: "expanded"
  }, // scss options
  dev_path = {
    // dev path
    assets: "static/assets/",
    es: "resources/es/",
    scss: "resources/sass/",
    pug: "resources/pug/",
    images: "resources/img/",
    fonts: "resources/fonts/",
    html: "templates/",
    css: "static/assets/css/",
    js: "static/assets/js/",
    img: "static/assets/img/",
  };


// ------------------------------------
// Development Tasks
// ------------------------------------

// Pug
gulp.task('pug', function (done) {
  gulp
    .src([dev_path.pug + "**/*.pug", "!" + dev_path.pug + "**/_*.pug"])
    .pipe(plumber())
    // .pipe(debug({ title: 'pug' }))
    .pipe(pug(pugOptions))
    .pipe(srcset())
    .pipe(gulp.dest(dev_path.html))

  done();
});
//Pug(only changed)処理が重くなってきたらこちらを使う、ただしincludeなどは正常に動作しないので注意
// gulp.task('pug', function (done) {
// gulp.src([dev_path.pug + '**/*.pug', '!' + dev_path.pug + '**/_*.pug'])
//   .pipe(plumber())
//   .pipe(pug(pugOptions))
//   .pipe(changed(dev_path.html))
//   .pipe(gulp.dest(dev_path.html))
//   .pipe(plumber.stop());
// done();
// });

//sass
gulp.task('sass', function (done) {
  var plugins = [
    autoprefixer()
  ];
  gulp.src(dev_path.scss + '**/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>") //<-
    }))
    // .pipe(debug({ title: 'scss:' }))
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(sourcemaps.write({ includeContent: false }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write({ includeContent: false }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(mmq())
    .pipe(sourcemaps.write({ includeContent: false }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(cleanCss())
    .pipe(cssnano({
      autoprefixer: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dev_path.css));
  done();
});

//babel
gulp.task('babel', function (done) {
  gulp.src(dev_path.es + '**/*.js')
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel())
    .pipe(babelMinify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(gulp.dest(dev_path.js));
  done();
});

//images
gulp.task('images', function (done) {
  gulp.src(dev_path.images + '/**/*.+(png|jpg|jpeg|gif|svg|ico|json)')
    .pipe(plumber({
      errorHandler: notify.onError("Error IMAGES: <%= error.message %>")
    }))
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 5,
      svgoPlugins: [{
        removeViewBox: true
      }]
    }, {
      verbose: true
    })))
  .pipe(plumber.stop())
  .pipe(gulp.dest(dev_path.img))
  done();
});

// Watchers
gulp.task('watch', function (done) {
  gulp.watch(dev_path.pug + '**/*.pug', gulp.task('pug'));
  gulp.watch(dev_path.scss + '**/*.scss', gulp.task('sass'));
  gulp.watch(dev_path.es + '**/*.js', gulp.task('babel'));
  gulp.watch(dev_path.images + "**/*.+(png|jpg|jpeg|gif|svg|ico|json)", gulp.task("images"));
  done();
});

//Cleaning
gulp.task("clean", function(done) {
  del.sync([dev_path.assets]);
  done();
});

// Dev Sequences
// ---------------
gulp.task(
  "default",
  gulp.series(
    gulp.parallel("clean", "pug", "babel", "sass", "images"),
    "watch",
    function(done) {
      done();
    }
  )
);

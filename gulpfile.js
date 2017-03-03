// Load Node Modules/Plugins
var gulp = require('gulp');
var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var cssnano = require('gulp-cssnano');
var browsersync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');


// Asset paths
var paths = {
  sass:                     'source/scss/*.scss',
  css:                      'build/css',
  js:                       'source/js/*.js',
  js_dist:                  'build/js/',
  html:                     'source/*.html',
  img:                      'source/img/**/*',
  fonts:                    'source/fonts/**/*',
  build:                    'build'
};


// Error Helper
function onError(err) {
    notify({ message: 'Oh Boy. Error.' });
    console.log(err);
}

// browsersync task
gulp.task('browsersync', function(cb) {
   return browsersync({
       server: {
           baseDir: paths['build']
    } }, cb);
   console.log("css injected");
});


gulp.task('sass-task', function() {
    gulp.src(paths["sass"])
        .pipe(plumber({
                errorHandler: onError
            }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(paths["css"]))
        .pipe(notify({ message: 'Sass complete' }))
        .pipe(browsersync.stream());
});

// create a new build on gulp startup
gulp.task('start', ['concatenate', 'html-copy', 'concatthirdparty', 'sass-task' ]);



// concat gulp task
gulp.task('concatenate', function() {
    return gulp.src([
                paths['js']
            ])
        .pipe(plumber({
                errorHandler: onError
            }))
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(paths['js_dist']))
        .pipe(notify({ message: 'Concatenate task complete' }))
        .pipe(browsersync.stream());
});

// copy html from source to dist
gulp.task('html-copy', function() {
    return gulp.src([
                paths['html']
            ])
        .pipe(plumber({
                errorHandler: onError
            }))
        .pipe(gulp.dest(paths['build']))
        .pipe(browsersync.stream());
});

// copy img from source to dist
gulp.task('img-copy', function() {
    return gulp.src([
                paths['img']
            ])
        .pipe(plumber({
                errorHandler: onError
            }))
        .pipe(gulp.dest(paths['build']))
        .pipe(browsersync.stream());
});

// copy fonts from source to dist
gulp.task('fonts-copy', function() {
    return gulp.src([
                paths['fonts']
            ])
        .pipe(plumber({
                errorHandler: onError
            }))
        .pipe(gulp.dest(paths['build']))
        .pipe(browsersync.stream());
});

// concat gulp task
gulp.task('concatthirdparty', function() {
    return gulp.src([
                'node_modules/jquery/dist/jquery.js'
                // ,'further 3rd comapany js files.js'
            ])
        .pipe(plumber({
                errorHandler: onError
            }))
        .pipe(sourcemaps.init())
        .pipe(concat('third_party.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(paths['js_dist']))
        .pipe(notify({ message: 'Concat 3rdParty task complete' }))
        .pipe(browsersync.stream());
});




// Watch Task
gulp.task('watch', function() {
    // watch scss files
    gulp.watch(paths['sass'], ['sass-task']);

    // Watch .js files
    // and also watch angular js files
    gulp.watch([
            paths['js'],
            // ,paths['possible further paths']
        ], ['concatenate']);

    gulp.watch([ paths['html'] ], ['html-copy']);
    gulp.watch([ paths['img'] ], ['img-copy']);
    gulp.watch([ paths['fonts'] ], ['fonts-copy']);
});


// Default Task
gulp.task('default', ['start', 'watch', 'browsersync']);



// production tasks

// gulp.task('production-css', function(){
//     return gulp.src('campusinterview/sass/*.scss')
//         .pipe(plumber({
//             errorHandler: onError
//         }))
//         .pipe(compass({
//             style: 'compressed',
//             comments: false,    // no effect ?!
//             css: 'campusinterview/stylesheets',
//             sass: 'campusinterview/sass',
//         }))
//         .pipe(cssnano())      //minifying removes line comments as well
//         .pipe(gulp.dest('testcampusinterview/system/templates/frontend/default/css/production'))
//         .pipe(notify({ message: 'Compass production task complete' }));
// });

// gulp.task('production-js', function() {
//     return gulp.src('testcampusinterview/system/templates/frontend/default/js/all.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('testcampusinterview/system/templates/frontend/default/js/production'))
//         .pipe(notify({ message: 'uglify js task complete' }));
// });

// gulp.task('production', ['production-js', 'production-css']);

var gulp = require('gulp'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cache = require('gulp-cached');
    webpack = require('webpack-stream');
    cleanCSS = require('gulp-clean-css');

var templates_dir   = 'templates/',
    templates_dist_dir = 'www/';

var js_src_dir      = 'js/src/',
    js_libs_dir     = 'js/libs/',
    node_modules_dir= 'node_modules/',
    js_build_dir    = 'js/build/',
    js_min_dir      = 'js/min/',
    js_dist_dir     = 'www/js/';

var css_dir = 'css/',
    css_dist_dir = 'www/css/';

gulp.task('babel', function(){
    return gulp.src([js_src_dir+'**/*.jsx',])
        .pipe(cache('babel'))
        .pipe(babel({
            presets: ['react', 'es2015']
        }))
        .pipe(gulp.dest(js_build_dir+'babel'));
})

gulp.task('webpack', ['babel'], function(){
    return gulp.src([js_build_dir+'babel/**/*.js'])
        .pipe(cache('webpack'))
        .pipe(webpack({
            entry : {
                app: './'+js_build_dir+'babel/app.js'
            },
            output : {
                filename : "app.js"
            }
        }))
        .pipe(gulp.dest(js_build_dir+'webpack/'));
})

gulp.task('uglify', ['webpack'], function(){
    gulp.src([js_libs_dir+'**/*.js'])
        .pipe(cache('uglify'))
        .pipe(uglify())
        .pipe(rename(function(path){
           path.extname = ".lib.min.js"
        }))
        .pipe(gulp.dest(js_min_dir));

    return gulp.src([js_build_dir+'webpack/**/*.js'])
        .pipe(cache('uglify'))
        .pipe(uglify())
        .pipe(rename(function(path){
            path.extname = ".src.min.js"
        }))
        .pipe(gulp.dest(js_min_dir))
})

gulp.task('concat', ['uglify'], function(){
    gulp.src([
        css_dir+'**/*.css'
    ])
    .pipe(cache('concat'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(css_dist_dir));

    gulp.src([
        templates_dir+'**/*.html'
    ])
    .pipe(cache('concat'))
    .pipe(gulp.dest(templates_dist_dir));

    return gulp.src([
            node_modules_dir+'react/dist/react.min.js',
            node_modules_dir+'react-dom/dist/react-dom.min.js',
            node_modules_dir+'fixed-data-table/dist/fixed-data-table.min.js',
            js_min_dir+'**/*.lib.min.js',
            js_min_dir+'app.src.min.js'
        ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest(js_dist_dir))
})

gulp.task('build', ['babel','uglify','concat']);

gulp.task('watch', ['build'], function(){
    var watcher = gulp.watch('js/src/**/*.{js,jsx}', ['build']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
})

gulp.task('default', ['build'])

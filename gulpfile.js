const { src, dest, parallel, watch } = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var cleanCss = require('gulp-clean-css');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

var paths = {
    cssSrc: './scss/*.scss',
    cssDist: '../css',
    tsSrc: './ts/*.ts',
    tsDist: '../js'
}

function sassDev() {
    return src(paths.cssSrc)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(dest(paths.cssDist))
}

function sassBuild() {
    return src(paths.cssSrc)
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(dest(paths.cssDist));
}

function tsDev () {
    return src(paths.tsSrc)
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js
        .pipe(sourcemaps.write())
        .pipe(dest(paths.tsDist));
};

function tsBuild () {
    return src(paths.tsSrc)
        .pipe(tsProject())
        .js
        .pipe(dest(paths.tsDist));
};

function liveDev () {
    livereload.listen(); 
    watch(['*.css', '*.html', '*.js']).on('change', livereload.changed);
    watch([paths.cssSrc], sassDev);
    watch([paths.tsSrc], tsDev);
}

exports.default = parallel(sassBuild, tsBuild);
exports.build = parallel(sassBuild, tsBuild);
exports.dev = parallel(sassDev, tsDev);
exports.live = liveDev;

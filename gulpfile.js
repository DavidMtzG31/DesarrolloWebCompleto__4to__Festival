const { src, dest, watch, parallel  } =require("gulp");

// Dependencias CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// Dependencias imágenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// Javasript
const terser = require('gulp-terser-js')

function css( done ) {
    // Para compilar se necesitan 3 pasos: Identificar el archivo SASS, compilarlo, guardar el compilado
    src('./src/scss/**/*.scss')
        .pipe( sourcemaps.init() )
        .pipe( plumber())
        .pipe( sass() ) //está compilando
        .pipe( postcss([autoprefixer(), cssnano()]) )
        .pipe( sourcemaps.write('.'))
        .pipe(dest('build/css')); // lo está almacenando

    done();
}

function dev( done ) {
    watch('./src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript)

    done();
}

function imagenes(done) {

    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{jpg, png}')
        .pipe( cache( imagemin(opciones) ))
        .pipe( dest('build/img') )

    done();
}

function versionWebp( done ) {

    const opciones = {
        quality: 50,
    }

    src('src/img/**/*.{jpg, png}')
        .pipe( webp( opciones ))
        .pipe( dest('build/img') )

    done();
}

function versionAvif( done ) {

    const opciones = {
        quality: 50,
    }

    src('src/img/**/*.{jpg, png}')
        .pipe( avif( opciones ))
        .pipe( dest('build/img') )

    done();
}

function javascript( done ) {
    src('src/js/**/*.js')
        .pipe( sourcemaps.init() )
        .pipe( terser() )
        .pipe( sourcemaps.write('.') )
        .pipe( dest('build/js'))

    done();
}


exports.css = css;
exports.javascript = javascript;
exports.versionWebp = versionWebp;
exports.imagenes = imagenes;
exports.versionAvif = versionAvif;
exports.dev = parallel( dev, javascript);




// function tarea( done ) {
//     console.log('Mi primer tarea');

//     done();

// }

// exports.primerTarea = tarea;
        // Como la voy   Como se llama la función en realidad
        // a mandar llamar
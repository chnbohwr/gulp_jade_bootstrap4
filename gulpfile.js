const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const jade = require('gulp-jade');
const distFolder = 'pages';

// Compile Sass & Inject Into Browser
gulp.task('sass', function () {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest(`${distFolder}/css`))
        .pipe(browserSync.stream());
});

// Move JS Files to src/js
gulp.task('js', function () {
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/tether/dist/js/tether.min.js',
        'node_modules/axios/dist/axios.min.js',
        'src/js/*.js'
    ])
        .pipe(gulp.dest(`${distFolder}/js`))
        .pipe(browserSync.stream());
});

// Watch Sass & Serve
gulp.task('server', ['default'], function () {
    browserSync.init({
        server: `./${distFolder}`
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("src/**/*.jade", ['template']);
});

// Move Fonts to src/fonts
gulp.task('fonts', function () {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest(`${distFolder}/fonts`))
})

// Move Font Awesome CSS to src/css
gulp.task('fa', () => gulp
    .src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest(`${distFolder}/css`))
)

gulp.task('template', () => gulp
    .src('src/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest(`${distFolder}`))
    .pipe(browserSync.stream())
)

gulp.task('default', ['sass', 'js', 'fa', 'fonts', 'template']);

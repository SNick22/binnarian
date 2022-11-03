let gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    nunjucks = require('gulp-nunjucks');

gulp.task('sass', () => {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', () => {
    return gulp.src('app/*.html')
        .pipe(nunjucks.compile())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', () => {
    return gulp.src('app/js/**/*.js')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        notify: false
    });
});

gulp.task('buildCss', () => {
    return gulp.src('app/css/*.css')
        .pipe(gulp.dest('dist/css'))
});

gulp.task('buildJs', () => {
    return gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'))
});

gulp.task('buildHtml', () => {
    return gulp.src('app/*.html')
        .pipe(nunjucks.compile())
        .pipe(gulp.dest('dist'))
});

gulp.task('buildImg', () => {
    return gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'))
});

gulp.task('build', gulp.parallel('buildCss', 'buildJs', 'buildHtml', 'buildImg'));

gulp.task('watch', () => {
    gulp.watch('app/sass/**/*.sass', gulp.series('sass', 'buildCss'));
    gulp.watch(['app/*.html', 'app/templates/*.html'], gulp.series('html'));
    gulp.watch('app/js/**/*.js', gulp.series('js', 'buildJs'));
    gulp.watch('app/img/**/*', gulp.series('buildImg'));
});

gulp.task('default', gulp.parallel('sass', 'build', 'browser-sync', 'watch'));
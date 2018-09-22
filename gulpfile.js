"use strict";
var gulp = require('gulp');
var watch = require('gulp-watch');
var pug = require('gulp-pug');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var concat = require('gulp-concat');

// server task
gulp.task('conect', function(){
    connect.server({
        root: './',
        livereload: true,
        port: 8888
      });
});

// pug task
gulp.task('pug', function (){
    return gulp.src('pug/*.pug')
                .pipe(pug({
                    pretty: true
                }))
                .pipe(connect.reload())
                .pipe(gulp.dest('./'))
});

// sass task
gulp.task('sass', function () { 
    return sass('sass/*.scss')
           .on('error', sass.logError)
           .pipe(autoprefixer({
                browsers: ['last 5 versions'],
                cascade: false
            }))
            .pipe(connect.reload())
            .pipe(gulp.dest('./'))

 });
//  concat task
gulp.task('scripts', function(){
    return gulp.src('./js/*.js')
                .pipe(concat('all.js'))
                .pipe(connect.reload())
                .pipe(gulp.dest('./'));
});
//  watch task
 gulp.task('watching', function(){
     gulp.watch('pug/*.pug',  gulp.series('pug'));   
     gulp.watch('sass/*.scss',  gulp.series('sass'));
     gulp.watch('js/*.js',  gulp.series('scripts'));
 });


 gulp.task('default', gulp.parallel('watching', 'conect', 'scripts'));

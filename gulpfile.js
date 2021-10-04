const gulp=require('gulp'); 
//Gulp has differnet module for the thing like for js it is differnt for css it is differnet
gulp.task('css',function(){
    console.log('minfying css');
    gulp.src('./assets/sass/**/*.scss').pipe(sass()).pipe(cssnano()).pipe(gulp.dest('./assets/css'));
})
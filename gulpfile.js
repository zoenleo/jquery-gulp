
var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  less = require('gulp-less'),
  minifyCss = require('gulp-clean-css'),
  livereload = require('gulp-livereload'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  concat = require('gulp-concat'),
  fileinclude = require('gulp-file-include'),
  del = require('del'),
  pump = require('pump'),
  babel = require('gulp-babel');


// 默认路径
var paths = {
  src: 'src/',
  dist: 'dist/'
}


// 清空dist
gulp.task('clean', function (cb) {
  return del([paths.dist + "**/*"], cb);
});


gulp.task('uglifyRename', function (cb) {
  pump([
    gulp.src(paths.src + 'js/*.js'),
    concat('index.js'),
    babel({
      presets: ['env']
    }),
    uglify(),
    gulp.dest(paths.dist + 'js'),
    livereload()
  ],
    cb
  );
});

//编译less并且压缩
gulp.task('less2css', function () {
  //postcss plugin
  var plugins = [
    autoprefixer({ browsers: ['last 3 version'], cascade: false })
  ];
  gulp.src(paths.src + 'less/*.less')
    .pipe(less())
    .pipe(concat("index.css"))
    .pipe(postcss(plugins)) //带上厂商前缀，对相关css做兼容处理
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.dist + 'css'))
    .pipe(livereload());
});

gulp.task('concatCss', function () {
  gulp.src(paths.src + 'css/*.css')
    .pipe(concat("all.css"))
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.dist + 'css'));
})
//copy html 文件
gulp.task('copyHtml', function () {
  gulp.src(paths.src + '*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(paths.dist))
    .pipe(livereload());

});

//copy img 文件
gulp.task('copyImg', function () {
  gulp.src(paths.src + 'img/*.*')
    .pipe(gulp.dest(paths.dist + 'img'))
    .pipe(livereload());

})


// copy lib下的所有文件
gulp.task('copylib', function () {
  gulp.src([paths.src + 'lib/**/'])
    .pipe(gulp.dest(paths.dist + 'lib/'))
    .pipe(livereload());
})



//创建监听任务
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(paths.src + 'js/*.js', ['uglifyRename']); //监听js文件
  gulp.watch(paths.src + 'css/*.css', ['concatCss']); //监听 css  
  gulp.watch(paths.src + 'less/*.less', ['less2css']); //监听 css
  gulp.watch(paths.src + '*.html', ['copyHtml']); //监听html
  gulp.watch(paths.src + 'img/*.*', ['copyImg']); //监听img
  gulp.watch(paths.src + 'lib/*/*.*', ['copylib']); //监听img
});

gulp.task('build', ['watch', 'copyHtml', 'uglifyRename', 'concatCss', 'copyImg', 'copylib', 'less2css']);

gulp.task('default', ['build'], function () {
  console.log("--------finish all------------")
});
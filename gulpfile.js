/**
 * Created by gaogao on 2017/11/23.
 */
/**
 * Created by WHUTYZY on 2017/8/26.
 */
var cleanCss = require('gulp-clean-css');
var clean = require('gulp-clean');
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var runSequence = require('gulp-run-sequence');
var uglify = require('gulp-uglify');

//获取命令行内门
var args = process.argv.splice(2);//process是一个全局对象，argv返回的是一组包含命令行参数的数组。
console.log(args);
//第一项为”node”，第二项为执行的js的完整路径，后面是附加在命令行后的参数


console.log(args[0]);
gulp.task('jsmin', function () {
    return gulp.src(args[0]+'scripts/**/*.js')

        .pipe(uglify({
            mangle: false,//类型：Boolean 默认：true 是否修改变量名
            compress: true//类型：Boolean 默认：true 是否完全压缩
        }))
        .pipe(gulp.dest('/data/html/skill-html'));
});


gulp.task('build-clean', function () {
    return gulp.src('/data/html/skill-html/app', {read: false})
        .pipe(clean());
});
gulp.task('styles', function () {
    return gulp.src(args[0]+'styles/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(cleanCss({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('./skill-html/app/styles'))
});


gulp.task('images', function () {
    return gulp.src(args[0]+'**/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('/data/html/skill-html/app/images'));
});
gulp.task('copy', function () {
    return gulp.src(args[0]+'**')
        .pipe(gulp.dest('dist'));
});
gulp.task('default', function (callback) {
    runSequence('build-clean', 'copy', ['styles', 'images', 'jsmin'], callback);
});

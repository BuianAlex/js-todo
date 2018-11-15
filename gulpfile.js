var gulp       = require('gulp'), // Подключаем Gulp
	sass         = require('gulp-sass'), //Подключаем Sass пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	babel = require('gulp-babel');
	cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
	rigger = require('gulp-rigger');
  	imagemin = require('gulp-imagemin');


gulp.task('babel', () =>
	gulp.src('app/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('build'))
);

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('app/sass/**/*.scss') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});
gulp.task('html', function () {
	gulp.src('app/*.html')
		.pipe(rigger())
		.pipe(gulp.dest('dist'))
});

gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
		'app/libs/validator/validator.js',
		'app/libs/jquery-maskedinput/dist/jquery.maskedinput.min.js',
		'app/libs/scrolling-nav/scrolling-nav.js',
		])
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});


gulp.task('css-libs', ['sass'], function() {
	return gulp.src('app/css/libs.css') // Выбираем файл для минификации
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('app/css/')); // Выгружаем в папку app/css
});
gulp.task('css-castom', ['sass'], function () {
	return gulp.src('app/css/main.css') // Выбираем файл для минификации
		//.pipe(cssnano()) // Сжимаем
		.pipe(rename({ suffix: '.min' })) // Добавляем суффикс .min
		.pipe(gulp.dest('app/css/')); // Выгружаем в папку app/css
});

gulp.task('watch', ['browser-sync', 
	'css-libs', 'css-castom', 'scripts' ], function() {
	gulp.watch('app/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('html-concat', function () {
    gulp.src('app/**/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('build/'));
});


gulp.task('build', ['clean', 'sass', 'babel'], function() {

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'app/css/main.css',
		'app/css/libs.css'
		])
	.pipe(gulp.dest('build/css'))

	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('build/fonts'))

	var buildJs = gulp.src('app/js/**/*')
		.pipe(babel({
			presets: ['@babel/env']
		})) // Переносим скрипты в продакшен
	.pipe(gulp.dest('build/js'))

	var buildHtml = gulp.src('app/template/*.html') // Переносим HTML в продакшен
	.pipe(rigger()) 
	.pipe(gulp.dest('build'));
	
	var imagMin = gulp.src('app/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('build/img'));

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);

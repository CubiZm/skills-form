'use strict';

var _createClass = function() {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	return function(Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);
		if (staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
}();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

svg4everybody();
$(document).foundation();

(function() {
	var iterate = function iterate(items, callback) {
		items.forEach(function(item) {
			var key = void 0;
			var value = void 0;

			if (typeof item === 'string') {
				key = item;
				value = item;
			} else {
				key = item[0];
				value = item[1];
			}

			callback(key, value);
		});
	};

	var check = function check(category, items) {
		iterate(items, function(key, value) {
			if (bowser[key]) {
				document.documentElement.classList.add('is-' + category + '-' + value);
			}
		});
	};

	check('engine', ['blink', 'gecko', ['msedge', 'edge'],
		['msie', 'ie'], 'webkit'
	]);

	check('device', ['mobile', 'tablet']);

	check('browser', ['android', 'bada', 'blackberry', 'chrome', 'firefox', 'ios', 'kMeleon', ['msedge', 'edge'],
		['msie', 'ie'], 'opera', 'phantom', 'qupzilla', 'safari', 'sailfish', ['samsungBrowser', 'samsung'], 'seamonkey', 'silk', 'sleipnir', 'tizen', 'ucbrowser', 'vivaldi', 'webos', ['yandexbrowser', 'yandex']
	]);

	check('os', ['android', 'bada', 'blackberry', 'chromeos', 'firefoxos', 'ipad', 'iphone', 'ipod', 'ios', 'linux', 'mac', 'windows', 'windowsphone', 'sailfish', 'tizen', 'webos']);
})();

var $window = $(window);
var $document = $(document);
var $html = $(document.documentElement);
var $body = $(document.body);

$('.text-container__number').each(function count() {
	$(this).prop('Counter', 0).animate({
		Counter: $(this).text()
	}, {
		duration: 6000,
		easing: 'swing',
		step: function step(now) {
			$(this).text(Math.ceil(now));
		}
	});
});

// Данный модуль позволяет отметить чекбоксы с клавиатуры при помощи пробела или энтера

/**
 * набор свойств для клавиш
 * @enum {number} KeyCode
 */
var KeyCodes = {
	SPACE: 32,
	ENTER: 13
};

function keydownHandler(e) {
	if (e.keyCode === KeyCodes.ENTER || e.keyCode === KeyCodes.SPACE) {
		e.preventDefault();
		$(this).click();
	}
}

$('label').on('keydown', keydownHandler);

// ESlint конфликтовал с библиотекой D3 и пришлось его отключить для более приятной работы, извините =)

var percent = 0.65;

var barWidth = 55;

var numSections = 3;

var sectionPerc = 1 / numSections / 2;

console.log(sectionPerc);

var padRad = 0.05;

var chartInset = 10;

// старт начинантся с 270 градусов
var totalPercent = 0.75;

var el = d3.select('.chart-gauge');

/**
 * набор различных отступов
 * @enum {number} Margin
 */
var Margin = {
	TOP: 20,
	RIGHT: 20,
	BOTTOM: 30,
	LEFT: 20
};

var width = el[0][0].offsetWidth - Margin.RIGHT - Margin.RIGHT;

var height = width;

/**
 * Вычисляет радиус
 * @param {number} width
 * @param {number} height
 *
 * @return {number}
 */
var radius = Math.min(width, height) / 2;

/**
 * Переводит проценты в градусы
 * @param {number} perc
 *
 * @return {number}
 */
var percToDeg = function percToDeg(perc) {
	return perc * 360;
};

/**
 * Переводит градусы в радианы
 * @param {number} deg
 *
 * @return {number}
 */
var degToRad = function degToRad(deg) {
	return deg * Math.PI / 180;
};

/**
 * Переводит проценты в радианы
 * @param {number} perc
 *
 * @return {number}
 */
var percToRad = function percToRad(perc) {
	return degToRad(percToDeg(perc));
};

var svg = el.append('svg').attr('width', width + Margin.LEFT + Margin.RIGHT).attr('height', (width + Margin.LEFT + Margin.RIGHT) / 2);

var chart = svg.append('g').attr('transform', 'translate(' + (width + Margin.LEFT) / 2 + ', ' + (height + Margin.TOP) / 2 + ')');

// создаём наши фоны для полукруга
for (var sectionIndx = 1, end = numSections, asc = 1 <= end; asc ? sectionIndx <= end : sectionIndx >= end; asc ? sectionIndx++ : sectionIndx--) {

	var arcStartRad = percToRad(totalPercent);
	var arcEndRad = arcStartRad + percToRad(sectionPerc);
	totalPercent += sectionPerc;

	var startPadRad = sectionIndx === 0 ? 0 : padRad / 2;
	var endPadRad = sectionIndx === numSections ? 0 : padRad / 2;

	var arc = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth).startAngle(arcStartRad + startPadRad).endAngle(arcEndRad - endPadRad);

	chart.append('path').attr('class', 'arc chart-color' + sectionIndx).attr('d', arc);
}

/** Класс описывающий стрелку */

var Needle = function() {
	/**
	 * Создаём нашу стрелку
	 * @param {number} len - длина стрелки
	 * @param {number} radius - её радиус
	 */
	function Needle(len, radius1) {
		_classCallCheck(this, Needle);

		this.len = len;
		this.radius = radius1;
	}

	/**
	 * Отрисовываем нашу стрелку
	 * @return {HTMLElement}
	 */

	_createClass(Needle, [{
		key: 'drawOn',
		value: function drawOn(el, perc) {

			el.append('circle').attr('class', 'needle-center').attr('cx', 0).attr('cy', 0).attr('r', this.radius);

			return el.append('path').attr('class', 'needle').attr('d', this.mkCmd(perc));
		}

		/**
		 * Анимируем нашу стрелку
		 * @return {HTMLElement}
		 */

	}, {
		key: 'animateOn',
		value: function animateOn(el, perc) {
			var self = this;
			return el.transition().delay(500).ease('elastic').duration(6000).selectAll('.needle').tween('progress', function() {
				return function(percentOfPercent) {
					var progress = percentOfPercent * perc;
					return d3.select(this).attr('d', self.mkCmd(progress));
				};
			});
		}
		/**
		 * Выводит координаты стрелки
		 * @return {HTMLElement}
		 */

	}, {
		key: 'mkCmd',
		value: function mkCmd(perc) {
			var thetaRad = percToRad(perc / 2); // для создания полукруга

			var centerX = 0;
			var centerY = 0;

			var topX = centerX - this.len * Math.cos(thetaRad);
			var topY = centerY - this.len * Math.sin(thetaRad);

			var leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
			var leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);

			var rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
			var rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);

			return 'M ' + leftX + ' ' + leftY + ' L ' + topX + ' ' + topY + ' L ' + rightX + ' ' + rightY;
		}
	}]);

	return Needle;
}();

var needle = new Needle(60, 10);
needle.drawOn(chart, 0);
needle.animateOn(chart, percent);

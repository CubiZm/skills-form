/* eslint-disable*/
// ESlint конфликтовал с библиотекой D3 и пришлось его отключить для более приятной работы, извините =)

const percent = 0.65;

const barWidth = 55;

const numSections = 3;

const sectionPerc = 1 / numSections / 2;

console.log(sectionPerc);

const padRad = 0.05;

const chartInset = 10;

// старт начинантся с 270 градусов
let totalPercent = 0.75;

const el = d3.select('.chart-gauge');

/**
 * набор различных отступов
 * @enum {number} Margin
*/
const Margin = {
	TOP: 20,
	RIGHT: 20,
	BOTTOM: 30,
	LEFT: 20
};

const width = el[0][0].offsetWidth - Margin.RIGHT - Margin.RIGHT;

const height = width;

/**
 * Вычисляет радиус
 * @param {number} width
 * @param {number} height
 *
 * @return {number}
 */
const radius = Math.min(width, height) / 2;

/**
 * Переводит проценты в градусы
 * @param {number} perc
 *
 * @return {number}
 */
const percToDeg = perc => perc * 360;

/**
 * Переводит градусы в радианы
 * @param {number} deg
 *
 * @return {number}
 */
const degToRad = deg => (deg * Math.PI) / 180;

/**
 * Переводит проценты в радианы
 * @param {number} perc
 *
 * @return {number}
 */
const percToRad = perc => degToRad(percToDeg(perc));

const svg = el.append('svg')
	.attr('width', width + Margin.LEFT + Margin.RIGHT)
	.attr('height', (width + Margin.LEFT + Margin.RIGHT) / 2);

const chart = svg.append('g')
	.attr('transform', `translate(${(width + Margin.LEFT) / 2}, ${(height + Margin.TOP) / 2})`);

// создаём наши фоны для полукруга
for (let sectionIndx = 1, end = numSections, asc = 1 <= end; asc ? sectionIndx <= end : sectionIndx >= end; asc ? sectionIndx++ : sectionIndx--) {

	const arcStartRad = percToRad(totalPercent);
	const arcEndRad = arcStartRad + percToRad(sectionPerc);
	totalPercent += sectionPerc;

	const startPadRad = sectionIndx === 0 ? 0 : padRad / 2;
	const endPadRad = sectionIndx === numSections ? 0 : padRad / 2;

	const arc = d3.svg.arc()
		.outerRadius(radius - chartInset)
		.innerRadius(radius - chartInset - barWidth)
		.startAngle(arcStartRad + startPadRad)
		.endAngle(arcEndRad - endPadRad);

	chart.append('path')
		.attr('class', `arc chart-color${sectionIndx}`)
		.attr('d', arc);
}

/** Класс описывающий стрелку */
class Needle {
	/**
	 * Создаём нашу стрелку
	 * @param {number} len - длина стрелки
	 * @param {number} radius - её радиус
	 */
	constructor(len, radius1) {
		this.len = len;
		this.radius = radius1;
	}

	/**
	 * Отрисовываем нашу стрелку
	 * @return {HTMLElement}
	 */
	drawOn(el, perc) {

		el.append('circle')
			.attr('class', 'needle-center')
			.attr('cx', 0)
			.attr('cy', 0)
			.attr('r', this.radius);

		return el.append('path')
			.attr('class', 'needle')
			.attr('d', this.mkCmd(perc));
	}

	/**
	 * Анимируем нашу стрелку
	 * @return {HTMLElement}
	 */
	animateOn(el, perc) {
		const self = this;
		return el
			.transition()
			.delay(500)
			.ease('elastic')
			.duration(6000)
			.selectAll('.needle')
			.tween('progress', () =>
			function(percentOfPercent) {
				const progress = percentOfPercent * perc;
				return d3
					.select(this)
					.attr('d', self.mkCmd(progress));
				}
			);
	}
	/**
	 * Выводит координаты стрелки
	 * @return {HTMLElement}
	 */
	mkCmd(perc) {
		const thetaRad = percToRad(perc / 2); // для создания полукруга

		const centerX = 0;
		const centerY = 0;

		const topX = centerX - (this.len * Math.cos(thetaRad));
		const topY = centerY - (this.len * Math.sin(thetaRad));

		const leftX = centerX - (this.radius * Math.cos(thetaRad - (Math.PI / 2)));
		const leftY = centerY - (this.radius * Math.sin(thetaRad - (Math.PI / 2)));

		const rightX = centerX - (this.radius * Math.cos(thetaRad + (Math.PI / 2)));
		const rightY = centerY - (this.radius * Math.sin(thetaRad + (Math.PI / 2)));

		return `M ${leftX} ${leftY} L ${topX} ${topY} L ${rightX} ${rightY}`;
	}
}

const needle = new Needle(60, 10);
needle.drawOn(chart, 0);
needle.animateOn(chart, percent);

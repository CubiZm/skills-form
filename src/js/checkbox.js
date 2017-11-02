// Данный модуль позволяет отметить чекбоксы с клавиатуры при помощи пробела или энтера

/**
 * набор свойств для клавиш
 * @enum {number} KeyCode
*/
const KeyCodes = {
	SPACE: 32,
	ENTER: 13,
};

function keydownHandler(e) {
	if (e.keyCode === KeyCodes.ENTER || e.keyCode === KeyCodes.SPACE) {
		e.preventDefault();
		$(this).click();
	}
}

$('label').on('keydown', keydownHandler);

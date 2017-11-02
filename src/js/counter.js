$('.text-container__number').each(function count() {
	$(this).prop('Counter', 0).animate({
		Counter: $(this).text(),
	},
	{
		duration: 6000,
		easing: 'swing',
		step: function step(now) {
			$(this).text(Math.ceil(now));
		},
	});
});

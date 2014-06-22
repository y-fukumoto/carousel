$ ->
	class crossFade
		constructor: (speed, actionDelay) ->
			speed = speed
			delay = actionDelay
			@wrapper = $('.fadeWrapper')

			@wrapper.find('img').each(->
				$(@).css(opacity: 0)
			)
			@wrapper.find('img').eq(0).stop().animate(opacity: 1, 'z-index': 20, speed)

			setInterval ->
				$('.fadeWrapper').find('img').eq(0).animate(opacity: 0, speed).next('img').animate(opacity: 1, speed).end().appendTo('.fadeWrapper')
			,actionDelay

	fade = new crossFade(1000, 2000)
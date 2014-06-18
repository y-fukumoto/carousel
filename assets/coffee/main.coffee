$ ->
	class Carousel
		_moving = false
		constructor: (slideEle, speed) ->
			@$slideWrap = $(slideEle)
			@$slide = @$slideWrap.find('ul')
			@$slideList = @$slide.children('li')
			@listCount = @$slideList.length
			@imgWidth = @$slideList.find('img').width()
			@slideLoop = true
			@$prev = $('.prev')
			@$next = $('.next')
			@speed = speed
			@listContainer = @imgWidth + @listCount
			@addEvent()
		addEvent: ->
			@$prev.on('click', @movePrev)
			@$next.on('click', @moveNext)
		movePrev: () =>
			if !_moving
				_moving = true
				offset = @$slide.position().left
				@$slide.animate({ left: offset + @imgWidth}, @slideSpeed, -> _moving = false)
		moveNext: () =>
			if !_moving
				_moving = true
				offset = @$slide.position().left
				@$slide.animate({ left: offset - @imgWidth}, @slideSpeed, -> _moving = false)

	carousel = new Carousel('#frame', 400)

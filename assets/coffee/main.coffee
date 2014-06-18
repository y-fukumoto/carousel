$ ->
	class Carousel
		_moving = false
		_drag = false
		_start = null
		_end = null
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
			@listContainer = @imgWidth * @listCount
			@setPos()
			@addEvent()
		setPos: ->
			@$slide.css(width: @listContainer)
			@$slideList.last().prependTo(@$slide)
			@$slide.css(left: -@imgWidth)
		addEvent: ->
			@$prev.on('click', @movePrev)
			@$next.on('click', @moveNext)
			@$slide.on('touchstart', @touchStart)
			@$slide.on('touchmove', @touchMove)
			@$slide.on('touchend', @touchEnd)
			@$slide.on('touchleave', @touchLeave)
		movePrev: () =>
			if !_moving
				_moving = true
				offset = @$slide.position().left
				@$slide.animate({ left: offset + @imgWidth}, @slideSpeed, =>
					 _moving = false
					 @$slide.css(left: -@imgWidth)
					 @$slide.find('li:last').prependTo(@$slide)
				)
		moveNext: () =>
			if !_moving
				_moving = true
				offset = @$slide.position().left
				@$slide.animate({ left: offset - @imgWidth}, @slideSpeed, =>
					_moving = false
					@$slide.css(left: -@imgWidth)
					console.log(@$slideList.first())
					@$slide.find('li:first').appendTo(@$slide)
				)
		touchStart: (e) =>
			_drag = true
			_start = e.originalEvent.touches[0].pageX
			return false
		touchMove: (e) =>
			target = $(e.target)
			if _drag is true
				cur = target.position().left
				_end = e.originalEvent.touches[0].pageX
				set = _start - _end
				if set > @listCount - 1
					set = @listCount - 1
				if set < -(@listCount - 1)
					set = -(@listCount - 1)
				@$slide.css({left: (cur - set) + 'px'})
				return false
		touchEnd: (e) =>
			_drag = false
			set = start - end
			if set > 10
				current++

	carousel = new Carousel('#frame', 400)

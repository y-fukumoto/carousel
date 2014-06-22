$ ->
	class Carousel
		_moving = false
		_drag = false
		_slideX = null
		_accelX = null
		_start = null
		_end = null
		constructor: (slideEle, speed) ->
			@$slideWrap = $(slideEle)
			@$slide = @$slideWrap.find('ul')
			@$slideList = @$slide.children('li')
			@listCount = @$slideList.length
			@imgWidth = @$slideList.find('img').width()
			@decision = @imgWidth / 2
			@slideLoop = true
			@$prev = $('.prev')
			@$next = $('.next')
			@$pager = $('.pager').find('a')
			@speed = speed
			@listContainer = @imgWidth * @listCount
			@slideLimit = @listContainer - @imgWidth
			@setPos()
			@addEvent()
		setPos: ->
			@$slide.css(width: @listContainer)
			#@$slideList.last().prependTo(@$slide)
			@$slide.css(left: -@imgWidth)
		addEvent: ->
			@$prev.on('click', @movePrev)
			@$next.on('click', @moveNext)
			@$pager.on('click', @pagerClick)
			@$slide.on('touchstart', @touchStart)
			@$slide.on('touchmove', @touchMove)
			@$slide.on('touchend', @touchEnd)
			@$slide.on('touchleave', @touchLeave)
		pagerClick: (e) =>
			target = $(e.target)
			index = @$pager.index(target)
			@$slide.animate(left: - (@imgWidth * index), @speed)
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
					@$slide.find('li:first').appendTo(@$slide)
				)
		touchStart: (e) =>
			_drag = true
			_start = e.originalEvent.touches[0].pageX
			_slideX = @$slide.position().left
			#console.log _slideX
		touchMove: (e) =>
			_slideX = _slideX - (_start - e.originalEvent.touches[0].pageX)
			_accelX = (e.originalEvent.touches[0].pageX - _start) * 5
			_start = e.originalEvent.touches[0].pageX
			@$slide.css(left: _slideX)
		touchEnd: (e) =>
			if _accelX > 20
				_accelX = @decision
			if _accelX < -20
				_accelX = -@decision
			_slideX += _accelX
			_accelX = 0
			if _slideX > 0
				_slideX = 0
				if @slideLoop is true
					@$slide.animate(left: -((@imgWidth * @listCount) - @imgWidth), @speed)
			else if _slideX < -@slideLimit - 100
				if @slideLoop is true
					@$slide.animate(left: 0, @speed)
				else
					_slideX = -@slideLimit
					@$slide.animate(left: _slideX, @speed)
			else
				edge = _slideX % @imgWidth
				if edge > -(@imgWidth / 3)
					_slideX -= edge
					@$slide.animate(left: _slideX, @speed)
				else
					console.log "_slideX" +_slideX
					console.log "edge" + edge
					_slideX = _slideX - edge - @imgWidth
					console.log _slideX
					@$slide.animate(left: _slideX, 100)

	carousel = new Carousel('#frame', 400)

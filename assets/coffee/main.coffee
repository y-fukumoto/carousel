$ ->
	class Carousel
		_imgNum = 0
		_current = 0
		_touchX = null
		_touchY = null
		_slideX = null
		_slideY = null
		_moving =false
		constructor: (slideEle, thumbnail, speed) ->
			@$slideContainer = $(slideEle)
			@$slideList = @$slideContainer.find('li')
			@listCount = @$slideList.length
			@listWidth = @$slideList.find('img').eq(0).width()
			@$pager = $(thumbnail).find('li')
			@$btnPrev = $('.prev')
			@$btnNext = $('.next')
			@speed = speed

			@setSize(@$slideContainer)
			@setLeft(@$slideList)

			@addEvent()

		setLeft: (slideList) =>
			left = @listWidth
			slideList.each(->
				$(@).css('margin-left': -left)
				if _imgNum is _current
					$(@).css('margin-left': 0)
				_imgNum++
			)

		setSize: (slideEle) =>
			allWidth = @listWidth * @listCount
			maxHeight = 0
			slideEle.find('img').each(->
				height = $(@).height()
				if maxHeight < height
					maxHeight = height
			)
			slideEle.width(allWidth).height(maxHeight)

		addEvent: ->
			@$btnPrev.on('click', =>
				@slideMove(_current - 1)
			)
			@$btnNext.on('click', =>
				@slideMove(_current + 1)
			)
			@$pager.on('click', (e) =>
				e.preventDefault()
				$target = $(e.currentTarget)
				num = @$pager.index($target)
				if num isnt _current
					@slideMove(num)
			)
			@$slideList.on('touchstart', @touchStart)
			@$slideList.on('touchmove', @touchMove)
			@$slideList.on('touchend', @touchEnd)

		touchStart: (e) =>
			_touchX = e.originalEvent.changedTouches[0].pageX
			_slideX = @$slideContainer.position().left

			_touchY = e.originalEvent.changedTouches[0].pageY
			_slideY = @$slideContainer.position().top

		touchMove: (e) =>
			_slideX = _slideX - (_touchX - e.originalEvent.changedTouches[0].pageX)
			_touchX = e.originalEvent.changedTouches[0].pageX

			_slideY = _slideY - (_touchY - e.originalEvent.changedTouches[0].pageY)
			_touchY = e.originalEvent.changedTouches[0].pageY

			slideMathX = Math.abs(_slideX)
			slideMathY = Math.abs(_slideY)
			if slideMathX < slideMathY
				return @
			switch(true)
				when _touchX - 40 > (_touchX + _slideX)
					console.log "_touchX" + _touchX
					console.log _touchX + _slideX
					e.preventDefault()
					if _moving is true
						@slideMove(_current + 1)
						_moving = false
				when _touchX + 40 < (_touchX + _slideX)
					console.log _touchX + _slideX
					e.preventDefault()
					if _moving is true
						@slideMove(_current - 1)
						_moving = false

		touchEnd: (e) =>
			_moving = true

		slideMove: (goTo) =>
			left = null
			if _current < goTo
				pos = @listWidth
			else
				pos = -@listWidth

			if goTo is _imgNum
				goTo = 0
			else if goTo is -1
				goTo = _imgNum - 1

			@$slideList.eq(goTo).css('margin-left': pos).stop(true, true).animate('margin-left': 0, @speed)
			@$slideList.eq(_current).stop(true, true).animate('margin-left': -pos, @speed)
			_current = goTo
			
	carousel = new Carousel('#slider','.pager', 400)

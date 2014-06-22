(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $(function() {
    var Carousel, carousel;
    Carousel = (function() {
      var _current, _imgNum, _moving, _slideX, _slideY, _touchX, _touchY;

      _imgNum = 0;

      _current = 0;

      _touchX = null;

      _touchY = null;

      _slideX = null;

      _slideY = null;

      _moving = false;

      function Carousel(slideEle, thumbnail, speed) {
        this.slideMove = __bind(this.slideMove, this);
        this.touchEnd = __bind(this.touchEnd, this);
        this.touchMove = __bind(this.touchMove, this);
        this.touchStart = __bind(this.touchStart, this);
        this.setSize = __bind(this.setSize, this);
        this.setLeft = __bind(this.setLeft, this);
        this.$slideContainer = $(slideEle);
        this.$slideList = this.$slideContainer.find('li');
        this.listCount = this.$slideList.length;
        this.listWidth = this.$slideList.find('img').eq(0).width();
        this.$pager = $(thumbnail).find('li');
        this.$btnPrev = $('.prev');
        this.$btnNext = $('.next');
        this.speed = speed;
        this.setSize(this.$slideContainer);
        this.setLeft(this.$slideList);
        this.addEvent();
      }

      Carousel.prototype.setLeft = function(slideList) {
        var left;
        left = this.listWidth;
        return slideList.each(function() {
          $(this).css({
            'margin-left': -left
          });
          if (_imgNum === _current) {
            $(this).css({
              'margin-left': 0
            });
          }
          return _imgNum++;
        });
      };

      Carousel.prototype.setSize = function(slideEle) {
        var allWidth, maxHeight;
        allWidth = this.listWidth * this.listCount;
        maxHeight = 0;
        slideEle.find('img').each(function() {
          var height;
          height = $(this).height();
          if (maxHeight < height) {
            return maxHeight = height;
          }
        });
        return slideEle.width(allWidth).height(maxHeight);
      };

      Carousel.prototype.addEvent = function() {
        var _this = this;
        this.$btnPrev.on('click', function() {
          return _this.slideMove(_current - 1);
        });
        this.$btnNext.on('click', function() {
          return _this.slideMove(_current + 1);
        });
        this.$pager.on('click', function(e) {
          var $target, num;
          e.preventDefault();
          $target = $(e.currentTarget);
          num = _this.$pager.index($target);
          if (num !== _current) {
            return _this.slideMove(num);
          }
        });
        this.$slideList.on('touchstart', this.touchStart);
        this.$slideList.on('touchmove', this.touchMove);
        return this.$slideList.on('touchend', this.touchEnd);
      };

      Carousel.prototype.touchStart = function(e) {
        _touchX = e.originalEvent.changedTouches[0].pageX;
        _slideX = this.$slideContainer.position().left;
        _touchY = e.originalEvent.changedTouches[0].pageY;
        return _slideY = this.$slideContainer.position().top;
      };

      Carousel.prototype.touchMove = function(e) {
        var slideMathX, slideMathY;
        _slideX = _slideX - (_touchX - e.originalEvent.changedTouches[0].pageX);
        _touchX = e.originalEvent.changedTouches[0].pageX;
        _slideY = _slideY - (_touchY - e.originalEvent.changedTouches[0].pageY);
        _touchY = e.originalEvent.changedTouches[0].pageY;
        slideMathX = Math.abs(_slideX);
        slideMathY = Math.abs(_slideY);
        if (slideMathX < slideMathY) {
          return this;
        }
        switch (true) {
          case _touchX - 40 > (_touchX + _slideX):
            console.log("_touchX" + _touchX);
            console.log(_touchX + _slideX);
            e.preventDefault();
            if (_moving === true) {
              this.slideMove(_current + 1);
              return _moving = false;
            }
            break;
          case _touchX + 40 < (_touchX + _slideX):
            console.log(_touchX + _slideX);
            e.preventDefault();
            if (_moving === true) {
              this.slideMove(_current - 1);
              return _moving = false;
            }
        }
      };

      Carousel.prototype.touchEnd = function(e) {
        return _moving = true;
      };

      Carousel.prototype.slideMove = function(goTo) {
        var left, pos;
        left = null;
        if (_current < goTo) {
          pos = this.listWidth;
        } else {
          pos = -this.listWidth;
        }
        if (goTo === _imgNum) {
          goTo = 0;
        } else if (goTo === -1) {
          goTo = _imgNum - 1;
        }
        this.$slideList.eq(goTo).css({
          'margin-left': pos
        }).stop(true, true).animate({
          'margin-left': 0
        }, this.speed);
        this.$slideList.eq(_current).stop(true, true).animate({
          'margin-left': -pos
        }, this.speed);
        return _current = goTo;
      };

      return Carousel;

    })();
    return carousel = new Carousel('#slider', '.pager', 400);
  });

}).call(this);

/*
//@ sourceMappingURL=main.js.map
*/
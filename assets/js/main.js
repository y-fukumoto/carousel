(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $(function() {
    var Carousel, carousel;
    Carousel = (function() {
      var _accelX, _drag, _end, _moving, _slideX, _start;

      _moving = false;

      _drag = false;

      _slideX = null;

      _accelX = null;

      _start = null;

      _end = null;

      function Carousel(slideEle, speed) {
        this.touchEnd = __bind(this.touchEnd, this);
        this.touchMove = __bind(this.touchMove, this);
        this.touchStart = __bind(this.touchStart, this);
        this.moveNext = __bind(this.moveNext, this);
        this.movePrev = __bind(this.movePrev, this);
        this.pagerClick = __bind(this.pagerClick, this);
        this.$slideWrap = $(slideEle);
        this.$slide = this.$slideWrap.find('ul');
        this.$slideList = this.$slide.children('li');
        this.listCount = this.$slideList.length;
        this.imgWidth = this.$slideList.find('img').width();
        this.decision = this.imgWidth / 2;
        this.slideLoop = true;
        this.$prev = $('.prev');
        this.$next = $('.next');
        this.$pager = $('.pager').find('a');
        this.speed = speed;
        this.listContainer = this.imgWidth * this.listCount;
        this.slideLimit = this.listContainer - this.imgWidth;
        this.setPos();
        this.addEvent();
      }

      Carousel.prototype.setPos = function() {
        this.$slide.css({
          width: this.listContainer
        });
        return this.$slide.css({
          left: -this.imgWidth
        });
      };

      Carousel.prototype.addEvent = function() {
        this.$prev.on('click', this.movePrev);
        this.$next.on('click', this.moveNext);
        this.$pager.on('click', this.pagerClick);
        this.$slide.on('touchstart', this.touchStart);
        this.$slide.on('touchmove', this.touchMove);
        this.$slide.on('touchend', this.touchEnd);
        return this.$slide.on('touchleave', this.touchLeave);
      };

      Carousel.prototype.pagerClick = function(e) {
        var index, target;
        target = $(e.target);
        index = this.$pager.index(target);
        return this.$slide.animate({
          left: -(this.imgWidth * index)
        }, this.speed);
      };

      Carousel.prototype.movePrev = function() {
        var offset,
          _this = this;
        if (!_moving) {
          _moving = true;
          offset = this.$slide.position().left;
          return this.$slide.animate({
            left: offset + this.imgWidth
          }, this.slideSpeed, function() {
            _moving = false;
            _this.$slide.css({
              left: -_this.imgWidth
            });
            return _this.$slide.find('li:last').prependTo(_this.$slide);
          });
        }
      };

      Carousel.prototype.moveNext = function() {
        var offset,
          _this = this;
        if (!_moving) {
          _moving = true;
          offset = this.$slide.position().left;
          return this.$slide.animate({
            left: offset - this.imgWidth
          }, this.slideSpeed, function() {
            _moving = false;
            _this.$slide.css({
              left: -_this.imgWidth
            });
            return _this.$slide.find('li:first').appendTo(_this.$slide);
          });
        }
      };

      Carousel.prototype.touchStart = function(e) {
        _drag = true;
        _start = e.originalEvent.touches[0].pageX;
        return _slideX = this.$slide.position().left;
      };

      Carousel.prototype.touchMove = function(e) {
        _slideX = _slideX - (_start - e.originalEvent.touches[0].pageX);
        _accelX = (e.originalEvent.touches[0].pageX - _start) * 5;
        _start = e.originalEvent.touches[0].pageX;
        return this.$slide.css({
          left: _slideX
        });
      };

      Carousel.prototype.touchEnd = function(e) {
        var edge;
        if (_accelX > 20) {
          _accelX = this.decision;
        }
        if (_accelX < -20) {
          _accelX = -this.decision;
        }
        _slideX += _accelX;
        _accelX = 0;
        if (_slideX > 0) {
          _slideX = 0;
          if (this.slideLoop === true) {
            return this.$slide.animate({
              left: -((this.imgWidth * this.listCount) - this.imgWidth)
            }, this.speed);
          }
        } else if (_slideX < -this.slideLimit - 100) {
          if (this.slideLoop === true) {
            return this.$slide.animate({
              left: 0
            }, this.speed);
          } else {
            _slideX = -this.slideLimit;
            return this.$slide.animate({
              left: _slideX
            }, this.speed);
          }
        } else {
          edge = _slideX % this.imgWidth;
          if (edge > -(this.imgWidth / 3)) {
            _slideX -= edge;
            return this.$slide.animate({
              left: _slideX
            }, this.speed);
          } else {
            console.log("_slideX" + _slideX);
            console.log("edge" + edge);
            _slideX = _slideX - edge - this.imgWidth;
            console.log(_slideX);
            return this.$slide.animate({
              left: _slideX
            }, 100);
          }
        }
      };

      return Carousel;

    })();
    return carousel = new Carousel('#frame', 400);
  });

}).call(this);

/*
//@ sourceMappingURL=main.js.map
*/
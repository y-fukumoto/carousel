(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $(function() {
    var Carousel, carousel;
    Carousel = (function() {
      var _drag, _end, _moving, _start;

      _moving = false;

      _drag = false;

      _start = null;

      _end = null;

      function Carousel(slideEle, speed) {
        this.touchEnd = __bind(this.touchEnd, this);
        this.touchMove = __bind(this.touchMove, this);
        this.touchStart = __bind(this.touchStart, this);
        this.moveNext = __bind(this.moveNext, this);
        this.movePrev = __bind(this.movePrev, this);
        this.$slideWrap = $(slideEle);
        this.$slide = this.$slideWrap.find('ul');
        this.$slideList = this.$slide.children('li');
        this.listCount = this.$slideList.length;
        this.imgWidth = this.$slideList.find('img').width();
        this.slideLoop = true;
        this.$prev = $('.prev');
        this.$next = $('.next');
        this.speed = speed;
        this.listContainer = this.imgWidth * this.listCount;
        this.setPos();
        this.addEvent();
      }

      Carousel.prototype.setPos = function() {
        this.$slide.css({
          width: this.listContainer
        });
        this.$slideList.last().prependTo(this.$slide);
        return this.$slide.css({
          left: -this.imgWidth
        });
      };

      Carousel.prototype.addEvent = function() {
        this.$prev.on('click', this.movePrev);
        this.$next.on('click', this.moveNext);
        this.$slide.on('touchstart', this.touchStart);
        this.$slide.on('touchmove', this.touchMove);
        this.$slide.on('touchend', this.touchEnd);
        return this.$slide.on('touchleave', this.touchLeave);
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
            console.log(_this.$slideList.first());
            return _this.$slide.find('li:first').appendTo(_this.$slide);
          });
        }
      };

      Carousel.prototype.touchStart = function(e) {
        _drag = true;
        _start = e.originalEvent.touches[0].pageX;
        return false;
      };

      Carousel.prototype.touchMove = function(e) {
        var cur, set, target;
        target = $(e.target);
        if (_drag === true) {
          cur = target.position().left;
          _end = e.originalEvent.touches[0].pageX;
          set = _start - _end;
          if (set > this.listCount - 1) {
            set = this.listCount - 1;
          }
          if (set < -(this.listCount - 1)) {
            set = -(this.listCount - 1);
          }
          this.$slide.css({
            left: (cur - set) + 'px'
          });
          return false;
        }
      };

      Carousel.prototype.touchEnd = function(e) {
        var set;
        _drag = false;
        set = start - end;
        if (set > 10) {
          return current++;
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
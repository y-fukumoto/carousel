(function() {
  $(function() {
    var crossFade, fade;
    crossFade = (function() {
      function crossFade(speed, actionDelay) {
        var delay;
        speed = speed;
        delay = actionDelay;
        this.wrapper = $('.fadeWrapper');
        this.wrapper.find('img').each(function() {
          return $(this).css({
            opacity: 0
          });
        });
        this.wrapper.find('img').eq(0).stop().animate({
          opacity: 1,
          'z-index': 20
        }, speed);
        setInterval(function() {
          return $('.fadeWrapper').find('img').eq(0).animate({
            opacity: 0
          }, speed).next('img').animate({
            opacity: 1
          }, speed).end().appendTo('.fadeWrapper');
        }, actionDelay);
      }

      return crossFade;

    })();
    return fade = new crossFade(1000, 2000);
  });

}).call(this);

/*
//@ sourceMappingURL=crossFade.js.map
*/
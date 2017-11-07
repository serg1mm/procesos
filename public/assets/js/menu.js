/* FOOTER */
function footerSlideOpen() {
  console.log("OPEN");
  $('.navbar-fixed-bottom').animate({ height: '25em' });
  $('#footerSlideButton').removeClass('fslideopen').addClass('fslideclose');
  $(".footercont").fadeIn(1000);
  $(".cardropped").fadeIn(1000);
}
function footerSlideClose() {
  console.log("CLOSE");
  $('.navbar-fixed-bottom').delay(100).animate({ height: '0em' });
  $('#footerSlideButton').removeClass('fslideclose').addClass('fslideopen');
  $(".footercont").fadeOut(400);
  $(".cardropped").fadeOut(400);
}
(function($) {
    $.fn.openClose = function(func1, func2) {
        var funcs = [footerSlideOpen, footerSlideClose];
        this.data('toggleclicked', 0);
        this.click(function() {
            var data = $(this).data();
            var tc = data.toggleclicked;
            $.proxy(funcs[tc], this)();
            data.toggleclicked = (tc + 1) % 2;
        });
        return this;
    };
}(jQuery));
$('#footerSlideButton').openClose(function (e) {
  console.log('Switched');
});
$(document).click(function(e) {
  if ($('#footerSlideButton').hasClass('fslideclose')) {
    if (!$(e.target).is('#footerSlideButton')) {
      footerSlideClose();
      console.log('Closed with body');
    } else {
      console.log('Open with button')
    }
    return false;
  } else {
    console.log('Nothing to close');
  }

});

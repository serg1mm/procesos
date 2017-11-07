// SCROLL
function sloopr() {
  $('#footer-load').stop().animate({
    scrollLeft: '+=500'
  }, 1000, 'linear', sloopr);
}

function sloopl() {
  $('#footer-load').stop().animate({
    scrollLeft: '-=500'
  }, 1000, 'linear', sloopl);
}

function sstop() {
  $('#footer-load').stop();
}

function scrollThis(targetElement, speed) {
  var scrollWidth = $(targetElement).get(0).scrollWidth;
  var clientWidth = $(targetElement).get(0).clientWidth;
  $(targetElement).animate({
    scrollLeft: scrollWidth - clientWidth
  }, 600, 'easeOutElastic');
};
$('#footer-load').scroll(function() {
  if ($(this).scrollLeft() == 0) {
    $('#footerleft').fadeOut();
    $('#footerright').fadeIn();
    console.log('Start of x-scroll');
  } else if ($('#footerleft').css('display') != 'block') {
    $('#footerleft, #footerright').fadeIn();
  } else if ($('#footer-load').scrollLeft() == ($('#footer-load').get(0).scrollWidth - $('#footer-load').get(0).clientWidth)) {
    $('#footerright').fadeOut();
    console.log('End of x-scroll');
  }
}).scroll();
$('#footerright').hover(function() {
  sloopr();
}, function() {
  sstop();
});
$('#footerleft').hover(function() {
  $('#footerright').fadeIn();
  sloopl();
}, function() {
  sstop();
});
//JSON LOAD
$(document).ready(function() {
  var div,
    rb = [],
    ab = [],
    i = 0,
    json = $.getJSON("db/json/report.json", function(json) {
      for (let element of json) {
        rb[i] = parseFloat(element.reserved_imp.replace(',', ''));
        ab[i] = parseFloat(element.available_imp.replace(',', ''));
        i++;
      }
      var rbill = rb[03] + rb[05] + rb[06] + rb[10] + rb[14] + rb[15] + rb[17] + rb[18] + rb[19] + rb[20] + rb[21] + rb[28] + rb[29],
        abill = ab[03] + ab[05] + ab[06] + ab[10] + ab[14] + ab[15] + ab[17] + ab[18] + ab[19] + ab[20] + ab[21] + ab[28] + ab[29],
        rsbil = rb[03] + rb[05] + rb[10] + rb[14] + rb[18] + rb[20],
        asbil = ab[03] + ab[05] + ab[10] + ab[14] + ab[18] + ab[20],
        rhal = rb[01] + rb[02] + rb[03] + rb[04] + rb[05] + rb[06] + rb[07] + rb[08] + rb[09] + rb[10] + rb[11] + rb[12] + rb[13] + rb[14] + rb[15] + rb[16] + rb[17] + rb[22] + rb[23] + rb[24] + rb[25] + rb[26] + rb[27] + rb[28],
        ahal = ab[01] + ab[02] + ab[03] + ab[04] + ab[05] + ab[06] + ab[07] + ab[08] + ab[09] + ab[10] + ab[11] + ab[12] + ab[13] + ab[14] + ab[15] + ab[16] + ab[17] + ab[22] + ab[23] + ab[24] + ab[25] + ab[26] + ab[27] + ab[28],
        rmpu = rb[00] + rb[01] + rb[02] + rb[03] + rb[04] + rb[05] + rb[06] + rb[07] + rb[08] + rb[09] + rb[10] + rb[11] + rb[12] + rb[13] + rb[14] + rb[15] + rb[16] + rb[17] + rb[22] + rb[23] + rb[24] + rb[25] + rb[26] + rb[27] + rb[28],
        ampu = ab[00] + ab[01] + ab[02] + ab[03] + ab[04] + ab[05] + ab[06] + ab[07] + ab[08] + ab[09] + ab[10] + ab[11] + ab[12] + ab[13] + ab[14] + ab[15] + ab[16] + ab[17] + ab[22] + ab[23] + ab[24] + ab[25] + ab[26] + ab[27] + ab[28],
        startCard = function() {
          $('.ui-draggable-dragging .iinfo').fadeOut('iinfo');
          $(".ui-draggable-dragging .iname").animate({
            marginTop: '5em'
          });
          footerSlideOpen();
          return false;
        },
        stopCard = function() {
          $(".ui-draggable-dragging .iname").animate({
            marginTop: '0em'
          });
          $('.ui-draggable-dragging .iinfo').fadeIn('iinfo');
          return false;
        };
      //LOAD DRAGG CARDS
      $(function() {
        div = $('<div/>');
        div.append("<div class='iname'><h2>Billboard</h2><p>970x250</p></div>" + "<div class='iinfo'><h4>Reserved</h4><p>" + rbill.toLocaleString() + "</p>" + "<h4>Available</h4><p>" + abill.toLocaleString() + "</p></div>").addClass("card").attr('id', 'billboard');
        $('.data').append(div);
        div = $('<div/>');
        div.append("<div class='iname'><h2>Superbillboard</h2><p>970x550</p></div>" + "<div class='iinfo'><h4>Reserved</h4><p>" + rsbil.toLocaleString() + "</p>" + "<h4>Available</h4><p>" + asbil.toLocaleString() + "</p></div>").addClass("card").attr('id', 'superbillboard');
        $('.data').append(div);
        div = $('<div/>');
        div.append("<div class='iname'><h2>Half Page</h2><p>300x600</p></div>" + "<div class='iinfo'><h4>Reserved</h4><p>" + rhal.toLocaleString() + "</p>" + "<h4>Available</h4><p>" + ahal.toLocaleString() + "</p></div>").addClass("card").attr('id', 'halfpage');
        $('.data').append(div);
        div = $('<div/>');
        div.append("<div class='iname'><h2>MPU</h2><p>300x250</p></div>" + "<div class='iinfo'><h4>Reserved</h4><p>" + rmpu.toLocaleString() + "</p>" + "<h4>Available</h4><p>" + ampu.toLocaleString() + "</p></div>").addClass("card").attr('id', 'mpu');
        $('.data').append(div);
        $('.card').draggable({
          revert: function(dropOk) {
            if (!dropOk) {
              footerSlideClose();
              console.log("Closing footer");
              return true;
            } else {
              console.log("Dropped");
              return false;
            }
          },
          opacity: 0.7,
          zIndex: 100,
          helper: 'clone',
          containment: 'body',
          start: function(event, ui) {
            startCard();
          },
          stop: function(event, ui) {
            stopCard();
          }
        });
      });
    });
  //DROP CONTAINER
  $(".navbar-fixed-bottom").droppable({
    grid: [80, 80],
    drop: function(event, ui) {
      var dCard = function() {
        var draggarea = $(".footercont"),
          parentWidth = $('#footer-load').parent().width(),
          actualdragg = $(ui.draggable),
          cardwidth = $(actualdragg).css("width"),
          actualId = actualdragg.attr('id'),
          cCount = $('.cardropped').length + 1;
        //ADD CARD
        $(draggarea).append($(ui.helper).clone()).fadeIn('slow').css("display", "inline-block");
        $('.card.ui-draggable.ui-draggable-handle.ui-draggable-dragging').attr('id', actualdragg.attr('id')).addClass('cardropped').removeClass('ui-draggable-dragging ui-draggable-handle ui-draggable');
        $('.cardropped').find("p", "h4").html("").attr('id', actualdragg.attr('id'));
        $('.cardropped').find("h2").css("font-size", "20px");
        $('.iname').css('margin-top', '0em');
        actualdragg.attr('id', actualdragg.attr('id'));
        console.log(cCount + ' card/s');
        draggarea.each(function() {
          if ($(this).width() > parentWidth) {
            scrollThis($('#footer-load'), 200, 'easeOutElastic');
          }
        });
        //ADD TAB
        actualdragg.each(function() {
          if ($('.footertabs').find(div).attr('id') == $(this).attr('id')) {
            console.log('Tab already exists!');
          } else {
            div = $('<div/>').fadeIn('slow').css("display", "inline-block");
            div.append("<p>" + actualdragg.attr('id') + " (00)" + "</p>").attr('id', $(this).attr('id')).addClass('formtab');
            $('.footertabs').append(div).css('textTransform', 'uppercase');
            console.log('New tab created');
          }
        });
      };
      if (ui.draggable.attr('id') == 'billboard') {
        dCard();
        console.log('Billboard!');
      } else if (ui.draggable.attr('id') == 'superbillboard') {
        dCard();
        console.log('Superbillboard!');
      } else if (ui.draggable.attr('id') == 'halfpage') {
        dCard();
        console.log('Halfpage!');
      } else if (ui.draggable.attr('id') == 'mpu') {
        dCard();
        console.log('MPU!');
      } else {
        console.log('Not valid card');
      }
    }
  });
});

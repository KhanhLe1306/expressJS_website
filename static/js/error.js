const statusCode = document.querySelector('.status').innerHTML; //   or textContent
var FiveOhFive = document.getElementById('five');
var FiveOhFiveContext = FiveOhFive.getContext('2d');
FiveOhFiveFont(FiveOhFiveContext, FiveOhFive);
FiveOhFiveContext.globalCompositeOperation = 'destination-out';
FiveOhFiveContext.fillText(statusCode, 275, 100);

function FiveOhFiveFont(ctx, canvas) {
  var grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, '#000');
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.fillStyle = 'red';
  ctx.font = '15em Righteous';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
}

var WrapperW = $('.Wrapper').width();
var WrapperH = $('.Wrapper').height();

$('.left').click(function () {
  for (var j = 1; j <= 500; j++) {
    var X = (Math.random() * WrapperW) % (WrapperW >> 0);
    var Y = (Math.random() * WrapperH) % (WrapperH >> 0);
    var nTop = Math.floor(Math.random() * WrapperW);
    var nLeft = Math.floor(Math.random() * WrapperH);
    var $child = $(this).clone();

    $('.Wrapper').append($child);
    $child
      .css({ top: X, left: -200 + Y })
      .animate({ top: nTop + 'px', left: 50 + nLeft + 'px' }, 8000);
  }
});

$('.right').click(function () {
  for (var j = 1; j <= 500; j++) {
    var X = (Math.random() * WrapperW) % (WrapperW >> 0);
    var Y = (Math.random() * WrapperH) % (WrapperH >> 0);
    var nTop = Math.floor(Math.random() * WrapperW);
    var nLeft = Math.floor(Math.random() * WrapperH);
    var $child = $(this).clone();

    $('.Wrapper').append($child);
    $child
      .css({ top: X, left: 500 + Y })
      .animate({ top: nTop + 'px', left: 270 + nLeft + 'px' }, 8000);
  }
});

$('document').ready(function () {
  $('.Wrapper,h1,p').fadeIn(100);
  setTimeout(function () {
    $('.right, .left').trigger('click');
  }, 0);
});

$(function () {
  var number = $('.banner ul li').size() - 1;
  var cur = 0;
  var timer = setInterval(slideNext, 3000);
  $('.banner').mouseover(function(){
    clearInterval(timer);
  }).mouseout(function(){
    timer=setInterval(slideNext,3000);
  });
  $('.banner .next').click(function(){
    slideNext();
  });
  $('.banner .prev').click(function(){
    slidePrev();
  });
  $('.indicator em').mouseover(function(){
    var now=$(this).index('.indicator em');//用户鼠标移入的是第几个圆点
    if(now!=cur){
      $('.banner ul li').eq(cur).stop().fadeOut();
      $('.banner ul li').eq(now).stop().fadeIn();
      $('.indicator em').removeClass().eq(now).addClass('active');
      cur=now;
    }
  });

  function slideNext() {
    if (cur < number) {
      $('.banner ul li').eq(cur).stop().fadeOut();
      $('.banner ul li').eq(cur+1).stop().fadeIn();
      $('.indicator em').removeClass().eq(cur + 1).addClass('active');
      cur++;
    } else {
      $('.banner ul li').eq(cur).stop().fadeOut();
      $('.banner ul li').eq(0).stop().fadeIn();
      $('.indicator em').removeClass().eq(0).addClass('active');
      cur = 0;
    }
  }

  function slidePrev() {
    if (cur > 0) {//上一个
      $('.banner ul li').eq(cur).stop().fadeOut();
      $('.banner ul li').eq(cur - 1).stop().fadeIn();
      $('.indicator em').removeClass().eq(cur - 1).addClass('active');
      cur--;
    } else {//第一个
      $('.banner ul li').eq(cur).stop().fadeOut();
      $('.banner ul li').eq(number).stop().fadeIn();
      $('.indicator em').removeClass().eq(number).addClass('active');
      cur = number;
    }
  }
});

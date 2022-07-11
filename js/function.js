$(function(){
 
  //up 이동버튼 
  const $gnbmnu = $('.gnb > li');
  const $up = $('aside > span > a');

  $(window).on('scroll', function(){

    let scrollTop = $(this).scrollTop();

    if(scrollTop > 0){
      $up.stop().show();
    } else {
      $up.stop().hide();
    }
  });

  $up.on('click', function(evt){
    evt.preventDefault();

    let scrollTop = $(window).scrollTop();

    $('html,body').stop().animate({
      scrollTop:0
    })
  });  

  //메인 슬라이드
  const $container = $(' .view > .slide-container');
  const $slide = $container.find('p');
  const $btnplay = $(' .view > .btn > a');

  $(window).on('load', function(){

    nowIdx = $slide.index(this);
    intervalKey = setInterval(function(){

      if(nowIdx < 9) {
        nowIdx ++;
      } else {
        nowIdx = 0;
      }
  
      $container.stop().animate({
        left: -620 * 11
      }, function(){
        $('.view > .slide-container > p:first-child').appendTo($container);
        $container.css({ left: -620 * 10});
      });
    },2500);
  });

  $btnplay.on('click', function(evt){
    evt.preventDefault();

    if( $(this).hasClass('play') ){

      $(this).removeClass('play');
      clearInterval(intervalKey);
      
    } else {
      $(window).trigger('load');
      $(this).addClass('play');
    }
  });

  //작은 공통 슬라이드
  const $next = $('div > span > .next');
  const $back = $('div > span > .back');
  const $container2 = $('h4+div');
  const $items = $container2.children('ol');

  const slideFn = function(evt) {
    const btnIdx = $next.index(evt.currentTarget);
    const btnIdx2 = $back.index(evt.currentTarget);

    $next.eq(btnIdx).on('click', function(evt){
      evt.preventDefault();

      $items.eq(btnIdx).stop().animate({
        left: -400
      });
    });

    $back.eq(btnIdx2).on('click', function(evt){
      evt.preventDefault();

      $items.eq(btnIdx2).stop().animate({
        left: 0
      });
    });
  };

  $back.on('click', function(evt){
    evt.preventDefault();

    slideFn(evt);
  });

  $next.on('click', function(evt){
    evt.preventDefault();

    slideFn(evt);
  });

  //검색창 활성화
  const $btnsrch = $('.srch > a');
  const $page = $('.srchpage');
  
  $btnsrch.on('mouseover', function(evt){
    evt.preventDefault();

    $page.show()
  });

  $btnsrch.on('mouseleave', function(evt){
    evt.preventDefault();

    $page.hide()
  });

  $page.on('mouseover', function(evt){
    $btnsrch.trigger('mouseover')
  });
  $page.on('mouseleave', function(evt){
    $btnsrch.trigger('mouseleave')
  });

  //전체카테고리 페이지 활성화
  const $btnctry = $('nav > .gnb > .on > a');
  const $ctrypg = $('.wholectgr');

  $btnctry.on('mouseover', function(evt){
    evt.preventDefault();

    $ctrypg.show()
  });

  $btnctry.on('mouseleave', function(evt){
    evt.preventDefault();

    $ctrypg.hide()
  });
  
  $ctrypg.on('mouseover', function(evt){
    $btnctry.trigger('mouseover')
  });
  $ctrypg.on('mouseleave', function(evt){
    $btnctry.trigger('mouseleave')
  });

  //gnb bar 동적 활성화
  $gnbmnu.hover(
    function(){
      mnuidx = $gnbmnu.index(this);

      $gnbmnu.eq(mnuidx).children('a').append('<span class="bar"></span>');

        const barWidth = $gnbmnu.eq(mnuidx).find('.mnu').width();
      
        $gnbmnu.eq(mnuidx).find('.bar').css({
          width: barWidth,
          marginLeft: -barWidth,
          marginBottom: 5
        });
    }
    ,
    function(){
      $('.bar').remove();
    }
  )
  
  //nav 고정
  $(window).on('scroll', function() {

		const $logo = $('.logo');
		const logoBottomDistance = $logo.offset().top + $logo.height();

		console.log('logoBottomDistance=', logoBottomDistance);

		if ($(this).scrollTop() > logoBottomDistance) {
			$('#wrap > header > nav').addClass('fixed').width(1000).css({
				marginLeft: -500
			});
		} else {
			$('#wrap > header > nav').removeClass('fixed').width(1000).css({
				marginLeft: 0
			});
		}
	});

}); //준비핸들러 끝
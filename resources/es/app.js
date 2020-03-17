var current_scrollY;

function modalOpen() {
	current_scrollY = $(window).scrollTop();
	$('.wrapper').attr('data-modalActive', 'true');
	$('.wrapper').css({
		position: 'fixed',
		top: -1 * current_scrollY,
		'z-index': 10
	});
	$('html, body').prop({ scrollTop: 0 });
}

function modalClose() {
	$('.header__hamburger').attr('data-active', '');
	$('.wrapper').attr('data-modalActive', 'false');
	$('.wrapper').css({
		position: 'relative',
		top: 'auto'
	});
	$('html, body').prop({ scrollTop: current_scrollY });
	return;
}

$(function () {
	$('a[href^="#"]').click(function () {
		var headerH = $('header').outerHeight();
		var speed = 500;
		var href = $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({ scrollTop: position - headerH}, speed, "swing");
		return false;
	});

	$(window).scroll(function (){
		$(".fade-off").each(function(){
			var imgPos = $(this).offset().top;
			var scroll = $(window).scrollTop();
			var windowHeight = $(window).height();
			if (scroll > imgPos - windowHeight + windowHeight/5){
				$(this).addClass("fade-on");
			}
		});
	});
});

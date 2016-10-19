$(document).ready(function() {
    projectList();
	heroSize();
    heroBG();
    scrollMovement();
    navigationActive();
    menuClick();
    introPosition();
    heroScroll();
    scrollNav();
    footerSize();
    subtleMovements();
	$( window ).resize(function() {
        footerSize();
		heroSize(); 
        heroBG();
        workSize();
        navigationActive();
        introPosition();
	});
});
$(window).load(function(){
    workSize();
    $(".loadin").fadeIn(3000);
    $(".lazy").lazyload({effect : "fadeIn"});
});

/************************
        FUNCTIONS
************************/
/*NAVIGATION*/
    function navigationActive(){
        var sectionArray = [];
        $('section').each(function() {
            var sectionLocation = $(this).offset().top - 61;
            sectionArray.push(sectionLocation)
        });
        $(window).scroll(function(){
            var scrollTop = $(window).scrollTop();
            $("nav li").removeClass("active");
            if(scrollTop >= 0 && scrollTop <= sectionArray[1]){
                $("nav li.hello").addClass("active");
            }else if(scrollTop >= sectionArray[1] && scrollTop <= sectionArray[2]){
                $("nav li.who").addClass("active");
            }else if(scrollTop >= sectionArray[2] && scrollTop <= sectionArray[3]){
                $("nav li.work").addClass("active");
            }else if(scrollTop >= sectionArray[3]){
                $("nav li.experience").addClass("active");
            };

        });
    }
    function scrollMovement(){
        var windowWidth = $(window).width();
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    if( $(window).width() >= 701) {
                        $('html,body').animate({
                            scrollTop: target.offset().top - 60
                        }, 1000);
                        return false;
                    }else{
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    };
                };
            };
        });
    }
    function scrollNav(){
        $(window).on("scroll", function() {
            $('#main-navigation').toggleClass('scroll', $(document).scrollTop() >= 80);
        });
    }
/*HEIGHT AND WIDTH SIZES*/
    function heroSize(){
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();
        $("header, #hero, #hello").height(windowHeight);
        $("#hero .mask").height(windowHeight+100);
    }
    function workSize(){
        var workWidth = $("#work a").width();
        $("#work a, #work .title").height(workWidth);
    }
    function footerSize(){
        var footerSize = $("footer").outerHeight();
        $("#experience").css("margin-bottom",footerSize);
    }
    function introPosition(){
        var textHeight = $("#hello .text.title").outerHeight();
        $("#hello .text.title").css("margin-top",-textHeight/2);
    }
/*MOBILE NAV*/
    function menuClick(){
        $("#main-navigation button").toggle(function(){
            $("#main-navigation .nav-collapse").fadeIn(400);
            $("#main-navigation").addClass("open");
            $("section, #hero, footer").animate({
                left:205
            }, 300, function() { $("#main-navigation button").addClass("close-btn"); });
        }, function(){
            $("#main-navigation .nav-collapse").fadeOut(200);
            $("#main-navigation").removeClass("open");
            $("section, #hero, footer").animate({
                left:0
            }, 300, function() { $("#main-navigation button").removeClass("close-btn"); });
        });
    }
/*HERO TEXT FADE, HERO OPACITY*/
    function heroScroll(){
        $(window).on('scroll', function () {
            var windowHeight = $(window).height();
            pxlCount = $(document).scrollTop()/1000;
            $("#hero .mask.fade").css("opacity", pxlCount) ;   
            if($(window).scrollTop() > 20 && $(window).scrollTop() <= windowHeight) {
                var init = 80;
                var top = $(window).scrollTop();
                var calc = parseFloat(init/top);
                $('#hello .text, #hello a.scroller').css('opacity', calc);
            } else {
                if ($(window).scrollTop() < 50) {
                    $('#hello .text, #hello a.scroller').css('opacity', '1');
                } else if($(window).scrollTop() > windowHeight) {
                    $('#hello .text, #hello a.scroller').css('opacity', '0');
                };
            };
        });
    }
    function heroBG(){
        $(window).scroll(function(){
            var scrollTop = $(window).scrollTop();
            if(scrollTop >= ($("#who").offset().top+100)){
                $("#hero video").css("z-index","3");
            }else{
                $("#hero video").css("z-index","1");
            };
            if(($(window).height()) <= 768){
                if(scrollTop >= ($("#experience").offset().top+150)){
                    $("footer").addClass("scroll");
                }else{
                    $("footer").removeClass("scroll");
                };
            }else{
                if(scrollTop >= ($("#experience").offset().top-350)){
                    $("footer").addClass("scroll");
                }else{
                    $("footer").removeClass("scroll");
                };
            };
        });

    }
/*MOVEMENTS*/ 
function subtleMovements(){
    var windowHeight = $(window).height();
    $(window).scroll(function(){
        var scrollTop = $(window).scrollTop();
        $( ".movement" ).each(function() {
            var fadePosition = $(this).offset().top;
            if( scrollTop >= (fadePosition-(windowHeight/1.1)) ){
                $(this).addClass("active");
            }
        });
        $( ".skill" ).each(function() {
            var fadePosition = $(this).offset().top;
            var progress = $(this).find(".progress-bar").attr("aria-valuenow")
            if( scrollTop >= (fadePosition-(windowHeight/1.1)) ){
                $(this).find(".progress-bar").css("width",progress+"%");
            }
        });
    });


}
/*PORTFOLIO CONTENT & POP UP*/
    function projectList(){
        $.getJSON("http://michaelablackham.com/js/projects.json").always(
            function(d){
                var winner ='<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 117 135.3" style="enable-background:new 0 0 117 135.3;" ><polygon class="ribbon" points="61.1,41.7 69.8,42.9 63.6,49 65.1,57.7 57.3,53.7 49.6,57.8 51,49.2 44.7,43.1 53.3,41.8 57.1,33.9 "/><polygon class="ribbon" points="56.6,14.2 66.5,7.1 72,17.9 84,16.3 83.8,28.4 95.2,32.5 89.4,43.2 97.6,52.1 87.5,58.9 90.6,70.6 78.5,71.9 75.8,83.7 64.5,79.2 56.6,88.4 48.8,79.2 37.5,83.7 34.8,71.9 22.7,70.6 25.8,58.9 15.7,52.1 23.9,43.2 18.1,32.5  29.5,28.4 29.3,16.3 41.3,17.9 46.8,7.1 "/><circle class="ribbon" cx="57" cy="47.1" r="23.2"/><polyline class="ribbon" points="61.7,82.8 86.8,125.4 93.1,112 109.1,113.9 84.1,70.3 "/><polyline class="ribbon" points="53.8,83.9 28.6,126.5 22.3,113.1 6.3,115 31.3,71.4 "/></svg>';
                var linkAttr = ' col-xs-6 col-md-4 col-lg-3 col-xl-2 projectimage" data-toggle="modal" data-target="#modal-window" id="' ;
                var textDiv ='<div class="text absolute bottom left text-center">';
                var maskDiv = '<div class="mask block top left absolute"> </div>' ;
                var imageDiv = '<div class="image block absolute top left lazy" style="display: block; background-image: url(images/pixel.gif);" data-original="'
                for (i = 0; i < d.length; i++) { 
                    $("#work .row").append('<a class="'+d[i].item.class+linkAttr + d[i].item.id + '">' +textDiv+'<h3>'+d[i].item.name+'</h3> <p>'+d[i].item.position+'</p></div>'+maskDiv+imageDiv+d[i].item.coverimg+'"></div></a>');
                };
                $('.projectimage').click(function(){
                    var index = $( "#work .projectimage" ).index( this );
                    $('#modal-window .modal-content').find('h4').removeClass("winner");
                    $('#modal-window .modal-content').find('.utilities p').remove();
                    $('#modal-window .modal-content').find('.list li').remove();
                    $('#modal-window .modal-content .images').find("img").remove();
                    $('#modal-window .modal-content a.button').show();
                    $('#modal-window .modal-content a.button').attr("href", "").text("");
                    $('#modal-window .modal-content .content-header').css("background-image", "");
                    $('#modal-window .modal-content').find('h2').text(d[index].item.name);
                    $('#modal-window .modal-content').find('h3').text(d[index].item.position);
                    $('#modal-window .modal-content').find('h4').addClass(d[index].item.class).html(winner+d[index].modal.text.award);
                    $('#modal-window .modal-content').find('.overview').text(d[index].modal.text.overview);
                    $('#modal-window .modal-content .content-header').css("background-image", "url("+d[index].item.coverimg+")");
                    if( d[index].modal.text.linktext == "No Link"){
                        $('#modal-window .modal-content a.button').hide();
                    }else{
                        $('#modal-window .modal-content a.button').attr("href", d[index].modal.text.link).text(d[index].modal.text.linktext);
                    };
                    for (i = 0; i < d[index].modal.text.list.length; i++) { 
                        $('#modal-window .modal-content').find(".list").append('<li>'+d[index].modal.text.list[i]+'</li>');
                    };
                    for (i = 0; i < d[index].modal.images.length; i++) { 
                        $('#modal-window .modal-content').find(".images").append('<img src="'+d[index].modal.images[i]+'" alt="'+d[index].modal.text.description[i]+'"/>');
                    };
                });
            }
        );
        // $(document).keydown(function(event){ 
        //     if(event.keycode === 27){ 
        //         $("#modal-window").removeClass("in").hide();
        //     }
        // });
    }




	



$(document).ready(function() {
    projectList();
    heroSize();
    scrollMovement();
    menuClick();
    introPosition();
    heroScroll();
    footerSize();
    easterEgg();
});
$(window).resize(function() {
      footerSize();
      heroSize();
      workSize();
      introPosition();
})
.load(function(){
    workSize();
    $(".lazy").lazyload({
        effect : "fadeIn",
        threshold : 300
    });
    $("#website").delay(1500).animate({opacity: 1}, 1000);
    $("#loader").delay(1500).fadeOut(900);
});

/************************
        FUNCTIONS
************************/
/*NAVIGATION*/
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
                    }
                }
            }
        });
    }
/*HEIGHT AND WIDTH SIZES*/
    function heroSize(){
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();
        $("header, #hero, #hello, #hero iframe").height(windowHeight);
        $("#hero .mask").height(windowHeight+70);
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
      // store the elements you'll be finding multiple times. Also, by using the mainNav as a starting point for the button, the browser has less DOM elements to look through for the selector, making it faster. Also notice I pulled out the anonymous functions that are repeated, and made them named functions. 1, it makes it easir to see they are related, and 2 it's less that you'll have to edit when you want to change that action.
      var mainNav = $("#main-navigation"),
       mainNavButton = mainNav.find('button'),
       mainNavCollapse = mainNav.find(".nav-collapse");

        mainNavButton.toggle(function(){
            mainNavCollapse.fadeIn(400);
            mainNav.addClass("open");
            $("section, #hero, footer").animate({
                left:205
            }, 300, function removeCloseClass() { mainNavButton.addClass("close-btn"); });
        }, menuClose);
        //SWIPE TO CLOSE NAVIGATION
          $("#website").on("swipeleft",menuClose);
          // menu close
          function menuClose(){
            mainNavCollapse.fadeOut(200);
            mainNav.removeClass("open");
            $("section, #hero, footer").animate({
                left:0
            }, 300, removeCloseClass);
          }
          // button Class toggle
          function removeCloseClass() { mainNavButton.removeClass("close-btn"); }
    }
/*HERO TEXT FADE, HERO OPACITY*/
    function heroScroll(){
      var helloTextScroller = $('#hello .text, #hello a.scroller'),
      hero = $("#hero"),
      heroMask = hero.find(".mask.fade"),
      heroVideo = hero.find('video'),
      footer = $('footer'),
      movement = $(".movement"),
      skill = $(".skill"),
      nav = $("nav"),
      navHello = nav.find("li.hello"),
      navWho = nav.find("li.who"),
      navWork = nav.find("li.work"),
      navExp = nav.find("li.experience"),
      whoOffset = $("#who").offset().top,
      experienceOffset = $("#experience").offset().top,
      footerSize = $("footer").outerHeight(),
      sectionArray = [];
      $('section').each(function() {
          var sectionLocation = $(this).offset().top - 61;
          sectionArray.push(sectionLocation);
      });

        $(window).on('scroll', function () {
            var windowHeight = $(window).height(), 
            documentHeight = $(document).height(),
            heightDifference = documentHeight - windowHeight - footerSize,
            pxlCount = $(document).scrollTop()/1000,
            winScrollTop = $(window).scrollTop(); 

            $('#main-navigation').toggleClass('scroll', $(document).scrollTop() >= 80);
            // hero scroll
            heroMask.css("opacity", pxlCount) ;
            if(winScrollTop > 20 && winScrollTop <= windowHeight) {
                var calc = parseFloat(80/winScrollTop);
                helloTextScroller.css('opacity', calc);
            } else {
                if (winScrollTop < 50) {
                    helloTextScroller.css('opacity', '1');
                } else if(winScrollTop > windowHeight) {
                    helloTextScroller.css('opacity', '0');
                }
            }
             // hero BG
            if(winScrollTop >= (whoOffset + 100)){
                heroVideo.css("z-index","3");
            }else{
                heroVideo.css("z-index","1");
            }
            if(winScrollTop >= (heightDifference)){
                footer.addClass("scroll");
            }else{
                footer.removeClass("scroll");
            }
            // subtleMovements
            movement.each(function() {
                var fadePosition = $(this).offset().top;
                if( winScrollTop >= (fadePosition-(windowHeight/1.1)) ){
                    $(this).addClass("active");
                }
            });
            skill.each(function() {
                var fadePosition = $(this).offset().top;
                var progress = $(this).find(".progress-bar").attr("aria-valuenow");
                if( winScrollTop >= (fadePosition-(windowHeight/1.1)) ){
                    $(this).find(".progress-bar").css("width",progress+"%");
                }
            });
            // navigationActive
            nav.find("li").removeClass("active");
            if(winScrollTop >= 0 && winScrollTop <= sectionArray[1]){
                navHello.addClass("active");
            }else if(winScrollTop >= sectionArray[1] && winScrollTop <= sectionArray[2]){
                navWho.addClass("active");
            }else if(winScrollTop >= sectionArray[2] && winScrollTop <= sectionArray[3]){
                navWork.addClass("active");
            }else if(winScrollTop >= sectionArray[3]){
                navExp.addClass("active");
            }

        });
    }

/*PORTFOLIO CONTENT & POP UP*/
    function projectList(){
      var modalContent = $('#myModal .modal-content');
        $.getJSON("http://michaelablackham.com/js/projects.json").always(
            function(d){
                var linkAttr = ' col-xs-6 col-md-4 col-lg-3 col-xl-2 projectimage" data-toggle="modal" data-target="#myModal" id="' ;
                var textDiv ='<div class="text absolute bottom left text-center">';
                var maskDiv = '<div class="mask block top left absolute"> </div>' ;
                var imageDiv = '<div class="image block absolute top left work-lazy" style="display: block; background-image: url(images/pixel.gif);" data-original="';
                for (i = 0; i < d.length; i++) {
                    $("#work .row").append('<a class="' + d[i].item.class + linkAttr + d[i].item.id + '">' +textDiv+'<h3>'+d[i].item.name+'</h3> <p>'+d[i].item.position+'</p></div>'+maskDiv+imageDiv+d[i].item.coverimg+'"></div></a>');
                }

                $('.projectimage').click(function(){
                    var index = $( "#work .projectimage" ).index( this );
                    modalContent.find('h4').removeClass("winner").addClass(d[index].item.class).html(d[index].modal.text.award);
                    modalContent.find('.utilities p').remove();
                    modalContent.find('.list li').remove();
                    modalContent.find('.images img').remove();
                    modalContent.find('.content-header').css("background-image", "url("+d[index].item.coverimg+")");
                    modalContent.find('h2').text(d[index].item.name);
                    modalContent.find('h3').text(d[index].item.position);
                    modalContent.find('.overview').text(d[index].modal.text.overview);
                    modalContent.find(".images").append('<img src="'+d[index].modal.images[0]+'" alt="'+d[index].modal.text.description[0]+'"/>');
                    if( d[index].modal.text.linktext == "No Link"){
                        modalContent.find('a.button').hide().attr("href", "").text("");
                    }else{
                        modalContent.find('a.button').show().attr("href", d[index].modal.text.link).text(d[index].modal.text.linktext);
                    }
                    for (i = 0; i < d[index].modal.text.list.length; i++) {
                        modalContent.find(".list").append('<li>'+d[index].modal.text.list[i]+'</li>');
                    }
                    for (i = 1; i < d[index].modal.images.length; i++) {
                        modalContent.find(".images").append('<img class="work-lazy" data-original="'+d[index].modal.images[i]+'" alt="'+d[index].modal.text.description[i]+'"/>');
                    }
                    $(".work-lazy").lazyload({
                         container: $("#myModal"),
                         effect : "fadeIn",
                         threshold : 700
                    });
                });
                workSize();
                $(".work-lazy").lazyload({
                     effect : "fadeIn",
                     threshold : 300
                });
            }
        );
    }
//EASTER EGG
    function easterEgg(){
        if (window.addEventListener) {
            var keys = [],
            konami = "38,38,40,40,37,39,37,39,66,65";
            window.addEventListener("keydown", function(e){
                keys.push(e.keyCode);
                if (keys.toString().indexOf(konami) >= 0) {
                    var playNsync = function () {
                        $("#hero video#bgvid").hide();
                        $("#hero .easteregg").show();
                        $("#hero iframe").attr("src","https://www.youtube.com/embed/Yc-sNZP9nyk?rel=0&autoplay=1");
                    };
                    playNsync();
                    keys = [];
                }
            }, true);
        }
    }

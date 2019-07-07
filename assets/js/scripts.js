

function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();

var navtop  = 200,
    primnav = $('.primary-nav'),
    secnav  = $('.seconday-nav');

$(document).ready(function(){

  // Header Scroll up/dowm visibility

  $(window).on('scroll', function(){
    if($(window).scrollTop() >= 300) {
      $('.header__main').toggleClass('hide', $(window).scrollTop() >= navtop);
      navtop = $(window).scrollTop();
    }

    // toggle diplay of menu on mobile

    if((primnav).hasClass('is-visible')&&(secnav).hasClass('is-visible')){
      console.log('primnavscrolling');
      primnav.removeClass('is-visible');
      secnav.removeClass('is-visible');
    }
  });

  // Trigger Hamburger animation

  $('.hamburger').click(function(){
    $('.hamburger__trigger').toggleClass('active');
    // $('.collapse-nav').toggle('boxopened', 'easeInQuad');
      $('.collapse-nav').slideToggle("slow");

    $('.primary-nav,.secondary-nav').toggleClass('is-visible');
  });

  //Filter Trigger

  $('.filter__icon').click(function(){
    $('.header__bottom').toggleClass('is-visible');
  })

});



  // OWL-CAROUSEL
$('.banner-carousel').owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    dots: false,
    autoplay: false,
    autoplayTimeout: 3000,
    smartSpeed: 1000,
    responsive:{
        0:{
            items:1,
        },

        576:{
            items:1,
        },

        768:{
            items:1,

        },
        1000:{
            items:1
        }
    }
})
// OWL-CAROUSEL-END
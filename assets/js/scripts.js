

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
    secnav  = $('.secondary-nav'),
    mobileTrigger = $('.hamburger__trigger'),
    filterSec = $('.header__bottom'),
    filterCont = $('.header-filter__wrapper');


$(document).ready(function(){

  // Header Scroll up/dowm visibility

  $(window).on('scroll', function(){
    if($(window).scrollTop() >= 300) {
      $('.header__main').toggleClass('hide', $(window).scrollTop() >= navtop);
      navtop = $(window).scrollTop();
    }

    // toggle diplay of menu on mobile

     if((primnav).hasClass('is-visible')){
      primnav.removeClass('is-visible');
      mobileTrigger.removeClass('active');
    }

    if((secnav).hasClass('is-visible')){
      secnav.removeClass('is-visible');
    }

    if(filterSec.hasClass('visible')){
      console.log($(this));
      filterSec.removeClass('visible');
    }
    
    if(filterCont.hasClass('animate')){
      filterCont.removeClass('animate');
    }

  });

  // Trigger Hamburger animation

  $('.hamburger').click(function(e){
    e.preventDefault();
    if(filterSec.hasClass('visible')){
        filterSec.removeClass('visible');
    }
    
    filterCont.removeClass('animate');
    mobileTrigger.toggleClass('active');
    
    $('.primary-nav,.secondary-nav').toggleClass('is-visible');
  });

  //Filter Trigger

  $('.filter__icon').click(function(e){
    e.preventDefault();
    primnav.removeClass('is-visible');
    secnav.removeClass('is-visible');
    mobileTrigger.removeClass('active');
    filterSec.toggleClass('visible');
    filterCont.toggleClass('animate');
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
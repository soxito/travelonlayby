// Add Your Scripts here

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

$(document).ready(function(){

  $('.menu-item-has-children').on('click', (event) => {
  $(event.target).siblings('.sub-menu')
    .toggleClass('active');
});

  $(document).click(function(e) {
  $('.menu-item-has-children')
    .not($('.menu-item-has-children').has($(e.target)))
    .children('.sub-menu')
    .removeClass('active');
});

});

$(window).on('scroll', function() {
    if($(window).scrollTop() > 200) {
      $('.header-wrapper').addClass('active');
    }
    
  });

  $(window).on('scroll', function() {
    if($(window).scrollTop() < 1) {
      $('.header-wrapper').removeClass('active');
    }
    
  });
$('.nav-header').click(function(){
              $('.nav-header').toggleClass('active');
              // $('.collapse-nav').toggle('boxopened', 'easeInQuad');
                $('.collapse-nav').slideToggle("slow");
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
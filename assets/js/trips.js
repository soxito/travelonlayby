$(document).ready(function(){

    apicall('get','destinations','',function (response) {
        console.log(response)
        for(k in response){
            var image = response[k].image
            var countryname = response[k].countryname

            $('#popularexperiences').append(' <li class="list__item"><a class="list__link" href="#Destinations">'+response[k].countryname+'</a></li>')
            $('#populardestinations').append(' <li class="list"><a class="list__link" href="#Destinations">'+response[k].countryname+'</a></li>')

            $('#destinations_block').append(

                '  <div class="gellary-flexur col-md-3">\n' +
                '                                 <a href="?countryname='+countryname+'#Specials" ><div  class="single-all-gellary-item" style="background-image: url('+image+');">\n' +
                '                                    <div class="overlay">\n' +
                '                                       <div class="overlay-label" >'+countryname+'</div>\n' +
                '                                       <div class="view-button">\n' +
                '                                          <span >View Package</span >\n' +
                '                                       </div>\n' +
                '                                    </div>\n' +
                '                                 </div><a/>\n' +
                '                              </div>')
        }
    });

    if(isEmpty(getUrlParameter('countryname'))===false){

        var filterData = {
            randprice_1:3000,
            randprice_2:150000,
            countryname:getUrlParameter('countryname'),
        }
        apicall('get','trips/filter/deep',filterData,function (response) {
            console.log(response)
            /*
          var res = '',
              indicator = '';
          for (var k = 0; k <response.product.length; k++) {
              res += '<div class="item"><img src="' +  response.product[k].image + '"><div class="carousel-caption"><h3>' +  response.product[k].name + '</h3><p>' +  response.product[k].rangeprice + '</p><p><a class="btn btn-info btn-sm">Read More</a></p></div></div>';
              indicator += '<li data-target="#myCarousel" data-slide-to="'+k+'"></li>';
          }

          $('#homepageItems').append(res);
          $('#indicators').append(indicator);
          $('.item').first().addClass('active');
          $('.carousel-indicators > li').first().addClass('active');
          $("#myCarousel").carousel();*/


            for(i in response.data){

                var item_id = response.data[i].package_id
                var item_name = response.data[i].name
                var destinations = response.data[i].destinations
                var item_price = response.data[i].randprice
                var item_description = response.data[i].item_description
                var nights = response.data[i].nights
                var countryname =  response.data[i].destinations.countryname
                var hotel_name =  response.data[i].destinations.hotelname
                var image = response.data[i].destinations.image

                /* Period Months Range Slider Ends*/

                //Calculate instalment//

                var d1 = new Date( response.data[i].datesellby);

                var instalmentMonths =DateDiff.inMonths(d1, d2);
                var deposit =Number((item_price *0.020).toFixed(2)) ;

                /*Instalmet Calculation*/
                var remaining_amount = Number((item_price-deposit).toFixed(2))
                var instalment = Number((remaining_amount/instalmentMonths).toFixed(2))


                var datePaid=''


                $('#trip_block').append('<div class="trip-block col-md-3">\n' +
                    '                                 <a  href="single-package.html?id='+item_id+'" target="_blank">   <div class="single-destination" style="background-image: url('+image+');">\n' +
                    '                                       <div class="overlay">\n' +
                    '                                          <div class="view-button">\n' +
                    '                                             <span>View Details</span>\n' +
                    '                                          </div>\n' +
                    '                                          <div class="place-details">\n' +
                    '                                             <h3 >'+item_name+'</h3>\n' +
                    '                                             <div>'+getStars(response.data[i].destinations.hotelrating)+'\n' +
                    '                                             </div>\n' +
                    '                                          </div>\n' +
                    '                                          <div class="orrange-tag">\n' +
                    '                                             <p>Destination</p>\n' +
                    '                                          </div>\n' +
                    '                                       </div>\n' +
                    '                                    </div></a>\n' +
                    '                                    <div class="place-booking-details">\n' +
                    '                                       <p>from</p>\n' +
                    '                                       <div class="booking-items">\n' +
                    '                                          <div class="single-booking-item">\n' +
                    '                                           <p><span>R'+instalment.toFixed(2)+'</span> x '+instalmentMonths+' months </p>\n' +
                    '                                          </div>\n' +
                    '                                          <div class="single-booking-item">\n' +
                    '                                             <div class="single-night">\n' +
                    '                                                <i class="fa fa-calendar"></i>'+nights+' nights\n' +
                    '                                             </div>\n' +
                    '                                             <div class="single-clock">\n' +
                    '                                                <i class="fa fa-hourglass-half"></i>Self Catering\n' +
                    '                                             </div>\n' +
                    '                                          </div>\n' +
                    '                                       </div>\n' +
                    '                                    </div>\n' +
                    '                                    <div class="share-place">\n' +
                    '                                       <div class="sharing-place-name">\n' +
                    '                                          <h3>'+countryname+'</h3>\n' +
                    '                                       </div>\n' +
                    '                                       <div class="sharing-icon">\n' +
                    '                                      <a  target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Ftravelonlayby.com%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore"><img src="assets/images/share.png" alt=""></a>\n' +
                    '                                       </div>\n' +
                    '                                    </div>\n' +
                    '                                 </div>');




                $('#trip_id').html('<span>' +item_id + '</span>');
                $('#trip_image').html('<img src="' + destinations.image + '" alt="">');
                //$('#trip_countryname').html('<span>' + destinations.countryname + '</span>');
                $('#trip_price').html('<span>' + item_price + '</span>');
                $('#trip_nights').html('<span>' + nights + '</span>');
                $('#hotel_rating').html('<span>' + destinations.hotelrating + '</span>');
                $('#image').html('<img style="background-image: url('+image+')>img');



            }
        });
    }
    else{
        apicall('get','trips','',function (response) {
            /*
          var res = '',
              indicator = '';
          for (var k = 0; k <response.product.length; k++) {
              res += '<div class="item"><img src="' +  response.product[k].image + '"><div class="carousel-caption"><h3>' +  response.product[k].name + '</h3><p>' +  response.product[k].rangeprice + '</p><p><a class="btn btn-info btn-sm">Read More</a></p></div></div>';
              indicator += '<li data-target="#myCarousel" data-slide-to="'+k+'"></li>';
          }

          $('#homepageItems').append(res);
          $('#indicators').append(indicator);
          $('.item').first().addClass('active');
          $('.carousel-indicators > li').first().addClass('active');
          $("#myCarousel").carousel();*/


            for(i in response.product){

                var item_id = response.product[i].package_id
                var item_name = response.product[i].name
                var destinations = response.product[i].destinations
                var item_price = response.product[i].randprice
                var item_description = response.product[i].item_description
                var nights = response.product[i].nights
                var countryname =  response.product[i].destinations.countryname
                var hotel_name =  response.product[i].destinations.hotelname
                var image = response.product[i].destinations.image


                /* Period Months Range Slider Ends*/

                //Calculate instalment//

                var d1 = new Date( response.product[i].datesellby);

                var instalmentMonths =DateDiff.inMonths(d1, d2);
                var deposit =Number((item_price *0.020).toFixed(2)) ;

                /*Instalmet Calculation*/
                var remaining_amount = Number((item_price-deposit).toFixed(2))
                var instalment = Number((remaining_amount/instalmentMonths).toFixed(2))


                var datePaid=''


                $('#trip_block').append('<div class="trip-block col-md-3">\n' +
                    '                                 <a href="single-package.html?id='+item_id+'" target="_blank">   <div class="single-destination" style="background-image: url('+image+');">\n' +
                    '                                       <div class="overlay">\n' +
                    '                                          <div class="view-button">\n' +
                    '                                             <span >View Details</span>\n' +
                    '                                          </div>\n' +
                    '                                          <div class="place-details">\n' +
                    '                                             <h3 >'+item_name+'</h3>\n' +
                    '                                             <div>'+getStars(response.product[i].destinations.hotelrating)+'\n' +
                    '                                             </div>\n' +
                    '                                          </div>\n' +
                    '                                          <div class="orrange-tag">\n' +
                    '                                             <p>Destination</p>\n' +
                    '                                          </div>\n' +
                    '                                       </div>\n' +
                    '                                    </div></a>\n' +
                    '                                    <div class="place-booking-details">\n' +
                    '                                       <p>from</p>\n' +
                    '                                       <div class="booking-items">\n' +
                    '                                          <div class="single-booking-item">\n' +
                    '                                           <p><span>R'+instalment.toFixed(2)+'</span> x '+instalmentMonths+'</p>\n' +
                    '                                          </div>\n' +
                    '                                          <div class="single-booking-item">\n' +
                    '                                             <div class="single-night">\n' +
                    '                                                <i class="fa fa-calendar"></i>'+nights+' nights\n' +
                    '                                             </div>\n' +
                    '                                             <div class="single-clock">\n' +
                    '                                                <i class="fa fa-hourglass-half"></i>Self Catering\n' +
                    '                                             </div>\n' +
                    '                                          </div>\n' +
                    '                                       </div>\n' +
                    '                                    </div>\n' +
                    '                                    <div class="share-place">\n' +
                    '                                       <div class="sharing-place-name">\n' +
                    '                                          <h3>'+countryname+'</h3>\n' +
                    '                                       </div>\n' +
                    '                                       <div class="sharing-icon">\n' +
                    '                                      <a  target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Ftravelonlayby.com%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore"><img src="assets/images/share.png" alt=""></a>\n' +
                    '                                       </div>\n' +
                    '                                    </div>\n' +
                    '                                 </div>');




                $('#trip_id').html('<span>' +item_id + '</span>');
                $('#trip_image').html('<img src="' + destinations.image + '" alt="">');
                //$('#trip_countryname').html('<span>' + destinations.countryname + '</span>');
                $('#trip_price').html('<span>' + item_price + '</span>');
                $('#trip_nights').html('<span>' + nights + '</span>');
                $('#hotel_rating').html('<span>' + destinations.hotelrating + '</span>');
                $('#image').html('<img style="background-image: url('+image+')>img');



            }
        });
    }
})
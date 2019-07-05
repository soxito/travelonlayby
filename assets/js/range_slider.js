var isEmpty = function (str) {
    return (!str || 0 === str.length);
}

var getUrlParameter = function (sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

if(isEmpty(getUrlParameter('countryname'))===false){
    /*Slider One*/
    var slider = document.getElementById("myRange");
    var z = document.getElementById("demo");
    z.innerHTML = slider.value;

    slider.oninput = function () {
        z.innerHTML = this.value;
    }

    $(function () {
        var val = $('#myRange').val();
        z = $('#demo');
        z.html(val);

        $('#myRange').change(function () {
            z.html(this.value);
            result = this.value;
            var filterData = {
                randprice_1:0,
                randprice_2:result,
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

                $('#trip_block').html('');
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


                    var li = $('<li/>').attr('data-thumb', "" + image + "")
                    ;

                    $('<img />').attr('src', "" + image + "")         // ADD IMAGE PROPERTIES.
                        .attr('alt', item_name)
                        .appendTo(li)
                    li.appendTo('#image-gallery');

                    /* Period Months Range Slider */
                    var values = [3, 6, 9, 12, 15, 18];
                    $('#myRange3').change(function() {
                        $('label').text(values[this.value]);

                    });
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
                        '                                  <a  href="single-package.html?id='+item_id+'" target="_blank">  <div class="single-destination" style="background-image: url('+image+');">\n' +
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

            /*Append this value to Span */
            $('#monthly_amount').html(result);

        });
    });


    /*Slider Two*/
    var slider1 = document.getElementById("myRange1");
    var output1 = document.getElementById("demo1");
    output1.innerHTML = slider1.value;

    slider1.oninput = function () {
        output1.innerHTML = this.value;
    }


    $(function () {
        var val = $('#myRange1').val();
        output1 = $('#demo1');
        output1.html(val);

        $('#myRange1').change(function () {

            output1.html(this.value);
            //  console.log(this.value);
            result1 = this.value;
            console.log(result1);
            /*Append this value to Span */
            $('#payment_over').html(result1);

        });
    });
    /*Slider Three*/
    var slider2 = document.getElementById("myRange2");
    var output2 = document.getElementById("demo2");
    output1.innerHTML = slider2.value;

    slider1.oninput = function () {
        output2.innerHTML = this.value;
    }


    $(function () {
        var val = $('#myRange2').val();
        output2 = $('#demo2');
        output2.html(val);

        $('#myRange2').change(function () {

            output2.html(this.value);
            //  console.log(this.value);
            result2 = this.value;
            console.log(result2);
            /*Append this value to Span */
            $('#').html(result2);

        });
    });


    $( function() {
        $( "#slider-range" ).slider({
            range: true,
            min: 0,
            max: 150000,
            step: 1000,
            values: [ 0, 10000 ],
            slide: function( event, ui ) {
                $( "#amount" ).val( "R" + ui.values[ 0 ] + " - R" + ui.values[ 1 ] );
                console.log(ui.values[ 0 ])
                console.log(ui.values[ 1 ])

                var filterData = {
                    randprice_1:ui.values[ 0 ],
                    randprice_2:ui.values[ 1 ],
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

                    $('#trip_block').html('');
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


                        var li = $('<li/>').attr('data-thumb', "" + image + "")
                        ;

                        $('<img />').attr('src', "" + image + "")         // ADD IMAGE PROPERTIES.
                            .attr('alt', item_name)
                            .appendTo(li)
                        li.appendTo('#image-gallery');

                        /* Period Months Range Slider */
                        var values = [3, 6, 9, 12, 15, 18];
                        $('#myRange3').change(function() {
                            $('label').text(values[this.value]);

                        });
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
                            '                                  <a  href="single-package.html?id='+item_id+'" target="_blank">  <div class="single-destination" style="background-image: url('+image+');">\n' +
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

        });
        $( "#amount" ).val( "R" + $( "#slider-range" ).slider( "values", 0 ) +
            " - R" + $( "#slider-range" ).slider( "values", 1 ) );
    } );
}
else{
    /*Slider One*/
    var slider = document.getElementById("myRange");
    var z = document.getElementById("demo");
    z.innerHTML = slider.value;

    slider.oninput = function () {
        z.innerHTML = this.value;
    }

    $(function () {
        var val = $('#myRange').val();
        z = $('#demo');
        z.html(val);

        $('#myRange').change(function () {

            z.html(this.value);
            result = this.value;

            apicall('get','trips/filter?randprice_1=0&randprice_2='+result+'','',function (response) {

                console.log(response)
                $('#trip_block').html('')
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


                    /* Period Months Range Slider */
                    var values = [3, 6, 9, 12, 15, 18];
                    $('#myRange3').change(function() {
                        $('label').text(values[this.value]);

                    });
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
                        '                                    <a href="single-package.html?id='+item_id+'" target="_blank"> <div class="single-destination" style="background-image: url('+image+');">\n' +
                        '                                       <div class="overlay">\n' +
                        '                                          <div class="view-button">\n' +
                        '                                             <span >View Details</span>\n' +
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
                        '                                             <p><span>R'+instalment.toFixed(2)+'</span> x '+instalmentMonths+' months </p>\n' +
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
                        '                                        <a  target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Ftravelonlayby.com%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore"><img src="assets/images/share.png" alt=""></a>\\n\' +\n' +
                        '                                       </div>\n' +
                        '                                    </div>\n' +
                        '                                 </div>');




                    $('#trip_id').html('<span>' +item_id + '</span>');
                    $('#trip_image').html('<img src="' + destinations.image + '" alt="">');
                    $('#trip_countryname').html('<span>' + destinations.countryname + '</span>');
                    $('#trip_price').html('<span>' + item_price + '</span>');
                    $('#trip_nights').html('<span>' + nights + '</span>');
                    $('#hotel_rating').html('<span>' + destinations.hotelrating + '</span>');
                    $('#image').html('<img style="background-image: url('+image+')>img');



                }
            })

            /*Append this value to Span */
            $('#monthly_amount').html(result);

        });
    });


    /*Slider Two*/
    var slider1 = document.getElementById("myRange1");
    var output1 = document.getElementById("demo1");
    output1.innerHTML = slider1.value;

    slider1.oninput = function () {
        output1.innerHTML = this.value;
    }


    $(function () {
        var val = $('#myRange1').val();
        output1 = $('#demo1');
        output1.html(val);

        $('#myRange1').change(function () {

            output1.html(this.value);
            //  console.log(this.value);
            result1 = this.value;
            console.log(result1);
            /*Append this value to Span */
            $('#payment_over').html(result1);

        });
    });
    /*Slider Three*/
    var slider2 = document.getElementById("myRange2");
    var output2 = document.getElementById("demo2");
    output1.innerHTML = slider2.value;

    slider1.oninput = function () {
        output2.innerHTML = this.value;
    }


    $(function () {
        var val = $('#myRange2').val();
        output2 = $('#demo2');
        output2.html(val);

        $('#myRange2').change(function () {

            output2.html(this.value);
            //  console.log(this.value);
            result2 = this.value;
            console.log(result2);
            /*Append this value to Span */
            $('#').html(result2);

        });
    });


    $( function() {
        $( "#slider-range" ).slider({
            range: true,
            min: 0,
            max: 50000,
            step: 1000,
            values: [ 0, 10000 ],
            slide: function( event, ui ) {
                $( "#amount" ).val( "R" + ui.values[ 0 ] + " - R" + ui.values[ 1 ] );
                console.log(ui.values[ 0 ])
                console.log(ui.values[ 1 ])
            }

        });
        $( "#amount" ).val( "R" + $( "#slider-range" ).slider( "values", 0 ) +
            " - R" + $( "#slider-range" ).slider( "values", 1 ) );
    } );
}




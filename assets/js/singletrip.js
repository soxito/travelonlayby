$(document).ready(function() {


    var getStars =  function (rating) {

        // Round to nearest half
        rating = Math.round(rating * 2) / 2;
        output = [];

        // Append all the filled whole stars
        for (var i = rating; i >= 1; i--)
            output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');

        // If there is a half a star, append it
        if (i == .5) output.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

        // Fill the empty stars
        for ( i = (5 - rating); i >= 1; i--)
            output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

        return output.join('');

    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;

    console.log(today)

    var DateDiff = {

        inDays: function(d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return parseInt((t2-t1)/(24*3600*1000));
        },

        inWeeks: function(d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return parseInt((t2-t1)/(24*3600*1000*7));
        },

        inMonths: function(d1, d2) {
            var d1Y = d1.getFullYear();
            var d2Y = d2.getFullYear();
            var d1M = d1.getMonth();
            var d2M = d2.getMonth();

            return (d2M+12*d2Y)-(d1M+12*d1Y);
        },

        inYears: function(d1, d2) {
            return d2.getFullYear()-d1.getFullYear();
        }
    }

    var dString = "May, 20, 1984";


    var d2 = new Date();


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

    var isEmpty =function (str) {
        return (!str || 0 === str.length);
    }

    if (isEmpty(getUrlParameter('id')) == true ) {


        if (typeof IE_fix != "undefined") // IE8 and lower fix to pass the http referer
        {
            document.write("redirecting..."); // Don't remove this line or appendChild() will fail because it is called before document.onload to make the redirect as fast as possible. Nobody will see this text, it is only a tech fix.
            var referLink = document.createElement("a");
            referLink.href = url;
            document.body.appendChild(referLink);
            referLink.click();
        }
        else {
            window.location.replace(url);
        } // All other browsers*!/

    } else {

        var p_id = getUrlParameter('id');

        apicall('get','trips/single?package_id=' + p_id + '','',function (response) {

            var image = response.data.destinations.image
            $('#country_name').append('<span>' + response.data.destinations.countryname + '</span>');
            $('#dest_name').append('<span>' + response.data.name + '</span>');
            $('#hotel_rating').append('<span></span>');
            $('#description').append('<span>' + response.data.description + '</span>');
            $('#inclusion').append('<span>' + response.data.inclusions + '</span>');
            $('#rand_price').append('<span>' + response.data.randprice + '</span>');
            $('#image').append('<img src="' + response.data.destinations.image + '">');

            $('#single-package-video').append('<img src="' + response.data.destinations.image + '">')
            $('#featuredImg').html('<div class="single-package-carousel" style="background-image: url(' + response.data.destinations.image + ');">\n' +
                '                           <div class="single-package-banner-content">\n' +
                '                              <p> Travel Destination</p>\n' +
                '                              <h1>' + response.data.destinations.countryname + '</h1>\n' +
                '                              <a href="index.html" onclick="goBack()" class="package-banner-btn">Back to Destinations</a>\n' +
                '                           </div>\n' +
                '                           <div class="review-tag">\n' +
                '                              <p>' + response.data.name + '</p>\n' +
                '                              <div class="star">' + getStars(response.data.destinations.hotelrating) + '</div>\n' +
                '                           </div>\n' +
                '                           <div class="banner-tag">\n' +
                '                             <!-- <p>From</p>\n' +
                '                              <h3>21 400 ZAR <span>pps</span></h3>\n' +
                '                              <p>2,200 ZAR x 6 Months</p>-->\n' +
                '                           </div>\n' +
                '                        </div>\n');
            /*Deposit Calculation*/
            var item_price = response.data.randprice
            var d1 = new Date(response.data.datesellby);
            var instalmentMonths = DateDiff.inMonths(d1, d2);
            var deposit = Number((item_price * 0.020).toFixed(2));

            /*Instalmet Calculation*/
            var remaining_amount = Number((item_price - deposit).toFixed(2))
            var instalment = Number((remaining_amount / instalmentMonths).toFixed(2))


            $('#deposit').html(deposit);
            $('#instalment_Monthly').html(instalment);
            $('#moonths').html(instalmentMonths);


            $('#request').click(function () {

                var firstname = $("#name").val();
                var surname = $("#surname").val();
                var cellno = $("#cellnumber").val();
                var email = $("#email").val();
                var total_amount = item_price;
                var period = instalmentMonths;
                var adults = $("#adults").val();

                var data = {
                    firstname: firstname,
                    surname: surname,
                    cellno: cellno,
                    email: email,
                    total_amount: total_amount,
                    period: period,
                    adults: adults
                }

            })


            apicall('get', 'trips', '', function (response) {

                var item_id = response.product[0].package_id
                $('#first_name').html('<a style="color: #ffffff" href="single-package.html?id=' + item_id + '" target="_blank">' + response.product[0].name + '</a>');
                $('#first_randprice').html('<span>' + response.product[0].randprice + '</span>');

                var item_id = response.product[1].package_id
                $('#second_name').html('<a style="color: #ffffff" href="single-package.html?id=' + item_id + '" target="_blank">' + response.product[1].name + '</a>');
                $('#second_randprice').html('<span>' + response.product[1].randprice + '</span>');

                var item_id = response.product[2].package_id
                $('#third_name').html('<a style="color: #ffffff" href="single-package.html?id=' + item_id + '" target="_blank">' + response.product[2].name + '</a>');
                $('#third_randprice').html('<span>' + response.product[2].randprice + '</span>');

            })
        })

    }

})
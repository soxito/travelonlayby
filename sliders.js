$(document).ready(function () {
    var isEmpty = function (str) {
        return (!str || 0 === str.length);
    }
    $.ajax({
        type: 'GET',
        url: 'http://localhost/tolApi/v1.0/trips',
        success: function (xml) {
            console.log(xml)
            for(i in xml.product){
                img = xml.product[i].destinations.image;
                trip_name =xml.product[i].name
                console.log(isEmpty(img))
                if(isEmpty(img)===true){

                }
                else{
                    var li = $('<li/>').attr('data-thumb', "" + img + "")
                    ;

                    $('<img />').attr('src', "" + img + "")         // ADD IMAGE PROPERTIES.
                        .attr('alt', trip_name)
                        .appendTo(li)
                    li.appendTo('#image-gallery');
                }

            }
            $('#image-gallery').lightSlider({
                //adaptiveHeight:true,
                item:1,
                slideMargin: 0,
                speed:500,
                slideWidth:200,
                auto:true,
                loop:true,
                onSliderLoad: function() {
                    $('#image-gallery').removeClass('cS-hidden');
                }
            });
        }

    });

});
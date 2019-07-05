$(document).ready(function () {
    var isEmpty = function (str) {
        return (!str || 0 === str.length);
    }
    $.ajax({
        type: 'GET',
        url: 'http://v1.travelonlayby.com/v1.0/trips',
        success: function (xml) {
            console.log(xml)
            for(i in xml.product){
                img = xml.product[i].destinations.image;
                trip_name =xml.product[i].name
                console.log(isEmpty(img))
                if(isEmpty(img)===true){

                }
                else{

                    $('#image-gallery').append('<div class="untitled__slide" style="background-image: url('+img+'); ">\n' +
                        '            <div class="untitled__slideBg" style="background-image: url('+img+'); "></div>\n' +
                        '            <div class="untitled__slideContent">\n' +
                        '                <span>'+trip_name+'</span>\n' +
                        '                <a class="button" href="https://unsplash.com/@scoutthecity" target="/black">Unsplash Profile</a>\n' +
                        '            </div>\n' +
                        '        </div>');
                }

            }
        }

    });

});

(function($){

    $.session = {

        _id: null,

        _cookieCache: undefined,

        _init: function()
        {
            if (!window.name) {
                window.name = Math.random();
            }
            this._id = window.name;
            this._initCache();

            // See if we've changed protcols

            var matches = (new RegExp(this._generatePrefix() + "=([^;]+);")).exec(document.cookie);
            if (matches && document.location.protocol !== matches[1]) {
                this._clearSession();
                for (var key in this._cookieCache) {
                    try {
                        window.sessionStorage.setItem(key, this._cookieCache[key]);
                    } catch (e) {};
                }
            }

            document.cookie = this._generatePrefix() + "=" + document.location.protocol + ';path=/;expires=' + (new Date((new Date).getTime() + 120000)).toUTCString();

        },

        _generatePrefix: function()
        {
            return '__session:' + this._id + ':';
        },

        _initCache: function()
        {
            var cookies = document.cookie.split(';');
            this._cookieCache = {};
            for (var i in cookies) {
                var kv = cookies[i].split('=');
                if ((new RegExp(this._generatePrefix() + '.+')).test(kv[0]) && kv[1]) {
                    this._cookieCache[kv[0].split(':', 3)[2]] = kv[1];
                }
            }
        },

        _setFallback: function(key, value, onceOnly)
        {
            var cookie = this._generatePrefix() + key + "=" + value + "; path=/";
            if (onceOnly) {
                cookie += "; expires=" + (new Date(Date.now() + 120000)).toUTCString();
            }
            document.cookie = cookie;
            this._cookieCache[key] = value;
            return this;
        },

        _getFallback: function(key)
        {
            if (!this._cookieCache) {
                this._initCache();
            }
            return this._cookieCache[key];
        },

        _clearFallback: function()
        {
            for (var i in this._cookieCache) {
                document.cookie = this._generatePrefix() + i + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            }
            this._cookieCache = {};
        },

        _deleteFallback: function(key)
        {
            document.cookie = this._generatePrefix() + key + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            delete this._cookieCache[key];
        },

        get: function(key)
        {
            return window.sessionStorage.getItem(key) || this._getFallback(key);
        },

        set: function(key, value, onceOnly)
        {
            try {
                window.sessionStorage.setItem(key, value);
            } catch (e) {}
            this._setFallback(key, value, onceOnly || false);
            return this;
        },

        'delete': function(key){
            return this.remove(key);
        },

        remove: function(key)
        {
            try {
                window.sessionStorage.removeItem(key);
            } catch (e) {};
            this._deleteFallback(key);
            return this;
        },

        _clearSession: function()
        {
            try {
                window.sessionStorage.clear();
            } catch (e) {
                for (var i in window.sessionStorage) {
                    window.sessionStorage.removeItem(i);
                }
            }
        },

        clear: function()
        {
            this._clearSession();
            this._clearFallback();
            return this;
        }

    };

    $.session._init();

})(jQuery);

//Base url//
var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + ""+getUrl.pathname+"";

var apicall =  function (type,endpoint,data,callback){
    $.ajax({
        type: type,

        url: 'https://v1.travelonlayby.com/v1.0/'+ endpoint,

        headers: {
            'Content-Type': 'application/json'
        },
        crossDomain: true,
        data: data,
        cache: false,
        success: function (responseData, status, xhr) {

            callback(responseData);
        },

        error: function (request, status, error) {

            callback(request);
        }
    });
};

var isEmpty = function (str) {
    return (!str || 0 === str.length);
}

var isBlank = function (str) {
    return (!str || /^\s*$/.test(str));
}

var isJSON = function (data)
{
    var isJson = false;

    try
    {
        //This works with JSON string and JSON object, not sure about others.
        var json = $.parseJSON(data);
        isJson = json;
    }
    catch (ex) {

        return 'data is not JSON';
    }

    return isJson;
}

var arrayCheck =function (value) {
    var s = typeof value;
    if (s === 'object') {
        if (value) {
            if (value instanceof Array) {
                s = 'array';
            }
        } else {
            s = 'null';
        }
    }
    return s;
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

var randomstring = function (L) {
    var s = '';
    var randomchar = function() {
        var n = Math.floor(Math.random() * 62);
        if (n < 10) return n; //1-10
        if (n < 36) return String.fromCharCode(n + 55); //A-Z
        return String.fromCharCode(n + 61); //a-z
    }
    while (s.length < L) s += randomchar();
    return s;
}

var loadjscssfile = function (filename, filetype) {
    if (filetype == "js") { //if filename is a external JavaScript file

        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)

    } else if (filetype == "css") { //if filename is an external CSS file
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

function callCreateFolderPhp(user_id,callback) {

    //also just a test
    var currentPath = 'uploads/logo/'+user_id;

    $.ajax({

        url: "createfolder.php",
        type: "GET",
        data: "curPath=" + currentPath,

        success: function (responseData, status, xhr) {

            callback(responseData);
        },

    });


}


var callCreateFolderPhp =  function (type,data,callback){

    $.ajax({
        type: type,
        url: 'createfolder.php',
        //url: 'https://setl-it.com/we/api/v1.0/'+ endpoint,

        headers: {
            'Content-Type': 'application/json'
        },
        crossDomain: true,
        data: data,
        cache: false,
        success: function (responseData, status, xhr) {

            callback(responseData);
        },

        error: function (request, status, error) {

            callback(request);
        }
    });
};

var imageUpload  = function (pathname, user_id) {

    'use strict';
    // Change this to the location of your server-side upload handler://
    //if there's a campaign // want a design for the campaign pay//
    var dataPath =pathname+'/'+user_id;
    var url = window.location.hostname === '' ?
        '' : 'uploads/?path='+dataPath;

    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {

                if(pathname ==='logo'){
                    var uploadLogoData = {
                        user_id: $.session.get('user_id'),
                        image: '/uploads/files/'+dataPath+'/'+file.name,
                    }

                    var endPoint = '/image/logo';

                }else{

                    var uploadLogoData = {
                        user_id: $.session.get('user_id'),
                        donation_id:getUrlParameter('donation_id'),
                        image: '/uploads/files/'+dataPath+'/'+file.name,
                    }

                    var endPoint = '/image/campaign';
                }

                apicall('POST', endPoint, JSON.stringify(uploadLogoData), function (responseData) {

                    if(responseData.code==='920'){

                        showNotification('alert alert-outline alert-success',responseData.message,'top','right','animated bounceInUp','animated bounceOutUp');

                        if(pathname ==='logo'){
                            setInterval(function() {
                                window.location.replace("profile.html");
                            }, 2000);
                        }
                        else{
                            setInterval(function() {
                                window.location.replace("campaign.html?donation_id="+getUrlParameter('donation_id'));
                            }, 2000);
                        }

                    }
                    else{

                        showNotification('alert alert-outline alert-success',responseData.message,'top','right','animated bounceInUp','animated bounceOutUp');

                    }

                });
                return file;
            });
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
    $('#modal-load').modal('hide');

};

var add = function (accumulator, a) {
    return accumulator + a;
}

var numberWithCommas= function (x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};
var diff_years = function (dt2, dt1)
{

    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff/365.25));

}


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

var d2 = new Date();
/*!

 =========================================================
 * Gaia Bootstrap Template - v1.0.1
 =========================================================
 
 * Product Page: https://www.creative-tim.com/product/gaia-bootstrap-template
 * Copyright 2017 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/gaia-bootstrap-template/blob/master/LICENSE.md)
 
 =========================================================
 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

var transparent = true;

var fixedTop = false;

var navbar_initialized = false;

var scroll;

scroll = ( 2500 - $(window).width() ) / $(window).width();

var window_height;
var window_width;

var content_opacity = 0;
var content_transition = 0;
var no_touch_screen = false;

var burger_menu;

var scroll_distance = 500;

$(document).ready(function(){
    BrowserDetect.init();

    if(BrowserDetect.browser == 'Explorer' && BrowserDetect.version <= 9){
        $('body').html(better_browser);
    }

    window_width = $(window).width();
    window_height = $(window).height();

    burger_menu = $('.navbar').hasClass('navbar-burger') ? true : false;

    if (!Modernizr.touch){
        $('body').addClass('no-touch');
        no_touch_screen = true;
    }

    // Init navigation toggle for small screens
    if(window_width < 992 || burger_menu){
        gaia.initRightMenu();
    }

    if($('.content-with-opacity').length != 0){
        content_opacity = 1;
    }

    $navbar = $('.navbar[color-on-scroll]');
    scroll_distance = $navbar.attr('color-on-scroll') || 500;

    $('.google-map').each(function(){
        var lng = $(this).data('lng');
        var lat = $(this).data('lat');

        gaia.initGoogleMaps(this, lat, lng);
    });

});

//activate collapse right menu when the windows is resized
$(window).resize(function(){
    if($(window).width() < 992){
        gaia.initRightMenu();
        //gaia.checkResponsiveImage();
    }
    if($(window).width() > 992 && !burger_menu){
        $('nav[role="navigation"]').removeClass('navbar-burger');
        gaia.misc.navbar_menu_visible = 1;
        navbar_initialized = false;
    }
});

$(window).on('scroll',function(){

    gaia.checkScrollForTransparentNavbar();


    if(window_width > 992){
        gaia.checkScrollForParallax();
    }

    if(content_opacity == 1 ){
        gaia.checkScrollForContentTransitions();
    }

});

$('a[data-scroll="true"]').click(function(e){
    var scroll_target = $(this).data('id');
    var scroll_trigger = $(this).data('scroll');

    if(scroll_trigger == true && scroll_target !== undefined){
        e.preventDefault();

        $('html, body').animate({
             scrollTop: $(scroll_target).offset().top - 50
        }, 1000);
    }

});

gaia = {
    misc:{
        navbar_menu_visible: 0
    },
    initRightMenu: function(){

         if(!navbar_initialized){
            $toggle = $('.navbar-toggle');
            $toggle.click(function (){

                if(gaia.misc.navbar_menu_visible == 1) {
                    $('html').removeClass('nav-open');
                    gaia.misc.navbar_menu_visible = 0;
                    $('#bodyClick').remove();
                     setTimeout(function(){
                        $toggle.removeClass('toggled');
                     }, 550);

                } else {
                    setTimeout(function(){
                        $toggle.addClass('toggled');
                    }, 580);

                    div = '<div id="bodyClick"></div>';
                    $(div).appendTo("body").click(function() {
                        $('html').removeClass('nav-open');
                        gaia.misc.navbar_menu_visible = 0;
                        $('#bodyClick').remove();
                         setTimeout(function(){
                            $toggle.removeClass('toggled');
                         }, 550);
                    });

                    $('html').addClass('nav-open');
                    gaia.misc.navbar_menu_visible = 1;

                }
            });
            navbar_initialized = true;
        }

    },

    checkScrollForTransparentNavbar: debounce(function() {
            if($(document).scrollTop() > scroll_distance ) {
                if(transparent) {
                    transparent = false;
                    $navbar.removeClass('navbar-transparent');
                }
            } else {
                if( !transparent ) {
                    transparent = true;
                    $navbar.addClass('navbar-transparent');
                }
            }
    }, 17),

    checkScrollForParallax: debounce(function() {
        	$('.parallax').each(function() {
        	    var $elem = $(this);

        	    if(isElementInViewport($elem)){
                  var parent_top = $elem.offset().top;
                  var window_bottom = $(window).scrollTop();
                  var $image = $elem.children('.image');

            	  oVal = ((window_bottom - parent_top) / 3);
                  $image.css('transform','translate3d(0px, ' + oVal + 'px, 0px)');
        	    }
            });

    }, 6),

    checkScrollForContentTransitions: debounce(function() {
         $('.content-with-opacity').each(function() {
             var $content = $(this);

             if(isElementInViewport($content)){
                  var window_top = $(window).scrollTop();
            	  opacityVal = 1 - (window_top / 230);

                  if(opacityVal < 0){
                      opacityVal = 0;
                      return;
                  } else {
                    $content.css('opacity',opacityVal);
                  }

        	    }
         });
    }, 6),

    initGoogleMaps: function($elem, lat, lng){
        var myLatlng = new google.maps.LatLng(lat, lng);

        var mapOptions = {
          zoom: 13,
          center: myLatlng,
          scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
          disableDefaultUI: true,
          styles: [{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"},{"gamma":"1.82"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"gamma":"1.96"},{"lightness":"-9"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"on"},{"lightness":"25"},{"gamma":"1.00"},{"saturation":"-100"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#ffaa00"},{"saturation":"-43"},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"simplified"},{"hue":"#ffaa00"},{"saturation":"-70"}]},{"featureType":"road.highway.controlled_access","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"on"},{"saturation":"-100"},{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"saturation":"-100"},{"lightness":"40"},{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"gamma":"0.80"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"off"}]}]
        }
        var map = new google.maps.Map($elem, mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title:"Hello World!"
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map);
    }

}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
};


function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}


var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) !== -1) {
                return data[i].identity;
            }
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) {
            return;
        }

        var rv = dataString.indexOf("rv:");
        if (this.versionSearchString === "Trident" && rv !== -1) {
            return parseFloat(dataString.substring(rv + 3));
        } else {
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        }
    },

    dataBrowser: [
        {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
        {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
        {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
        {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
        {string: navigator.userAgent, subString: "Safari", identity: "Safari"},
        {string: navigator.userAgent, subString: "Opera", identity: "Opera"}
    ]

};

var better_browser = '<div class="container"><div class="better-browser row"><div class="col-md-2"></div><div class="col-md-8"><h3>We are sorry but it looks like your Browser doesn\'t support our website Features. In order to get the full experience please download a new version of your favourite browser.</h3></div><div class="col-md-2"></div><br><div class="col-md-4"><a href="https://www.mozilla.org/ro/firefox/new/" class="btn btn-warning">Mozilla</a><br></div><div class="col-md-4"><a href="https://www.google.com/chrome/browser/desktop/index.html" class="btn ">Chrome</a><br></div><div class="col-md-4"><a href="http://windows.microsoft.com/en-us/internet-explorer/ie-11-worldwide-languages" class="btn">Internet Explorer</a><br></div><br><br><h4>Thank you!</h4></div></div>';

var currentYear = new Date().getFullYear(); document.getElementById("printed-year").innerHTML = currentYear;





var audio;
var playlist;
var tracks;
var current;

init();
function init(){
    current = 0;
    audio = $('#audio');
    playlist = $('#playlist');
    tracks = playlist.find('li a');
    len = tracks.length - 1;
    audio[0].volume = 0.5;
    audio[0].play();
    playlist.find('a').click(function(e){
        e.preventDefault();
        link = $(this);
        current = link.parent().index();
        run(link, audio[0]);
    });
    audio[0].addEventListener('ended',function(e){
        current++;
        if(current == len){
            current = 0;
            link = playlist.find('a')[0];
        }else{
            link = playlist.find('a')[current];    
        }
        run($(link),audio[0]);
    });
}
function run(link, player){
        player.src = link.attr('href');
        par = link.parent();
        par.addClass('active').siblings().removeClass('active');
        audio[0].load();
        audio[0].play();
}



// External Files:
// https://api.html5media.info/1.1.8/html5media.min.js (enables <video> and <audio> tags in all major browsers)
// https://cdn.plyr.io/2.0.13/plyr.js


// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
// jQuery(function ($) {
//     'use strict'
//     var supportsAudio = !!document.createElement('audio').canPlayType;
//     if (supportsAudio) {
//         var index = 0,
//             playing = false,
//             mediaPath = 'https://archive.org/download/mythium/',
//             extension = '',
//             tracks = [{
//                 "track": 1,
//                 "name": "All This Is - Joe L.'s Studio",
//                 "length": "2:46",
//                 "file": "JLS_ATI"
//             }, {
//                 "track": 2,
//                 "name": "The Forsaken - Broadwing Studio (Final Mix)",
//                 "length": "8:31",
//                 "file": "BS_TF"
//             }, {
//                 "track": 3,
//                 "name": "All The King's Men - Broadwing Studio (Final Mix)",
//                 "length": "5:02",
//                 "file": "BS_ATKM"
//             }, {
//                 "track": 4,
//                 "name": "The Forsaken - Broadwing Studio (First Mix)",
//                 "length": "8:32",
//                 "file": "BSFM_TF"
//             }, {
//                 "track": 5,
//                 "name": "All The King's Men - Broadwing Studio (First Mix)",
//                 "length": "5:05",
//                 "file": "BSFM_ATKM"
//             }, {
//                 "track": 6,
//                 "name": "All This Is - Alternate Cuts",
//                 "length": "2:49",
//                 "file": "AC_ATI"
//             }, {
//                 "track": 7,
//                 "name": "All The King's Men (Take 1) - Alternate Cuts",
//                 "length": "5:45",
//                 "file": "AC_ATKMTake_1"
//             }, {
//                 "track": 8,
//                 "name": "All The King's Men (Take 2) - Alternate Cuts",
//                 "length": "5:27",
//                 "file": "AC_ATKMTake_2"
//             }, {
//                 "track": 9,
//                 "name": "Magus - Alternate Cuts",
//                 "length": "5:46",
//                 "file": "AC_M"
//             }, {
//                 "track": 10,
//                 "name": "The State Of Wearing Address (fucked up) - Alternate Cuts",
//                 "length": "5:25",
//                 "file": "AC_TSOWAfucked_up"
//             }, {
//                 "track": 11,
//                 "name": "Magus - Popeye's (New Years '04 - '05)",
//                 "length": "5:54",
//                 "file": "PNY04-05_M"
//             }, {
//                 "track": 12,
//                 "name": "On The Waterfront - Popeye's (New Years '04 - '05)",
//                 "length": "4:41",
//                 "file": "PNY04-05_OTW"
//             }, {
//                 "track": 13,
//                 "name": "Trance - Popeye's (New Years '04 - '05)",
//                 "length": "13:17",
//                 "file": "PNY04-05_T"
//             }, {
//                 "track": 14,
//                 "name": "The Forsaken - Popeye's (New Years '04 - '05)",
//                 "length": "8:13",
//                 "file": "PNY04-05_TF"
//             }, {
//                 "track": 15,
//                 "name": "The State Of Wearing Address - Popeye's (New Years '04 - '05)",
//                 "length": "7:03",
//                 "file": "PNY04-05_TSOWA"
//             }, {
//                 "track": 16,
//                 "name": "Magus - Popeye's (Valentine's Day '05)",
//                 "length": "5:44",
//                 "file": "PVD_M"
//             }, {
//                 "track": 17,
//                 "name": "Trance - Popeye's (Valentine's Day '05)",
//                 "length": "10:47",
//                 "file": "PVD_T"
//             }, {
//                 "track": 18,
//                 "name": "The State Of Wearing Address - Popeye's (Valentine's Day '05)",
//                 "length": "5:37",
//                 "file": "PVD_TSOWA"
//             }, {
//                 "track": 19,
//                 "name": "All This Is - Smith St. Basement (01/08/04)",
//                 "length": "2:49",
//                 "file": "SSB01_08_04_ATI"
//             }, {
//                 "track": 20,
//                 "name": "Magus - Smith St. Basement (01/08/04)",
//                 "length": "5:46",
//                 "file": "SSB01_08_04_M"
//             }, {
//                 "track": 21,
//                 "name": "Beneath The Painted Eye - Smith St. Basement (06/06/03)",
//                 "length": "13:08",
//                 "file": "SSB06_06_03_BTPE"
//             }, {
//                 "track": 22,
//                 "name": "Innocence - Smith St. Basement (06/06/03)",
//                 "length": "5:16",
//                 "file": "SSB06_06_03_I"
//             }, {
//                 "track": 23,
//                 "name": "Magus - Smith St. Basement (06/06/03)",
//                 "length": "5:47",
//                 "file": "SSB06_06_03_M"
//             }, {
//                 "track": 24,
//                 "name": "Madness Explored - Smith St. Basement (06/06/03)",
//                 "length": "4:52",
//                 "file": "SSB06_06_03_ME"
//             }, {
//                 "track": 25,
//                 "name": "The Forsaken - Smith St. Basement (06/06/03)",
//                 "length": "8:44",
//                 "file": "SSB06_06_03_TF"
//             }, {
//                 "track": 26,
//                 "name": "All This Is - Smith St. Basement (12/28/03)",
//                 "length": "3:01",
//                 "file": "SSB12_28_03_ATI"
//             }, {
//                 "track": 27,
//                 "name": "Magus - Smith St. Basement (12/28/03)",
//                 "length": "6:10",
//                 "file": "SSB12_28_03_M"
//             }, {
//                 "track": 28,
//                 "name": "Madness Explored - Smith St. Basement (12/28/03)",
//                 "length": "5:06",
//                 "file": "SSB12_28_03_ME"
//             }, {
//                 "track": 29,
//                 "name": "Trance - Smith St. Basement (12/28/03)",
//                 "length": "12:33",
//                 "file": "SSB12_28_03_T"
//             }, {
//                 "track": 30,
//                 "name": "The Forsaken - Smith St. Basement (12/28/03)",
//                 "length": "8:57",
//                 "file": "SSB12_28_03_TF"
//             }, {
//                 "track": 31,
//                 "name": "All This Is (Take 1) - Smith St. Basement (Nov. '03)",
//                 "length": "4:55",
//                 "file": "SSB___11_03_ATITake_1"
//             }, {
//                 "track": 32,
//                 "name": "All This Is (Take 2) - Smith St. Basement (Nov. '03)",
//                 "length": "5:46",
//                 "file": "SSB___11_03_ATITake_2"
//             }, {
//                 "track": 33,
//                 "name": "Beneath The Painted Eye (Take 1) - Smith St. Basement (Nov. '03)",
//                 "length": "14:06",
//                 "file": "SSB___11_03_BTPETake_1"
//             }, {
//                 "track": 34,
//                 "name": "Beneath The Painted Eye (Take 2) - Smith St. Basement (Nov. '03)",
//                 "length": "13:26",
//                 "file": "SSB___11_03_BTPETake_2"
//             }, {
//                 "track": 35,
//                 "name": "The Forsaken (Take 1) - Smith St. Basement (Nov. '03)",
//                 "length": "8:38",
//                 "file": "SSB___11_03_TFTake_1"
//             }, {
//                 "track": 36,
//                 "name": "The Forsaken (Take 2) - Smith St. Basement (Nov. '03)",
//                 "length": "8:37",
//                 "file": "SSB___11_03_TFTake_2"
//             }],
//             buildPlaylist = $.each(tracks, function(key, value) {
//                 var trackNumber = value.track,
//                     trackName = value.name,
//                     trackLength = value.length;
//                 if (trackNumber.toString().length === 1) {
//                     trackNumber = '0' + trackNumber;
//                 } else {
//                     trackNumber = '' + trackNumber;
//                 }
//                 $('#plList').append('<li><div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName + '</div><div class="plLength">' + trackLength + '</div></div></li>');
//             }),
//             trackCount = tracks.length,
//             npAction = $('#npAction'),
//             npTitle = $('#npTitle'),
//             audio = $('#audio1').bind('play', function () {
//                 playing = true;
//                 npAction.text('Now Playing...');
//             }).bind('pause', function () {
//                 playing = false;
//                 npAction.text('Paused...');
//             }).bind('ended', function () {
//                 npAction.text('Paused...');
//                 if ((index + 1) < trackCount) {
//                     index++;
//                     loadTrack(index);
//                     audio.play();
//                 } else {
//                     audio.pause();
//                     index = 0;
//                     loadTrack(index);
//                 }
//             }).get(0),
//             btnPrev = $('#btnPrev').click(function () {
//                 if ((index - 1) > -1) {
//                     index--;
//                     loadTrack(index);
//                     if (playing) {
//                         audio.play();
//                     }
//                 } else {
//                     audio.pause();
//                     index = 0;
//                     loadTrack(index);
//                 }
//             }),
//             btnNext = $('#btnNext').click(function () {
//                 if ((index + 1) < trackCount) {
//                     index++;
//                     loadTrack(index);
//                     if (playing) {
//                         audio.play();
//                     }
//                 } else {
//                     audio.pause();
//                     index = 0;
//                     loadTrack(index);
//                 }
//             }),
//             li = $('#plList li').click(function () {
//                 var id = parseInt($(this).index());
//                 if (id !== index) {
//                     playTrack(id);
//                 }
//             }),
//             loadTrack = function (id) {
//                 $('.plSel').removeClass('plSel');
//                 $('#plList li:eq(' + id + ')').addClass('plSel');
//                 npTitle.text(tracks[id].name);
//                 index = id;
//                 audio.src = mediaPath + tracks[id].file + extension;
//             },
//             playTrack = function (id) {
//                 loadTrack(id);
//                 audio.play();
//             };
//         extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
//         loadTrack(index);
//     }
// });

// //initialize plyr
// plyr.setup($('#audio1'), {});


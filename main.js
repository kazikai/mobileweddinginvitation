(function($, window, document, undefined){
  // Bind the swipeHandler callback function to the swipe event on div.box

$(".text-header").css({
  "margin": "0 0",
  "font-size": "1.2em"
});

$(".text-center").css("text-align", "center");



var initLocation = function() {
  var map = new Tmap.Map({
    div:"map1",
    width:'100%',
    height:'400px'
  });
  var markerLayer = new Tmap.Layer.Markers();
  map.addLayer( markerLayer );


  var lonlat = new Tmap.LonLat( 14123054.321613, 4512207.674072 );
  //var center = new Tmap.LonLat( 14123343.752289, 4512189.739492 );
  map.setCenter( lonlat, 16 );
  var size = new Tmap.Size(30,30);
  var offset = new Tmap.Pixel(-(size.w/2), -(size.h/2));

  var icon = new Tmap.Icon('img/ico_spot.png', size, offset);
  var marker = new Tmap.Marker(lonlat, icon);

  markerLayer.addMarker(marker);
};

var initBanquet = function( ){
  var map = new Tmap.Map({
    div:"map2",
    width:'100%',
    height:'400px'
  });
  var markerLayer = new Tmap.Layer.Markers();
  map.addLayer( markerLayer );


  var lonlat = new Tmap.LonLat( 14123141.903440, 4512425.620662 );
  var center = new Tmap.LonLat( 14123140.903440, 4512425.620662 );
  map.setCenter( center, 16 );
  var size = new Tmap.Size(30,30);
  var offset = new Tmap.Pixel(-(size.w/2), -(size.h/2));

  var icon = new Tmap.Icon('http://map.nate.com/img/contents/ico_spot.png', size, offset);
  //var icon = new Tmap.IconHtml('<div style="border:red solid 1px; background-color:#FF91DC;"><img src="img/with2.png" width="30px" /></div>',size,offset);
  var marker = new Tmap.Marker(lonlat, icon);

  markerLayer.addMarker(marker);
};


$( document ).on( "pagechange",  function(){
    var elem = document.getElementById( "slider" );
    //$("#slider")
    //$.mobile.page.prototype.options.addBackBtn = true;
    $.mobile.toolbar.prototype.options.backBtnText = "뒤로"
    window.mySwipe = new Swipe( elem, {
        startSlide: 0,
        speed: 500,
        auto: 1000,
        continuous: true,
        disableScroll: false,
        stopPropagation: false,
        callback: function(index, elem) {},
        transitionEnd: function(index, elem) {}
      });

    $( "#slider" ).off( "swipeleft" ).on( "swipeleft", function(e) {
      e.preventDefault();
      var index = mySwipe.getPos() + 1;
      console.log("left: " + index );
      mySwipe.slide( index, 500 );
    });

    $( "#slider" ).off( "swiperight" ).on( "swiperight", function(e) {
      e.preventDefault();
      var index = mySwipe.getPos() - 1;
      console.log("right: " + index );
      mySwipe.slide( index, 500 );
    });
    // tmap initialize
    var $page = $(".ui-page-active");
    $(".tmMap").empty();
    if ( $page.attr( "id" ) === "location" ){
      initLocation();
    } else {
      initBanquet();
    }
});
//alert("만약 알림창을 원하신다면, 여기다 문구를 적어 주세요 ");

//$( document ).ready( function(){
//  var $page = $("[data-role=page]");
//  if ( $page.attr( "id" ) === "location" ){
//      initLocation();
//  } else {
//      initBanquet();
//    }
//});


})(jQuery, window, document);
(function($, window, document, undefined){
// Bind the swipeHandler callback function to the swipe event on div.box
$( ".text-header" ).css({
  "margin": "0 0",
  "font-size": "1.2em"
});
$( ".text-center" ).css( "text-align", "center" );
var initLocation = function() {
  var map = new Tmap.Map({
    div:"map1",
    width:'100%',
    height:'400px'
  });
  var markerLayer = new Tmap.Layer.Markers();
  map.addLayer( markerLayer );
  var lonlat = new Tmap.LonLat( 14127736.0000893, 4511715.2883089 );
  //var center = new Tmap.LonLat( 14123343.752289, 4512189.739492 );
  map.setCenter( lonlat, 16 );
  var size = new Tmap.Size(30,30);
  var offset = new Tmap.Pixel(-(size.w/2), -(size.h/2));
  var icon = new Tmap.Icon('./resources/img/heart.png', size, offset);
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
  var icon = new Tmap.Icon('./resources/img/marker.png', size, offset);
  var marker = new Tmap.Marker(lonlat, icon);
  markerLayer.addMarker(marker);
};
var initKakao = function(){
    /* kakao톡 링크 */
  Kakao.cleanup();
  // 사용할 앱의 Javascript 키를 설정해 주세요.
  Kakao.init('abeaf346736c57a8ba07ef2dcfcad028');
  // 카카오톡 링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
  Kakao.Link.createTalkLinkButton({
    container: '#kakao-link',
    label: '저희의 결혼을 축하해주세요',
    image: {
      src: 'http://dev.kazikai.net/invitation/dist/resources/img/main.png',
      width: '300',
      height: '200'
    },
    webButton: {
      text: '청첩장 바로가기',
      url: 'http://dev.kazikai.net/invitation/dist/index.html' // 앱 설정의 웹 플랫폼에 등록한 도메인의 URL이어야 합니다.
    }
  });
};


$( document ).on( "pagechange",  function(){
  var elem = document.getElementById( "slider" );
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
  var $slider = $( "#slider" ),
      $prev = $( "#prevButton" ),
      $next = $( "#nextButton" );
  $prev.off( "click" ).on( "click", function(){
    mySwipe.prev();
  });
  $next.off( "click" ).on( "click", function(){
    mySwipe.next();
  });
  // tmap initialize
  var $page = $( ".ui-page-active" );
  $( ".tmMap" ).empty();
  if ( $page.attr( "id" ) === "location1" ){
    initLocation();
  } else {
    initBanquet();
  }
  initKakao();
});
})(jQuery, window, document);
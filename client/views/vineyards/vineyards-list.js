'use strict';

angular.module('PickYourVine')
.controller('VineyardsListCtrl', function($scope, $state, Vineyard, $window, Map){
  var map;
  var markers = [];
  var payload = $state.params.payload;
  payload = payload.split(',');
  var x = payload[0] * 1;
  var y = payload[1] * 1;
  var dist = payload[2] * 1;
  var geoInfo = {
      loc: [x, y],
      dist: dist
    };
  if(dist){
    console.log('list', geoInfo);
    Vineyard.findGeo(geoInfo)
    .then(function(data){
      console.log(data);
      $scope.vineyards = data.data;
      map = Map.create('#map', y, x, 10);
     addMarkers();
      dist = 0;
    });
  } else if($state.params.region.length < 20 && $state.params.region.length > 2){
    console.log('region', $state.params);
    Vineyard.regionSearch($state.params.region)
    .then(function(reply){
      console.log("dsfsdf", reply);
      $scope.vineyards = reply.data;
      var lat;
      var lng;
      if($state.params.region === 'verde valley'){
        lat = 34.7391876;
        lng = -112.00987910000003;
      } else if($state.params.region === 'willcox'){
        lat = 32.2528519;
        lng = -109.8320124;
      } else if($state.params.region === 'sonoita'){
        lat = 31.6795337;
        lng = -110.65535940000001;
      }
      map = Map.create('#map', lat, lng, 10);
     addMarkers();
      dist = 0;
    });
  } else if(dist === 0 && $state.params.region.length === 24){
    Vineyard.find()
    .then(function(response){
      $scope.vineyards = response.data;
    });
  }
  function addMarkers(){
    // clearMarkers();
    markers = $scope.vineyards.map(function(s){
      s.marker = Map.addMarker(map, s.geo[1], s.geo[0], s.name, '/assets/wine2.png');
    });
  }
  $scope.toggleBounce = function (vinyard) {
   if (vinyard.marker.getAnimation() !== null) {
     vinyard.marker.setAnimation(null);
   } else {
     vinyard.marker.setAnimation($window.google.maps.Animation.BOUNCE);
   }
 };
  // findVinyards();
  $scope.editVineyard = function(vineyard){
    $state.go('vineyards.edit', {vineyardId: vineyard._id});
  };
  $scope.deleteVineyard = function(vineyard){
    Vineyard.deleteVineyard(vineyard)
    .then(function(response){
      $window._.remove($scope.vineyards, function(){
        return vineyard._id === response.data._id;
      });
    });
  };
  $scope.vineyardGo = function(vineyard){
    $state.go('vineyards.show', {vineyardId: vineyard._id});
  };
});

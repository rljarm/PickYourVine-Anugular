'use strict';

angular.module('PickYourVine')
.controller('VineyardsListCtrl', function($scope, $state, Vineyard, $window, Map){
  var map;
  var markers = [];
  $scope.mapHide = false;
  $scope.areaSearch = true;
  $scope.searchRegion = function(region){
    Vineyard.regionSearch(region)
    .then(function(reply){
      $scope.vineyards = reply.data;
      var lat;
      var lng;
      console.log(region);
      if(region === 'verde valley'){
        lat = 34.7391876;
        lng = -112.00987910000003;
      } else if(region === 'willcox'){
        lat = 32.2528519;
        lng = -109.8320124;
      } else if(region === 'sonoita'){
        lat = 31.6795337;
        lng = -110.65535940000001;
      }
      map = Map.create('#map', lat, lng, 10);
      addMarkers();
      $scope.areaSearch = false;
      $scope.mapHide = false;
    });
  };
  $scope.search = function(city, distance){
    Map.geocode(city, function(results){
      var x = results[0].geometry.location.F;
      var y = results[0].geometry.location.A;
      var dist = distance;
      Vineyard.findGeo(x, y, dist)
      .then(function(response){
        $scope.vineyards = response.data;
        map = Map.create('#map', y, x, 10);
        addMarkers();
        $scope.areaSearch = false;
        $scope.mapHide = false;
      });
    });
  };

  $scope.toggleSearch = function(){
    $scope.areaSearch = true;
    $scope.mapHide = false;
  };

  function addMarkers(){
    // clearMarkers();
    markers = $scope.vineyards.map(function(s){
      s.marker = Map.addMarker(map, s.geo[1], s.geo[0], s.name, '/assets/wine2.png');
    });
  }
  $scope.toggleBounce = function(vinyard){
   if(vinyard.marker.getAnimation() !== null){
     vinyard.marker.setAnimation(null);
   } else{
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
  $scope.openVineyard = function(marker){
    console.log('marker', marker);
  };

  $scope.vineyardGo = function(index){
    $scope.vineyard = $scope.vineyards[index];
    console.log($scope.vineyard);
    $scope.mapHide = true;
    var x = $scope.vineyard.geo[0];
    var y = $scope.vineyard.geo[1];
    Vineyard.getYelp($scope.vineyard.addrString, $scope.vineyard.name)
    .then(function(reply){
      map = Map.create('#detailMap', y, x, 14);
      addMarkers();
      $window.google.maps.event.trigger(map, 'resize');
      console.log('yelp', reply);
      $scope.yelp = reply.data.businesses[0];
    });
  };
});

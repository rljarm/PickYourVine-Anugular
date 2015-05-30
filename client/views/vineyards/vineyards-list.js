'use strict';

angular.module('PickYourVine')
.controller('VineyardsListCtrl', function($scope, $state, Vineyard, $window, Map){

  var map;
  var markers = [];
  $scope.mapHide = false;
  $scope.areaSearch = true;
  $scope.searchRegion = function(region, query){
    Vineyard.regionSearch(region)
    .then(function(reply){
      if($scope.foodPairing){
        $scope.vineyards = reply.data.filter(function(vineyard){
          console.log('vineyard', vineyard);
          if(vineyard.foodPairing){
            return vineyard;
          }
        });
      }else if($scope.tastingRoom){
        $scope.vineyards = reply.data.filter(function(vineyard){
          if(vineyard.tastingRoom){
            return vineyard;
          }
        });
      }else{
        $scope.vineyards = reply.data;
      }
      var lat = getMeanLat($scope.vineyards);
      var lng = getMeanLng($scope.vineyards)
      map = Map.create('#map', lat, lng, 10);
      addMarkers();
      $scope.areaSearch = false;
      $scope.mapHide = false;
      $scope.region = '';
    });
  };
  function getMeanLng(vineyards){
    return (vineyards.reduce(function(prev, curr){
      return prev + curr.geo[0];
    }, 0) / vineyards.length);
  }
  function getMeanLat(vineyards){
    return vineyards.reduce(function(prev, curr){
      return prev + curr.geo[1];
    }, 0) / vineyards.length;
  }
  $scope.search = function(city, distance){
    Map.geocode(city, function(results){
      var x = results[0].geometry.location.F;
      var y = results[0].geometry.location.A;
      var dist = distance;
      Vineyard.findGeo(x, y, dist)
      .then(function(response){
        console.log(response.data);
        if($scope.foodPairing){
          $scope.vineyards = response.data.filter(function(vineyard){
            console.log('vineyard', vineyard);
            if(vineyard.foodPairing){
              return vineyard;
            }
          });
        }else if($scope.tastingRoom){
          $scope.vineyards = response.data.filter(function(vineyard){
            if(vineyard.tastingRoom){
              return vineyard;
            }
          });
        }else{
          $scope.vineyards = response.data;
        }
        console.log(x, y);
        map = Map.create('#map', y, x, 10);
        addMarkers();
        $scope.areaSearch = false;
        $scope.mapHide = false;
        $scope.city = '';
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

  var marker;
  function addMarker(vinyard){
    marker = Map.addMarker(map, vinyard.geo[1], vinyard.geo[0], vinyard.name, '/assets/wine2.png');
  }

  $scope.vineyardGo = function(index){
    $scope.vineyard = $scope.vineyards[index];
    console.log($scope.vineyard);
    $scope.mapHide = true;
    var x = $scope.vineyard.geo[0];
    var y = $scope.vineyard.geo[1];
    Vineyard.getYelp($scope.vineyard.addrString, $scope.vineyard.name)
    .then(function(reply){
      map = Map.create('#detailMap', y, x, 14);
      addMarker($scope.vineyard);
      $window.google.maps.event.trigger(map, 'resize');
      console.log('yelp', reply);
      $scope.yelp = reply.data.businesses[0];
    });
  };
});

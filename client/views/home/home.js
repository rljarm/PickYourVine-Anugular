'use strict';

angular.module('PickYourVine')
.controller('HomeCtrl', function($scope, $state, Map, $window){

  function searchByGeo(x, y, dist){
    var list = [x,y,dist];
    var payload = list.join(',');
    $state.go('vineyards.list', {payload: payload});
  }

  $scope.searchRegion = function(region){
    $state.go('vineyards.list', {payload: region});
  };

  $scope.search = function(city, distance){
    Map.geocode(city, function(results){
      var x = results[0].geometry.location.F;
      var y = results[0].geometry.location.A;
      var dist = distance;
      searchByGeo(x, y, dist);
    });
  };
});

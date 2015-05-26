'use strict';

angular.module('PickYourVine')
.controller('VineyardsListCtrl', function($scope, $state, Vineyard, $window){
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
      dist = 0;
    });
  } else if($state.params.region.length < 20 && $state.params.region.length > 2){
    console.log('region', $state.params);
    Vineyard.regionSearch($state.params.region)
    .then(function(reply){
      console.log("dsfsdf", reply);
      $scope.vineyards = reply.data;
    });
  } else if(dist === 0 && $state.params.region.length === 24){
    Vineyard.find()
    .then(function(response){
      $scope.vineyards = response.data;
    });
  }
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

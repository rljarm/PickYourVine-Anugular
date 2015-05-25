'use strict';

angular.module('PickYourVine')
.controller('VineyardsListCtrl', function($scope, $state, Vineyard, $window){
  function findVinyards(){
    if($state.params.payload){
      var payload = $state.params.payload;
      payload = payload.split(',');
      var x = payload[0];
      var y = payload[1];
      var dist = payload[2];
      var geoInfo = {
        loc: [x, y],
        dist: dist
      };
      console.log('list', geoInfo);
      Vineyard.findGeo(geoInfo);
    }
    Vineyard.find()
  .then(function(response){
    $scope.vineyards = response.data;
  });
  }
  findVinyards();
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

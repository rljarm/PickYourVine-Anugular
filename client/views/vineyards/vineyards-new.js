'use strict';

angular.module('PickYourVine')
.controller('VineyardsNewCtrl', function($scope, $state, Vineyard, Map){

    $scope.isEdit = false;

  function checkState(){
     if($state.params.vineyardId){
       $scope.isEdit = true;
       Vineyard.findOne($state.params.vineyardId)
       .then(function(response){
         $scope.vineyard = response.data;
         console.log('fds', $scope.vineyard);
       });
     }
   }

  checkState();

    $scope.edit = function(obj){
       var o = angular.copy(obj);
       delete o.__v;
       delete o.$$hashkey;
       delete o.createdAt;
       delete o._id;
       Vineyard.edit(o, obj._id)
       .then(function(){
         $state.go('vineyard.list');
       });
     };


  $scope.addVineyard = function(vineyard){
    var address = [];
    address.push($scope.vineyard.street);
    address.push($scope.vineyard.city);
    address.push($scope.vineyard.state);
    address.push($scope.vineyard.zip);
    address = address.join(', ');
    if($scope.vineyard.tastingRoom === undefined){
      $scope.vineyard.tastingRoom = false;
    }
    if($scope.vineyard.foodPairing === undefined){
      $scope.vineyard.foodPairing = false;
    }
    Map.geocode(address, function(results){
      if(results && results.length){
        $scope.vineyard.addrString = results[0].formatted_address;
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();
        $scope.vineyard.geo = [lng, lat];
        $scope.vineyards.wines = $scope.vineyards.wines.split(', ');
        Vineyard.add(vineyard)
    .then(function(reply){
      console.log('!?!?!?!?!?!', reply);
      $state.go('vineyards.list');
    });
      }
    });
  };
});

'use strict';

angular.module('PickYourVine')
.controller('HotelsNewCtrl', function($scope, $state, Hotel, Map){

  $scope.isEdit = false;

  function checkState(){
   if($state.params.hotelId){
     $scope.isEdit = true;
     Hotel.findOne($state.params.hotelId)
     .then(function(response){
       $scope.hotel = response.data;
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
     Hotel.edit(o, obj._id)
     .then(function(){
       $state.go('hotels.list');
     });
   };


  $scope.addHotel = function(hotel){

    var address = [];
    address.push($scope.hotel.street);
    address.push($scope.hotel.city);
    address.push($scope.hotel.state);
    address.push($scope.hotel.zip);
    address = address.join(', ');
    Map.geocode(address, function(results){
      console.log('Inside Map.geocode --> results:', results);
      if(results && results.length){
        $scope.hotel.addrString = results[0].formatted_address;
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();
        $scope.hotel.geo = [lng, lat];
        console.log(hotel);
        Hotel.add(hotel)
    .then(function(){
      $state.go('hotels.list');
    });
      }
    });
  };
});

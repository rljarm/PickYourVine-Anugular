'use strict';

angular.module('PickYourVine')
.controller('HotelsListCtrl', function($scope, $state, Hotel, $window){
  Hotel.find()
  .then(function(response){
    console.log('11111', response);
    $scope.hotels = response.data;
    console.log('htoels list hotel find', $scope.hotels);
  });
  $scope.editHotel = function(hotel){
    $state.go('hotels.edit', {hotelId: hotel._id});
  };
  $scope.deleteHotel = function(hotel){
    Hotel.deleteHotel(hotel)
    .then(function(response){
      $window._.remove($scope.hotels, function(){
        return hotel._id === response.data._id;
      });
    });
  };
  $scope.hotelGo = function(hotel){
    console.log('before show', hotel._id);
    $state.go('hotels.show', {hotelId: hotel._id});
  };
});

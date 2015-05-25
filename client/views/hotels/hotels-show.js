'use strict';

angular.module('PickYourVine')
.controller('HotelsShowCtrl', function($scope, $state, Hotel){
  Hotel.findOne($state.params.hotelId)
  .then(function(response){
    console.log('show', response);
    $scope.hotel = response.data;
  });
});

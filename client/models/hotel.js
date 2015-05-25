'use strict';

angular.module('PickYourVine')
.factory('Hotel', function($rootScope, $http, nodeUrl){
  function Hotel(){
    Hotel.initialize = function(){
    return $http.post(nodeUrl + '/hotels');
  };
  }
  Hotel.add = function(hotel){
    return $http.post(nodeUrl + '/hotels', hotel);
  };
  Hotel.find = function(){
    return $http.get(nodeUrl + '/hotels');
  };
  Hotel.deleteHotel = function(hotel){
    return $http.delete(nodeUrl + '/hotels/' + hotel._id);
  };
  Hotel.findOne = function(hotelId){
    console.log('inside findeone', hotelId);
    return $http.get(nodeUrl + '/hotels/' + hotelId);
  };
  Hotel.edit = function(hotel, hotelId){
    console.log('hotelid:', hotelId);
    console.log('hotel', hotel);
    return $http.put(nodeUrl + '/hotels/' + hotelId, hotel);
  };
  return Hotel;
});

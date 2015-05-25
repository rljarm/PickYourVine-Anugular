'use strict';

angular.module('PickYourVine')
.factory('Map', function($window){
  function Map(){
  }

  Map.geocode = function(address, cb){
    var geocoder = new $window.google.maps.Geocoder();
    geocoder.geocode({address: address}, cb);
  };

  return Map;
});

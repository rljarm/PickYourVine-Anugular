'use strict';

angular.module('PickYourVine')
.factory('Vineyard', function($rootScope, $http, nodeUrl){
  function Vineyard(){
  Vineyard.initialize = function(){
  return $http.post(nodeUrl + '/vineyards');
};
}

  Vineyard.add = function(vineyard){
    return $http.post(nodeUrl + '/vineyards', vineyard);
  };

  Vineyard.find = function(){
    return $http.get(nodeUrl + '/vineyards');
  };
  Vineyard.deleteVineyard = function(vineyard){
    return $http.delete(nodeUrl + '/vineyards/' + vineyard._id);
  };
  Vineyard.findOne = function(vineyardId){
    return $http.get(nodeUrl + '/vineyards/' + vineyardId);
  };
  Vineyard.edit = function(vineyard, vineyardId){
    return $http.put(nodeUrl + '/vineyards/' + vineyardId, vineyard);
  };
  Vineyard.findGeo = function(x, y, dist){
    return $http.get(nodeUrl + '/vineyards/geosearch/' + x + '/' + y + '/' + dist);
  };
  Vineyard.getYelp = function(address, name){
    return $http.get(nodeUrl + '/vineyards/yelp/' + address + '/' + name);
  };
  Vineyard.regionSearch = function(region){
    return $http.get(nodeUrl + '/vineyards/region/' + region);
  };
  return Vineyard;
});

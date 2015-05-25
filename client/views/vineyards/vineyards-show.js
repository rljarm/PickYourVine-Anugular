'use strict';

angular.module('PickYourVine')
.controller('VineyardsShowCtrl', function($scope, $state, Vineyard, $http, $window){
  Vineyard.findOne($state.params.vineyardId)
  .then(function(response){
    $scope.vineyard = response.data;
    var address = $scope.vineyard.addrString;
    var name = $scope.vineyard.name;
    Vineyard.getYelp(address, name)
    .then(function(reply){
      console.log(reply);
      $scope.yelp = reply.data.businesses[0];
    });
    var url = 'http://services.wine.com/api/beta2/service.svc/JSON/categorymap?filter=categories(490)&apikey=5d61d89432e64d9761074b2dc0ca4970';
    $http.jsonp(url).success(function(data, status, headers, config){
      console.log('wine.com', data, status, headers, config);
    });
  });
});

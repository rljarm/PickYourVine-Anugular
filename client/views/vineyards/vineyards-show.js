'use strict';

angular.module('PickYourVine')
.controller('VineyardsShowCtrl', function($scope, $state, Vineyard, $http, $window){
  Vineyard.findOne($state.params.vineyardId)
  .then(function(response){
    $scope.vineyard = response.data;
    getYelp($scope.vineyard);
  });
  function randomString(){
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for(var i = 0; i < 32; i++){
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return result;
  }
  function getYelp(vineyard){
      var address = vineyard.addrString;
      var name = vineyard.name;
      var method = 'GET';
      var url = 'http://api.yelp.com/v2/search';
      var params = {
      callback: 'angular.callbacks._0',
      location: address,
      oauth_consumer_key: 'rtmnZO5Fl1AiMTJg2s2uoA',
      oauth_token: 'wbN2KyasuLy7w-k2tRB4hqTsh9lCaaWW',
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: new Date().getTime(),
      oauth_nonce: randomString(),
      term: name
    };
      var consumerSecret = '2BRUmevrTOxfFGAEnn1hIobtcZA';
      var tokenSecret = 'B6q7u9eHA7fSgOxQPFP8JEmPfb0';
      var signature = $window.oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, {encodeSignature: false});
      params['oauth_signature'] = signature;
      $http.jsonp(url, {params: params}).success(function(reply){
        $scope.yelp = reply.businesses[0];
        console.log($scope.yelp);
      });
    }
});

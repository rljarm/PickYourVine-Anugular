'use strict';

angular.module('PickYourVine')
.controller('NavCtrl', function($rootScope, $scope, $state, $firebaseObject, $http, User, Map){
  function goHome(){
    $state.go('home');
  }
  $scope.search = function(query){
    console.log('clicked', query);
    Map.geocode(query, function(reply){
      console.log(reply);
    });
  };

  function getDisplayName(data){
    switch(data.provider){
      case 'password':
        return data.password.email;
      case 'twitter':
        return data.twitter.username;
      case 'google':
        return data.google.displayName;
      case 'facebook':
        return data.facebook.displayName;
      case 'github':
        return data.github.displayName;
    }
  }

  $scope.afAuth.$onAuth(function(data){
    if(data){
      $rootScope.activeUser = data;
      $rootScope.displayName = getDisplayName(data);
      $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;
      User.initialize().then(function(response){
        $rootScope.activeUser.mongoId = response.data;
        goHome();
      });
    }else{
      $rootScope.activeUser = null;
      $rootScope.displayName = null;
      $http.defaults.headers.common.Authorization = null;
      goHome();
    }
  });

  $scope.logout = function(){
    User.logout();
  };
});

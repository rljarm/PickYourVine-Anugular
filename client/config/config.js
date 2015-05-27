'use strict';

angular.module('PickYourVine')
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/vineyard');

  $stateProvider
  .state('home', {url: '/', templateUrl: '/views/vineyards/vineyards-list.html', controller: 'VineyardsListCtrl'})
  .state('about', {url: '/about', templateUrl: '/views/general/about.html'})
  .state('faq', {url: '/faq', templateUrl: '/views/general/faq.html'})
  .state('contact', {url: '/contact', templateUrl: '/views/general/contact.html'})
  .state('register', {url: '/register', templateUrl: '/views/users/users.html', controller: 'UsersCtrl'})
  .state('login', {url: '/login', templateUrl: '/views/users/users.html', controller: 'UsersCtrl'})
  .state('vineyards', {url: '/vineyards', templateUrl: '/views/vineyards/vineyards.html', abstract: true})
  .state('vineyards.list', {url: '/vineyard', templateUrl: '/views/vineyards/vineyards-list.html', controller: 'VineyardsListCtrl'})
  .state('vineyards.new', {url: '/new', templateUrl: '/views/vineyards/vineyards-new.html', controller: 'VineyardsNewCtrl'})
  .state('vineyards.edit', {url: '/edit/{vineyardId}', templateUrl: '/views/vineyards/vineyards-new.html', controller: 'VineyardsNewCtrl'})
  .state('vineyards.show', {url: '/{vineyardId}', templateUrl: '/views/vineyards/vineyards-show.html', controller: 'VineyardsShowCtrl'})
  .state('hotels', {url: '/hotels', templateUrl: '/views/hotels/hotels.html', abstract: true})
  .state('hotels.list', {url: '/', templateUrl: '/views/hotels/hotels-list.html', controller: 'HotelsListCtrl'})
  .state('hotels.new', {url: '/new', templateUrl: '/views/hotels/hotels-new.html', controller: 'HotelsNewCtrl'})
  .state('hotels.edit', {url: '/editHotel/{hotelId}', templateUrl: '/views/hotels/hotels-new.html', controller: 'HotelsNewCtrl'})
  .state('hotels.show', {url: '/show/{hotelId}', templateUrl: '/views/hotels/hotels-show.html', controller: 'HotelsShowCtrl'});
});

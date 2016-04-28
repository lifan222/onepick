var app = angular.module('onepick', ['ionic',
  'onepick.controllers.hotvotes',
  'onepick.controllers.mypage',
  'onepick.controllers.newvote'
]);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
  })

  .state('tab.hotvotes', {
    url: '/hotvotes',
    views: {
      'tab-hotvotes': {
        templateUrl: 'templates/tabs/tab-hotvotes.html',
        controller: 'HotvotesCtrl'
      }
    }
  })

  .state('tab.mypage', {
    url: '/mypage',
    views: {
      'tab-mypage': {
        templateUrl: 'templates/tabs/tab-mypage.html',
        controller: 'MypageCtrl'
      }
    }
  })

  .state('tab.newvote', {
    url: '/newvote',
    views: {
      'tab-newvote': {
        templateUrl: 'templates/tabs/tab-newvote.html',
        controller: 'NewvoteCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/tab/hotvotes');

});

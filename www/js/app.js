var app = angular.module('onepick', ['ionic',
  'onepick.controllers.hotvotes',
  'onepick.controllers.mypage',
  'onepick.controllers.newvote',
  'onepick.controllers.intro',
  'onepick.controllers.oldQueModal',
  'onepick.controllers.hotVoteModal',
  'onepick.services',
  'firebase',
  'ngCordova'
]);


app.constant("FIREBASE_URL", 'https://onepick.firebaseio.com');
app.constant("FACEBOOK_APP_ID", '1594320997546423');

app.config(function ($stateProvider, $urlRouterProvider, FACEBOOK_APP_ID) {
  openFB.init({appId: FACEBOOK_APP_ID});
});

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('intro', {
      url: '/',
      templateUrl: 'templates/intro.html',
      controller: 'IntroCtrl'
    })


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

  $urlRouterProvider.otherwise('/');

});

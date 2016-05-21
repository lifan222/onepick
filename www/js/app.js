var app = angular.module('onepick', ['ionic',
  'onepick.controllers.hotvotes',
  'onepick.controllers.mypage',
  'onepick.controllers.newvote',
  'onepick.controllers.intro',
  'onepick.services',
  'firebase',
  'angular-svg-round-progressbar',
  'auth0',
  'angular-storage',
  'angular-jwt',
  'ion-datetime-picker'
]);


app.constant("FIREBASE_URL", 'https://onepick.firebaseio.com');
app.constant("FACEBOOK_APP_ID", '1594320997546423');

app.config(function($stateProvider, $urlRouterProvider, authProvider, $httpProvider,
                    jwtInterceptorProvider){
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
    cache: false,
    url: '/mypage',
    views: {
      'tab-mypage': {
        templateUrl: 'templates/tabs/tab-mypage.html',
        controller: 'MypageCtrl'
      }
    }
  })

  .state('tab.newvote', {
    cache: false,
    url: '/newvote',
    views: {
      'tab-newvote': {
        templateUrl: 'templates/tabs/tab-newvote.html',
        controller: 'NewvoteCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/');

  authProvider.init({
    domain: 'lifaninjp.auth0.com',
    clientID: 'rOCqM1mblIK60vJtqwhOQa7J3Bl5Dj3o',
    loginState: 'login' // This is the name of the state where you'll show the login, which is defined above...
  });

  jwtInterceptorProvider.tokenGetter = function(store, jwtHelper, auth) {
    var idToken = store.get('token');
    var refreshToken = store.get('refreshToken');
    // If no token return null
    if (!idToken || !refreshToken) {
      return null;
    }
    // If token is expired, get a new one
    if (jwtHelper.isTokenExpired(idToken)) {
      return auth.refreshIdToken(refreshToken).then(function(idToken) {
        store.set('token', idToken);
        return idToken;
      });
    } else {
      return idToken;
    }
  };

  $httpProvider.interceptors.push('jwtInterceptor');

});


app.run(function(auth) {
  // This hooks all auth events to check everything as soon as the app starts
  auth.hookEvents();
});


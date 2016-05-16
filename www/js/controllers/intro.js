var mod = angular.module('onepick.controllers.intro', ['ionic', 'ngCordova', 'firebase']);

mod.controller('IntroCtrl', function(store, $scope, $state, $location, auth, $rootScope, $firebaseArray) {
    $scope.login = function() {
        $scope.loggingIn = false;
        auth.signin({
            authParams: {
                scope: 'openid offline_access',
                device: 'Mobile device'
            }
        }, function(profile, token, accessToken, state, refreshToken) {
            // Success callback
            store.set('profile', profile);
            store.set('token', token);
            store.set('refreshToken', refreshToken);
            auth.getToken({
                api: 'firebase'
            }).then(function (delegation) {
                console.log(delegation);
                store.set('firebaseToken', delegation.id_token);
                $state.go('tab.hotvotes');

                // Grab the token
                var firebaseToken = store.get('firebaseToken');

                // Bind to the Firebase db
                $rootScope.fb_id = "auth0|57398842e7302223640d0ab3";
                var ref = new Firebase("https://onepick.firebaseio.com/users/"+$rootScope.fb_id);

                // Call Firebase with a custom token
                ref.authWithCustomToken(firebaseToken, function(error, authData){
                    if (error) {
                        console.log("Authentication to Firebase failed", error);
                    } else {
                        console.log("Authentication to Firebase successful with payload:", authData);
                    }
                });

                // create an AngularFire reference to the data
                $scope.list = $firebaseArray(ref);
                console.log($scope.list);

            }, function (error) {
                console.log("There was an error getting the firebase token", error);
            })
        }, function(error) {
            console.log("There was an error logging in", error);
        });
    };

    $scope.logout = function() {
        auth.signout();
        store.remove('profile');
        store.remove('token');
    };


    
});

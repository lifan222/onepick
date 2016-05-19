var mod = angular.module('onepick.controllers.intro', ['ionic', 'firebase', "ngCookies"]);

mod.controller('IntroCtrl', function(store,
                                     $scope,
                                     $state,
                                     $location,
                                     auth,
                                     $rootScope,
                                     $firebaseArray,
                                     $cookies) {
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
                var ref = new Firebase("https://onepick.firebaseio.com/users");

                // Call Firebase with a custom token
                ref.authWithCustomToken(firebaseToken, function(error, authData){
                    if (error) {
                        // console.log("Authentication to Firebase failed", error);
                    } else {
                        // console.log("Authentication to Firebase successful with payload:", authData);
                        $cookies.put("username", $rootScope.auth.profile.username, {
                            expires: new Date(2016, 12, 12)
                        });
                        // $cookies.username = $rootScope.auth.profile.username;
                        $rootScope.username = $cookies.get("username");
                        ref.once("value", function(snapshot) {
                            if(!snapshot.hasChild($rootScope.auth.profile.username)){
                                var newUserRef = ref.child($rootScope.username);
                                    newUserRef.set({
                                        "profile": "",
                                        "activeQuestions": "",
                                        "oldQuestions": "",
                                        "votes": ""
                                    });
                            }

                        });


                    }
                });
                // create an AngularFire reference to the data

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

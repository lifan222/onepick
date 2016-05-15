var app = angular.module('onepick.services.userService', []);


app.service('UserService', function (FIREBASE_URL,
                                     $q,
                                     $rootScope,
                                     $window,
                                     $ionicPopup) {

    var ref = new Firebase(FIREBASE_URL);
    var usersRef = new Firebase(FIREBASE_URL + "/users");

    var self = {
        current: {},

        ensureFavorite: function () {
            if (!self.current.favorites) {
                self.current.favorites = {};
            }
        },

        toggleFavorite: function (show) {
            // Toggles the favorite setting for a show for the current user.
            self.ensureFavorite();
            if (self.current.favorites[show.showid]) {
                self.removeFavorite(show)
            } else {
                self.addFavorite(show)
            }
            self.current.$save();
        },

        addFavorite: function (show) {
            self.ensureFavorite();
            self.current.favorites[show.showid] = show;
        },

        removeFavorite: function (show) {
            self.ensureFavorite();
            self.current.favorites[show.showid] = null;
        },

        loadUser: function () {
            var d = $q.defer();


             var currentUserId = $window.localStorage.getItem('tvchat-user', null);
             if (currentUserId && currentUserId != "null") {
             console.debug("Found previously logged in user, loading from firebase ", currentUserId);
             var user = $firebaseObject(usersRef.child(currentUserId));
             user.$loaded(function () {
             self.current = user;
             d.resolve(self.current);
             });
             } else {
             d.resolve();
             }


            return d.promise;
        },

        logoutUser: function () {
            $window.localStorage.setItem('tvchat-user', null);
            self.current = {};
        },

        loginUser: function () {
            var d = $q.defer();

            self.loadUser().then(function (user) {
                if (user) {
                    d.resolve(self.current);
                }
                else {
                    console.log('Calling facebook login');
                    openFB.login(
                        function (response) {
                            console.log(response);
                            if (response.status === 'connected') {
                                console.log('Facebook login succeeded');

                                 var token = response.authResponse.accessToken;
                                 openFB.api({
                                 path: '/me',
                                 params: {},
                                 success: function (userData) {
                                 console.log('Got data from facebook about current user');
                                 console.log(userData);

                                 console.log('Authenticating with firebase');


                                 var auth = $firebaseAuth(ref);
                                 auth.$authWithOAuthToken("facebook", token)
                                 .then(function (authData) {
                                 console.log("Authentication success, logged in as:", authData.uid);
                                 console.log(authData);

                                 usersRef.child(authData.uid)
                                 .transaction(function (currentUserData) {
                                 if (currentUserData === null) {

                                 return {
                                 'name': userData.name,
                                 'profilePic': 'http://graph.facebook.com/' + userData.id + '/picture',
                                 'userId': userData.id
                                 };
                                 }
                                 },
                                 function (error, committed) {

                                 $window.localStorage.setItem('tvchat-user', authData.uid);
                                 self.current = $firebaseObject(usersRef.child(authData.uid));
                                 self.current.$loaded(function () {
                                    d.resolve(self.current);
                                 });
                                 });
                                 })
                                 .catch(function (error) {
                                 console.error("Authentication failed:", error);

                                 $ionicPopup.alert({
                                 title: "Error",
                                 template: 'There was an error logging you in with facebook, please try later.'
                                 });
                                 d.reject(error);
                                 });

                                 },
                                 error: function (error) {
                                 console.error('Facebook error: ' + error.error_description);

                                 $ionicPopup.alert({
                                 title: "Facebook Error",
                                 template: error.error_description
                                 });
                                 d.reject(error);
                                 }
                                 });

                            } else {
                                console.error('Facebook login failed');

                                $ionicPopup.alert({
                                    title: "Facebook Error",
                                    template: 'Failed to login with facebook'
                                });
                                d.reject(error);
                            }
                        },
                        {
                            scope: 'email' // Comma separated list of permissions to request from facebook
                        });
                }
            });
            return d.promise;
        }
    };

    self.loadUser();

    return self;
})
;

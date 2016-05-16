var mod = angular.module('onepick.controllers.intro', ['ionic', 'ngCordova']);

mod.controller('IntroCtrl', function ($scope, $state, UserService) {

    $scope.loggingIn = false;

    $scope.login = function () {
        if (!$scope.loggingIn) {
            $scope.loggingIn = true;
            $state.go('tab.hotvotes');
            // UserService.loginUser().then(function () {
            //     $scope.loggingIn = false;
            //     $state.go('tab.hotvotes');
            // });
        }

    }
});
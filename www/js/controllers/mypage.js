
var app = angular.module('onepick.controllers.mypage', ['ionic', "firebase", "ngCookies", "naif.base64"]);



app.controller('MypageCtrl', function($scope,
                                      $ionicSlideBoxDelegate,
                                      $firebaseArray,
                                      $firebaseObject,
                                      $ionicModal, 
                                      $rootScope, 
                                      $cookies){

  $rootScope.username = $cookies.get("username");
  var userRef = new Firebase("https://onepick.firebaseio.com/users/"+$rootScope.username);
  // var userRef = new Firebase("https://onepick.firebaseio.com/users/lifaninjp");
  $scope.user = $firebaseArray(userRef);
  $scope.profile = $firebaseObject(userRef.child("profile"));
  $scope.votes = $firebaseObject(userRef.child("votes"));
  $scope.actQuestions = $firebaseArray(userRef.child("activeQuestions"));
  $scope.actQuestions.$loaded()
      .then(function(){
        $ionicSlideBoxDelegate.update();
      });
  $scope.oldQuestions = $firebaseArray(userRef.child("oldQuestions"));


  $scope.myVar = true;
  $scope.btnActive = true;
  $scope.myActiveSlide = 0;


  $scope.votesShow = function () {
    $scope.myVar = true;
    $scope.btnActive = true;
  };
  $scope.questionShow = function () {
    $scope.myVar = false;
    $scope.btnActive = false;
  };

  $ionicModal.fromTemplateUrl('templates/modals/myVoteModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.myVoteModal = modal;
  });
  
  $ionicModal.fromTemplateUrl('templates/modals/oldQueModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.oldModal = modal;
  });

  $scope.voteIdPass = function (id) {
    $rootScope.vote = {};
    angular.forEach($scope.votes, function(value, key) {
      if($scope.votes[key]["$id"] ==  id) {
        angular.forEach($scope.votes[key], function (value2, key2){
          $rootScope.vote[key2] = value2;
        });
      };
    });
  };
  
  $scope.oldIdPass = function (id) {
    $rootScope.oldQuestion = {};
    angular.forEach($scope.oldQuestions, function(value, key) {
      if($scope.oldQuestions[key]["$id"] ==  id) {
        angular.forEach($scope.oldQuestions[key], function (value2, key2){
          $rootScope.oldQuestion[key2] = value2;
        });
      };
    });
  };
  
});

app.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}]);





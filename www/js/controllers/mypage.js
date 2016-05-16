
var app = angular.module('onepick.controllers.mypage', ['ionic', "firebase"]);



app.controller('MypageCtrl', function($scope,
                                      $ionicSlideBoxDelegate,
                                      $firebaseArray,
                                      $firebaseObject,
                                      $ionicModal, 
                                      $rootScope){

  // var userRef = new Firebase("https://onepick.firebaseio.com/users/"+$rootScope.auth.profile.username);
  var userRef = new Firebase("https://onepick.firebaseio.com/users/lifaninjp");
  $scope.user = $firebaseArray(userRef);
  $scope.profile = $firebaseObject(userRef.child("profile"));
  $scope.votes = $firebaseObject(userRef.child("votes"));
  $scope.actQuestions = $firebaseObject(userRef.child("activeQuestions"));
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


  }
  $scope.questionShow = function () {
    $scope.myVar = false;
    $scope.btnActive = false;
  }

  $ionicModal.fromTemplateUrl('templates/modals/oldQueModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.idPass = function (id) {
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




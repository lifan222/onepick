var app = angular.module('onepick.controllers.hotvotes', ['ionic', "firebase"]);

app.controller('HotvotesCtrl', function($scope,
                                        $firebaseArray,
                                        $ionicModal,
                                        $rootScope,
                                        auth){

  $rootScope.auth = auth;
  $scope.btnClicked = false;
  
  var hotVotesRef = new Firebase("https://onepick.firebaseio.com/hotvotes");
  var todayVotesRef = new Firebase("https://onepick.firebaseio.com/todayvotes");
  $scope.hotvotes = $firebaseArray(hotVotesRef);
  $scope.todayvotes = $firebaseArray(todayVotesRef);
  

  /---------------------------------------热门投票-----------------------------------------/
  $ionicModal.fromTemplateUrl('templates/modals/hotVoteModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // $scope.hotvotes.$loaded()
  //     .then(function(){
  //       console.log($scope.auth.profile);
  //     });

  $scope.idPass = function (id) {
    $rootScope.hotVote = {};
    angular.forEach($scope.hotvotes, function(value, key) {
      if($scope.hotvotes[key]["$id"] ==  id) {
        angular.forEach($scope.hotvotes[key], function (value2, key2){
          $rootScope.hotVote[key2] = value2;
        });
      };
    });
  };
  /----------------------------------------------------------------------------------------/


});




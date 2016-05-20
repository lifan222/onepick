var app = angular.module('onepick.controllers.hotvotes', ['ionic', "firebase"]);

app.controller('HotvotesCtrl', function($scope,
                                        $firebaseArray,
                                        $ionicModal,
                                        $rootScope,
                                        auth){

  $rootScope.auth = auth;
  $scope.btnClicked = false;
  
  var hotVotesRef = new Firebase("https://onepick.firebaseio.com/hotvotes");
  var todayOldVotesRef = new Firebase("https://onepick.firebaseio.com/todayvotes/oldvotes");
  var todayNewVoteRef = new Firebase("https://onepick.firebaseio.com/todayvotes/newvote");
  $scope.hotvotes = $firebaseArray(hotVotesRef);
  $scope.todayOldVotes = $firebaseArray(todayOldVotesRef);
  $scope.todayNewVote = $firebaseArray(todayNewVoteRef);

  //---------------------------------------今日投票-----------------------------------------/
  var todayUniId = $rootScope.todayId;
  $scope.voteClick = function (opt) {
    var optKey = todayNewVoteRef.child($rootScope.todayId).child("options").child(opt).key();
    var foo = {};
    foo[optKey] ++;
    todayNewVoteRef.child($rootScope.todayId).child("values").update(foo);

    console.log($rootScope.todayId);
    console.log(optKey);
  };

  $scope.getAlpha = function(no){
    return String.fromCharCode(no);
  };

  
  //----------------------------------------------------------------------------------------/


  //---------------------------------------热门投票-----------------------------------------/
  $ionicModal.fromTemplateUrl('templates/modals/hotVoteModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // $scope.hotvotes.$loaded()
  //     .then(function(){
  //       console.log(todayNewVoteRef[0]);
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
  //----------------------------------------------------------------------------------------/


});




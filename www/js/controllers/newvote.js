var app = angular.module('onepick.controllers.newvote', ['ionic',
    'firebase',
    'ngCookies',
    'naif.base64',
    'ion-datetime-picker']);


app.controller('NewvoteCtrl', function($scope,
                                       $firebaseObject,
                                       $rootScope,
                                       $filter,
                                       $cookies,
                                       $state, 
                                       $ionicModal){
    $rootScope.username = $cookies.get("username");
    var userRef = new Firebase("https://onepick.firebaseio.com/users/"+$rootScope.username);
    var todayVoteRef = new Firebase("https://onepick.firebaseio.com/todayvotes/newvote");
    var questionRef = userRef.child("activeQuestions");
    var newQueRef = questionRef.push();
    var newTodayRef = todayVoteRef.push();
    $scope.datetimeValue = new Date();
    $scope.newVoteContents = {
        "content": "",
        "date": "",
        "fullDate": "",
        "timeLeft": "",
        "votePeople": 15,
        "optNum": "",
        "options": {
            "A": {
                "name": "",
                "values": 0,
                "imagesUrl": ""
            },
        },
    };
    
    $scope.optKey = {};
    $scope.foo = {};

    $scope.myFunc = function () {
        //------------------------------日期,剩余时间判定----------------------------------------
        var nowTime = new Date();
        $scope.newVoteContents.date = $filter('date')(nowTime, 'yyyy.MM.dd');
        $scope.newVoteContents.fullDate = $filter('date')(nowTime, 'yyyy.MM.dd HH:mm:ss');
        $scope.dateTimeLeft = $filter('date')($scope.datetimeValue, 'yyyy.MM.dd HH:mm:ss');
        // $scope.dateTimeLeft = $filter('date')($scope.datetimeValue, 'yyyy.MM.dd HH:mm:ss');
        $scope.newVoteContents.timeLeft = $scope.dateTimeLeft;
        // var left = nowTime-$scope.datetimeValue;
        // console.log($filter('date')(left, 'yyyy.MM.dd HH:mm:ss'));
        
        $scope.newVoteContents.options = angular.copy($scope.optKey);
        $scope.newVoteContents.optNum = Object.keys($scope.foo).length
        $scope.votePush = angular.copy($scope.newVoteContents);

        //------------------------------今日投票admin----------------------------------------
        if($rootScope.username == "admin"){
            $rootScope.todayId = newTodayRef.key();
            newTodayRef.set($scope.votePush);
        }else {
            newQueRef.set($scope.votePush);
        }

        // $state.go($state.current, {}, {reload: true});
        $state.go("tab.mypage", {}, {reload: true});

    };
    
    $scope.imgIconChange = function (id) {
        var myEl = angular.element( document.querySelector( '#'+id ) );
        myEl.removeClass('IconUnclicked');
        myEl.addClass('IconClicked');
    };

//------------------------Append a new option------------------------
    var num = 0;
    $scope.optionNums = [];
    $scope.addBtnShow = [true];
    $scope.addOption = function () {
        $scope.optionNums.unshift(num);
        num++;
        $scope.addBtnShow.unshift(false);
    };
//----------------------------------------------------------------------

//------------------------preview modal---------------------------------

    $ionicModal.fromTemplateUrl('templates/modals/previewModal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // $scope.hotvotes.$loaded()
    //     .then(function(){
    //       console.log($scope.auth.profile);
    //     });
    
//----------------------------------------------------------------------

});


app.directive('newOption', function () {
    return {
        restrict: "E",
        templateUrl: "templates/directives/new-option.html",
        controller: function($scope) {
            $scope.name= String.fromCharCode($scope.optionNums[0]+67);
        }
    };
});







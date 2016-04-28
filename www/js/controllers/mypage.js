var app = angular.module('onepick.controllers.mypage', ['ionic']);


app.controller('MypageCtrl', function($scope){

  $scope.myVar = true;
  $scope.btnActive = true;

  $scope.votes = [
    {
      "content": "中华料理的代表到底是麻婆豆腐还是青椒肉丝？",
      "date": "2016.04.21"
    },
    {
      "content": "腹肌是“11”型好看还是“田“字型好看？",
      "date": "2016.04.19"
    }
  ];

  $scope.actQuestion = {
    "content": "明天约会穿哪件呢？",
    "date": "2016.04.21"
  }
  
  $scope.oldQuestions = [
    {
      "content": "中华料理的代表到底是麻婆豆腐还是青椒肉丝？",
      "date": "2016.04.21"
    },
    {
      "content": "腹肌是“11”型好看还是“田“字型好看？",
      "date": "2016.04.19"
    }
  ]

  $scope.votesShow = function () {
    $scope.myVar = true;
    $scope.btnActive = true;


  }
  $scope.questionShow = function () {
    $scope.myVar = false;
    $scope.btnActive = false;
  }

});




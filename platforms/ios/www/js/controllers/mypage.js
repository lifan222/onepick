var db = null;

var app = angular.module('onepick.controllers.mypage', ['ionic', 'ngCordova']);



app.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {

    db = $cordovaSQLite.openDB("my.db");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
  });
});



app.controller('MypageCtrl', function($scope, $ionicSlideBoxDelegate){

  $scope.save = function(newMessage) {

    $cordovaSQLite.execute(db, 'INSERT INTO Messages (message) VALUES (?)', [newMessage])
        .then(function(result) {
          $scope.statusMessage = "Message saved successful, cheers!";
        }, function(error) {
          $scope.statusMessage = "Error on saving: " + error.message;
        })

  }

  $scope.load = function() {

    // Execute SELECT statement to load message from database.
    $cordovaSQLite.execute(db, 'SELECT * FROM Messages ORDER BY id DESC')
        .then(
            function(result) {

              if (result.rows.length > 0) {

                $scope.newMessage = result.rows.item(0).message;
                $scope.statusMessage = "Message loaded successful, cheers!";
              }
            },
            function(error) {
              $scope.statusMessage = "Error on loading: " + error.message;
            }
        );
  }

  $scope.myVar = true;
  $scope.btnActive = true;

  $scope.myActiveSlide = 0;

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

  $scope.actQuestions = [
    {
    "content": "明天约会穿哪件呢？",
    "date": "2016.04.21",
    "timeLeft": "1",
    "votePeople": "15",
    "values": {
      "A": 70,
      "B": 30
    },
    "options": {
      "A": "干练OL风",
      "B": "Boy帅气风"
      },
    "imagesUrl": {
      "A": "img/ol.png",
      "B": "img/boy.png"
      }
    },
    {
      "content": "中华料理的代表到底是麻婆豆腐还是青椒肉丝？",
      "date": "2016.04.21",
      "timeLeft": "3",
      "votePeople": "5",
      "options": {
        "A": "麻婆豆腐",
        "B": "青椒肉丝"
      },
      "imagesUrl": {
        "A": "img/ol.png",
        "B": "img/boy.png"
      }
    },
    {
      "content": "腹肌是“11”型好看还是“田“字型好看？",
      "date": "2016.04.21",
      "timeLeft": "1",
      "votePeople": "15",
      "options": {
        "A": "“11”型",
        "B": "“田“字型"
      },
      "imagesUrl": {
        "A": "img/ol.png",
        "B": "img/boy.png"
      }
    }
      ];
  
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




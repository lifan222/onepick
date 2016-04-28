var app = angular.module('onepick.controllers.hotvotes', ['ionic']);


app.controller('HotvotesCtrl', function($scope){
  $scope.votes = [
    {
      "content": "中华料理的代表到底是麻婆豆腐还是青椒肉丝？",
      "date": "2016.04.21"
    },
    {
      "content": "腹肌是“11”型好看还是“田“字型好看？",
      "date": "2016.04.19"
    },
    {
      "content": "中华料理的代表到底是麻婆豆腐还是青椒肉丝？",
      "date": "2016.04.21"
    },
    {
      "content": "腹肌是“11”型好看还是“田“字型好看？",
      "date": "2016.04.19"
    },
    {
      "content": "中华料理的代表到底是麻婆豆腐还是青椒肉丝？",
      "date": "2016.04.21"
    }
  ];

});




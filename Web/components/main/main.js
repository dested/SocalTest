var module = angular.module('Social.Client');

module.controller('mainCtrl', function ($scope, $http, serviceUrl) {
  $scope.model = {};
  $scope.callback = {};

  var hexBoard = new HexBoard();


  var canvas = document.getElementById("hex");
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  canvas.onclick = function (e) {
    var x = e.offsetX;
    var y = e.offsetY;
    hexBoard.clickBoard(x, y);
  };


  var context = canvas.getContext("2d");


  setInterval(function () {
    canvas.width = canvas.width;
    hexBoard.drawBoard(context);
  }, 1000 / 60);


  var flat = Layout(layout_flat, Point(1, 1), Point(50, 50));

  $http({
    method: "GET",
    url: serviceUrl.path('${api}game/state'),
    extractResponse: 'stateData'
  }).then(function (state) {
    var str = state.board.boardStr;
    var ys = str.split('|');

    for (var y = 0; y < ys.length; y++) {
      var yItem = ys[y].split('');
      for (var x = 0; x < yItem.length; x++) {
        var xItem = parseInt(yItem[x]);
        if (xItem == 0)continue;
        var $t2 = new GridHexagon();
        $t2.x = x;
        $t2.y = 0;
        $t2.z = y;
        var $t3 = new Hexagon();
        $t3.hexColor = new HexagonColor('#FF0000');
        $t3.enabled = true;
        $t3.set_height(xItem *.5);
        $t2.hexagon = $t3;
        hexBoard.$addHexagon($t2);
      }
    }
  })

});


module.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('main', {
      //abstract: true,
      url: '/',
      controller: 'mainCtrl',
      templateUrl: 'components/main/main.tpl.html'
    })
});
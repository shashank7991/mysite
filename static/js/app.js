
var myApp = angular.module("myApp", ['ui.router','ui.bootstrap',"highcharts-ng",'ngTable']);

myApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.when("", "/");

    $stateProvider
        .state("/", {
            url: "/",
            templateUrl: "static/templates/login.html",
            controller: "loginController"
        })
        .state("dashBoard", {
            url: "/dashBoard/:userId",
            templateUrl: "static/templates/dashBoard.html",
            controller:"dashBoardController"
        })
      .state("admin-dashBoard", {
            url: "/admin-dashBoard/:userId",
            templateUrl: "static/templates/adminDashBoard.html",
            controller:"adminDashBoardController"
        })
     .state("client-dashBoard", {
            url: "/client-dashBoard/:userId",
            templateUrl: "static/templates/clientDashBoard.html",
            controller:"clientDashBoardController"
        });

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
   $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

});

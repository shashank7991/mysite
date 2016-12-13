
var myApp = angular.module("myApp", ['ui.router','ui.bootstrap']);

myApp.config(function ($stateProvider, $urlRouterProvider) {
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
    /*  .state("PageTab.Page2", {
            url: "/Page2",
            templateUrl: "Page2.html"
        })
        .state("PageTab.Page3", {
            url: "/Page3",
            templateUrl: "Page3.html"
        });*/
});
//angular app

//empty brackets are for any dependencies in angular, but we don't have any anyway. 
var app = angular.module('shortUrlApp', []);

//controller for the app for a certain section of the app. logic of the app for the section of the app.
app.controller('shortAppCtrl', ($scope) =>{ //only one app but as many controllers as you want
    $scope.urlToShorten = "Hello World";
});
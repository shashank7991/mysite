myApp.controller("loginController",['$scope','$http','$state',function($scope,$http,$state){
    $scope.user={};
    $scope.loadAll= function(user){
        console.log('asdad',user);
        //$state.go('dashBoard',{'userId':1});
        /*$http({
            method: 'GET',
            url: 'http://192.168.24.79:8080/users',
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function(resp){
            console.log(resp);
        });*/
       $http({
            method: 'POST',
            url: 'http://192.168.24.79:8080/login',
            data: user,
            headers: {'Content-Type': 'application/json'}
        }).success(function(resp){
            console.log('resp-',resp);
           if(resp[0]){
               var userId = resp[0].id;
               $state.go('dashBoard',{'userId':userId});
           }

        });

    }
}]);
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
            url: '/login',
            data: user,
            headers: {'Content-Type': 'application/json'}
        }).success(function(resp){
            console.log('resp-',resp);
           var user = resp[0];
           if(user){
               var userId = resp[0].id;
               if(user.role == 'D'){
                   $state.go('dashBoard',{'userId':userId});
               }else if(user.role == "A"){
                   $state.go('admin-dashBoard',{'userId':userId});
               }else if(user.role == "C"){
                   $state.go('client-dashBoard',{'userId':user.company_id});
               }

           }

        }).error(function(){
           alert('please enter correct detailes')
       });

    }
}]);
myApp.controller("loginController",['$scope','$http','$state',function($scope,$http,$state){
    $scope.user={};
    $scope.loadAll= function(user){
        console.log('asdad',user);
        //passing user json object to python controller
       $http({
            method: 'POST',
            url: '/login',
            data: user,
            headers: {'Content-Type': 'application/json'}
        }).success(function(resp){
            console.log('resp-',resp);
           var user = resp[0];
           if(user){
               //setting up a session
               localStorage.setItem('userId',user.id);
               var userId = resp[0].id;
               //Rolebase login
               if(user.role == 'D'){
                   $state.go('dashBoard',{'userId':userId});
               }else if(user.role == "A"){
                   $state.go('admin-dashBoard',{'userId':userId});
               }else if(user.role == "C"){
                   $state.go('client-dashBoard',{'userId':user.company_id});
               }

           }

        }).error(function(){
           alert('Please enter correct Details...')
       });

    }
}]);
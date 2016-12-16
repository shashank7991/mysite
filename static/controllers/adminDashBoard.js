myApp.controller("adminDashBoardController",['$scope','$http','$stateParams','$uibModal','$state','NgTableParams',
    function($scope,$http,$stateParams,$uibModal,$state,NgTableParams) {

    //check session
 if(!localStorage.getItem('userId')) {
        $state.go('/')
    }

    console.log('dash board',$stateParams);
    //assign session param to scope variable
    $scope.userId = $stateParams.userId;



    $scope.bindData = function(){
        $http({
        method: 'GET',
        url: '/trips',
       // data:{'user_id': $scope.userId},
        headers: {'Content-Type': 'application/json'}
    }).success(function(resp){
        console.log('resp-aaaa',resp);
        //assing response to scope data variable
        $scope.data= resp;
        $scope.tripData= resp;//not using
            angular.forEach($scope.data,function(val,key){
               val["email"] = val.user_id.email
                val["company_id"] = val.user_id.company_id
            });
        //generate datatables
        $scope.tableParams = new NgTableParams({page: 1, count: 10}, {data: $scope.data});
    });
    };


    $scope.bindData();

    //date selector get date
    $scope.getDate=function(val){
        var date = new Date(val);
        var day = date.getDate();
        var month = date.getMonth()+1;
        var year = date.getFullYear();
        var modifiedDate =day+'-'+month+'-'+year;
        //console.log('myDate--',modifiedDate);
        return modifiedDate;
        //document.write(day + ' ' + monthNames[monthIndex] + ' ' + year);
    };

    //delete trip (only admin can)
    $scope.deleteUser = function(val){
        console.log('valll',val.id,val);
        $http({
            method: 'DELETE',
            url: '/trips',
             data:{'id': val.id},
            headers: {'Content-Type': 'application/json'}
        }).success(function(resp){
            console.log('resp-aaaa',resp);
                $scope.bindData();
            //page reload
            console.log('state--',$state);
            $state.reload();
        });
    }


    //logout
    $scope.logout = function(){
        localStorage.removeItem('userId');
        $state.go('/');
    };


        //not using...
        var months = ['jan','feb','march','april','may','june','july','august','sept','oct','nov','dec'];
        $scope.showCharts = function(val){
            console.log('asdasas',val);

        };

}]);
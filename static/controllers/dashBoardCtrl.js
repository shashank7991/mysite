myApp.controller("dashBoardController",['$scope','$http','$stateParams','$uibModal','$state','NgTableParams',
    function($scope,$http,$stateParams,$uibModal,$state,NgTableParams){
    console.log('dash board',localStorage.getItem('userId'));
    $scope.userId = $stateParams.userId;

    //checking a session
    if(!localStorage.getItem('userId')) {
        $state.go('/')
    }
        $http({
        method: 'POST',
        url: '/trips',
        data:{'user_id': $scope.userId},
        headers: {'Content-Type': 'application/json'}
    }).success(function(resp){
        console.log('resp-aaaa',resp);
        $scope.data= resp;
        //defining dataTables for trips which passed it to html
        $scope.tableParams = new NgTableParams({page: 1, count: 10}, {data: $scope.data});
        //assigning a response to scope variable
        $scope.tripData= resp; //not using
            // maintaining a copy of data in scope variable for date filter
        $scope.EventMainData = angular.copy(resp);
    });

    //getting new date from date selector
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
    $scope.popup2={
  "opened":false
};
//popup for first date selector
$scope.open2 = function(){
  $scope.popup2.opened = true;
}
//popup for second date selector
 $scope.popup1={
  "opened":false
};

$scope.open1 = function(){
  $scope.popup1.opened = true;
}

$scope.dateOptions = {
    //maxDate: new Date(2020, 5, 22),
    //minDate: new Date(),
    startingDay: 1
  };


    $scope.getGeoData = function(val){
        //array to store all event variables lat and lng
        $scope.latLng = [];
        console.log('val-',val);
        $http({
            method: 'POST',
            url: '/events',
            data:{"trip_id": val.id},
            headers: {'Content-Type': 'application/json'}
        }).success(function(resp){
            console.log('resp-click',resp);
            //$scope.data= resp;
            angular.forEach(resp,function(v,k){
                console.log('v----',v)
                //push all event data into a scope array variable
                $scope.latLng.push({'lat':v.geo_lat,'lng':v.geo_long})
            });
            //initMap();
            var modalInstance = $uibModal.open({
                //google api template
                templateUrl: 'gMap.html',
                size: 'lg',
                //variable for controller
                controller: 'ModalInstanceCtrl',
                controllerAs:'$ctrl',
                //return lat lng array to ModalInstanceCtrl
                resolve: {
                    latLng: function () {
                        return $scope.latLng;
                    }
                }
            });
        });
    };

    //date range filtering
    $scope.submitDate = function(strtDate,endDate){
         if(strtDate && endDate){
            console.log('asdasd',strtDate,endDate);
            var stDate = new Date(strtDate);
            var endDate = new Date(endDate);
            console.log('dates-',stDate,endDate);
            //new variable to store new filtered value
            var arrayToReturn =[];
            angular.forEach(angular.copy($scope.EventMainData),function(val,key){
                //storing dates to new variable to compare and get filtered values
                var modifiedDate =val.start_time.split("T")[0];
                console.log('date',modifiedDate,val);

                //convert to type Date
                var tf = new Date(modifiedDate);
                console.log('checking--',strtDate , endDate);
                //final filter condition
                if ((tf > stDate && tf < endDate  ))  {
                    arrayToReturn.push(val);
                }
            });
            $scope.data = arrayToReturn;
        }else{
             $scope.data = angular.copy($scope.EventMainData);
         }
            //updated dataTables sorted/unsorted
            $scope.tableParams = new NgTableParams({page: 1, count: 10}, {data: $scope.data});

    };
    $scope.logout = function(){
        localStorage.removeItem('userId');
        $state.go('/');
    }
}]);

//controller for google map api which return all markers on map based on events
myApp.controller('ModalInstanceCtrl', function ($uibModalInstance, latLng,$timeout) {
    var $ctrl = this;
     $ctrl.latLng = latLng;
    console.log('latLng-',latLng);

    $timeout(function(){
        console.log('elem---',document.getElementById("map"));
        //getting objects of google maps api and storing in new variable
        var myLatlng = new google.maps.LatLng($ctrl.latLng[0].lat, $ctrl.latLng[0].lng);
        //parameter for zooming
        var myOptions = {
            zoom: 15,
            center: myLatlng
        };
        //generation of map
        var map = new google.maps.Map(document.getElementById("map"), myOptions);
        //show marker
        var bounds = new google.maps.LatLngBounds();
        angular.forEach($ctrl.latLng,function(val,ind){
            var pos = new google.maps.LatLng(val.lat, val.lng);
            bounds.extend(pos);
            marker = new google.maps.Marker({
                position: pos,
                map: map
            });
        });
    },0)




    $ctrl.ok = function () {
        $uibModalInstance.close();
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss();
    };
});

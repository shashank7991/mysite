 myApp.controller("clientDashBoardController",['$scope','$http','$stateParams','$uibModal','$timeout','$state','NgTableParams',
    function($scope,$http,$stateParams,$uibModal,$timeout,$state,NgTableParams) {

     //Check Session
      if(!localStorage.getItem('userId')) {
        $state.go('/')
      }

    console.log('dash board',$stateParams);
      //setting up scope variable
      $scope.companyName = $stateParams.userId;
    $scope.isLoading = true;

    $http({
        method: 'POST',
        url: '/users',
        data:{'company_id': $scope.companyName,"role":"D"},
        headers: {'Content-Type': 'application/json'}
    }).success(function(resp){
        console.log('resp-aaaa',resp);
		drivers=[];
		scores=[];
		for(var i=0;i<resp.length;i++){
		drivers.push(resp[i].email);
		scores.push(resp[i].rank);
		}
		console.log(drivers);
		console.log(scores);
		Highcharts.chart('driverChart', {
				title: {
					text: 'Score by Drivers'
				},
				chart:{
                    type:'column'
                },
				    xAxis: {
				        categories: drivers
				    },

				    series: [{name:"Drivers",
				        data: scores
				    }]
				});

        angular.forEach(resp,function(val,key){

            console.log('val.id---',val.id);
            $http({
                method: 'POST',
                url: '/trips',
                data:{"user_id": val.id},
                headers: {'Content-Type': 'application/json'}
            }).success(function(evtResp){
                console.log('evtResp-click',evtResp);
                var newVal = 0;
                angular.forEach(evtResp,function(v,k){
                    console.log('vallll-', v.score);
                    newVal += v.score;
                    console.log('before iff',k,evtResp.length,k == evtResp.length-1);
                    if(k == evtResp.length-1){
                        console.log('newVal---',val.id,newVal/k);

                       // orderArray.push()
                        $http({
                            method: 'POST',
                            url: '/users',
                            data:{"id": val.id,"rank":newVal/k},
                            headers: {'Content-Type': 'application/json'}
                        }).success(function(userResp){
                           console.log('userResp------',userResp);
                        })
                    }

                });

            });

        });


        $timeout(function(){
            $http({
                method: 'POST',
                url: '/users',
                data:{'company_id': $scope.companyName,"role":"D"},
                headers: {'Content-Type': 'application/json'}
            }).success(function(totalResp) {
                console.log('rrrrrrrrrrrrrrrrr', totalResp);
                $scope.isLoading = false;
				for(var i=0;i<totalResp.length;i++){
				totalResp[i].rank=totalResp[i].rank.toFixed(2);
				}
                $scope.data= totalResp;
                $scope.tableParams = new NgTableParams({page: 1, count: 10}, {data: $scope.data});
            });
        },5000);

    });

    $scope.getTrips = function(val){

        $http({
            method: 'POST',
            url: '/trips',
            data:{'user_id': val.id},
            headers: {'Content-Type': 'application/json'}
        }).success(function(resp){
            console.log('resp-aaaa',resp);

            $scope.tripData= resp;
            $scope.showTripsTable = true;
            $scope.tripTableParams = new NgTableParams({page: 1, count: 10}, {data: $scope.tripData});
        });

    };


    //Date Selector popup
    $scope.popup2={
        "opened":false
    };

    $scope.open2 = function(){
        $scope.popup2.opened = true;
    }

    //Date Selector popup
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

    //storing new date in variable
     $scope.getDate=function(val){
         var modifiedDate =val.split("T")[0];
        return modifiedDate;
     };
    //storing new time in variable
     $scope.getTime=function(val){
        var modifiedTime =val.split("T")[1].split("Z")[0];
        return modifiedTime;
     };

     //store all geo data from events to new array
    $scope.getGeoData = function(val){
        //new array to store all geo data
        $scope.latLng = [];
        console.log('val-',val);
        $http({
            method: 'POST',
            url: '/events',
            data:{"trip_id": val.id},
            headers: {'Content-Type': 'application/json'}
        }).success(function(resp){
            console.log('resp-click',resp);
            $scope.EventMainData = angular.copy(resp);

            angular.forEach(resp,function(v,k){
                console.log('v----',v);
                $scope.latLng.push({'lat':v.geo_lat,'lng':v.geo_long})
            });
            //initMap();
            if(resp.length != 0){
                 $scope.eventResp = resp;
                $scope.showEventData = true;
                 $scope.eventTableParams = new NgTableParams({page: 1, count: 10}, {data: $scope.eventResp});
                var modalInstance = $uibModal.open({
                    templateUrl: 'gMap.html',
                    size: 'lg',
                    controller: 'ModalInstanceCtrl',
                    controllerAs:'$ctrl',
                    resolve: {
                        latLng: function () {
                            return $scope.latLng;
                        }
                    }
                });
            }else{
               alert('no data available')
            }

        });
    };



    $scope.logout = function(){
        localStorage.removeItem('userId');
        $state.go('/');
    }


    $scope.submitDate = function(strtDate,endDate){
        if(strtDate && endDate){
            console.log('asdasd',strtDate,endDate);
            var stDate = new Date(strtDate);
            var endDate = new Date(endDate);
            console.log('dates-',stDate,endDate);
            var arrayToReturn =[];
            angular.forEach(angular.copy($scope.EventMainData),function(val,key){
                var modifiedDate =val.event_ts_local.split("T")[0];
                var tf = new Date(modifiedDate);

                if ((tf > stDate && tf < endDate  ))  {
                    arrayToReturn.push(val);
                }
            });
            $scope.eventResp = arrayToReturn;
            $scope.eventTableParams = new NgTableParams({page: 1, count: 10}, {data: $scope.eventResp});
        }
        else{
            $scope.eventResp = angular.copy($scope.EventMainData);
            $scope.eventTableParams = new NgTableParams({page: 1, count: 10}, {data: $scope.eventResp})
        }

    };

}]);

 //Google Maps
myApp.controller('ModalInstanceCtrl', function ($uibModalInstance, latLng,$timeout) {
    var $ctrl = this;
    $ctrl.latLng = latLng;
    console.log('latLng-',latLng);

    $timeout(function(){
        console.log('elem---',document.getElementById("map"));

        var myLatlng = new google.maps.LatLng($ctrl.latLng[0].lat, $ctrl.latLng[0].lng);
        var myOptions = {
            zoom: 15,
            center: myLatlng
        };
        var map = new google.maps.Map(document.getElementById("map"), myOptions);
        var bounds = new google.maps.LatLngBounds();
        angular.forEach($ctrl.latLng,function(val,ind){
            var pos = new google.maps.LatLng(val.lat, val.lng);
            bounds.extend(pos);
            marker = new google.maps.Marker({
                position: pos,
                map: map
            });
        });
    },0);


    $ctrl.ok = function () {
        $uibModalInstance.close();
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss();
    };
});

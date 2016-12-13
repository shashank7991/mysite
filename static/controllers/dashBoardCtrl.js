myApp.controller("dashBoardController",['$scope','$http','$stateParams','$uibModal',function($scope,$http,$stateParams,$uibModal){
    console.log('dash board',$stateParams);
    $scope.userId = $stateParams.userId;

    $http({
        method: 'POST',
        url: '/trips',
        data:{'user_id': $scope.userId},
        headers: {'Content-Type': 'application/json'}
    }).success(function(resp){
        console.log('resp-aaaa',resp);
        $scope.data= resp;
        $scope.tripData= resp;
    });

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

    $scope.latLng = [];
    $scope.getGeoData = function(val){
        console.log('val-',val);
        $http({
            method: 'POST',
            url: '/events',
            data:{"trip_id": val.id},
            headers: {'Content-Type': 'application/json'}
        }).success(function(resp){
            console.log('resp-click',resp);
            //$scope.data= resp;
            angular.forEach(resp,function(val,key){
                $scope.latLng.push({'lat':val.geo_lat,'lng':val.geo_long})
            });
            //initMap();
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
        });
    };


    $scope.submitDate = function(strtDate,endDate){
        if(strtDate && endDate){
            console.log('asdasd',strtDate,endDate);
            var stDate = new Date(strtDate);
            var endDate = new Date(endDate);
            console.log('dates-',stDate,endDate);
            var arrayToReturn =[];
            angular.forEach(angular.copy($scope.tripData),function(val,key){
                var tf = new Date(val.start_time),
                    tt = new Date(val.end_time);
                console.log('tttt',tf,tt,endDate);
                console.log('checking--',tf >stDate , tf < endDate ,tt>stDate , tt<endDate);
               // if (stDate < tf <endDate && stDate < tt < endDate)  {
                if ((tf > stDate && tf < endDate  )&&(tt>stDate && tt<endDate ))  {
                    arrayToReturn.push(val);
                }
            });
            $scope.data = arrayToReturn;
        }

    };



   /* function initMap() {
        console.log('elem---',document.getElementById("map"));
        var myLatlng = new google.maps.LatLng($scope.latLng[0].lat, $scope.latLng[0].lng);
        var myOptions = {
            zoom: 15,
            center: myLatlng
        };
        var map = new google.maps.Map(document.getElementById("map"), myOptions);
        var bounds = new google.maps.LatLngBounds();
        angular.forEach($scope.latLng,function(val,ind){
            var pos = new google.maps.LatLng(val.lat, val.lng);
            bounds.extend(pos);
            marker = new google.maps.Marker({
                position: pos,
                map: map
            });
        });

       *//* for (i = 0; i < markers.length; i++) {

        }*//*

    }*/




}]);


myApp.controller('ModalInstanceCtrl', function ($uibModalInstance, latLng,$timeout) {
    var $ctrl = this;
     $ctrl.latLng = latLng;
    console.log('latLng-',latLng);
    /*$ctrl.selected = {
        item: $ctrl.items[0]
    };*/

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
    },0)




    $ctrl.ok = function () {
        $uibModalInstance.close();
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss();
    };
});/*
myApp.filter("myDateFilter", function() {
    return function(items, from, to) {
        var strtDate = new Date(from).getTime();
        var endDate = new Date(to).getTime();
        console.log('asa',strtDate,endDate);
        var arrayToReturn = [];
       *//* for (var i=0; i<items.length; i++){
            var tf = new Date(items[i].start_time),
                tt = new Date(items[i].end_time );
            console.log('tttt',tf,tt);
            if (tf > strtDate && tt < endDate)  {
                arrayToReturn.push(items[i]);
            }
        }*//*
        if( !isNaN(strtDate) &&  !isNaN(endDate)){
            angular.forEach(items,function(val,key){
                var tf = new Date(val.start_time).getTime(),
                    tt = new Date(val.end_time).getTime();
                console.log('tttt',tf,tt);
                console.log('checking--',tf < strtDate <tt,tf < endDate < tt);
                if (tf < strtDate <tt && tf < endDate < tt)  {
                    arrayToReturn.push(val);
                }
            });
            return arrayToReturn;
        }else{
            return items
        }



    };
});*/
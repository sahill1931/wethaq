myApp.controller('notifyCtrl', ['$scope','$rootScope','$uibModal','$cookies','services','factories','$state','$loading','$stateParams',function ($scope,$rootScope,$uibModal,$cookies,services,factories,$state,$loading,$stateParams) {
    var DateCurrent = new Date();
    $rootScope.DateTimeCurrent = DateCurrent.getTime();

    $scope.addNotify = {};
    $scope.notifyVar = 0;
    $scope.notificationSubmit = function (isValid) {
        if (isValid) {

            console.log('$scope.addNotify.dateTime',$scope.addNotify.dateTime)
            // var a = new Date(new Date($scope.addNotify.dateTime.replace(/ /g,"T")).toUTCString()).getTime();
            var a = new Date(new Date($scope.addNotify.dateTime).toISOString()).getTime();

            // console.log('$scope.addNotify.dateTime',new Date($scope.addNotify.dateTime).toISOString(),a )

            var b = new Date().getTime();
            if(a < b)
            {
                factories.error('Previous date/time not allowed');
            }
            else
            {
                $scope.addNotify.date = a;
                $loading.start('notificationLoad');
                services.sendPushService($scope.addNotify, function (response, status) {
                    if (status == 1) {
                        factories.success('Message sent successfully');
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                        $loading.finish('notificationLoad');
                    }
                    else {
                        factories.errorCallback(response.message, function () {
                            factories.unAuthorize(response);
                            $loading.finish('notificationLoad');
                        });
                    }
                });
            }
        }
    };

    $scope.listNotification = function(num){
        $scope.notifyVar = num;
        if(num == 1){
            $scope.listNotifs();
        }
    }

    $scope.listNotifs = function(){
        $loading.start('CodeLoad')
        services.getNotifs(function (response, status) {
            if (status == 1) {
                // console.log(response.data);
                $scope.ListCode = response.data;
                $loading.finish('CodeLoad');
            }
            else {
                factories.errorCallback(response.message, function () {
                    factories.unAuthorize(response);
                    $loading.finish('CodeLoad');
                });
            }
        });
    }

    $scope.deleteNotific = function(id){
        $loading.start('CodeLoad')
        factories.confirm("Are you sure you want to delete this notification?", function(){
            services.delNotifs(id,function (response, status) {
                if (status == 1) {
                    factories.successCallback("This notification has been deleted", function(){
                        $loading.finish('CodeLoad');
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    });
                }
                else {
                    factories.errorCallback(response.message, function () {
                        factories.unAuthorize(response);
                        $loading.finish('CodeLoad');
                    });
                }
            });
        })
    }

}]);

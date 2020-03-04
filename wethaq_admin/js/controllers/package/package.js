myApp.controller('packageCtrl', ['$scope','$rootScope','$uibModal','$cookies','services','factories','$state','$loading','$stateParams',function ($scope,$rootScope,$uibModal,$cookies,services,factories,$state,$loading,$stateParams) {
    $rootScope.packageStorage = JSON.parse(localStorage.getItem("package"));

    $scope.addPackageFunction = function () {
        $scope.addPackage = "";
        $scope.addPackageSubmit = function (isValid) {
            if (isValid) {
                var param_data = {};
                param_data.totalSms = $scope.addPackage.SMS;
                param_data.totalPrice = $scope.addPackage.Price;
                $loading.start('AddPackageLoad');
                services.createPackageService(param_data, function (response, status) {
                    if (status == 1) {
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                        $loading.finish('AddPackageLoad');
                    }
                    else {
                        factories.errorCallback(response.message, function () {
                            factories.unAuthorize(response);
                            $loading.finish('AddPackageLoad');
                        });
                    }
                });
            }
        };
    };

    $scope.editPackageFunction = function () {
        $scope.edit = {SMS:'',Price:''};
        $scope.edit.SMS = $rootScope.editPackageData.totalSms;
        $scope.edit.Price = $rootScope.editPackageData.totalPrice;
        $scope.editPackageSubmit = function (isValid) {
            if (isValid) {
                var param_data = {};
                param_data._id = $rootScope.editPackageData._id;
                param_data.totalSms = $scope.edit.SMS;
                param_data.totalPrice = $scope.edit.Price;
                $loading.start('EditPackageLoad');
                services.editPackageService(param_data, function (response, status) {
                    if (status == 1) {
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                        $loading.finish('EditPackageLoad');
                    }
                    else {
                        factories.errorCallback(response.message, function () {
                            factories.unAuthorize(response);
                            $loading.finish('EditPackageLoad');
                        });
                    }
                });
            }
        };
    };

    $scope.listPackageFunction = function () {
        $loading.start('PackageLoad');
        services.getPackageService(function (response, status) {
            if (status == 1) {
                $scope.ListPackage = response.data;
                services.datatable('PackageLoad', {});
                $loading.finish('PackageLoad');
                if ($.fn.DataTable.isDataTable('#PackageLoad')) {
                    angular.element('#PackageLoad').DataTable().clear().destroy();
                }
            }
            else {
                factories.errorCallback(response.message, function () {
                    factories.unAuthorize(response);
                    $loading.finish('PackageLoad');
                });
            }
        });
    };
    $scope.editPackageButton = function (data) {
        $rootScope.editPackageData = data;
        $scope.listView = false;
        $scope.addView = false;
        $scope.editView = true;
        $scope.editPackageFunction();
    };
    $scope.addPackageButton = function () {
        $scope.listView = false;
        $scope.addView = true;
        $scope.editView = false;
        $scope.addPackageFunction();
    };
    $scope.listPackageButton = function () {
        $scope.listView = true;
        $scope.addView = false;
        $scope.editView = false;
        $scope.listPackageFunction();
    };
    $scope.listPackageButton();


    $scope.deletePackage = function (id) {

        var message = "Do you want to Delete this Package?";

        factories.confirm(message,function () {
            services.deletePackageService (id,function (response,status) {
                if(status == 1){
                    factories.successCallback(response.message,function () {
                        $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
                    });

                }
                else {
                    factories.errorCallback(response.message,function () {
                        factories.unAuthorize(response);
                    });
                }

            });
        });
    };

}]);

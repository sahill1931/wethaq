myApp.controller('gaurdsCtrl', ['$scope','$rootScope','$uibModal','$cookies','services','factories','$state','$loading','$stateParams',function ($scope,$rootScope,$uibModal,$cookies,services,factories,$state,$loading,$stateParams) {
    $rootScope.guardStorage = JSON.parse(localStorage.getItem("guard"));

    $scope.editGaurdFunction = function () {
        $scope.edit = {Name:'',Email:'',DOB:'',Gender:''};
        $scope.edit.Name = $rootScope.editGaurdData.name;
        $scope.edit.Email = $rootScope.editGaurdData.email;
        // $scope.edit.Gender = $rootScope.editGaurdData.gender;
        $scope.editGaurdSubmit = function (isValid) {
            if (isValid) {
                var dateOfBirth = new Date($scope.edit.DOB);
                $scope.DOB = dateOfBirth.getTime();
                var param_data = {};
                param_data.name = $scope.edit.Name;
                param_data.userId = $rootScope.editGaurdData._id;
                param_data.phoneNo = $rootScope.editGaurdData.phoneNo;
                // param_data.gender = $scope.edit.Gender;
                if($scope.edit.Email != undefined && $scope.edit.Email != '')
                {
                    param_data.email = $scope.edit.Email;
                }
                $loading.start('EditGaurdLoad');
                services.editGaurdService(param_data, function (response, status) {
                    if (status == 1) {
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                        $loading.finish('EditGaurdLoad');
                    }
                    else {
                        factories.errorCallback(response.message, function () {
                            factories.unAuthorize(response);
                            $loading.finish('EditGaurdLoad');
                        });
                    }
                });
            }
        };
    };
    $scope.addGaurdFunction = function () {
        $scope.addGaurd = "";
        $scope.addGaurdSubmit = function (isValid) {
            if (isValid) {
                var param_data = {};
                param_data.name = $scope.addGaurd.Name;
                param_data.phoneNo = $scope.addGaurd.Contact;
                if($scope.addGaurd.Email != undefined && $scope.addGaurd.Email != '')
                {
                    param_data.email = $scope.addGaurd.Email;
                }
                param_data.password = $scope.addGaurd.Password;
                // param_data.gender = $scope.addGaurd.Gender;
                param_data.byAdmin = "true";
                param_data.guard = true;
                param_data.loginType = "PhoneNo";
                $loading.start('AddGaurdLoad');
                services.createGaurdService(param_data, function (response, status) {
                    if (status == 1) {
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                        $loading.finish('AddGaurdLoad');
                    }
                    else {
                        factories.errorCallback(response.message, function () {
                            factories.unAuthorize(response);
                            $loading.finish('AddGaurdLoad');
                        });
                    }
                });
            }
        };
    };

    $scope.listGaurdFunction = function () {
        $rootScope.newLimit3 =0;
        $scope.listGaurdsFunction = function (limit) {
            $rootScope.newLimit3 = limit + 4;
            $loading.start('GaurdsLoad');
            services.getGaurdsService($rootScope.newLimit3,function (response, status) {
                if (status == 1) {
                    $scope.ListGaurds = response.data.data;
                    $scope.ListGaurdsCount = response.data.count;
                    services.datatable('GaurdsLoad', {});
                    $loading.finish('GaurdsLoad');
                    if ($.fn.DataTable.isDataTable('#GaurdsLoad')) {
                        angular.element('#GaurdsLoad').DataTable().clear().destroy();
                    }
                }
                else {
                    factories.errorCallback(response.message, function () {
                        factories.unAuthorize(response);
                        $loading.finish('GaurdsLoad');
                    });
                }
            });
        };
        $scope.listGaurdsFunction($rootScope.newLimit3);
    };

    $scope.editGaurdButton = function (data) {
        $rootScope.editGaurdData = data;
        $scope.listView = false;
        $scope.addView = false;
        $scope.editView = true;
        $scope.editGaurdFunction();
    };
    $scope.addGaurdButton = function () {
        $scope.listView = false;
        $scope.addView = true;
        $scope.editView = false;
        $scope.addGaurdFunction();
    };
    $scope.listGaurdButton = function () {
        $scope.listView = true;
        $scope.addView = false;
        $scope.editView = false;
        $scope.listGaurdFunction();
    };
    $scope.listGaurdButton();


    $scope.GuardBlocker = function (id, index, str, flag) {
        var message = "Do you want to " + str + " this Gaurd?";
        var message2 = "You have  " + str + " successfully";
        factories.confirm(message, function () {
            factories.success(message2);
            services.UserBlockerService(id, flag, function (response, status) {
                if (status == 1) {
                    if (str == 'block')
                        $scope.ListGaurds[index].isBlocked = true;
                    else
                        $scope.ListGaurds[index].isBlocked = false;
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

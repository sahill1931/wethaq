myApp.controller('contactCtrl', ['$scope','$rootScope','$uibModal','$cookies','services','factories','$state','$loading','$stateParams',function ($scope,$rootScope,$uibModal,$cookies,services,factories,$state,$loading,$stateParams) {

    $rootScope.userStorage = JSON.parse(localStorage.getItem("user"));


    $scope.addUserFunction = function () {
        $scope.addUser = "";
        $scope.addUserSubmit = function (isValid) {
            if (isValid) {
                var dateOfBirth = new Date($scope.addUser.DOB);
                $scope.DOB = dateOfBirth.getTime();
                var param_data = {};
                param_data.name = $scope.addUser.Name;
                param_data.phoneNo = $scope.addUser.Contact;
                if($scope.addUser.Email != undefined && $scope.addUser.Email != '')
                {
                    param_data.email = $scope.addUser.Email;
                }
                param_data.password = $scope.addUser.Password;
                param_data.dob = $scope.DOB;
                param_data.gender = $scope.addUser.Gender;
                param_data.byAdmin = "true";
                param_data.loginType = "PhoneNo";
                $loading.start('AddUserLoad');
                services.createUserService(param_data, function (response, status) {
                    if (status == 1) {
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                        $loading.finish('AddUserLoad');
                    }
                    else {
                        factories.errorCallback(response.message, function () {
                            factories.unAuthorize(response);
                            $loading.finish('AddUserLoad');
                        });
                    }
                });
            }
        };
    };
    $scope.editUserFunction = function () {
        $scope.edit = {Name:'',Email:'',DOB:''};
        $scope.edit.Name = $rootScope.editUserData.name;
        $scope.edit.Email = $rootScope.editUserData.email;
        var Pred = $rootScope.editUserData.dob;
        $scope.PreDOB = Pred.substring(0, 10);
        $scope.edit.DOB = $scope.PreDOB;
        $scope.editUserSubmit = function (isValid) {
            if (isValid) {
                var dateOfBirth = new Date($scope.edit.DOB);
                $scope.DOB = dateOfBirth.getTime();
                var param_data = {};
                param_data.name = $scope.edit.Name;
                param_data.userId = $rootScope.editUserData._id;
                param_data.phoneNo = $rootScope.editUserData.phoneNo;
                if($scope.edit.Email != undefined && $scope.edit.Email != '')
                {
                    param_data.email = $scope.edit.Email;
                }
                param_data.dob = $scope.DOB;
                $loading.start('EditUserLoad');
                services.editUserService(param_data, function (response, status) {
                    if (status == 1) {
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                        $loading.finish('EditUserLoad');
                    }
                    else {
                        factories.errorCallback(response.message, function () {
                            factories.unAuthorize(response);
                            $loading.finish('EditUserLoad');
                        });
                    }
                });
            }
        };
    };
    $scope.listUserFunction = function () {
        $rootScope.newLimit3 =0;
        $scope.listUsersFunction = function (limit) {
            $rootScope.newLimit3 = limit + 4;
            $loading.start('UsersLoad');
            services.getContactListing($rootScope.newLimit3,function (response, status) {
                if (status == 1) {
                    $scope.ListUsers = response.data.data;
                    $scope.ListUsersCount = response.data.count;
                    services.datatable('UsersLoad', {});
                    $loading.finish('UsersLoad');
                    if ($.fn.DataTable.isDataTable('#UsersLoad')) {
                        angular.element('#UsersLoad').DataTable().clear().destroy();
                    }
                }
                else {
                    factories.errorCallback(response.message, function () {
                        factories.unAuthorize(response);
                        $loading.finish('UsersLoad');
                    });
                }
            });
        };
        $scope.listUsersFunction($rootScope.newLimit3);
    };
    $scope.editUserButton = function (data) {
        $rootScope.editUserData = data;
        $scope.listView = false;
        $scope.addView = false;
        $scope.editView = true;
        $scope.editUserFunction();
    };
    $scope.addUserButton = function () {
        $scope.listView = false;
        $scope.addView = true;
        $scope.editView = false;
        $scope.addUserFunction();
    };
    $scope.listUserButton = function () {
        $scope.listView = true;
        $scope.addView = false;
        $scope.editView = false;
        $scope.listUserFunction();
    };
    $scope.listUserButton();

    $scope.UserBlocker = function (id, index, str, flag) {
        var message = "Do you want to " + str + " this User?";
        var message2 = "You have  " + str + " successfully";
        factories.confirm(message, function () {
            factories.success(message2);
            services.UserBlockerService(id, flag, function (response, status) {
                if (status == 1) {
                    if (str == 'block')
                        $scope.ListUsers[index].isBlocked = true;
                    else
                        $scope.ListUsers[index].isBlocked = false;
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

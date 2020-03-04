myApp.controller('userCtrl', ['$scope','$rootScope','$uibModal','$cookies','services','factories','$state','$loading','$stateParams',function ($scope,$rootScope,$uibModal,$cookies,services,factories,$state,$loading,$stateParams) {

    $rootScope.userStorage = JSON.parse(localStorage.getItem("user"));

    $( "#datepicker , #datepicker1" ).datepicker({
        // minDate: new Date(),
        maxDate: new Date(2035,01,01)
    });

    $scope.excelItems=[]
    $scope.alsqldata = function () {
        services.getUsersService(null,$scope.start, $scope.end, function (response, status) {
            if (status == 1) {
                setexceldata(response.data.data)
            }
            else {
                factories.errorCallback(response.message, function () {
                    factories.unAuthorize(response);
                    $loading.finish('ImageLoad');
                });
            }
        });
    };

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

    $scope.listOption = function () {
        /* Initialize list options */
        $scope.listOptions = {
            pageNo: 1,
            limit: 0,
            total: null,
            maxSize: 10,
            skip: 0,
            search: ''
        };
        $scope.pg_options = {
            start: 0,
            end: 0
        };
    };
    $scope.listOption();
var limit= 0
    $scope.listUserFunction = function () {

        // $rootScope.newLimit3 =0;
        $scope.listUsersFunction = function (limit) {

            // $rootScope.newLimit3 = limit + 10;
            $loading.start('ImageLoad');

            if ($scope.listOptions.pageNo == 1) {
                $scope.listOptions.skip = 0 * $scope.listOptions.limit;
            } else {
                $scope.listOptions.skip = ($scope.listOptions.pageNo - 1) * $scope.listOptions.limit;
            }
            $scope.listOptions.limit= $scope.listOptions.limit+10

            services.getUsersService($scope.listOptions,$scope.start, $scope.end, function (response, status) {
                if (status == 1) {
                    $scope.ListUsers=[]
                    $scope.ListUsers = response.data.data;
                    $scope.ListUsersCount = response.data.count;
                    $scope.listOptions.total = response.data.count;
                    services.datatable('UsersLoad', {});
                    $loading.finish('ImageLoad');
                    if ($.fn.DataTable.isDataTable('#UsersLoad')) {
                        angular.element('#UsersLoad').DataTable().clear().destroy();
                    }

                    /* pagination query when search bar is empty */
                    if ($scope.listOptions.search == '' && response.data.count != 0) {
                        if ($scope.listOptions.pageNo == 1) {
                            $scope.pg_options.start = 1;
                            $scope.pg_options.end = $scope.listOptions.limit;
                        } else {
                            $scope.pg_options.start = $scope.listOptions.skip + 1;
                            $scope.pg_options.end = ($scope.listOptions.skip-0) + ($scope.listOptions.limit - 0);
                        }
                        if ($scope.pg_options.end > $scope.listOptions.total) {
                            $scope.pg_options.end = $scope.listOptions.total;
                        }
                        $scope.resultPaginationCount = 'Showing ' + $scope.pg_options.start + ' to ' + $scope.pg_options.end + ' of Total ' + $scope.listOptions.total + ' Results';
                    }
                    /* pagination query search bar*/
                    else {
                        if (angular.isUndefined($scope.ListUsers.length)) {
                            $scope.resultPaginationCount = 'No Results Found';
                        } else {
                            $scope.pg_options.start = 0;
                            $scope.pg_options.end = $scope.ListUsers.length;
                            $scope.resultPaginationCount = 'Showing ' + $scope.pg_options.end + ' Results for Search Query (Out of ' + $scope.listOptions.total + ')';
                        }
                    }
                }
                else {
                    factories.errorCallback(response.message, function () {
                        factories.unAuthorize(response);
                        $loading.finish('ImageLoad');
                    });
                }
            });
        };
        $scope.listUsersFunction();
    };

    $scope.pageChanged = function () {
        $scope.listUsersFunction();
    };

    function setexceldata(data)
    {
        $scope.excelItems=[]
        if(data.length)
        {
    angular.forEach(data,function(value,key){
    $scope.excelItems.push({
        Name:value.name,
        Email:value.email,
        Creation_Date:value.createdAt,
        DOB:value.dob,
        PhoneNo:value.phoneNo,
        Gender:value.gender,
        Events:value.eventsCreated
    })

})



        }
        alasql('SELECT * INTO XLSX("User report.xlsx",{headers:true}) FROM ?', [$scope.excelItems]);
    }

    $scope.search = function () {
        $scope.listOptions.pageNo=1;
        $scope.listUsersFunction();
    };

   $scope.gobtn = function () {
        $scope.start = new Date($('#datepicker').val()).getTime();
        $scope.end = new Date($('#datepicker1').val()).getTime();

        $scope.listUsersFunction();
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

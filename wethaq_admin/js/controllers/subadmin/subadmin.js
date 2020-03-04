myApp.controller('subadminCtrl', ['$scope','$rootScope','$uibModal','$cookies','services','factories','$state','$loading','$stateParams',function ($scope,$rootScope,$uibModal,$cookies,services,factories,$state,$loading,$stateParams) {
    $scope.addAdminFunction = function () {
        $scope.addSub = "";
        $scope.addSubSubmit = function (isValid) {
            if (isValid) {
                var category = {};
                if ($scope.addSub.Category1 == undefined || $scope.addSub.Category1 == false) {
                    category.add = false;
                }
                else {
                    category.add = true;
                }
                if ($scope.addSub.Category4 == undefined || $scope.addSub.Category4 == false) {
                    category.delete = false;
                }
                else {
                    category.delete = true;
                }
                if ($scope.addSub.Category2 == undefined || $scope.addSub.Category2 == false) {
                    category.edit = false;
                }
                else {
                    category.edit = true;
                }
                if ($scope.addSub.Category3 == false) {
                    category.view = false;
                }
                else {
                    category.view = true;
                }
                console.log(category);
                var package = {};
                if ($scope.addSub.Package1 == undefined || $scope.addSub.Package1 == false) {
                    package.add = false;
                }
                else {
                    package.add = true;
                }
                if ($scope.addSub.Package4 == undefined || $scope.addSub.Package4 == false) {
                    package.delete = false;
                }
                else {
                    package.delete = true;
                }
                if ($scope.addSub.Package2 == undefined || $scope.addSub.Package2 == false) {
                    package.edit = false;
                }
                else {
                    package.edit = true;
                }
                if ($scope.addSub.Package3 == false) {
                    package.view = false;
                }
                else {
                    package.view = true;
                }
                console.log(package);

                var user = {};
                if ($scope.addSub.User1 == undefined || $scope.addSub.User1 == false) {
                    user.add = false;
                }
                else {
                    user.add = true;
                }
                if ($scope.addSub.User4 == undefined || $scope.addSub.User4 == false) {
                    user.block = false;
                }
                else {
                    user.block = true;
                }
                if ($scope.addSub.User2 == undefined || $scope.addSub.User2 == false) {
                    user.edit = false;
                }
                else {
                    user.edit = true;
                }
                if ($scope.addSub.User3 == false) {
                    user.view = false;
                }
                else {
                    user.view = true;
                }
                console.log(user);

                var template = {};
                if ($scope.addSub.Template1 == undefined || $scope.addSub.Template1 == false) {
                    template.add = false;
                }
                else {
                    template.add = true;
                }
                if ($scope.addSub.Template4 == undefined || $scope.addSub.Template4 == false) {
                    template.delete = false;
                }
                else {
                    template.delete = true;
                }
                if ($scope.addSub.Template2 == undefined || $scope.addSub.Template2 == false) {
                    template.edit = false;
                }
                else {
                    template.edit = true;
                }
                if ($scope.addSub.Template3 == false) {
                    template.view = false;
                }
                else {
                    template.view = true;
                }
                console.log(template);

                var event = {};
                if ($scope.addSub.Event1 == false) {
                    event.view = false;
                }
                else {
                    event.view = true;
                }
                console.log(event);

                var guard = {};
                if ($scope.addSub.Gaurd3 == undefined || $scope.addSub.Gaurd3 == false) {
                    guard.block = false;
                }
                else {
                    guard.block = true;
                }
                if ($scope.addSub.Gaurd1 == undefined || $scope.addSub.Gaurd1 == false) {
                    guard.edit = false;
                }
                else {
                    guard.edit = true;
                }
                if ($scope.addSub.Gaurd4 == undefined || $scope.addSub.Gaurd4 == false) {
                    guard.add = false;
                }
                else {
                    guard.add = true;
                }
                if ($scope.addSub.Gaurd2 == false) {
                    guard.view = false;
                }
                else {
                    guard.view = true;
                }
                console.log(guard);

                var promo = {};
                if ($scope.addSub.Promo3 == undefined || $scope.addSub.Promo3 == false) {
                    promo.delete = false;
                }
                else {
                    promo.delete = true;
                }
                if ($scope.addSub.Promo1 == undefined || $scope.addSub.Promo1 == false) {
                    promo.add = false;
                }
                else {
                    promo.add = true;
                }
                if ($scope.addSub.Promo2 == false) {
                    promo.view = false;
                }
                else {
                    promo.view = true;
                }
                console.log(promo);

                var chat = {};
                if ($scope.addSub.Chat1 == false) {
                    chat.view = false;
                }
                else {
                    chat.view = true;
                }
                if ($scope.addSub.Chat2 == undefined || $scope.addSub.Chat2 == false) {
                    chat.allow = false;
                }
                else {
                    chat.allow = true;
                }
                console.log(chat);

                var param_data = {};
                param_data.name = $scope.addSub.Name;
                param_data.email = $scope.addSub.Email;
                param_data.password = $scope.addSub.Password;
                param_data.category = JSON.stringify(category);
                param_data.package = JSON.stringify(package);
                param_data.event = JSON.stringify(event);
                param_data.template = JSON.stringify(template);
                param_data.user = JSON.stringify(user);
                param_data.chat = JSON.stringify(chat);
                param_data.guard = JSON.stringify(guard);
                param_data.promo = JSON.stringify(promo);
                console.log(param_data);
                $loading.start('AddSubLoad');
                services.createSubAdminService(param_data, function (response, status) {
                    if (status == 1) {
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                        $loading.finish('AddSubLoad');
                    }
                    else {
                        factories.errorCallback(response.message, function () {
                            factories.unAuthorize(response);
                            $loading.finish('AddSubLoad');
                        });
                    }
                });
            }
        };
    };
    $scope.editAdminFunction = function () {
        $scope.editSub = "";
        $scope.editSub = {Name:'',Email:'',Password:'', Category1:'',Category2:'',Category3:'', Category4:'',Package1:'',Package2:'', Package3:'',Package4:'',User1:'',User2:'',User3:'',User4:'', Template1:'',Template2:'',Template3:'', Template4:'',Event1:'',Gaurd1:'', Gaurd2:'', Gaurd3:'',Promo1:'',Promo2:'', Promo3:'',Chat1:'',Chat2:''};
        $scope.editSub.Name = $rootScope.editAdminData.name;
        $scope.editSub.Email = $rootScope.editAdminData.email;
        $scope.editSub.Password = $rootScope.editAdminData.registrationDate;
        $scope.editSub.Category1 = $rootScope.editAdminData.category.add;
        $scope.editSub.Category2 = $rootScope.editAdminData.category.edit;
        $scope.editSub.Category3 = $rootScope.editAdminData.category.view;
        $scope.editSub.Category4 = $rootScope.editAdminData.category.delete;
        $scope.editSub.Package1 = $rootScope.editAdminData.package.add;
        $scope.editSub.Package2 = $rootScope.editAdminData.package.edit;
        $scope.editSub.Package3 = $rootScope.editAdminData.package.view;
        $scope.editSub.Package4 = $rootScope.editAdminData.package.delete;
        $scope.editSub.User1 = $rootScope.editAdminData.user.add;
        $scope.editSub.User2 = $rootScope.editAdminData.user.edit;
        $scope.editSub.User3 = $rootScope.editAdminData.user.view;
        $scope.editSub.User4 = $rootScope.editAdminData.user.block;
        $scope.editSub.Template1 = $rootScope.editAdminData.template.add;
        $scope.editSub.Template2 = $rootScope.editAdminData.template.edit;
        $scope.editSub.Template3 = $rootScope.editAdminData.template.view;
        $scope.editSub.Template4 = $rootScope.editAdminData.template.delete;
        $scope.editSub.Event1 = $rootScope.editAdminData.event.view;
        $scope.editSub.Gaurd1 = $rootScope.editAdminData.guard.edit;
        $scope.editSub.Gaurd2 = $rootScope.editAdminData.guard.view;
        $scope.editSub.Gaurd3 = $rootScope.editAdminData.guard.block;
        $scope.editSub.Gaurd4 = $rootScope.editAdminData.guard.add;
        $scope.editSub.Promo1 = $rootScope.editAdminData.promo.add;
        $scope.editSub.Promo2 = $rootScope.editAdminData.promo.view;
        $scope.editSub.Promo3 = $rootScope.editAdminData.promo.delete;
        $scope.editSub.Chat1 = $rootScope.editAdminData.chat.view;
        $scope.editSub.Chat2 = $rootScope.editAdminData.chat.allow;
        $scope.editSubSubmit = function (isValid) {
            if (isValid) {
                var category = {};
                if ($scope.editSub.Category1 == undefined || $scope.editSub.Category1 == false) {
                    category.add = false;
                }
                else {
                    category.add = true;
                }
                if ($scope.editSub.Category4 == undefined || $scope.editSub.Category4 == false) {
                    category.delete = false;
                }
                else {
                    category.delete = true;
                }
                if ($scope.editSub.Category2 == undefined || $scope.editSub.Category2 == false) {
                    category.edit = false;
                }
                else {
                    category.edit = true;
                }
                if ($scope.editSub.Category3 == false) {
                    category.view = false;
                }
                else {
                    category.view = true;
                }
                console.log(category);
                var package = {};
                if ($scope.editSub.Package1 == undefined || $scope.editSub.Package1 == false) {
                    package.add = false;
                }
                else {
                    package.add = true;
                }
                if ($scope.editSub.Package4 == undefined || $scope.editSub.Package4 == false) {
                    package.delete = false;
                }
                else {
                    package.delete = true;
                }
                if ($scope.editSub.Package2 == undefined || $scope.editSub.Package2 == false) {
                    package.edit = false;
                }
                else {
                    package.edit = true;
                }
                if ($scope.editSub.Package3 == false) {
                    package.view = false;
                }
                else {
                    package.view = true;
                }
                console.log(package);

                var user = {};
                if ($scope.editSub.User1 == undefined || $scope.editSub.User1 == false) {
                    user.add = false;
                }
                else {
                    user.add = true;
                }
                if ($scope.editSub.User4 == undefined || $scope.editSub.User4 == false) {
                    user.block = false;
                }
                else {
                    user.block = true;
                }
                if ($scope.editSub.User2 == undefined || $scope.editSub.User2 == false) {
                    user.edit = false;
                }
                else {
                    user.edit = true;
                }
                if ($scope.editSub.User3 == false) {
                    user.view = false;
                }
                else {
                    user.view = true;
                }
                console.log(user);

                var template = {};
                if ($scope.editSub.Template1 == undefined || $scope.editSub.Template1 == false) {
                    template.add = false;
                }
                else {
                    template.add = true;
                }
                if ($scope.editSub.Template4 == undefined || $scope.editSub.Template4 == false) {
                    template.delete = false;
                }
                else {
                    template.delete = true;
                }
                if ($scope.editSub.Template2 == undefined || $scope.editSub.Template2 == false) {
                    template.edit = false;
                }
                else {
                    template.edit = true;
                }
                if ($scope.editSub.Template3 == false) {
                    template.view = false;
                }
                else {
                    template.view = true;
                }
                console.log(template);

                var event = {};
                if ($scope.editSub.Event1 == false) {
                    event.view = false;
                }
                else {
                    event.view = true;
                }
                console.log(event);

                var guard = {};
                if ($scope.editSub.Gaurd3 == undefined || $scope.editSub.Gaurd3 == false) {
                    guard.block = false;
                }
                else {
                    guard.block = true;
                }
                if ($scope.editSub.Gaurd1 == undefined || $scope.editSub.Gaurd1 == false) {
                    guard.edit = false;
                }
                else {
                    guard.edit = true;
                }
                if ($scope.editSub.Gaurd4 == undefined || $scope.editSub.Gaurd4 == false) {
                    guard.add = false;
                }
                else {
                    guard.add = true;
                }
                if ($scope.editSub.Gaurd2 == false) {
                    guard.view = false;
                }
                else {
                    guard.view = true;
                }
                console.log(guard);

                var promo = {};
                if ($scope.editSub.Promo3 == undefined || $scope.editSub.Promo3 == false) {
                    promo.delete = false;
                }
                else {
                    promo.delete = true;
                }
                if ($scope.editSub.Promo1 == undefined || $scope.editSub.Promo1 == false) {
                    promo.add = false;
                }
                else {
                    promo.add = true;
                }
                if ($scope.editSub.Promo2 == false) {
                    promo.view = false;
                }
                else {
                    promo.view = true;
                }
                console.log(promo);

                var chat = {};
                if ($scope.editSub.Chat1 == false) {
                    chat.view = false;
                }
                else {
                    chat.view = true;
                }
                if ($scope.editSub.Chat2 == undefined || $scope.editSub.Chat2 == false) {
                    chat.allow = false;
                }
                else {
                    chat.allow = true;
                }
                console.log(chat);

                var param_data = {};
                param_data.id = $rootScope.editAdminData._id;
                // param_data.name = $scope.editSub.Name;
                // param_data.email = $scope.editSub.Email;
                // param_data.password = $scope.editSub.Password;
                param_data.category = JSON.stringify(category);
                param_data.package = JSON.stringify(package);
                param_data.event = JSON.stringify(event);
                param_data.template = JSON.stringify(template);
                param_data.user = JSON.stringify(user);
                param_data.chat = JSON.stringify(chat);
                param_data.guard = JSON.stringify(guard);
                param_data.promo = JSON.stringify(promo);
                console.log(param_data);
                $loading.start('EditSubLoad');
                services.editSubAdminService(param_data, function (response, status) {
                    if (status == 1) {
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                        $loading.finish('EditSubLoad');
                    }
                    else {
                        factories.errorCallback(response.message, function () {
                            factories.unAuthorize(response);
                            $loading.finish('EditSubLoad');
                        });
                    }
                });
            }
        };
    };

    $scope.listAdminFunction = function () {
        $loading.start('AddAdminLoad');
        services.getAdminService(function (response, status) {
            if (status == 1) {
                $scope.ListAdmin = response.data;
                services.datatable('AddAdminLoad', {});
                $loading.finish('AddAdminLoad');
                if ($.fn.DataTable.isDataTable('#AddAdminLoad')) {
                    angular.element('#AddAdminLoad').DataTable().clear().destroy();
                }
            }
            else {
                factories.errorCallback(response.message, function () {
                    factories.unAuthorize(response);
                    $loading.finish('AddAdminLoad');
                });
            }
        });
    };
    $scope.editAdminButton = function (data) {
        $rootScope.editAdminData = data;
        $scope.listView = false;
        $scope.addView = false;
        $scope.editView = true;
        $scope.editAdminFunction();
    };
    $scope.addAdminButton = function () {
        $scope.listView = false;
        $scope.addView = true;
        $scope.editView = false;
        $scope.addAdminFunction();
    };
    $scope.listAdminButton = function () {
        $scope.listView = true;
        $scope.addView = false;
        $scope.editView = false;
        $scope.listAdminFunction();
    };
    $scope.listAdminButton();





}]);

myApp.controller('categoriesCtrl', ['$scope','$rootScope','$uibModal','$cookies','services','factories','$state','$loading','$stateParams',function ($scope,$rootScope,$uibModal,$cookies,services,factories,$state,$loading,$stateParams) {

    $rootScope.categoryStorage = JSON.parse(localStorage.getItem("category"));

    $scope.addCategorysFunction = function () {
        $scope.addCategory = "";
        $scope.addCategorySubmit = function (isValid) {
            if (isValid) {
                var param_data = {};
                param_data.nameEng = $scope.addCategory.CategoryName;
                param_data.nameArabic = $scope.addCategory.CategoryNameArabic;
                param_data.image = $scope.picFile;
                param_data.icon = $scope.iconFile;
                $loading.start('AddCategoryLoad');
                services.createCategoryService(param_data, function (response, status) {
                    if (status == 1) {
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                        $loading.finish('AddCategoryLoad');
                    }
                    else {
                        factories.errorCallback(response.message, function () {
                            factories.unAuthorize(response);
                            $loading.finish('AddCategoryLoad');
                        });
                    }
                });
            }
        };
    };
    $scope.editCategorysFunction = function () {
        $scope.edit = {CategoryName:'',CategoryNameArabic:''};
        $scope.edit.CategoryName = $rootScope.editCategoryData.name[0];
        $scope.edit.CategoryNameArabic = $rootScope.editCategoryData.name[1];
        $scope.picFileedit = $rootScope.editCategoryData.categoryImage.original;
        $scope.picIconedit = $rootScope.editCategoryData.icon.original;
        $scope.editCategorySubmit = function (isValid) {
            if (isValid) {
                var param_data = {};
                param_data._id = $rootScope.editCategoryData._id;
                param_data.nameEng = $scope.edit.CategoryName;
                param_data.nameArabic = $scope.edit.CategoryNameArabic;
                if( typeof $scope.picFileedit != 'string')
                {
                    param_data.image = $scope.picFileedit;
                }
                if( typeof $scope.picIconedit != 'string')
                {
                    param_data.icon = $scope.picIconedit;
                }
                $loading.start('EditCategoryLoad');
                services.editCategoryService(param_data, function (response, status) {
                    if (status == 1) {
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                        $loading.finish('EditCategoryLoad');
                    }
                    else {
                        factories.errorCallback(response.message, function () {
                            factories.unAuthorize(response);
                            $loading.finish('EditCategoryLoad');
                        });
                    }
                });
            }
        };
    };
    $scope.listCategorysFunction = function () {
        $loading.start('CategoryLoad');
        services.getCategoryService(function (response, status) {
            if (status == 1) {
                $scope.ListCategory = response.data;
                services.datatable('CategoryLoad', {});
                $loading.finish('CategoryLoad');
                if ($.fn.DataTable.isDataTable('#CategoryLoad')) {
                    angular.element('#CategoryLoad').DataTable().clear().destroy();
                }
            }
            else {
                factories.errorCallback(response.message, function () {
                    factories.unAuthorize(response);
                    $loading.finish('CategoryLoad');
                });
            }
        });
    };
    $scope.editCategoryButton = function (data) {
        $rootScope.editCategoryData = data;
        $scope.listView = false;
        $scope.addView = false;
        $scope.editView = true;
        $scope.editCategorysFunction();
    };
    $scope.addCategoryButton = function () {
        $scope.listView = false;
        $scope.addView = true;
        $scope.editView = false;
        $scope.addCategorysFunction();
    };
    $scope.listCategoryButton = function () {
        $scope.listView = true;
        $scope.addView = false;
        $scope.editView = false;
        $scope.listCategorysFunction();
    };
    $scope.listCategoryButton();
    $scope.deleteCategory = function (id) {
        var message = "Do you want to Delete this Category?";
        factories.confirm(message,function () {
            services.deleteCategoryService (id,function (response,status) {
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

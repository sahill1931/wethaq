myApp.controller('imageCtrl', ['$scope','$rootScope','$uibModal','$cookies','services','factories','$state','$loading','$stateParams',function ($scope,$rootScope,$uibModal,$cookies,services,factories,$state,$loading,$stateParams) {
        $scope.addImageSubmit = function (isValid) {
            if (isValid) {
                var param_data = {};
                param_data.image = $scope.picFile;
                $loading.start('AddImageLoad');
                services.createImageService(param_data, function (response, status) {
                    if (status == 1) {
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                        $loading.finish('AddImageLoad');
                    }
                    else {
                        factories.errorCallback(response.message, function () {
                            factories.unAuthorize(response);
                            $loading.finish('AddImageLoad');
                        });
                    }
                });
            }
        };


    $scope.listImagesFunction = function () {
        $loading.start('ImageLoad');
        services.getImagesService(function (response, status) {
            if (status == 1) {
                $scope.ListImages = response.data;
                // services.datatable('ImageLoad', {});
                $loading.finish('ImageLoad');
                // if ($.fn.DataTable.isDataTable('#ImageLoad')) {
                //     angular.element('#ImageLoad').DataTable().clear().destroy();
                // }
            }
            else {
                factories.errorCallback(response.message, function () {
                    factories.unAuthorize(response);
                    $loading.finish('ImageLoad');
                });
            }
        });
    };

    $scope.listImagesFunction();

    // $scope.deleteImage = function (id) {
    //
    //     var message = "Do you want to Delete this Image?";
    //
    //     factories.confirm(message,function () {
    //         services.deleteImageService (id,function (response,status) {
    //             if(status == 1){
    //                 factories.successCallback(response.message,function () {
    //                     $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
    //                 });
    //
    //             }
    //             else {
    //                 factories.errorCallback(response.message,function () {
    //                     factories.unAuthorize(response);
    //                 });
    //             }
    //
    //         });
    //     });
    // };
    }]);

myApp.controller('promoCtrl', ['$scope','$rootScope','$uibModal','$cookies','services','factories','$state','$loading','$stateParams',function ($scope,$rootScope,$uibModal,$cookies,services,factories,$state,$loading,$stateParams) {
    $rootScope.promoStorage = JSON.parse(localStorage.getItem("promo"));

    $scope.addCodesFunction = function () {
        $scope.addCode = "";
        $scope.addCodesSubmit = function (isValid) {
            if (isValid) {
                var startDate = new Date($scope.datePicker.startDate._d);
                $scope.startAt = startDate.getTime();
                var endDate = new Date($scope.datePicker.endDate._d);
                $scope.endAt = endDate.getTime();
                if($scope.addCode.amountType == 'Percentage' && $scope.addCode.amount > 100)
                {
                    factories.error('Amount cannot be more than 100 in case of percentage');
                }
                else{
                    var param_data = {};
                    if($scope.addCode.SMS == undefined || $scope.addCode.SMS == false)
                    {
                        param_data.sms = false;
                    }
                    else
                    {
                        param_data.sms = true;
                    }
                    param_data.couponCode = $scope.addCode.couponCode;
                    param_data.amount = $scope.addCode.amount;
                    param_data.startAt = $scope.startAt;
                    param_data.endAt = $scope.endAt;
                    param_data.amountType = $scope.addCode.amountType;
                    $loading.start('AddCodeLoad');
                    services.createPromoCodesService(param_data, function (response, status) {
                        if (status == 1) {
                            $state.transitionTo($state.current, $stateParams, {
                                reload: true,
                                inherit: false,
                                notify: true
                            });
                            $loading.finish('AddCodeLoad');
                        }
                        else {
                            factories.errorCallback(response.message, function () {
                                factories.unAuthorize(response);
                                $loading.finish('AddCodeLoad');
                            });
                        }
                    });
                }

            }
        };
    };
    $scope.datePicker = {
        startDate: null,
        endDate: null
    };

    $scope.listCodesFunction = function () {
        $loading.start('CodeLoad');
        services.getPromoCodesService(function (response, status) {
            if (status == 1) {
                $scope.ListCode = response.data;
                services.datatable('CodeLoad', {});
                $loading.finish('CodeLoad');
                if ($.fn.DataTable.isDataTable('#CodeLoad')) {
                    angular.element('#CodeLoad').DataTable().clear().destroy();
                }
            }
            else {
                factories.errorCallback(response.message, function () {
                    factories.unAuthorize(response);
                    $loading.finish('CodeLoad');
                });
            }
        });
    };

    $scope.addCodesButton = function () {
        $scope.listView = false;
        $scope.addView = true;
        $scope.addCodesFunction();
    };
    $scope.listCodesButton = function () {
        $scope.listView = true;
        $scope.addView = false;
        $scope.listCodesFunction();
    };
    $scope.listCodesButton();


    $scope.deleteCode = function (id) {

        var message = "Do you want to Delete this Promo Code?";

        factories.confirm(message,function () {
            services.deletePromoCodesService (id,function (response,status) {
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

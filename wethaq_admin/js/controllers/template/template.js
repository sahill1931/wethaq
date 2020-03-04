myApp.controller('templateCtrl', ['$scope','$rootScope','$uibModal','$cookies','services','factories','$state','$loading','$stateParams',function ($scope,$rootScope,$uibModal,$cookies,services,factories,$state,$loading,$stateParams) {
    $rootScope.templateStorage = JSON.parse(localStorage.getItem("template"));

    $scope.AddImagesList = [];
    localStorage.setItem("AddImagesList", JSON.stringify($scope.AddImagesList));
    $scope.imagecheck = 'new';


    // $scope.status = false;


    $scope.example14model = [];
    $scope.example14settings = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true
    };
    $scope.example14data = [{
        "label": "Alabama",
        "id": "AL"
    }, {
        "label": "Alaska",
        "id": "AK"
    }, {
        "label": "American Samoa",
        "id": "AS"
    }, {
        "label": "Arizona",
        "id": "AZ"
    }, {
        "label": "Arkansas",
        "id": "AR"
    }, {
        "label": "California",
        "id": "CA"
    }, {
        "label": "Colorado",
        "id": "CO"
    }, {
        "label": "Connecticut",
        "id": "CT"
    }, {
        "label": "Delaware",
        "id": "DE"
    }, {
        "label": "District Of Columbia",
        "id": "DC"
    }, {
        "label": "Federated States Of Micronesia",
        "id": "FM"
    }, {
        "label": "Florida",
        "id": "FL"
    }, {
        "label": "Georgia",
        "id": "GA"
    }, {
        "label": "Guam",
        "id": "GU"
    }, {
        "label": "Hawaii",
        "id": "HI"
    }, {
        "label": "Idaho",
        "id": "ID"
    }, {
        "label": "Illinois",
        "id": "IL"
    }, {
        "label": "Indiana",
        "id": "IN"
    }, {
        "label": "Iowa",
        "id": "IA"
    }, {
        "label": "Kansas",
        "id": "KS"
    }, {
        "label": "Kentucky",
        "id": "KY"
    }, {
        "label": "Louisiana",
        "id": "LA"
    }, {
        "label": "Maine",
        "id": "ME"
    }, {
        "label": "Marshall Islands",
        "id": "MH"
    }, {
        "label": "Maryland",
        "id": "MD"
    }, {
        "label": "Massachusetts",
        "id": "MA"
    }, {
        "label": "Michigan",
        "id": "MI"
    }, {
        "label": "Minnesota",
        "id": "MN"
    }, {
        "label": "Mississippi",
        "id": "MS"
    }, {
        "label": "Missouri",
        "id": "MO"
    }, {
        "label": "Montana",
        "id": "MT"
    }, {
        "label": "Nebraska",
        "id": "NE"
    }, {
        "label": "Nevada",
        "id": "NV"
    }, {
        "label": "New Hampshire",
        "id": "NH"
    }, {
        "label": "New Jersey",
        "id": "NJ"
    }, {
        "label": "New Mexico",
        "id": "NM"
    }, {
        "label": "New York",
        "id": "NY"
    }, {
        "label": "North Carolina",
        "id": "NC"
    }, {
        "label": "North Dakota",
        "id": "ND"
    }, {
        "label": "Northern Mariana Islands",
        "id": "MP"
    }, {
        "label": "Ohio",
        "id": "OH"
    }, {
        "label": "Oklahoma",
        "id": "OK"
    }, {
        "label": "Oregon",
        "id": "OR"
    }, {
        "label": "Palau",
        "id": "PW"
    }, {
        "label": "Pennsylvania",
        "id": "PA"
    }, {
        "label": "Puerto Rico",
        "id": "PR"
    }, {
        "label": "Rhode Island",
        "id": "RI"
    }, {
        "label": "South Carolina",
        "id": "SC"
    }, {
        "label": "South Dakota",
        "id": "SD"
    }, {
        "label": "Tennessee",
        "id": "TN"
    }, {
        "label": "Texas",
        "id": "TX"
    }, {
        "label": "Utah",
        "id": "UT"
    }, {
        "label": "Vermont",
        "id": "VT"
    }, {
        "label": "Virgin Islands",
        "id": "VI"
    }, {
        "label": "Virginia",
        "id": "VA"
    }, {
        "label": "Washington",
        "id": "WA"
    }, {
        "label": "West Virginia",
        "id": "WV"
    }, {
        "label": "Wisconsin",
        "id": "WI"
    }, {
        "label": "Wyoming",
        "id": "WY"
    }];
    $scope.example2settings = {
        displayProp: 'id'
    };



    $scope.addTemplateFunction = function () {
        services.getCategoryService(function (response, status) {
            if (status == 1) {
                $scope.ListCategory = response.data;
            }
            else {
                factories.errorCallback(response.message, function () {
                    factories.unAuthorize(response);
                });
            }
        });
        $scope.addTemplate = "";
        $scope.addTemplateSubmit = function (isValid) {
            if (isValid) {
                var param_data = {};
                param_data.categoryId = $scope.addTemplate.TemplateCategory;
                param_data.name = $scope.addTemplate.TemplateName;
                param_data.price = $scope.addTemplate.TemplatePrice;
                param_data.htmlUrl = $scope.addTemplate.htmlContent;
                param_data.imageUrl = $rootScope.TemplateUploadPic;
                param_data.isPublic  = $scope.privacy;
                param_data.isCustom  = $scope.status;
                $loading.start('AddTemplateLoad');
                services.createTemplateService(param_data, function (response, status) {
                    if (status == 1) {
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                        $loading.finish('AddTemplateLoad');
                    }
                    else {
                        factories.errorCallback(response.message, function () {
                            factories.unAuthorize(response);
                            $loading.finish('AddTemplateLoad');
                        });
                    }
                });
            }
        };
    };

    $scope.editTemplateFunction = function () {
        services.getCategoryService(function (response, status) {
            if (status == 1) {
                $scope.ListCategory = response.data;
            }
            else {
                factories.errorCallback(response.message, function () {
                    factories.unAuthorize(response);
                });
            }
        });
        $scope.edit = {TemplateCategory:'',TemplateName:'',TemplatePrice:'',htmlContent:'', Custom:''};
        $scope.edit.TemplateCategory = $rootScope.editTemplateData.categoryId._id;
        $scope.edit.TemplateName = $rootScope.editTemplateData.name;
        $scope.edit.TemplatePrice = $rootScope.editTemplateData.price;
        $scope.edit.htmlContent = $rootScope.editTemplateData.htmlUrl;
        $scope.edit.Custom = $rootScope.editTemplateData.isCustom?'true':'false';
        $scope.picFileTemplateEdit = $rootScope.editTemplateData.imageUrl;
        $scope.privacy = $rootScope.editTemplateData.isPublic?'true':'false';
    };

    $scope.selectCustom = function(data)
    {
        console.log(data , "data")
        $scope.status = data.Custom
    }


    $scope.editTemplateSubmit = function (isValid) {
        console.log($scope.status , "$scope.status");
        if (isValid) {
            var param_data = {};
            param_data._id = $rootScope.editTemplateData._id;
            param_data.categoryId = $scope.edit.TemplateCategory;
            param_data.name = $scope.edit.TemplateName;
            param_data.price = $scope.edit.TemplatePrice;
            param_data.htmlUrl = $scope.edit.htmlContent;
            param_data.isPublic  = $scope.privacy=='true'?true:false;
            param_data.isCustom  = $scope.status == 'true'?true:false; 

            if( typeof $scope.picFileedit != 'string')
            {
                param_data.imageUrl = $rootScope.TemplateUploadEditPic;
            }
            $loading.start('EditTemplateLoad');
            services.editTemplateService(param_data, function (response, status) {
                if (status == 1) {
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                    $loading.finish('EditTemplateLoad');
                }
                else {
                    factories.errorCallback(response.message, function () {
                        factories.unAuthorize(response);
                        $loading.finish('EditTemplateLoad');
                    });
                }
            });
        }
    };

    $scope.listTemplateFunction = function () {
        $loading.start('TemplateLoad');
        services.getTemplateService(function (response, status) {
            if (status == 1) {
                $scope.ListTemplate = response.data;
                services.datatable('TemplateLoad', {});
                $loading.finish('TemplateLoad');
                if ($.fn.DataTable.isDataTable('#TemplateLoad')) {
                    angular.element('#TemplateLoad').DataTable().clear().destroy();
                }
            }
            else {
                factories.errorCallback(response.message, function () {
                    factories.unAuthorize(response);
                    $loading.finish('TemplateLoad');
                });
            }
        });
    };

    $scope.editTemplateButton = function (data) {
        console.log(data , "data")
        $rootScope.editTemplateData = data;
        $scope.listView = false;
        $scope.addView = false;
        $scope.editView = true;
        $scope.editTemplateFunction();
    };
    $scope.addTemplateButton = function () {
        $scope.listView = false;
        $scope.addView = true;
        $scope.editView = false;
        $scope.addTemplateFunction();
    };
    $scope.listTemplateButton = function () {
        $scope.listView = true;
        $scope.addView = false;
        $scope.editView = false;
        $scope.listTemplateFunction();
    };
    $scope.listTemplateButton();


    $scope.deleteTemplate = function (id) {
        var message = "Do you want to Delete this Template?";
        factories.confirm(message,function () {
            services.deleteTemplateService (id,function (response,status) {
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

    $scope.addTemplateImageFunction = function (value) {
        var param_data = {};

        if(value != undefined)
        {
            $loading.start('AddTemplateLoad');
            param_data.image = value;
            services.uploadTemplateImageService(param_data, function (response, status) {
                if (status == 1) {
                    $rootScope.TemplateUploadPic = response.data.original;
                    $loading.finish('AddTemplateLoad');
                }
                else {
                    $loading.finish('AddTemplateLoad');
                    factories.errorCallback(response.message, function () {
                        factories.unAuthorize(response);
                    });
                }
            });
        }
    };

    $scope.addTemplateImageEditFunction = function (value) {
        var param_data = {};
        if(value != undefined)

        {
            $loading.start('EditTemplateLoad');
            param_data.image = value;
            services.uploadTemplateImageService(param_data, function (response, status) {
                if (status == 1) {
                    $rootScope.TemplateUploadEditPic = response.data.original;
                    $loading.finish('EditTemplateLoad');
                }
                else {
                    $loading.finish('EditTemplateLoad');
                    factories.errorCallback(response.message, function () {
                        factories.unAuthorize(response);
                    });
                }
            });
        }
    };

    $scope.addImage = function (value) {
            var param_data = {};
            if(value != undefined)
            {
                param_data.image = value;
                services.createImageService(param_data, function (response, status) {
                    if (status == 1) {
                        if (JSON.parse(localStorage.getItem("AddImagesList")) == null || JSON.parse(localStorage.getItem("AddImagesList")) == undefined || JSON.parse(localStorage.getItem("AddImagesList")) == []) {
                            $scope.AddImagesList = [];
                            $scope.AddImagesList.push({thumb:response.data.thumbnail,orig:response.data.original});
                            localStorage.setItem("AddImagesList", JSON.stringify($scope.AddImagesList));
                        }
                        else {
                            $scope.AddImagesList = JSON.parse(localStorage.getItem("AddImagesList"));
                            $scope.AddImagesList.push({thumb:response.data.thumbnail,orig:response.data.original});
                            localStorage.setItem("AddImagesList", JSON.stringify($scope.AddImagesList));
                        }
                    }
                    else {
                        factories.errorCallback(response.message, function () {
                            factories.unAuthorize(response);
                        });
                    }
                });
            }

    };
    $scope.listImagesFunction = function () {
        services.getImagesService(function (response, status) {
            if (status == 1) {
                $scope.ListImages = response.data;
            }
            else {
                factories.errorCallback(response.message, function () {
                    factories.unAuthorize(response);
                });
            }
        });
    };
    $scope.listNewImagesFunction = function () {
        if (JSON.parse(localStorage.getItem("AddImagesList")) == null || JSON.parse(localStorage.getItem("AddImagesList")) == undefined || JSON.parse(localStorage.getItem("AddImagesList")) == []) {
            $scope.AddImagesList = [];
        }
        else {
            $scope.AddImagesList = JSON.parse(localStorage.getItem("AddImagesList"));
        }

    };
    $scope.checkPreview = function (Data) {
        $rootScope.checkPreviewData = Data;
        $uibModal.open({
            templateUrl: 'views/parent/preview-template.html',
            controller: 'PreviewTemplateCtrl'
        });
    };


}]);
myApp.controller('PreviewTemplateCtrl', ['$scope', '$rootScope', '$uibModalInstance', 'services', 'factories', '$state', '$window', '$stateParams', function ($scope, $rootScope, $uibModalInstance, services, factories, $state, $window, $stateParams) {
    $scope.checkPreviewFetch = $rootScope.checkPreviewData;
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

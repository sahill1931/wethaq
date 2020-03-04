myApp.controller('promotionsCtrl', ['$scope','$rootScope','$uibModal','$cookies','services','factories','$state','$loading','$stateParams',function ($scope,$rootScope,$uibModal,$cookies,services,factories,$state,$loading,$stateParams) {


    $scope.listOption = function () {
        /* Initialize list options */
        $scope.listOptions = {
            pageNo: 1,
            limit: 10,
            total: null,
            maxSize: 10,
            skip: 0,
            search: '',
            userId:null,
            userName:null
        };
        $scope.pg_options = {
            start: 0,
            end: 0
        };
    };
    $scope.listOption();

    if($stateParams.userId)
    {
        $scope.listOptions.userId=$stateParams.userId
    }
    if($stateParams.userName)
    {
        $scope.listOptions.userName=$stateParams.userName
    }


    $scope.ListEvents=[]

    $scope.more=function()
    {
        $scope.listOptions.pageNo=$scope.listOptions.pageNo+1;
        $scope.listEventsFunction($scope.newLimit3,$scope.eventType,0)
    }
    $scope.filter=function()
    {
        $scope.listOptions.pageNo=1;
        $scope.ListEvents=[]
        $scope.listEventsFunction($scope.newLimit3,$scope.eventType,1)

    }


    $scope.listEventsFunction = function (limit,value,flagy) {
        if ($scope.listOptions.pageNo == 1) {
            $scope.listOptions.skip = 0 * $scope.listOptions.limit;
        } else {
            $scope.listOptions.skip = ($scope.listOptions.pageNo - 1) * $scope.listOptions.limit;
        }

        $loading.start('EventsLoad');
        services.getPromotions($scope.listOptions,$scope.start, $scope.end,$scope.start1, $scope.end1,value,function (response, status) {
            if (status == 1) {

                $scope.ListEvents= $scope.ListEvents.concat(response.data.advertisement);
                $scope.ListEventsCount = response.data.count;
                $scope.listOptions.total = response.data.count;


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
                    if (angular.isUndefined($scope.ListEvents.length)) {
                        $scope.resultPaginationCount = 'No Results Found';
                    } else {
                        $scope.pg_options.start = 0;
                        $scope.pg_options.end = $scope.ListEvents.length;
                        $scope.resultPaginationCount = 'Showing ' + $scope.pg_options.end + ' Results for Search Query (Out of ' + $scope.listOptions.total + ')';
                    }
                }
                $loading.finish('EventsLoad');
            }

            else {
                factories.errorCallback(response.message, function () {
                    factories.unAuthorize(response);
                    $loading.finish('EventsLoad');
                });
            }
        });
    };

    $scope.pageChanged = function () {
        $scope.listEventButton();
    };

    $scope.gobtn = function () {
        $scope.start = new Date($('#datepicker').val()).getTime();
        $scope.end = new Date($('#datepicker1').val()).getTime();
        $scope.start1 = new Date($('#datepicker2').val()).getTime();
        $scope.end1 = new Date($('#datepicker3').val()).getTime();
        $scope.listOptions.pageNo=1;

        $scope.listEventButton();
    };
   

    function setexceldata(data)
    {
        $scope.excelItems=[]
        if(data.length) {
            angular.forEach(data, function (value, key) {
                $scope.excelItems.push({
                    Creator_Name: value.createdBy.name,
                    Creation_Date: new Date(value.createdAt),
                    PhoneNo:value.createdBy.phoneNo,
                    EventName: value.title || '-',
                    Email: value.createdBy.email,
                    Start_Date: new Date(value.startAt),
                    End_Date: new Date(value.endAt),
                    Category: value.categoryId.name.length==2 ?value.categoryId.name[1]:'NA',
                    Template: value.templateId.name || 'NA',
                    Guests_invited:  value.invites.length || 0,
                    Package:value.totalSms || 0,
                    Design_type: value.templateId.isPublic?'Public':'Customized',
                })

            })

        }
        alasql('SELECT * INTO XLSX("Event report.xlsx",{headers:true}) FROM ?', [$scope.excelItems]);
    }



    $scope.setexceldataguest = function(data)
    {
        $scope.excelItems=[]
        if(data.length) {
            angular.forEach(data, function (value, key) {
                $scope.excelItems.push({
                    Sr: key+1,
                    Name: value.name,
                    phoneNo: value.phoneNo,
                    Qrcode:$scope.detailsOfEvent.isQrCode == true ? $scope.detailsOfEvent.invites[0].qr : false,
                    Status:value.status ,
                    Checkin_Status: (!value.checkedAt || value.checkedAt == 0) ?'Pending/No show':'Attended',
                })

            })

        }
        alasql('SELECT * INTO XLSX("Event guestreport.xlsx",{headers:true}) FROM ?', [$scope.excelItems]);
    }


    $scope.detailEventButton = function (value) {
        $rootScope.eventId = value._id;
        $rootScope.detailsOfEvent = value;
        $scope.listView = false;
        $scope.detailView = true;
    };

    $scope.listEventButton = function () {
        $scope.listView = true;
        $scope.detailView = false;
        $scope.ListEvents=[];
        $scope.listEventsFunction($rootScope.newLimit3,$scope.eventType,0);
    };
    $scope.listEventButton();

    $scope.deleteAdv = function (id) {
        console.log("sadasd");
        var message = "Do you want to Delete this Promotion?";
        factories.confirm(message,function () {
            services.deletePromotionService (id,function (response,status) {
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

    $scope.openModals = function(){
        $uibModal.open({
            animation: true,
            backdrop  :true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-bodymusic',
            templateUrl: 'template.html',
            controller: 'ReasonCtrl',
            size: 'md',
            resolve: {
                items: function () {
                    return null;
                }
            }
        });
    };
    $scope.addmoreguests = function(){
        $uibModal.open({
            animation: true,
            backdrop  :true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-bodymusic',
            templateUrl: 'addmoreguests.html',
            controller: 'addmoreguestsCtrl',
            size: 'md',
            resolve: {
                items: function () {
                    return null;
                }
            }
        });
    };
    $scope.addmoreguards = function(){
        $uibModal.open({
            animation: true,
            backdrop  :true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-bodymusic',
            templateUrl: 'addmoreguards.html',
            controller: 'addmoreguestsCtrl',
            size: 'md',
            resolve: {
                items: function () {
                    return null;
                }
            }
        });
    };
    $scope.showQR = function(){
        console.log("sdfs");
        $uibModal.open({
            animation: true,
            backdrop  :true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-bodymusic',
            templateUrl: 'qrcode.html',
            size: 'md',
            resolve: {
                items: function () {
                    return null;
                }
            }
        });
    }

}]);
myApp.controller('promotionsaddCtrl', ['$scope','$rootScope','$uibModal','$cookies','services','factories','$state','$loading','$stateParams',function ($scope,$rootScope,$uibModal,$cookies,services,factories,$state,$loading,$stateParams) {




    $scope.addTemplate={
        gender:'',
        categoryId:'',
        url:null,
        adImageURL:null,
        startAge:null,
        endAge:null,
        lat:$scope.lat,
        lng:$scope.lng,
        address: $scope.city
    };

    $scope.type='add'
    if($stateParams.type=='edit' && !$stateParams.id)
    {
        factories.error('No advertisement found');
        $state.transitionTo('parent.advertisements',{}, {
            reload: true,
            inherit: false,
            notify: true
        });
        return false
    }
    else if($stateParams.type=='edit')
    {
        $scope.type='edit'
        $scope.listEventsFunction = function (limit,value) {

            $loading.start('EventsLoad');
            services.getPromotions({skip:0,limit:1,_id:$stateParams.id},null, null,null, null,null,function (response, status) {
                if (status == 1) {

                    var res= response.data.advertisement[0]

                    $scope.addTemplate={
                        gender:res.gender || '',
                        categoryId:res.categoryId ?res.categoryId._id : '',
                        url:res.url || null,
                        adImageURL:res.adImageURL || null,
                        startAge:res.startAge.toString() || null,
                        endAge:res.endAge.toString() || null,
                        _id: res._id
                    };

                    $loading.finish('EventsLoad');
                }

                else {
                    factories.errorCallback(response.message, function () {
                        factories.unAuthorize(response);
                        $loading.finish('EventsLoad');
                    });
                }
            });
        }();
    }
    else
    {
        $scope.type='add'
    }




    $scope.geocoder = new google.maps.Geocoder();

    var placeSearch, autocomplete;
    var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
    };
  
    function initialize() {
        console.log("function working ===")
        // Create the autocomplete object, restricting the search
        // to geographical location types.s
        var input = document.getElementById('searchTextField');
        var autocomplete = new google.maps.places.Autocomplete(input);

        // Specify only the data fields that are needed.
        autocomplete.setFields(
            ['address_components', 'geometry', 'icon', 'name', 'types']);

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var place = autocomplete.getPlace();

            document.getElementById('city2').value = place.name;
            document.getElementById('cityLat').value = place.geometry.location.lat();
            document.getElementById('cityLng').value = place.geometry.location.lng();
            //alert("This function is working!");
            //alert(place.name);
            // alert(place.address_components[0].long_name);

            console.log("ddfd", place);

            var arrAddress = place.address_components;
            $scope.lat = place.geometry.location.lat();
            $scope.lng = place.geometry.location.lng();

            // iterate through address_component array

            console.log(arrAddress ,"arrAddressarrAddressarrAddress")

            var lastData=arrAddress[arrAddress.length-1];
            var cityFlag=0;
            var countryFlag=0;

            $.each(arrAddress, function (i, address_component) {
                if (address_component.types[0] == "locality"){
                    console.log("town:"+address_component.long_name);
                    $scope.city = address_component.long_name;
                }
                if (address_component.types[0] == "country"){
                    console.log("country:"+address_component.long_name);
                    $scope.country = address_component.long_name;
                }
                //return false; // break the loop
            });

            // fillInAddress();

        });
        // When the user selects an address from the dropdown,
        // populate the address fields in the form.

    }

    google.maps.event.addDomListener(window, 'load', initialize);
    
    initialize();

    // [END region_geolocation]



    $scope.getagearray= function()
    {
        var len=100;
        var arr=[]

        for(var i=1;i<=len;i++)
        {
            arr.push(i)
        }

        return arr

    }


    $scope.getcategory = function() {
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
    }();



    $scope.addTemplateImageFunction = function (value) {
        var param_data = {};

        if(value != undefined)
        {
            $loading.start('AddTemplateLoad');
            param_data.image = value;


            services.uploadTemplateImageService(param_data, function (response, status) {
                if (status == 1) {
                    $scope.addTemplate['adImageURL'] = response.data;
                    // $scope.addTemplate['adImageURL'] = value;
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


    $scope.addTemplateSubmit = function (isValid) {
        if (isValid) {


            if((!!$scope.addTemplate['startAge'] && !$scope.addTemplate['endAge']) || (!$scope.addTemplate['startAge'] && !!$scope.addTemplate['endAge']))
            {
                factories.error('Enter both ages');
                return false;
            }

           $loading.start('AddTemplateLoad');


            services.createPromotionService($scope.addTemplate, $scope.lat , $scope.lng, $scope.city, function (response, status) {
                if (status == 1) {

                    // $state.transitionTo($state.current, $stateParams, {
                    //     reload: true,
                    //     inherit: false,
                    //     notify: true
                    // });
                    $state.transitionTo('parent.promotions',{}, {
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


    


}]);



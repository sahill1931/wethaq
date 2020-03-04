myApp.controller('eventsCtrl', ['$scope','$rootScope','$uibModal','$cookies','services','factories','$state','$loading','$stateParams',function ($scope,$rootScope,$uibModal,$cookies,services,factories,$state,$loading,$stateParams) {

    $rootScope.eventStorage = JSON.parse(localStorage.getItem("event"));


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



    $scope.eventType = '';
    $rootScope.newLimit3 =0;

    $( "#datepicker , #datepicker1,#datepicker2 , #datepicker3" ).datepicker({
        // minDate: new Date(),
        maxDate: new Date(2035,01,01)
    });

    $scope.reset=function(){

        $("#datepicker").val(null);
        $("#datepicker1").val(null);
        $("#datepicker2").val(null);
        $("#datepicker3").val(null);
        $scope.start = null;
        $scope.end = null;
        $scope.start1 = null;
        $scope.end1 = null;
        $scope.listEventsFunction($scope.newLimit3,$scope.eventType,0)

    }

    $scope.excelItems=[]
    $scope.alsqldata = function () {
        services.getEventsService({},$scope.start, $scope.end,$scope.start1, $scope.end1,null, function (response, status) {
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
        // if(flagy == 1)
        // {
        //     $scope.listOptions.pageNo == 1;
        //
        // }

        if ($scope.listOptions.pageNo == 1) {
            $scope.listOptions.skip = 0 * $scope.listOptions.limit;
        } else {
            $scope.listOptions.skip = ($scope.listOptions.pageNo - 1) * $scope.listOptions.limit;
        }

        // if(flagy == 0)
        // {
        //     $rootScope.newLimit3 = limit + 10;
        //     $scope.listOptions.limit=limit+10;
        // }
        // else
        // {
        //     $rootScope.newLimit3 = limit;
        // }
        $loading.start('EventsLoad');
        services.getEventsService($scope.listOptions,$scope.start, $scope.end,$scope.start1, $scope.end1,value,function (response, status) {
            if (status == 1) {

                $scope.ListEvents= $scope.ListEvents.concat(response.data.data);
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
                // console.log(value , "value")
                if(value.categoryId){
                    $scope.eventname = value.categoryId.name[1]
                }
                else {
                    $scope.eventname = 'N.A'
                }
                // console.log($scope.eventname , "$scope.eventname")

                $scope.excelItems.push({
                    Creator_Name: value.createdBy.name,
                    Creation_Date: new Date(value.createdAt),
                    PhoneNo:value.createdBy.phoneNo,
                    EventName: value.title || '-',
                    Email: value.createdBy.email,
                    Start_Date: new Date(value.startAt),
                    End_Date: new Date(value.endAt),
                    // Category: value.categoryId.name.length==2 ?value.categoryId.name[1]:'NA',
                    Category: $scope.eventname,
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
            console.log('data',data);
            angular.forEach(data, function (value, key) {
                $scope.excelItems.push({
                    Sr: key+1,
                    Name: value.name,
                    phoneNo: value.phoneNo,
                    Qrcode:$scope.detailsOfEvent.isQrCode == true ? value.qr : false,
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

myApp.controller('ReasonCtrl',['$uibModalInstance','items','$scope','$state','services','$cookies','$cookieStore','factories','socket','$rootScope',
    function ($uibModalInstance,items,$scope,$state,services,$cookies,$cookieStore,factories,socket,$rootScope) {
        $scope.closemusic = function(){
            $uibModalInstance.dismiss('close');
        };

        $scope.submitReason =function (valid) {
            if(valid){
                var obj = {
                    eventId:$scope.eventId,
                    reason:$scope.reason,
                    status:true
                };
                services.blockUnblockEventService(obj,function (response,status) {
                    if(status === 1){
                        factories.success('Deleted Successfully');
                        $uibModalInstance.dismiss('close');
                        $state.reload();
                    }
                    else {
                        factories.error(response.message)
                    }

                })
            }
        }


}]);
myApp.controller('addmoreguestsCtrl',['$loading','$uibModalInstance','items','$scope','$state','services','$cookies','$cookieStore','factories','socket','$rootScope',
    function ($loading,$uibModalInstance,items,$scope,$state,services,$cookies,$cookieStore,factories,socket,$rootScope) {
        $scope.guestlist=[]
      $scope.guest={}
        $scope.cancel = function(){
            $uibModalInstance.dismiss('close');
        };

        $scope.addguests =function (valid) {
            if(valid){
                var a=angular.copy($scope.guest)
                $scope.guestlist.push(a)
                for(let key in $scope.guest)
                {
                    $scope.guest[key]=null;
                }
            }
        }

        $scope.guestlistdelete=function(index)
        {
            $scope.guestlist.splice(index,1)
        }

        $scope.submitdata=function(){
            $loading.start('addguest')
            services.addinvitee($scope.guestlist,$rootScope.eventId,function (response,status) {
                if(status === 1){
                    $loading.finish('addguest')

                    factories.success('Added Successfully');
                    $uibModalInstance.dismiss('close');
                    $state.reload();
                }
                else {
                    $loading.finish('addguest')
                    factories.error(response.message)
                }

            })
        }

        $scope.guardlist=[]
      $scope.guard={}
        $scope.cancel = function(){
            $uibModalInstance.dismiss('close');
        };

        $scope.addguards =function (valid) {
            if(valid){
                var a=angular.copy($scope.guard)
                $scope.guardlist.push(a)
                for(let key in $scope.guard)
                {
                    $scope.guard[key]=null;
                }
            }
            $scope.submitdata()
        }

        $scope.guardlistdelete=function(index)
        {
            $scope.guardlist.splice(index,1)
        }

        $scope.submitdata=function(){
            $loading.start('addguard')
            services.addguard($scope.guardlist,$rootScope.eventId,function (response,status) {
                if(status === 1){
                    $loading.finish('addguard')

                    factories.success('Added Successfully');
                    $uibModalInstance.dismiss('close');
                    $state.reload();
                }
                else {
                    $loading.finish('addguard')
                    factories.error(response.message)
                }

            })
        }


}]);


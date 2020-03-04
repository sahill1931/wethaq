myApp.controller('InvitationCtrl', ['$scope','$cookies','services','factories','$state','$loading','socket',
    function ($scope,$cookies,services,factories,$state,$loading,socket) {
        // var urlParams = window.location;
        // var des = urlParams.toString().split("?eventId=");
        // if( des[1] == undefined)
        // {
        //     window.location = "error.html";
        // }
        // else{
        //     var desResult = des[1];
        //     var res = desResult.toString().split("&phoneNo=");
        //     $scope.eventId = res[0];
        //     $scope.phoneNo= res[1];
        //     console.log($scope.eventId,$scope.phoneNo);
        //     services.getEventDescService($scope.eventId,$scope.phoneNo,function (response, status) {
        //         if (status == 1) {
        //             $scope.ListEventDetails = response.data[0];
        //         }
        //         else {
        //             factories.errorCallback(response.message, function () {
        //                 factories.unAuthorize(response);
        //             });
        //         }
        //     });
        //     $scope.acceptInvi = function () {
        //         var message = "Do you want to Accept this Invitation?";
        //         factories.confirm(message,function () {
        //             services.acceptInviService ($scope.eventId,$scope.phoneNo,function (response,status) {
        //                 if(status == 1){
        //                     factories.successCallback(response.message,function () {
        //                         $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
        //                     });
        //                 }
        //                 else {
        //                     factories.errorCallback(response.message,function () {
        //                         factories.unAuthorize(response);
        //                     });
        //                 }
        //
        //             });
        //         });
        //     };
        //
        //
        //     $scope.rejectInvi = function () {
        //         var message = "Do you want to Reject this Invitation?";
        //         factories.confirm(message,function () {
        //             services.rejectInviService ($scope.eventId,$scope.phoneNo,function (response,status) {
        //                 if(status == 1){
        //                     factories.successCallback(response.message,function () {
        //                         $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
        //                     });
        //                 }
        //                 else {
        //                     factories.errorCallback(response.message,function () {
        //                         factories.unAuthorize(response);
        //                     });
        //                 }
        //
        //             });
        //         });
        //     };
        // }



        var urlParams = window.location;
        var des = urlParams.toString().split("invitation/");
        if( des[1] == undefined)
        {
            window.location = "error.html";
        }
        else{
            $loading.start('loader')
            var desResult = des[1];
            var res = desResult.toString().split("/");
            $scope.eventId = res[0];
            $scope.phoneNo= res[1];
            console.log($scope.eventId,$scope.phoneNo);
            services.getEventDescService($scope.eventId,$scope.phoneNo,function (response, status) {
                if (status == 1) {
                    $scope.ListEventDetails = response.data[0];
                    // $scope.image=response.data[0].imageUrl
                    console.log('endAt', new Date().getTime() < response.data[0].endAt);
                    if(new Date().getTime() > response.data[0].endAt){
                        $scope.showErr = false;
                    }
                    else {
                        $scope.showErr = true;
                    }
                    $loading.finish('loader')
                }
                else {
                    $loading.finish('loader')
                    factories.errorCallback(response.message, function () {
                        factories.unAuthorize(response);

                    });
                }
            });
            $scope.acceptInvi = function () {
                var message,notext,yestext;

                if($scope.ListEventDetails.lang=='ar')
                {
                    message = "?هل تريد قبول هذه الدعوة"
                    notext='لا'
                    yestext='نعم'
                }
                else
                {
                    message = "Do you want to Accept this Invitation?";
                    yestext='Yes';
                    notext='No'
                }


                factories.confirminvitation(message,yestext,notext,function () {
                    services.acceptInviService ($scope.eventId,$scope.phoneNo,function (response,status) {
                        if(status == 1){
                            factories.success(response.message);
                                $state.reload();
                        }
                        else {
                            factories.errorCallback(response.message,function () {
                                factories.unAuthorize(response);
                            });
                        }

                    });
                });
            };


            $scope.rejectInvi = function () {
                var message,notext,yestext;

                if($scope.ListEventDetails.lang=='ar')
                {
                     message = "هل تريد رفض هذه الدعوة؟"
                     notext='لا'
                     yestext='نعم'
                }
                else
                {
                     message = "Do you want to Reject this Invitation?";
                     yestext='Yes';
                     notext='No'
                }

                factories.confirminvitation(message,yestext,notext,function () {
                    services.rejectInviService ($scope.eventId,$scope.phoneNo,function (response,status) {
                        if(status == 1){
                            factories.success(response.message);
                            $state.reload();
                        }
                        else {
                            factories.errorCallback(response.message,function () {
                                factories.unAuthorize(response);
                            });
                        }

                    });
                });
            };
        }



    }]);
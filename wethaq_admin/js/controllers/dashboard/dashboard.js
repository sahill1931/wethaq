myApp.controller('dashboardCtrl', ['$scope','$rootScope','$uibModal','$cookies','services','factories','$state','$loading','$stateParams',function ($scope,$rootScope,$uibModal,$cookies,services,factories,$state,$loading,$stateParams) {
    $loading.start('DashboardLoad');
    services.dashboardService(function (response, status) {
        if (status == 1) {
            $scope.DasboardCount = response.data;
            $loading.finish('DashboardLoad');
        }
        else {
            factories.errorCallback(response.message, function () {
                factories.unAuthorize(response);
                $loading.finish('DashboardLoad');
            });
        }
    });

    $scope.days = '10';

    $scope.graphDays = function (days) {
        $scope.days = days;
        services.getreports($scope.days, $scope.catId, function (response, status) {
            if (status == 1) {
                $scope.reportDataEvents = response.data.events;
                $scope.reportDataUsers = response.data.users;
                var obj1=[];
                var obj2=[];
                var obj3=[];

                for(i=0;i<$scope.reportDataEvents.length;i++)
                {
                    obj1.push($scope.reportDataEvents[i].date);
                    obj2.push($scope.reportDataEvents[i].value);
                }
                for(i=0;i<$scope.reportDataUsers.length;i++)
                {
                    obj3.push($scope.reportDataUsers[i].value);
                }
                $scope.colors = ['#72CCE8','#CE89FB'];
                $scope.labels1 = obj1;
                $scope.series1 = ['Events', 'Users'];
                $scope.data = [
                    obj2,
                    obj3
                ];
                $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
                $scope.options = {
                    scales: {
                        yAxes: [
                            {
                                id: 'y-axis-1',
                                type: 'linear',
                                display: true,
                                position: 'right',
                                ticks: {
                                    beginAtZero: true,
                                },
                                scaleLabel:{
                                    display:true,
                                    labelString:'Number of Events'
                                }
                            },
                            {
                                id: 'y-axis-2',
                                type: 'linear',
                                display: true,
                                position: 'left',
                                ticks: {
                                    beginAtZero: true,
                                },
                                scaleLabel:{
                                    display:true,
                                    labelString:'Number of Users'
                                }
                            }
                        ],
                        xAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Last 30 Days'
                                }
                            }
                        ]
                    }
                };
            }
            else {
                factories.errorCallback(response.message, function () {
                    factories.unAuthorize(response);
                });
            }
        });
    };

    $scope.graphDays($scope.days);

    $scope.getcat = function (data) {
      $scope.catId = data;
        $scope.graphDays($scope.days);
    };

    services.getCategoryService(function (response, status) {
        if (status == 1) {
            $scope.categories = response.data;
        }
        else {
            factories.errorCallback(response.message, function () {
                factories.unAuthorize(response);
                $loading.finish('DashboardLoad');
            });
        }
    });

    services.reportService(function (response, status) {
        if (status == 1) {
            $scope.reportDataEvents = response.data.events;
            $scope.reportDataUsers = response.data.users;
            var obj1=[];
            var obj2=[];
            var obj3=[];

            for(i=0;i<$scope.reportDataEvents.length;i++)
            {
                obj1.push($scope.reportDataEvents[i].date);
                obj2.push($scope.reportDataEvents[i].value);
            }
            for(i=0;i<$scope.reportDataUsers.length;i++)
            {
                obj3.push($scope.reportDataUsers[i].value);
            }
            $scope.colors = ['#72CCE8','#CE89FB'];
            $scope.labels = obj1;
            $scope.series = ['Events', 'Users'];
            $scope.data = [
                obj2,
                obj3
            ];
            $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
            $scope.options = {
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'right',
                            ticks: {
                                beginAtZero: true,
                            },
                            scaleLabel:{
                                display:true,
                                labelString:'Number of Events'
                            }
                        },
                        {
                            id: 'y-axis-2',
                            type: 'linear',
                            display: true,
                            position: 'left',
                            ticks: {
                                beginAtZero: true,
                            },
                            scaleLabel:{
                                display:true,
                                labelString:'Number of Users'
                            }
                        }
                    ],
                    xAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'Last 30 Days'
                            }
                        }
                    ]
                }
            };
        }
        else {
            factories.errorCallback(response.message, function () {
                factories.unAuthorize(response);
            });
        }
    });
}]);



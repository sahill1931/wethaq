myApp.controller('chatCtrl', ['$scope', '$rootScope', '$uibModal', '$cookies', 'services', 'factories', '$state', '$loading', '$stateParams', 'socket', '$timeout',
    function ($scope, $rootScope, $uibModal, $cookies, services, factories, $state, $loading, $stateParams, socket, $timeout) {

        $rootScope.badge = false;
        $rootScope.chatStorage = JSON.parse(localStorage.getItem("chat"));

        // $scope.myId = localStorage.getItem('myId');
        $scope.myId = '5a94001266091310453004b8';
        $scope.config1 = {
            autoHideScrollbar: false,
            theme: 'light',
            advanced: {
                updateOnContentResize: true
            },
            setHeight: 350,
            scrollInertia: 0
        };
        $scope.config2 = {
            autoHideScrollbar: false,
            theme: 'light',
            advanced: {
                updateOnContentResize: true
            },
            setHeight: 380,
            scrollInertia: 0
        };
        $scope.config3 = {
            autoHideScrollbar: false,
            theme: 'light',
            advanced: {
                updateOnContentResize: true
            },
            setHeight: 350,
            scrollInertia: 0
        };

        $scope.userLimit = 10;
        $scope.userSearch = '';
        $scope.userList = function () {
            var obj = {
                skip: 0,
                limit: $scope.userLimit,
                search: ($scope.userSearch) ? ($scope.userSearch) : undefined
            };

            services.getMessageListService(obj, function (response, status) {
                if (status) {
                    $scope.chatList = response.data.users;
                    $scope.userCount = response.data.count;
                    if ($scope.userCount > 0) {
                        $scope.categoryList(undefined, 0);
                    }
                    else {
                        $rootScope.descriptionList = '';
                        $scope.categoryLists = '';
                        $scope.selectedUsers = '';
                    }
                }
                else {
                }
            })
        };
        $scope.userList();

        $scope.viewMoreUser = function () {
            $scope.userLimit = $scope.userLimit + 10;
            $scope.userList();
        };

        $scope.userSearchFun = function () {
            $scope.userLimit = 10;
            $scope.userList();
        };

        $scope.categoryList = function (data, index) {
            if (data) {
                $scope.selectedUsers = data;
                $scope.userId = data._id;
            }
            else {
                $scope.selectedUsers = $scope.chatList[0];
                $scope.userId = $scope.chatList[0]._id;
            }
            console.log('see;ected', $scope.selectedUsers)
            $rootScope.descriptionList = '';
            $scope.categoryLists = '';

            var obj = {
                userId: $scope.userId,
                limit: 100,
                skip: 0
            }
            services.getCategoryListsService(obj, function (response, status) {
                if (status) {
                    $scope.categoryLists = response.data.requests;
                    console.log('gettt', $scope.categoryLists)
                    $scope.descriptionListFun(undefined, 0, 0);
                }
            })
        };

        $rootScope.descriptionList = [];

        $scope.skip = 0;
        $scope.msgLimit = 10;
        $scope.descriptionListFun = function (data, skip, index) {

            $scope.categoryLists[index].isRead = true;
            $scope.selectData = data;

            $scope.config3 = {
                autoHideScrollbar: false,
                theme: 'light',
                advanced: {
                    updateOnContentResize: true
                },
                setHeight: 350,
                scrollInertia: 0
            };

            $scope.skip = $scope.skip + (skip) ? (skip) : 0;

            if (data) {
                $rootScope.status = data.status;
                console.log('----------', $rootScope.status);
                if (($rootScope.status == 'Active' || $rootScope.status == 'Rejected') && data.rejectTimes < 3) {
                    $rootScope.showOffer = true;
                }
                else {
                    $rootScope.showOffer = false;
                }

                $scope.selectedCategory = data;
                var obj = {
                    _id: data._id,
                    skip: $scope.skip,
                    limit: $scope.msgLimit,
                    search: ($scope.msgSearch) ? ($scope.msgSearch) : undefined
                };
            }
            else {
                $scope.selectedCategory = $scope.categoryLists[0];
                $rootScope.status = $scope.categoryLists[0].status;
                if ($rootScope.status == 'Active' || $rootScope.status == 'Rejected') {
                    $rootScope.showOffer = true;
                }
                else {
                    $rootScope.showOffer = false;
                }

                var obj = {
                    _id: $scope.categoryLists[0]._id,
                    skip: $scope.skip,
                    limit: $scope.msgLimit,
                    search: ($scope.msgSearch) ? ($scope.msgSearch) : undefined
                }
            }

            services.getDescriptionService(obj, function (response, status) {
                if (status) {
                    $rootScope.descriptionList = response.data;
                    console.log($rootScope.descriptionList);
                }
                else {
                }
            })
        };

        $scope.msgSearchFun = function () {
            // $scope.userLimit = 10;
            $scope.descriptionListFun($scope.selectData, 0, 0);
        };

        $scope.viewMoreMsg = function (limit) {
            $scope.msgLimit = limit;
            $scope.descriptionListFun($scope.selectData, 0, 0);
        };

        socket.on('sendMessage', function (recMsg) {
            $rootScope.$broadcast("badge", "some data");
            $rootScope.badge = true;

            $scope.config3 = {
                autoHideScrollbar: false,
                theme: 'light',
                advanced: {
                    updateOnContentResize: true
                },
                setHeight: 350,
                scrollInertia: 0
            };
            // $rootScope.descriptionList.chat = [];
            if ($scope.userId == recMsg.senderId) {
                if (recMsg.categoryId == $scope.selectedCategory.categoryId) {
                    console.log(recMsg, 'recMsg')
                    var msgObj = {
                        cost: recMsg.message.cost,
                        duration: recMsg.message.duration,
                        htmlUrl: recMsg.message.htmlUrl,
                        msgType: recMsg.message.msgType,
                        senderId: recMsg.message.senderId,
                        text: recMsg.message.text,
                        timeStamp: recMsg.message.timeStamp,
                        url: recMsg.url
                    };
                    $rootScope.descriptionList.chat.push(msgObj);
                    $('.scrollmsg').mCustomScrollbar('scrollTo', 'last');
                }
            }
        });

        $scope.sendMsgSocket = function (type, data) {
            var arr = [];

            if ($scope.messageBox || type == 'Image') {
                console.log('am worked')
                arr.push($scope.messageBox);
                socket.emit('sendMessage', {
                    senderId: $scope.myId,
                    receiverId: $scope.userId,
                    msgType: type,
                    text: (type == 'Image') ? '' : arr,
                    title: $scope.selectedCategory.title,
                    categoryId: $scope.selectedCategory.categoryId,
                    categoryName: $scope.selectedCategory.categoryName,
                    type: 'admin',
                    thumbnail: (data) ? (data.thumbnail) : '',
                    original: (data) ? (data.original) : ''
                });
                $scope.messageBox = '';
                var msgObj = {
                    cost: 0,
                    duration: 0,
                    htmlUrl: 0,
                    msgType: type,
                    senderId: $scope.myId,
                    text: arr,
                    timeStamp: new Date(),
                    url: {
                        thumbnail: (data) ? (data.thumbnail) : '',
                        original: (data) ? (data.original) : ''
                    },
                    _id: ''
                };
                $rootScope.descriptionList.chat.push(msgObj);
                $timeout(function () {
                    $('.scrollmsg').mCustomScrollbar('scrollTo', 'last');
                }, 500)
            }
        };


        $scope.sendImage = function () {

            if ($scope.picFile) {
                $loading.start('AddImageLoad');
                var obj = {
                    image: $scope.picFile
                };
                services.createImageService(obj, function (response, status) {
                    if (status == 1) {
                        $loading.finish('AddImageLoad');
                        $scope.sendMsgSocket('Image', response.data);
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


        $scope.sendOffer = function () {

            var msgObj = {
                senderId: $scope.myId,
                receiverId: $scope.userId,
                title: $scope.selectedCategory.title,
                categoryId: $scope.selectedCategory.categoryId,
                categoryName: $scope.selectedCategory.categoryName
            };
            $uibModal.open({
                animation: true,
                backdrop: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-bodymusic',
                templateUrl: 'offer.html',
                controller: 'getOfferCtrl',
                size: 'sm',
                resolve: {
                    items: function () {
                        return msgObj;
                    }
                }
            });
        };

        $scope.sendTemp = function () {

            var msgObj = {
                senderId: $scope.myId,
                receiverId: $scope.userId,
                title: $scope.selectedCategory.title,
                categoryId: $scope.selectedCategory.categoryId,
                categoryName: $scope.selectedCategory.categoryName
            };
            $uibModal.open({
                animation: true,
                backdrop: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-bodymusic',
                templateUrl: 'template.html',
                controller: 'templateCtrl',
                size: 'md',
                resolve: {
                    items: function () {
                        return msgObj;
                    }
                }
            });
        };

        $scope.openProfile = function (data) {
            console.log('data3231312312', data)
            $uibModal.open({
                animation: true,
                backdrop: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-bodymusic',
                templateUrl: 'profile.html',
                controller: 'profileCtrl',
                size: 'md',
                resolve: {
                    items: function () {
                        return data._id
                    }
                }
            });
        };


    }]);

myApp.controller('getOfferCtrl', ['$uibModalInstance', 'items', '$scope', '$state', 'services', '$cookies', '$cookieStore', 'factories', 'socket', '$rootScope',
    function ($uibModalInstance, items, $scope, $state, services, $cookies, $cookieStore, factories, socket, $rootScope) {
        $scope.closemusic = function () {
            $uibModalInstance.dismiss('close');
        };

        // $scope.myId = localStorage.getItem('myId');
        $scope.myId = '5a94001266091310453004b8';

        $scope.sendOfferSocket = function (valid) {
            if (valid) {
                $scope.closemusic();
                var arr = [];
                arr.push($scope.title);
                socket.emit('sendMessage', {
                    senderId: $scope.myId,
                    receiverId: items.receiverId,
                    msgType: 'Offer',
                    title: items.title,
                    text: arr,
                    categoryId: items.categoryId,
                    categoryName: items.categoryName,
                    type: 'admin',
                    thumbnail: '',
                    original: '',
                    duration: $scope.duration,
                    cost: $scope.cost
                });


                var msgObj = {
                    senderId: $scope.myId,
                    cost: $scope.cost,
                    duration: $scope.duration,
                    htmlUrl: 0,
                    msgType: 'Offer',
                    text: $scope.title,
                    timeStamp: new Date(),
                    url: {
                        thumbnail: '',
                        original: ''
                    },
                    _id: ''
                };
                $rootScope.descriptionList.chat.push(msgObj);
                $rootScope.status = 'Pending';
                $rootScope.showOffer = false;
                if ($rootScope.status == 'Active' || $rootScope.status == 'Rejected') {
                    $rootScope.showOffer = true;
                }
                else {
                    $rootScope.showOffer = false;
                }

                $('.scrollmsg').mCustomScrollbar('scrollTo', 'last');
            }
        }

    }]);

myApp.controller('templateCtrl', ['$uibModalInstance', 'items', '$scope', '$state', 'services', '$cookies', '$cookieStore', 'factories', 'socket', '$rootScope',
    function ($uibModalInstance, items, $scope, $state, services, $cookies, $cookieStore, factories, socket, $rootScope) {
        $scope.closemusic = function () {
            $uibModalInstance.dismiss('close');
        };

        // $scope.myId = localStorage.getItem('myId');
        $scope.myId = '5a94001266091310453004b8';
        $scope.listTemplateFunction = function () {

            services.getTemplateService(function (response, status) {
                if (status == 1) {
                    $scope.ListTemplate = response.data;
                    console.log(response)
                    services.datatable('TemplateLoad', {});
                    if ($.fn.DataTable.isDataTable('#TemplateLoad')) {
                        angular.element('#TemplateLoad').DataTable().clear().destroy();
                    }
                }
                else {
                    factories.errorCallback(response.message, function () {
                        factories.unAuthorize(response);
                    });
                }
            });
        };

        $scope.listTemplateFunction();

        $scope.sendTemplate = function (data) {
            console.log(data)
            $scope.closemusic();
            var arr = [];
            arr.push($scope.title);
            socket.emit('sendMessage', {
                senderId: $scope.myId,
                receiverId: items.receiverId,
                msgType: 'Template',
                title: items.title,
                text: [],
                categoryId: items.categoryId,
                categoryName: items.categoryName,
                type: 'admin',
                thumbnail: data.imageUrl,
                original: data.imageUrl,
                templateId: data._id
            });

            var msgObj = {
                senderId: $scope.myId,
                htmlUrl: 0,
                msgType: 'Template',
                text: $scope.title,
                timeStamp: new Date(),
                url: {
                    thumbnail: data.imageUrl,
                    original: data.imageUrl
                },
                _id: ''
            };
            $rootScope.descriptionList.chat.push(msgObj);
            $rootScope.status = 'Completed';
        }

    }]);

myApp.controller('profileCtrl', ['$uibModalInstance', 'items', '$scope', '$state', 'services', '$cookies', '$cookieStore', 'factories', 'socket', '$rootScope',
    function ($uibModalInstance, items, $scope, $state, services, $cookies, $cookieStore, factories, socket, $rootScope) {
        $scope.closemusic = function () {
            $uibModalInstance.dismiss('close');
        };

        // $scope.myId = localStorage.getItem('myId');

        console.log('daatatatatatat', items)
        var formData = new FormData();
        formData.append('userId', items);

        var obj = {
            userId: items
        };

        $scope.openProfile = function () {
            services.ProfileService(obj, function (response, status) {
                if (status == 1) {
                    $scope.data = response.data.data[0];
                    console.log('$scope.allData ', $scope.allData)
                    services.datatable('tableId', {});
                    if ($.fn.DataTable.isDataTable('#tableId')) {
                        angular.element('#tableId').DataTable().clear().destroy();
                    }
                }
                else {
                    factories.errorCallback(response.message, function () {
                        factories.unAuthorize(response);
                    });
                }
            });
        };

        $scope.openProfile();


    }]);

myApp.service('services', ['$http', 'Api', '$timeout', '$cookies', function ($http, Api, $timeout, $cookies) {
    return {

        login: function ($scope, callback) {
            $http
            ({
                url: Api.url + '/admin/login',
                method: "POST",
                data: {
                    "email": $scope.user.email,
                    "password": $scope.user.password
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        dashboardService: function (callback) {
            $http
            ({
                url: Api.url + '/admin/getDashBoard',
                method: "GET",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token')
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        getreports: function (days, catId, callback) {
            var data = {
                days: days
            };

            if (catId)
                data.categoryId = catId;

            $http
            ({
                url: Api.url + '/admin/getReports',
                method: "GET",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token')
                },
                params: data
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        reportService: function (callback) {
            $http
            ({
                url: Api.url + '/admin/getReports',
                method: "GET",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token')
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        createCategoryService: function (param_data, callback) {
            var formData = new FormData();
            formData.append('nameEng', param_data.nameEng);
            formData.append('nameArabic', param_data.nameArabic);
            formData.append('image', param_data.image);
            formData.append('icon', param_data.icon);
            $http
            ({
                url: Api.url + '/admin/createCategories',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData

            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        editCategoryService: function (param_data, callback) {
            var formData = new FormData();
            formData.append('_id', param_data._id);
            formData.append('nameEng', param_data.nameEng);
            formData.append('nameArabic', param_data.nameArabic);
            if (param_data.image != undefined) {
                formData.append('image', param_data.image);
            }
            if (param_data.icon != undefined) {
                formData.append('icon', param_data.icon);
            }
            $http
            ({
                url: Api.url + '/admin/updateCategories',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        getCategoryService: function (callback) {
            $http
            ({
                url: Api.url + '/admin/getCategories',
                method: "GET",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token')
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        deleteCategoryService: function (id, callback) {
            var formData = new FormData();
            formData.append('_id', id);
            $http
            ({
                url: Api.url + '/admin/deleteCategories',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        acceptInviService: function (value1, value2, callback) {
            var formData = new FormData();
            formData.append('eventId', value1);
            formData.append('phoneNo', value2);
            formData.append('status', 'Accepted');
            $http
            ({
                url: Api.url + '/admin/actionInvite',
                method: "POST",
                headers: {
                    'Content-Type': undefined
                },
                data: formData
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        rejectInviService: function (value1, value2, callback) {
            var formData = new FormData();
            formData.append('eventId', value1);
            formData.append('phoneNo', value2);
            formData.append('status', 'Rejected');
            $http
            ({
                url: Api.url + '/admin/actionInvite',
                method: "POST",
                headers: {
                    'Content-Type': undefined
                },
                data: formData
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        getEventDescService: function (value1, value2, callback) {
            $http
            ({
                url: Api.url + '/admin/getEventDesc?eventId=' + value1 + '&phoneNo=' + value2,
                method: "GET",
                headers: {
                    'Content-Type': undefined
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        createPackageService: function (param_data, callback) {
            var formData = new FormData();
            formData.append('totalSms', param_data.totalSms);
            formData.append('totalPrice', param_data.totalPrice);
            $http
            ({
                url: Api.url + '/admin/createPackage',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData

            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        editPackageService: function (param_data, callback) {
            var formData = new FormData();
            formData.append('_id', param_data._id);
            formData.append('totalSms', param_data.totalSms);
            formData.append('totalPrice', param_data.totalPrice);
            $http
            ({
                url: Api.url + '/admin/updatePackage',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        getPackageService: function (callback) {
            $http
            ({
                url: Api.url + '/admin/getPackage',
                method: "GET",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token')
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        deletePackageService: function (id, callback) {
            var formData = new FormData();
            formData.append('_id', id);
            $http
            ({
                url: Api.url + '/admin/deletePackage',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        createPromoCodesService: function (param_data, callback) {
            var formData = new FormData();
            formData.append('couponCode', param_data.couponCode);
            formData.append('amount', param_data.amount);
            formData.append('startAt', param_data.startAt);
            formData.append('endAt', param_data.endAt);
            formData.append('amountType', param_data.amountType);
            formData.append('sms', param_data.sms);
            $http
            ({
                url: Api.url + '/admin/addPromoCode',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData

            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        getPromoCodesService: function (callback) {
            $http
            ({
                url: Api.url + '/admin/getAllPromoCodes',
                method: "GET",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token')
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        deletePromoCodesService: function (id, callback) {
            var formData = new FormData();
            formData.append('_id', id);
            $http
            ({
                url: Api.url + '/admin/deletePromoCodes',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        createUserService: function (param_data, callback) {
            var formData = new FormData();
            formData.append('name', param_data.name);
            formData.append('phoneNo', param_data.phoneNo);
            if (param_data.email != undefined) {
                formData.append('email', param_data.email);
            }
            formData.append('password', param_data.password);
            formData.append('dob', param_data.dob);
            formData.append('gender', param_data.gender);
            formData.append('byAdmin', param_data.byAdmin);
            formData.append('loginType', param_data.loginType);
            $http
            ({
                url: Api.url + '/user/signUp',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData

            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        createGaurdService: function (param_data, callback) {
            var formData = new FormData();
            formData.append('name', param_data.name);
            formData.append('phoneNo', param_data.phoneNo);
            if (param_data.email != undefined) {
                formData.append('email', param_data.email);
            }
            formData.append('password', param_data.password);
            formData.append('guard', param_data.guard);
            // formData.append('gender',param_data.gender);
            formData.append('byAdmin', param_data.byAdmin);
            formData.append('loginType', param_data.loginType);
            $http
            ({
                url: Api.url + '/user/signUp',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData

            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },

        blockUnblockEventService: function (param_data, callback) {
            console.log('---------', param_data)

            var formData = new FormData();
            formData.append('eventId', param_data.eventId);
            formData.append('reason', param_data.reason);
            formData.append('status', param_data.status);

            $http
            ({
                url: Api.url + '/admin/blockUnblockEvent',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData

            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },

        editUserService: function (param_data, callback) {
            var formData = new FormData();
            formData.append('name', param_data.name);
            formData.append('phoneNo', param_data.phoneNo);
            if (param_data.email != undefined) {
                formData.append('email', param_data.email);
            }
            formData.append('userId', param_data.userId);
            formData.append('dob', param_data.dob);
            $http
            ({
                url: Api.url + '/user/updateProfile',
                method: "PUT",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData

            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        editGaurdService: function (param_data, callback) {
            var formData = new FormData();
            formData.append('name', param_data.name);
            formData.append('phoneNo', param_data.phoneNo);
            if (param_data.email != undefined) {
                formData.append('email', param_data.email);
            }
            formData.append('userId', param_data.userId);
            // formData.append('gender',param_data.gender);
            $http
            ({
                url: Api.url + '/user/updateProfile',
                method: "PUT",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData

            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        getContactListing: function (id, callback) {
            var data = {};
            data.skip = 0;
            data.limit = id;
            $http
            ({
                url: Api.url + '/admin/getContactUs',
                method: "GET",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                params: data
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        getUsersService: function (obj, start, end, callback) {
            var formData = new FormData();

            if (!!obj) {
                formData.append('skip', obj.skip);
                formData.append('limit', obj.limit);
            }
            if (start) {
                formData.append('from', start);
            }
            if (end)
                formData.append('to', end);

            if (obj && !!obj.search && obj.search.trim() != '')
                formData.append('search', obj.search);

            $http
            ({
                url: Api.url + '/admin/getAllUsers',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        UserBlockerService: function (id, flag, callback) {
            var formData = new FormData();
            formData.append('userId', id);
            formData.append('block', flag);
            $http
            ({
                url: Api.url + '/admin/blockUser',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData

            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        getAdminService: function (callback) {
            $http
            ({
                url: Api.url + '/admin/getAllSubAdmins',
                method: "GET",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token')
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        getImagesService: function (callback) {
            $http
            ({
                url: Api.url + '/admin/getBackgrounds',
                method: "GET",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token')
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        createImageService: function (param_data, callback) {
            console.log('pRAMS', param_data)
            var formData = new FormData();
            formData.append('image', param_data.image);
            $http
            ({
                url: Api.url + '/admin/createBackground',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData

            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        deleteImageService: function (id, callback) {
            var formData = new FormData();
            formData.append('_id', id);
            $http
            ({
                url: Api.url + '/admin/deleteBackground',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        createadvertisementService: function (param_data, lat, lng, address, callback) {
            var formData = new FormData();
            formData.append('lat' , lat)
            formData.append('long' , lng)
            formData.append('address' , address)

            Object.keys(param_data).forEach(function(item){
                if(angular.isDefined(param_data[item]))
               {
                   if(item!='adImageURL')
                   {formData.append(item,param_data[item])}
                else
                {
                    formData.append(item,JSON.stringify(param_data[item]))}
                }
            })

            $http
            ({
                url: Api.url + '/admin/addEditAdvertisements',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData

            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        createPromotionService: function (param_data, lat, lng, address, callback) {
            var formData = new FormData();
            formData.append('lat' , lat)
            formData.append('long' , lng)
            formData.append('address' , address)

            Object.keys(param_data).forEach(function(item){
                if(angular.isDefined(param_data[item]))
                {
                    if(item!='adImageURL')
                    {formData.append(item,param_data[item])}
                    else
                    {
                        formData.append(item,JSON.stringify(param_data[item]))}
                }
            })

            $http
            ({
                url: Api.url + '/admin/addEditPromotions',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData

            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },

        createTemplateService: function (param_data, callback) {
            var formData = new FormData();
            formData.append('categoryId', JSON.stringify(param_data.categoryId));
            formData.append('name', param_data.name);
            formData.append('price', param_data.price);
            formData.append('htmlUrl', param_data.htmlUrl);
            formData.append('imageUrl', param_data.imageUrl);
            formData.append('isPublic', param_data.isPublic);
            formData.append('isCustom', param_data.isCustom);
            $http
            ({
                url: Api.url + '/admin/createTemplate',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData

            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        editTemplateService: function (param_data, callback) {
            var formData = new FormData();
            formData.append('_id', param_data._id);
            formData.append('categoryId', param_data.categoryId);
            formData.append('name', param_data.name);
            formData.append('price', param_data.price);
            formData.append('htmlUrl', param_data.htmlUrl);
            formData.append('isPublic', param_data.isPublic);
            formData.append('isCustom', param_data.isCustom);

            if (param_data.imageUrl != undefined) {
                formData.append('imageUrl', param_data.imageUrl);
            }
            $http
            ({
                url: Api.url + '/admin/updateTemplates',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },

        getTemplateService: function (callback) {
            $http
            ({
                url: Api.url + '/admin/getTemplates',
                method: "GET",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token')
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },

        ProfileService: function (formData, callback) {
            $http
            ({
                url: Api.url + '/admin/getAllUsers',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token')
                },
                data: formData
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },

        deleteTemplateService: function (id, callback) {
            var formData = new FormData();
            formData.append('_id', id);
            $http
            ({
                url: Api.url + '/admin/deleteTemplates',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },

        deleteAdvService: function (id, callback) {
            var formData = new FormData();
            formData.append('_id', id);
            formData.append('isDeleted', true);
            $http
            ({
                url: Api.url + '/admin/addEditAdvertisements',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        deletePromotionService: function (id, callback) {
            var formData = new FormData();
            formData.append('_id', id);
            formData.append('isDeleted', true);
            $http
            ({
                url: Api.url + '/admin/addEditPromotions',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        uploadTemplateImageService: function (param_data, callback) {
            var formData = new FormData();
            formData.append('image', param_data.image);
            $http
            ({
                url: Api.url + '/admin/uploadImageAWS',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData

            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        getadvertisementsService: function (obj, start, end, start1,end1, value3, callback) {
            var eventStat = '/admin/listAdvertisements';

            if (angular.isNumber(obj.skip)) {
                if (value3 == '' || value3 == undefined) {
                    eventStat = eventStat + '?skip=' + obj.skip + '&limit=' + obj.limit;
                }
                else {
                    eventStat = eventStat + '?skip=' + obj.skip + '&limit=' + obj.limit + '&filter=' + value3;
                }
            }

            if (!!obj._id) {
                eventStat = eventStat + '&_id=' + obj._id
            }

            $http
            ({
                url: Api.url + eventStat,
                method: "GET",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token')
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },



        getPromotions: function (obj, start, end, start1,end1, value3, callback) {
            var eventStat = '/admin/listPromotions';

            if (angular.isNumber(obj.skip)) {
                if (value3 == '' || value3 == undefined) {
                    eventStat = eventStat + '?skip=' + obj.skip + '&limit=' + obj.limit;
                }
                else {
                    eventStat = eventStat + '?skip=' + obj.skip + '&limit=' + obj.limit + '&filter=' + value3;
                }
            }

            if (!!obj._id) {
                eventStat = eventStat + '&_id=' + obj._id
            }

            $http
            ({
                url: Api.url + eventStat,
                method: "GET",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token')
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },

        getEventsService: function (obj, start, end, start1,end1, value3, callback) {
            var eventStat = '/admin/getAllEvents';

            if (angular.isNumber(obj.skip)) {
                if (value3 == '' || value3 == undefined) {
                    eventStat = eventStat + '?skip=' + obj.skip + '&limit=' + obj.limit;
                }
                else {
                    eventStat = eventStat + '?skip=' + obj.skip + '&limit=' + obj.limit + '&filter=' + value3;
                }
            }
            if (start && !angular.isNumber(obj.skip)) {
                eventStat = eventStat + '?from=' + start
            }

            if (end && !angular.isNumber(obj.skip))
                eventStat = eventStat + '&to=' + end

            if (start && angular.isNumber(obj.skip)) {
                eventStat = eventStat + '&from=' + start
            }
            if (end && angular.isNumber(obj.skip))
                eventStat = eventStat + '&to=' + end

            if (start1 ) {
                eventStat = eventStat + '&startFrom=' + start1
            }
            if (end1)
                eventStat = eventStat + '&startTo=' + end1

            if (!!obj.userId) {
                eventStat = eventStat + '&userId=' + obj.userId
            }
            $http
            ({
                url: Api.url + eventStat,
                method: "GET",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token')
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },



        getGaurdsService: function (value2, callback) {
            $http
            ({
                url: Api.url + '/admin/getAllGuards?skip=0&limit=' + value2,
                method: "GET",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token')
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        getCategoryListService: function (userId, callback) {
            $http
            ({
                url: Api.url + '/admin/getAllGuards?skip=0&limit=' + value2,
                method: "GET",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token')
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        sendPushService: function (param_data, callback) {
            var formData = new FormData();
            formData.append('body', param_data.Message);
            formData.append('title', param_data.Title);
            formData.append('sendAt', param_data.date);
            $http
            ({
                url: Api.url + '/admin/sendPush',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },

        addinvitee: function (array, id, callback) {
            var data = {
                eventId: id,
                invites: array
            }

            $http
            ({
                url: Api.url + '/admin/addInvites',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: data
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        addguard: function (array, id, callback) {
            var data = {
                eventId: id,
                guardNo: '+' + array[0].phoneNo.toString()
            }

            $http
            ({
                url: Api.url + '/user/assignGuard',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: data
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },


        getDescriptionService: function (obj, callback) {
            $http
            ({
                url: Api.url + '/admin/getRequestDesc',
                method: "GET",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token')
                },
                params: obj
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        getCategoryListsService: function (obj, callback) {
            $http
            ({
                url: Api.url + '/admin/getUserRequests',
                method: "GET",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token')
                },
                params: obj
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        getNotifs: function (callback) {
            $http
            ({
                url: Api.url + '/admin/getScheduledNotifs',
                method: "GET",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token')
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        delNotifs: function (id, callback) {
            var formData = new FormData();
            formData.append('_id', id);
            $http
            ({
                url: Api.url + '/admin/deleteScheduledNotifs',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },

        getMessageListService: function (obj, callback) {
            $http
            ({
                url: Api.url + '/admin/getRequestUsers',
                method: "GET",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                params: obj
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        createSubAdminService: function (param_data, callback) {
            var formData = new FormData();
            formData.append('name', param_data.name);
            formData.append('email', param_data.email);
            formData.append('password', param_data.password);
            formData.append('category', param_data.category);
            formData.append('package', param_data.package);
            formData.append('event', param_data.event);
            formData.append('template', param_data.template);
            formData.append('user', param_data.user);
            formData.append('chat', param_data.chat);
            formData.append('guard', param_data.guard);
            formData.append('promo', param_data.promo);
            $http
            ({
                url: Api.url + '/admin/addSubAdmin',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData

            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        editSubAdminService: function (param_data, callback) {
            var formData = new FormData();
            formData.append('_id', param_data.id);
            // formData.append('name',param_data.name);
            // formData.append('email',param_data.email);
            // formData.append('password',param_data.password);
            formData.append('category', param_data.category);
            formData.append('package', param_data.package);
            formData.append('event', param_data.event);
            formData.append('template', param_data.template);
            formData.append('user', param_data.user);
            formData.append('chat', param_data.chat);
            formData.append('guard', param_data.guard);
            formData.append('promo', param_data.promo);
            $http
            ({
                url: Api.url + '/admin/editSubAdmin',
                method: "POST",
                headers: {
                    'authorization': 'bearer' + " " + $cookies.get('token'),
                    'Content-Type': undefined
                },
                data: formData

            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        datatable: function (id, options) {
            var dtInstance;
            $timeout(function () {
                if (!$.fn.dataTable) return;
                dtInstance = $('#' + id).dataTable(options);
            });
        }
    }
}]);

myApp.factory('factories', ['SweetAlert', '$state', '$cookies', function (SweetAlert, $state, $cookies) {
    return {
        success: function (message) {
            SweetAlert.swal({
                title: message,
                confirmButtonColor: "#106c59",
                type: "success"
            });
        },
        error: function (message) {
            SweetAlert.swal({
                title: message,
                type: "error"
            });
        },
        successCallback: function (message, callback) {
            SweetAlert.swal({
                title: message,
                confirmButtonColor: "#106c59",
                type: "success"
            }, function (isConfirm) {
                if (isConfirm) {
                    callback();
                }
            });
        },
        successImage: function (message, original, thumnail, callback) {

            SweetAlert.swal({
                title: message,
                text: "<h3 style='color:red;'>OrignalImageUrl</h3>" + original + "\n" + "<h3 style='color:red;'>ThumbnailImageUrl</h3>" + thumnail,
                confirmButtonColor: "#106c59",
                html: true,
                type: "success",
                customClass: 'swal-wide',

            }, function (isConfirm) {
                if (isConfirm) {
                    callback();
                }
            });
        },
        errorCallback: function (message, callback) {
            if (message == "Bad token") {
                var mes = "Session Expired Login Again!!";
                SweetAlert.swal({
                    title: mes,
                    type: "error"
                }, function (isConfirm) {
                    if (isConfirm) {
                        callback();
                    }
                });
            }
            else {
                SweetAlert.swal({
                    title: message,
                    type: "error"
                }, function (isConfirm) {
                    if (isConfirm) {
                        callback();
                    }
                });
            }

        },
        confirm: function (message, callback) {
            SweetAlert.swal({
                    title: message,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#1ab394",
                    confirmButtonText: "Yes",
                    closeOnConfirm: false
                },
                function (isConfirm) {
                    if (isConfirm) {
                        callback();
                    }
                }
            );
        },
        confirminvitation: function (message, yestext, notext, callback) {
            SweetAlert.swal({
                    title: message,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#1ab394",
                    confirmButtonText: yestext,
                    cancelButtonText: notext,
                    closeOnConfirm: false
                },
                function (isConfirm) {
                    if (isConfirm) {
                        callback();
                    }
                }
            );
        },


        logoutForm: function (message, callback) {
            SweetAlert.swal({
                    title: message,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#106c59",
                    confirmButtonText: "Yes",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function (isConfirm) {
                    if (isConfirm) {
                        callback();
                    }
                });
        },
        unAuthorize: function (response) {
            if (response.statusCode == 401) {
                $state.go('login');
                $cookies.remove('token');
            }
        }
    }
}]);


myApp.factory('socket', function ($rootScope, Api, $cookies) {
    // var socket = io.connect();
    var socket = io.connect(Api.url, {});
    socket.emit('userAuth', {
        accessToken: $cookies.get('token'),
        type: 'admin'
    });

    socket.on('sendMessage', function (sendMessage) {
        console.log('sendMessage', sendMessage)
        // $rootScope.$broadcast("typing",data);
    });

    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },

        emit: function (eventName, data, callback) {

            // console.log('service',data)
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});



myApp
    .config(config)
    .run(function($rootScope, $state, $uibModalStack, factories, $cookies, $cookieStore,socket) {
        $rootScope.$state = $state;
        $rootScope.logout = function () {
            factories.logoutForm('Do you want to log out ?',function () {
                $state.go('login');
                $cookies.remove('token');
                socket.emit('disconnect');
                factories.success('Logged out successfully');
            });
        };
        $rootScope.superAdminStorage = JSON.parse(localStorage.getItem("superAdmin"));
        $rootScope.$on('$stateChangeStart', function (event) {
            var top = $uibModalStack.getTop();
            if (top) {
                $uibModalStack.dismiss(top.key);
            }
            swal.close();
        })

        socket.on('sendMessage', function (recMsg) {
            console.log('config', recMsg);
            $rootScope.badge = true;
        });

    });

myApp.config(function (ngIntlTelInputProvider) {
    ngIntlTelInputProvider.set({initialCountry: 'us'});
});
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider,RouteHelpersProvider,APP_REQUIRES,$sceProvider) {
    $urlRouterProvider.otherwise("/login");

    $sceProvider.enabled(false);

    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: APP_REQUIRES.modules
    });

    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "views/external/login.html",
            data: { pageTitle: 'Login'},
            controller:'LoginCtrl',
            resolve: RouteHelpersProvider.resolveFor('login-controller')
        })
        .state('invitation', {
            url: "/invitation/:eventId/:phoneNo",
            templateUrl: "views/external/invitation.html",
            data: { pageTitle: 'invitation'},
            controller:'InvitationCtrl',
            resolve: RouteHelpersProvider.resolveFor('invitation-controller')
        })
        .state('parent', {
            abstract: true,
            url: "/parent",
            templateUrl: "views/parent/common/content.html"
        })
        .state('parent.dashboard', {
            url: "/dashboard",
            templateUrl: "views/parent/dashboard.html",
            data: { pageTitle: 'Dashboard' },
            controller:'dashboardCtrl',
            resolve: RouteHelpersProvider.resolveFor('dashboardCtrl-controller', 'ui.select', 'ngFileUpload','bootstrapLightbox','ngTagsInput')
        })
        .state('parent.categories', {
            url: "/categories",
            templateUrl: "views/parent/categories.html",
            data: { pageTitle: 'Categories' },
            controller:'categoriesCtrl',
            resolve: RouteHelpersProvider.resolveFor('categoriesCtrl-controller', 'ui.select', 'ngFileUpload','bootstrapLightbox','ngTagsInput')
        })
        .state('parent.package', {
            url: "/package",
            templateUrl: "views/parent/package.html",
            data: { pageTitle: 'Package' },
            controller:'packageCtrl',
            resolve: RouteHelpersProvider.resolveFor('packageCtrl-controller', 'ui.select', 'ngFileUpload','bootstrapLightbox','ngTagsInput')
        })
        .state('parent.promotions', {
            url: "/promotions",
            templateUrl: "views/parent/promotions.html",
            data: { pageTitle: 'Promotion' },
            controller:'promotionsCtrl',
            resolve: RouteHelpersProvider.resolveFor('promotionsCtrl', 'ui.select', 'ngFileUpload','bootstrapLightbox','ngTagsInput')
        })
        .state('parent.addPromotions', {
            url: "/promotion/:type?:id",
            templateUrl: "views/parent/promotionsadd.html",
            data: { pageTitle: 'Add Promotions' },
            controller:'promotionsaddCtrl',
            resolve: RouteHelpersProvider.resolveFor('promotionsCtrl', 'ui.select', 'ngFileUpload','bootstrapLightbox','ngTagsInput')
        })

        .state('parent.advertisements', {
            url: "/advertisements",
            templateUrl: "views/parent/advertisements.html",
            data: { pageTitle: 'Advertisements' },
            controller:'advertisementsCtrl',
            resolve: RouteHelpersProvider.resolveFor('advertisementsCtrl', 'ui.select', 'ngFileUpload','bootstrapLightbox','ngTagsInput')
        })
        .state('parent.addadvertisements', {
            url: "/advertisement/:type?:id",
            templateUrl: "views/parent/advertisementsadd.html",
            data: { pageTitle: 'Advertisements' },
            controller:'advertisementsaddCtrl',
            resolve: RouteHelpersProvider.resolveFor('advertisementsCtrl', 'ui.select', 'ngFileUpload','bootstrapLightbox','ngTagsInput')
        })


        .state('parent.users', {
            url: "/users",
            templateUrl: "views/parent/user.html",
            data: { pageTitle: 'User' },
            controller:'userCtrl',
            resolve: RouteHelpersProvider.resolveFor('userCtrl-controller', 'ui.select', 'ngFileUpload','bootstrapLightbox','ngTagsInput')
        })
        .state('parent.report-users', {
            url: "/report-users",
            templateUrl: "views/parent/report-users.html",
            data: { pageTitle: 'User' },
            controller:'userCtrl',
            resolve: RouteHelpersProvider.resolveFor('userCtrl-controller', 'ui.select', 'ngFileUpload','bootstrapLightbox','ngTagsInput')
        })
        .state('parent.templates', {
            url: "/templates",
            templateUrl: "views/parent/template.html",
            data: { pageTitle: 'Templates' },
            controller:'templateCtrl',
            resolve: RouteHelpersProvider.resolveFor('templateCtrl-controller', 'ui.select', 'ngFileUpload','bootstrapLightbox','ngTagsInput')
        })
        .state('parent.events', {
            url: "/events?:userId?:userName",
            templateUrl: "views/parent/events.html",
            data: { pageTitle: 'Events' },
            controller:'eventsCtrl',
            resolve: RouteHelpersProvider.resolveFor('eventsCtrl-controller', 'ui.select', 'ngFileUpload','bootstrapLightbox','ngTagsInput')
        })
        .state('parent.report-events', {
            url: "/report-events",
            templateUrl: "views/parent/report-events.html",
            data: { pageTitle: 'Events' },
            controller:'eventsCtrl',
            resolve: RouteHelpersProvider.resolveFor('eventsCtrl-controller', 'ui.select', 'ngFileUpload','bootstrapLightbox','ngTagsInput')
        })
        .state('parent.gaurds', {
            url: "/gaurds",
            templateUrl: "views/parent/gaurds.html",
            data: { pageTitle: 'Gaurds' },
            controller:'gaurdsCtrl',
            resolve: RouteHelpersProvider.resolveFor('gaurdsCtrl-controller', 'ui.select', 'ngFileUpload','bootstrapLightbox','ngTagsInput')
        })
        .state('parent.subadmin', {
            url: "/subadmin",
            templateUrl: "views/parent/subadmin.html",
            data: { pageTitle: 'SubAdmin' },
            controller:'subadminCtrl',
            resolve: RouteHelpersProvider.resolveFor('subadminCtrl-controller', 'ui.select', 'ngFileUpload','bootstrapLightbox','ngTagsInput')
        })
        .state('parent.promo', {
            url: "/promo",
            templateUrl: "views/parent/promo.html",
            data: { pageTitle: 'Promo' },
            controller:'promoCtrl',
            resolve: RouteHelpersProvider.resolveFor('promoCtrl-controller', 'ui.select', 'ngFileUpload','bootstrapLightbox','ngTagsInput')
        })
        .state('parent.image', {
            url: "/image",
            templateUrl: "views/parent/image.html",
            data: { pageTitle: 'Image' },
            controller:'imageCtrl',
            resolve: RouteHelpersProvider.resolveFor('imageCtrl-controller', 'ui.select', 'ngFileUpload','bootstrapLightbox','ngTagsInput')
        })
        .state('parent.notify', {
            url: "/notify",
            templateUrl: "views/parent/notify.html",
            data: { pageTitle: 'Notify' },
            controller:'notifyCtrl',
            resolve: RouteHelpersProvider.resolveFor('notifyCtrl-controller', 'ui.select', 'ngFileUpload','bootstrapLightbox','ngTagsInput')
        })
        .state('parent.chat', {
            url: "/chat",
            templateUrl: "views/parent/chat.html",
            data: { pageTitle: 'chat' },
            controller:'chatCtrl',
            resolve: RouteHelpersProvider.resolveFor('chatCtrl-controller', 'ui.select', 'ngFileUpload','bootstrapLightbox','ngTagsInput')
        })
        .state('parent.feedback', {
            url: "/feedback",
            templateUrl: "views/parent/contact.html",
            data: { pageTitle: 'contact' },
            controller:'contactCtrl',
            resolve: RouteHelpersProvider.resolveFor('contactCtrl-controller', 'ui.select', 'ngFileUpload','bootstrapLightbox','ngTagsInput')
        })
        .state('termsConditions', {
            url: "/termsConditions",
            templateUrl: "views/termsConditions.html",
            data: { pageTitle: 'termsConditions'}
        })
        .state('privacyPolicy', {
            url: "/privacyPolicy",
            templateUrl: "views/privacyPolicy.html",
            data: { pageTitle: 'privacyPolicy'}
        })
        .state('terms', {
            url: "/terms",
            templateUrl: "views/terms.html",
            data: { pageTitle: 'terms'}
        })
}

myApp.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide','$httpProvider','$injector',
    function ( $controllerProvider, $compileProvider, $filterProvider, $provide,$httpProvider,$injector) {
        'use strict';
        myApp.controller = $controllerProvider.register;
        myApp.directive  = $compileProvider.directive;
        myApp.filter     = $filterProvider.register;
        myApp.factory    = $provide.factory;
        myApp.service    = $provide.service;
        myApp.constant   = $provide.constant;
        myApp.value      = $provide.value;
    }]);

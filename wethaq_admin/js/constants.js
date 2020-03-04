myApp.constant("Api", {
    // "url": "http://34.211.166.21:8001" //dev
    // "url": "http://34.211.166.21:8000" //client
    // "url": "http://api.wethaqapp.net" //client\
    "url": "http://34.211.166.21:8000" //client
    // "url": "http://34.211.166.21:8002" //test
});
// git add . && git commit -am "code updated" && git push origin master
// sudo ssh -i wethaq.pem ubuntu@34.211.166.21
// cd /var/www/html/wethaq_admin
// admin@wethaq.com
// Wethaq@template

myApp.constant('APP_REQUIRES', {

    scripts: {
        'login-controller': ['js/controllers/login/login.js'],
        'invitation-controller': ['js/controllers/invitation/invitation.js'],
        'dashboardCtrl-controller': ['js/controllers/dashboard/dashboard.js'],
        'categoriesCtrl-controller': ['js/controllers/categories/categories.js'],
        'packageCtrl-controller': ['js/controllers/package/package.js'],
        'userCtrl-controller': ['js/controllers/user/user.js'],
        'advertisementsCtrl': ['js/controllers/advertisements/advertisements.js'],
        'templateCtrl-controller': ['js/controllers/template/template.js'],
        'eventsCtrl-controller': ['js/controllers/events/events.js'],
        'gaurdsCtrl-controller': ['js/controllers/gaurds/gaurds.js'],
        'subadminCtrl-controller': ['js/controllers/subadmin/subadmin.js'],
        'imageCtrl-controller': ['js/controllers/image/image.js'],
        'notifyCtrl-controller': ['js/controllers/notify/notify.js'],
        'promoCtrl-controller': ['js/controllers/promo/promo.js'],
        'chatCtrl-controller': ['js/controllers/chat/chat.js'],
        'contactCtrl-controller': ['js/controllers/contact/contact.js'],
        'promotionsCtrl': ['js/controllers/promotions/promotions.js']
    },
    // Angular based script
    modules: [
        {
            name: 'ngFileUpload',
            files: ['js/plugins/ng-file-upload/ng-file-upload.min.js']
        },
        {
            name: 'bootstrapLightbox',
            files: ['js/plugins/angular-bootstrap-lightbox/angular-bootstrap-lightbox.min.css',
                'js/plugins/angular-bootstrap-lightbox/angular-bootstrap-lightbox.min.js']
        },
        {
            name: 'thatisuday.ng-image-gallery',
            files: ['js/plugins/imageGallery/imageGallery.css',
                'js/plugins/imageGallery/imageGallery.js']
        },
        {
            name: 'ui.select',
            files: ['js/plugins/angular-ui-select/dist/select.css',
                'js/plugins/angular-ui-select/dist/select.js']
        },
        {
            name:'ngTagsInput',
            files:['bower_components/ng-tags-input/ng-tags-input.css',
                'bower_components/ng-tags-input/ng-tags-input.js']
        },
        {
            name:'daterangepicker',
            files: ['js/plugins/angular-daterange-picker/daterangepicker.js',
                'js/plugins/angular-daterange-picker/angular-daterangepicker.js',
                'js/plugins/angular-daterange-picker/daterangepicker.css']
        }
    ]
});

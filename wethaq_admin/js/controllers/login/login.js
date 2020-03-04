myApp.controller('LoginCtrl', ['$scope','$cookies','services','factories','$state','$loading','socket',
    function ($scope,$cookies,services,factories,$state,$loading,socket) {
    $scope.user = {
        email:'',
        password:''
    };
    $scope.login = function (isValid) {
        if(isValid){
            $loading.start('login');
            services.login($scope,function (response,status) {
                if(status == 1){
                    localStorage.setItem('myId',response.data._id);
                    $cookies.put('token',response.data.accessToken);
                    localStorage.setItem("category", JSON.stringify(response.data.category));
                    localStorage.setItem("chat", JSON.stringify(response.data.chat));
                    localStorage.setItem("event", JSON.stringify(response.data.event));
                    localStorage.setItem("guard", JSON.stringify(response.data.guard));
                    localStorage.setItem("package", JSON.stringify(response.data.package));
                    localStorage.setItem("promo", JSON.stringify(response.data.promo));
                    localStorage.setItem("template", JSON.stringify(response.data.template));
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    localStorage.setItem("superAdmin", JSON.stringify(response.data.superAdmin));

                    $loading.finish('login');
                    $state.go('parent.dashboard');
                    socket.emit('userAuth', {
                        accessToken : $cookies.get('token'),
                        type : 'admin'
                    });
                }
                else {
                    $loading.finish('login');
                    factories.errorCallback(response.message,function () {
                        factories.unAuthorize(response);
                    });
                }
            });
        }
    };
}]);
(function () {
    'use strict';

    angular
        .module('app.core')
        .config(routeConfig);

    routeConfig.$inject = ['$routeProvider']

    function routeConfig($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/home'
            })
            .when('/home', {
                templateUrl: 'app/layout/shell.html'
            })
            .when('/dashboard', {
                templateUrl: 'app/dashboard/dashboard.view.html',
                controller: 'DashboardCtrl'
            })

            .otherwise({ redirectTo: '/' });
    }
})();
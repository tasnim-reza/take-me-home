(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', '$location', 'charDataAnalyser'];

    function DashboardCtrl($scope, $location, charDataAnalyser) {
        $scope.onPressureChange = function () {
            updateChart();
        }

        $scope.onTemperatureChange = function () {
            updateChart();
        }

        function updateChart() {
            console.log('pressure: ', $scope.pressure, ' temperature:', $scope.temperature);
            charDataAnalyser.getChartData($scope.pressure, $scope.temperature).then(function (data) {
                //pass to the directive
            });
        }
    };
})();
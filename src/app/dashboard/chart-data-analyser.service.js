(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .service('charDataAnalyser', charDataAnalyser);

    charDataAnalyser.$inject = ['$http', '$q', '$timeout', '$filter', 'defaultUrl'];

    function charDataAnalyser($http, $q, $timeout, $filter, defaultUrl) {

        this.getChartData = function (pressure, temperature) {
            return readData().then(function (res) {
                console.log(data);

                return data;
            });
        }

        function chanceOfRain(pressure, temperature, amount) {
            var score = Math.log(amount + 1) * Math.log(pressure,929) * Math.log(temperature,9);
            var mean = Math.min(Math.max(score, 0), 100)
            var upperBound = Math.min(1.5 * mean, 100);
            var lowerBound = Math.max(0.5 * mean, 0);
            return [lowerBound, mean, upperBound];
        }

        function readData() {
            var defer = $q.defer();

            //if (isNew || !cached) {
            $http.get(defaultUrl)
                .then(function (data) {
                    //cached = data;
                    defer.resolve(data)
                });
            // } else {
            //     defer.resolve(cached)
            // }

            return defer.promise;

        }
    }
})();
(function () {
    'use strict';
    
    angular
    .module('app.core')
    .constant('defaultUrl', 'http://private­4945e­weather34.apiary­proxy.com/weather34/rain')
    .constant('errorMessages', {
        status404: 'An error has occured, The user doesn\'t exist!.',
        status408: 'An error has occured, Request timed out.',
        general: 'An error has occured.'
    });
})();
(function () {
    'use strict';

    angular
        .module('app.layout')
        .directive('menu', menu);

    menu.$inject = [];

    function menu() {
        return {
            restrict: 'EA',
            link: function (scope, element, attrs, ctrl) {
                var btn = document.querySelector('.navbar-toggle');
                if (btn) {
                    btn.addEventListener('click', onClick);
                }

                function onClick(e) {
                    var menu = document.querySelector('#navBar'),
                        hasClass = false;

                    for (var i = 0; i < menu.classList.length; i++) {
                        if (menu.classList[i] === 'in') {
                            hasClass = true;
                            break;
                        }
                    }
                    

                    if (hasClass) {
                        menu.classList.remove('in')
                    } else {
                        menu.classList.add('in')
                    }
                }
            }
        }
    }
})();
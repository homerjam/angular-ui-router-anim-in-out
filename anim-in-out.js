(function() {
    'use strict';

    angular.module('anim-in-out', ['ngAnimate'])
        .animation('.anim-in-out', ['$timeout',
            function($timeout) {
                return {
                    enter: function(element, done) {
                        var speed = angular.element(element).attr('data-anim-speed') !== undefined ? parseInt(angular.element(element).attr('data-anim-speed')) : 1000;

                        angular.element(element).addClass('anim-in-setup');

                        $timeout(done, speed);
                        return function(cancelled) {

                            angular.element(element).removeClass('anim-in-setup');
                            angular.element(element).addClass('anim-in');

                            if (!cancelled) {
                                angular.element(element).scope().$broadcast('animIn');
                            }
                        };
                    },
                    leave: function(element, done) {
                        var speed = angular.element(element).attr('data-anim-speed') !== undefined ? parseInt(angular.element(element).attr('data-anim-speed')) : 1000;

                        angular.element(element).removeClass('anim-in');
                        angular.element(element).addClass('anim-out');

                        $timeout(done, speed);
                        return function(cancelled) {
                            if (!cancelled) {
                                angular.element(element).scope().$broadcast('animOut');
                            }
                        };
                    }
                };
            }
        ]);

})();

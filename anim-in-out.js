(function() {
    'use strict';

    angular.module('anim-in-out', ['ngAnimate'])
        .animation('.anim-in-out', ['$rootScope', '$timeout',
            function($rootScope, $timeout) {
                return {
                    enter: function(element, done) {
                        var sync = $rootScope.$eval(angular.element(element).attr('data-anim-sync')) !== undefined ? $rootScope.$eval(angular.element(element).attr('data-anim-sync')) : false,
                            speed = angular.element(element).attr('data-anim-speed') !== undefined ? $rootScope.$eval(angular.element(element).attr('data-anim-speed')) : 1000,
                            inSpeed = angular.element(element).attr('data-anim-in-speed') !== undefined ? $rootScope.$eval(angular.element(element).attr('data-anim-in-speed')) : speed;

                        angular.element(element).addClass('anim-in-setup');

                        $timeout(done, sync ? 0 : inSpeed);

                        return function(cancelled) {
                            angular.element(element).removeClass('anim-in-setup');
                            angular.element(element).addClass('anim-in');

                            if (!cancelled) {
                                if (angular.element(element).children().length > 0) {
                                    angular.element(element).children().scope().$broadcast('animIn', element, inSpeed);
                                }

                                $timeout(function(){
                                    $rootScope.$emit('animEnd', element, inSpeed);

                                    angular.element(element).removeClass('anim-in');
                                }, inSpeed);
                            }
                        };
                    },
                    leave: function(element, done) {
                        var speed = angular.element(element).attr('data-anim-speed') !== undefined ? $rootScope.$eval(angular.element(element).attr('data-anim-speed')) : 1000,
                            outSpeed = angular.element(element).attr('data-anim-out-speed') !== undefined ? $rootScope.$eval(angular.element(element).attr('data-anim-out-speed')) : speed;

                        $rootScope.$emit('animStart', element, outSpeed);

                        if (angular.element(element).children().length > 0) {
                            angular.element(element).children().scope().$broadcast('animOut', element, outSpeed);
                        }
                        
                        angular.element(element).removeClass('anim-in');
                        angular.element(element).addClass('anim-out-setup');

                        $timeout(function(){
                            angular.element(element).removeClass('anim-out-setup');
                            angular.element(element).addClass('anim-out');
                        }, 0);

                        $timeout(done, outSpeed);
                    }
                };
            }
        ]);

})();

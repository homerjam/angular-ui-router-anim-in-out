(function() {

    'use strict';

    angular.module('MainCtrl', []).controller('MainCtrl', ['$rootScope', '$scope', '$log',
        function($rootScope, $scope, $log) {
            var ctrl = this;

            ctrl.speed = 500;
            ctrl.mainViewStyle = 'anim-fade';
            ctrl.page1Style = 'anim-zoom-out';
            ctrl.page2Style = 'anim-slide-below-fade';

            $rootScope.$on('animStart', function() {
                $log.log('animStart');
            });

            $rootScope.$on('animEnd', function() {
                $log.log('animEnd');
            });
        }
    ]);

    angular.module('ExampleApp', ['ngAnimate', 'ui.router', 'anim-in-out', 'MainCtrl'])
        .config(['$stateProvider', '$locationProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider',
            function($stateProvider, $locationProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {

                // $locationProvider.html5Mode(true);

                // Allow trailing slashes
                $urlMatcherFactoryProvider.strictMode(false);

                $urlRouterProvider.otherwise('/');

                $stateProvider.state('page1', {
                    url: '/',
                    views: {
                        main: {
                            templateUrl: 'example/page1.html'
                        }
                    }
                });

                $stateProvider.state('page2', {
                    url: '/page2',
                    views: {
                        main: {
                            templateUrl: 'example/page2.html'
                        }
                    }
                });

            }
        ]);

})();

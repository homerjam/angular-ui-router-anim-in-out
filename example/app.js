(function() {

    'use strict';

    angular.module('MainCtrl', []).controller('MainCtrl', ['$scope',
        function($scope) {

            $scope.speed = 500;

            $scope.mainViewStyle = 'anim-fade';

            $scope.page1Style = 'anim-zoom-out';

            $scope.page2Style = 'anim-slide-below-fade';

        }
    ]);

    angular.module('Page1Ctrl', []).controller('Page1Ctrl', ['$scope',
        function($scope) {

            $scope.$on('animIn', function() {
                console.log('Page1Ctrl: animIn');
            });

            $scope.$on('animOut', function() {
                console.log('Page1Ctrl: animOut');
            });

        }
    ]);

    angular.module('Page2Ctrl', []).controller('Page2Ctrl', ['$scope',
        function($scope) {

            $scope.$on('animIn', function() {
                console.log('Page2Ctrl: animIn');
            });

            $scope.$on('animOut', function() {
                console.log('Page2Ctrl: animOut');
            });

        }
    ]);

    angular.module('ExampleApp', ['ngAnimate', 'ui.router', 'anim-in-out', 'MainCtrl', 'Page1Ctrl', 'Page2Ctrl'])
        .config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
            function($stateProvider, $locationProvider, $urlRouterProvider) {

                // $locationProvider.html5Mode(true);

                $urlRouterProvider.otherwise("/");

                // Deal with missing trailing slash
                $urlRouterProvider.rule(function($injector, $location) {
                    var path = $location.path(),
                        search = $location.search();
                    if (path[path.length - 1] !== '/') {
                        if (Object.keys(search).length === 0) {
                            return path + '/';
                        } else {
                            var params = [];
                            angular.forEach(search, function(v, k) {
                                params.push(k + '=' + v);
                            });
                            return path + '/?' + params.join('&');
                        }
                    }
                });

                $stateProvider.state('page1', {
                    url: '/',
                    views: {
                        main: {
                            templateUrl: 'example/page1.html',
                            controller: 'Page1Ctrl'
                        }
                    }
                });

                $stateProvider.state('page2', {
                    url: '/page2/',
                    views: {
                        main: {
                            templateUrl: 'example/page2.html',
                            controller: 'Page2Ctrl'
                        }
                    }
                });

            }
        ]);

})();
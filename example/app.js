angular.module('Page1Ctrl', []).controller('Page1Ctrl', ['$scope',
    function($scope) {

        $scope.$on('animIn', function() {
            console.log('Page1Ctrl: animIn');
        });

    }
]);

angular.module('Page2Ctrl', []).controller('Page2Ctrl', ['$scope',
    function($scope) {

        $scope.$on('animIn', function() {
            console.log('Page2Ctrl: animIn');
        });

    }
]);

angular.module('ExampleApp', ['ui.router', 'ngAnimate', 'anim-in-out', 'Page1Ctrl', 'Page2Ctrl'])
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
        function($stateProvider, $locationProvider, $urlRouterProvider) {

            $locationProvider.html5Mode(true);

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
                        template: '<h1>Page 1</h1>',
                        controller: 'Page1Ctrl'
                    }
                }
            });

            $stateProvider.state('page2', {
                url: '/page2/',
                views: {
                    main: {
                        template: '<h1 class="anim-zoom-in">Page 2</h1>',
                        controller: 'Page2Ctrl'
                    }
                }
            });

        }
    ]);

(function() {
    'use strict';

    angular
        .module('app.product')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/');
    }

    function getStates() {
        return [
            {
                state: 'Home',
                config: {
                    url: '/',
                    templateUrl: 'app/product/product.html',
                    controller: 'Product',
                    controllerAs: 'vm',
                    title: '/',
                    settings: {
                        nav: 1
                    }
                }
            },
            {
                state: 'AboutUs',
                config: {
                    url: '/AboutUs',
                    templateUrl: 'app/aboutus/aboutus.html',
                    controller: 'Product',
                    controllerAs: 'vm',
                    title: '/',
                    settings: {
                        nav: 1
                    }
                }
            },
            {
                state: 'PrivacyPolicy',
                config: {
                    url: '/PrivacyPolicy',
                    templateUrl: 'app/privacy_policy/privacy_policy.html',
                    controller: 'Product',
                    controllerAs: 'vm',
                    title: '/',
                    settings: {
                        nav: 1
                    }
                }
            },
            {
                state: 'TermsConditions',
                config: {
                    url: '/Terms&Conditions',
                    templateUrl: 'app/terms_conditions/terms_conditions.html',
                    controller: 'Product',
                    controllerAs: 'vm',
                    title: '/',
                    settings: {
                        nav: 1
                    }
                }
            }
    
        ];
    }
})();

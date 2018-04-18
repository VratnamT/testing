(function() {
    'use strict';

    angular
        .module('app.product')
        .factory('ProductService', ProductService);
    /* @ngInject */
    function ProductService($http, $location, $q, exception, logger,common,config) {

    	  	var service = {
            sendengEmail: sendengEmail,
            ready: ready
       };
       return service;

         function sendengEmail(request,methodType) {
           var deferred = $q.defer(); //promise
           var jsonData=JSON.stringify(request);
           $http({
               method: methodType,
               // url: 'https://c3qautwra3.execute-api.us-east-1.amazonaws.com/tst/prathanai_create_contact',//testing URL
               url: 'https://zeoh49vf25.execute-api.us-west-2.amazonaws.com/prod/contactus',//Production URL
               data:jsonData,
               headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'}
           }).success(function (data, status, headers, config) {
               deferred.resolve(data);
           }).error(function (data, status, headers, config) {
               deferred.reject(status);
           });
           return deferred.promise;
       }

       function ready(promisesArray) {
           return getReady()
               .then(function() {
                   return promisesArray ? $q.all(promisesArray) : readyPromise;
               })
               .catch(exception.catcher('"ready" function failed'));
       }

       function getReady() {
           if (!readyPromise) {
               // Apps often pre-fetch session data ("prime the app")
               // before showing the first view.
               // This app doesn't need priming but we add a
               // no-op implementation to show how it would work.
               //logger.info('Primed the app data');
               readyPromise = $q.when(service);
           }
           return readyPromise;
       }


    }
})();


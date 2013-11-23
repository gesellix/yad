yadDependencies.push('healthCheck');

var healthCheck = angular.module('healthCheck', []);

healthCheck.controller('healthCheckCtrl', function ($scope) {
  console.log('hello health check ctrl');
});
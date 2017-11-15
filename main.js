global.require = require;

const binary = require('./app/binary');
const shuffler = require('./app/shuffler');

const hex = require('hex-array');

const angular = require('angular');
require('angular-route'); // Install angular-route


const app = angular.module('gob', ['ngRoute']);

app.config(($routeProvider) => {
  $routeProvider
    .when('/', {
      redirectTo: "/search"
    })
    .when('/picture/:address', {
      templateUrl: "templates/picture.html",
      controller: 'PictureController'
    })
    .when('/browse', {
      templateUrl: "templates/browse.html",
      controller: function($scope) {
        $scope.validateAddress = function(address) {
          address = address || '';
          return address.length == 64 && /^[0-9a-fA-F]+$/.test(address);
        }
        $scope.view = function(address) {
          location = '#!/picture/' + address;
        }
      }
    })
    .when('/search', {
      templateUrl: "templates/search.html",
      controller: 'SearchController'
    })
    .when('/about', {
      templateUrl: "templates/about.html"
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.controller('NavController', function($scope, $element) {
  var links = Array.from($element[0].querySelectorAll('a'));
  $scope.$on('$routeChangeSuccess', function(_, route) {
    var path = '#!' + route.$$route.originalPath;
    links.forEach(el => {
      if (el.getAttribute('href') == path) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  })
});

app.controller('PictureController', function($scope, $routeParams) {
  var data = shuffler.decrypt(hex.fromString($routeParams.address));
  $scope.bits = binary.toBits(data);
});

app.controller('SearchController', function($scope) {
  $scope.results = [];
  $scope.bits = new Uint8Array(256);
  $scope.clear = function() {
    $scope.bits = new Uint8Array(256);
  }
  $scope.inverse = function() {
    $scope.bits = $scope.bits.map(el => !el);
  }

  $scope.$watchCollection('bits', bits => {
    var address = hex.toString(shuffler.encrypt(binary.toBytes(bits)));
    $scope.results = [{match: 'Exact match', address: address}];
  });
});

app.controller('SearchResultsController', function($scope, $routeParams) {
  var imgData = $routeParams.data;
  console.log(imgData);
});

app.directive('gobPicture', require('./app/directives/gobPicture'));

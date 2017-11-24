var app = angular.module('ContactsApp', ['ngRoute', 'ngResource']); // Corey - Use the same name used in the ng-app field link in ./index.html

app.config(function ($routeProvider, $locationProvider) { // Corey - If you do not use $locationProvider param, then you would have to include /#! leading your routes ex. /#!/contacts. You also have to add line 20
    $routeProvider
        .when('/contacts', {
            controller: 'ListController',
            templateUrl: 'views/list.html'
        })
        .when('/contacts/new', {
            controller: 'NewController',
            templateUrl: 'views/new.html'
        })
        .when('/contacts/:id', {
            controller: 'SingleController',
            templateUrl: 'views/single.html'
        })
        .otherwise({
            redirectTo: '/contacts'
        });
    $locationProvider.html5Mode(true);
});

app.factory('Contacts', function ($resource) {
    return $resource('/api/contacts/:id', { id: '@id' }, {
        'update': { method: 'PUT' } // Corey - Angular will use a POST method by default, this is just to override and use the PUT method instead
    });
});

app.controller('ListController', function ($scope, Contacts) { // Corey - the $scope defines the scope of the controller, and Contacts definces which factory that you are using.
    $scope.contacts = Contacts.query(); // Corey - this line queries the entire factory and assigns it to contacts to be used in this controller.
});

app.controller('SingleController', function ($scope, Contacts, $routeParams, $location) { // Corey - $routeParams will take in the token :id used in the path on line 13
    var id = parseInt($routeParams.id, 10); // Corey - to verify that it comes in as an integer and not a string

    $scope.contact = Contacts.get({ id: id });

    $scope.update = function () {
        $scope.contact.$update(function(updatedRecord) { // Corey - The update function was what we defined in the factory on line 25.
            $scope.contact = updatedRecord;
        });
    };

    $scope.delete = function() {
        $scope.contact.$delete();
        $location.url('/contacts');
    }
});

app.controller('NewController', function($scope, Contacts, $location) {
    $scope.contact = new Contacts();

    $scope.add = function() {
        $scope.contact.$save();
        $location.url('/contacts');
    }
})
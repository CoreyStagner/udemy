var app = angular.module('ContactsApp', ['ngRoute', 'ngResource']); // Corey - Use the same name used in the ng-app field attr in ./index.html

app.config(function ($routeProvider, $locationProvider) { // Corey - If you do not use $locationProvider param, then you would have to include /#! leading your routes ex. /#!/contacts. You also have to add line 20
    $routeProvider // is part of the ngRoute component
        .when('/contacts', { // Corey - When the $routeProvider hits a route of '/contacts' do the following.
            controller: 'ListController', // Corey - Here we are just choosing what controller will run.
            templateUrl: 'views/list.html' // Corey - This is what template will get used from the public views folder.
        })
        .when('/contacts/new', {// Corey - When the $routeProvider hits a route of '/contacts/new' do the following.
            controller: 'NewController', // Corey - Here we are just choosing what controller will run.
            templateUrl: 'views/new.html' // Corey - This is what template will get used from the public views folder.
        })
        .when('/contacts/:id', {// Corey - When the $routeProvider hits a route of '/contacts/:id' do the following.
            controller: 'SingleController', // Corey - Here we are just choosing what controller will run.
            templateUrl: 'views/single.html' // Corey - This is what template will get used from the public views folder.
        })
        .otherwise({// Corey - When the $routeProvider hits a route other than what has been defined redirect to
            redirectTo: '/contacts' // in this case an already existing route instead of a static link.
        });
    $locationProvider.html5Mode(true); // Corey - this will push history API and tell it not to use /#!/
});

// Corey - This is angulars version of a model.
app.factory('Contacts', function ($resource) {
    return $resource('/api/contacts/:id', { id: '@id' }, { // Corey - Here we are grabbing all of the existing contacts that are on our server.js. In angular { id: @id } the @ sign is saying treat id as text only. nothing else.
        'update': { method: 'PUT' } // Corey - Angular will use a POST method by default, this is just to override and use the PUT method instead
    });
});

app.controller('ListController', function ($scope, Contacts) { // Corey - the $scope defines the scope of the controller, and Contacts definces which factory that you are using.
    $scope.contacts = Contacts.query(); // Corey - this line queries the entire factory and assigns it to contacts to be used in this controller.
});

app.controller('SingleController', function ($scope, Contacts, $routeParams, $location) { // Corey - $routeParams will take in the token :id used in the path on line 13
    var id = parseInt($routeParams.id, 10); // Corey - to verify that it comes in as an integer and not a string

    $scope.contact = Contacts.get({ id: id }); // Corey - this line queries the Contacts to find the specific contact that matches the id that came in as a param.

    $scope.update = function () { // Corey - When on this route we can call this function.
        $scope.contact.$update(function(updatedRecord) { // Corey - The update function was what we defined in the factory on line 25.
            $scope.contact = updatedRecord; // Corey - this changes the scope contact to the updated record that is retreieved back from the browser.
        });
    };

    $scope.delete = function() { // Corey - When on this route we can call this function.
        $scope.contact.$delete(); // Corey - This will run a delete feature
        $location.url('/contacts'); // Corey - This will redirect the the page to the /contacts route.
    }
});

app.controller('NewController', function($scope, Contacts, $location) { // Corey - When you create a 
    $scope.contact = new Contacts(); // Corey - This will create a blank contact and using the template all of the ng-model values will put the correct information where it is needed.

    $scope.add = function() { // Corey - When the button with ng-click='add' 
        $scope.contact.$save(); // Corey - this will push this contact to our factory
        $location.url('/contacts'); // Corey - This will redirect to route /contacts
    }
})
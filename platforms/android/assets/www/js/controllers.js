angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {

  $scope.loginData = {
    id: 1
  };

  $scope.loggedIn =  true;

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.doRegistration = function() {
    $http({
      method: 'post',
      url: 'http://localhost:3000/api/users/',
      data: {
        user_name: 'test',
        email: 'test@test',
        password: 'test'
      }
    }).then(function(response) {
      console.log('success');
      console.log(response);
    }, function(response) {
      console.log('fail');
      console.log(response);
      //add something clever here
    });
  };

  $scope.doLogin = function() {
    //handle the actual login... api
    console.log('Doing login', $scope.loginData);
    //
    $http({
      method: 'get',
      url: 'http://localhost:3000/api/users/login',
      data: {
        user_name: 'flo',
        password: '123'
      }
    }).then(function(response) {
      console.log(response);
    }, function(response) {
      console.log('fail');
      console.log(response);
    });
  };

  $scope.doLogout = function() {
    console.log('logging out', $scope.loginData);

    $scope.loginData = {};

    $scope.loggedIn = false;

  };
})

.controller('OutfitsCtrl', function($scope, $stateParams, $http) {
  //how to move stateparams back to the detail page...
  $scope.id = $stateParams.id;

  $scope.outfits = [];

  $scope.init = function() {
    $scope.doOutfitsRequest();
  };

  $scope.doOutfitsRequest = function() {
    $http({
      method: 'get',
      url: 'http://localhost:3000/api/outfits/'
    }).then(function(response) {
      console.log(response.data);
      $scope.outfits = _.filter(response.data, function(outfit) {
        console.log($scope.loginData);
        console.log(outfit.id);
        return outfit.id != $scope.loginData.id;
      });
    }, function(response) {
      console.log('fail');
      console.log(response);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  };

  $scope.doOutfitRequest = function() {
    $http({
      method: 'get',
      url: 'http://localhost:3000/api/outfits/' + $stateParams.id
    }).then(function(response) {
      console.log(response);
    }, function(response) {
      console.log('fail');
      console.log(response);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  };
})

.controller('PictureCtrl', function($scope, $http) {

  $scope.add = function(){
    var f = document.getElementById('upload').files[0],
        r = new FileReader();
    r.onloadend = function(e){
      var data = e.target.result;
      console.log(data);
      //send you binary data via $http or $resource or do anything else with it
    };
    r.readAsBinaryString(f);
  }

});

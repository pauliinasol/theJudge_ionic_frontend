angular.module('starter.controllers', ['naif.base64'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {

  if (!$scope.loginData) {
    $scope.loginData = {};
  }

  $scope.loggedIn = false;

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
        email: $scope.loginData.email,
        user_name: $scope.loginData.user_name,
        password: $scope.loginData.password
      }
    }).then(function(response) {
      console.log('success');
      $scope.loginData.id = response.data.id;
      $scope.loginData.user_name = response.data.user_name;
    }, function(response) {
      console.log('fail');
      //TODO: add fail case.
    });
  };

  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $http({
      method: 'post',
      url: 'http://localhost:3000/api/users/login',
      data: {
        email: $scope.loginData.email,
        password: $scope.loginData.password
      }
    }).then(function(response) {
      $scope.loginData.id = response.data.id;
      $scope.loginData.user_name = response.data.user_name;
      $scope.loggedIn =  true;
      $scope.closeLogin();
    }, function(response) {
      console.log('fail');
      console.log(response);
    });
  };

  $scope.doLogout = function() {
    console.log('logging out', $scope.loginData);
    $scope.loginData = {};
    $scope.loggedIn = false;
    $scope.closeLogin();

  };
})

.controller('OutfitsCtrl', function($scope, $stateParams, $http) {
  //how to move stateparams back to the detail page...
  $scope.id = $stateParams.id;

  $scope.outfits = [];

  $scope.myOutfits = [];

  $scope.outfit = '';

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
        console.log($scope.loginData.id);
        console.log(outfit.user_id);
        return outfit.user_id != $scope.loginData.id;
      });
      console.log($scope.outfits);
    }, function(response) {
      console.log('fail');
      console.log(response);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  };

  $scope.doMyOutfitsRequest = function() {
    $http({
      method: 'get',
      url: 'http://localhost:3000/api/outfits/'
    }).then(function(response) {
      console.log(response.data);
      $scope.myOutfits = _.filter(response.data, function(outfit) {
        return outfit.user_id == $scope.loginData.id;
      });
    }, function(response) {
      console.log('fail');
      console.log(response);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  };

  $scope.doOutfitRequest = function() {
    console.log('gotrun');
    $http({
      method: 'get',
      url: 'http://localhost:3000/api/outfits/' + $stateParams.id
    }).then(function(response) {
      console.log(response);
      $scope.outfit = response.data;
    }, function(response) {
      console.log('fail');
      console.log(response);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  };
})

.controller('PictureCtrl', function($scope, $http) {

  $scope.file = {};

  $scope.add = function (e, reader, file, fileList, fileObjects, fileObj) {
    $scope.file = fileObj;
  };

  $scope.upload = function() {
    console.log($scope.loginData);
    $http({
      method: 'post',
      url: 'http://localhost:3000/api/outfits/',
      data: {
        base64: $scope.file.base64,
        user_id: $scope.loginData.id
      }
    }).then(function(response) {
      console.log(response);

    }, function(response) {
      console.log('fail');
      console.log(response);
      //give error message to user
    });
  };

});

angular.module('EMS.loginCtrl', ['LocalStorageModule'])

.controller('LoginController', function ($scope,
                                         $location,
                                         authenticationService,
                                         localStorageService) {

    $scope.register = function () {
        authenticationService.registrationPopUp();
    };

    $scope.login = function ()  {

        authenticationService.userLogin($scope.user.userName, $scope.user.password, function(response) {

            if(response.success) {
                $location.path('/employee-details');
            } else {
                $scope.loginError = response.message;
            }
        });
        $scope.user.userName = $scope.user.password = "";
    };
 });

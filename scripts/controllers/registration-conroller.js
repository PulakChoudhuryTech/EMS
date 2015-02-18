angular.module('EMS.registrationCtrl', [
    'kendo.directives',
    'LocalStorageModule'])

.controller('RegistrationController', function ($scope,
                                                authenticationService,
                                                localStorageService) {

    $scope.init = function () {

        $scope.saved = localStorage.getItem('userDetails');
        $scope.userData = (localStorage.getItem('userDetails')!==null) ? JSON.parse($scope.saved) : [];
        localStorage.setItem('userDetails', JSON.stringify($scope.userData));

        $scope.user = {};
    };

    $scope.registerUser = function () {

        $scope.userData.push({
            name: $scope.user.userName,
            password: $scope.user.password,
            email: $scope.user.email,
            contact: $scope.user.contact
        });
        $scope.user.userName = $scope.user.password = $scope.user.confirnPassword =
        $scope.user.email = $scope.user.contact = '';

        localStorage.setItem('userDetails', JSON.stringify($scope.userData));

        $(".userRegistration").data("kendoWindow").close();
    };
    $scope.init();
});

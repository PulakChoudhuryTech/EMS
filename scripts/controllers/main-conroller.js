angular.module('EMS.mainCtrl', [
    'kendo.directives',
    'LocalStorageModule'])

.controller('EMS-Controller', function ($scope, $window, $location, authenticationService, localStorageService) {
    $window.magic = "see the magic";
    $scope.init = function () {

        $scope.content = headerContent;

        $scope.user = authenticationService.userName;
        $scope.user.name = $window.sessionStorage.getItem("id");

        var userSession = "";
    };

    $scope.logout = function () {

        $scope.user = "";
        $scope.message = "";
        $window.sessionStorage.removeItem("id");
    };
    $scope.userAccess = function (path) {

        userSession = $window.sessionStorage.getItem("id");
        if (userSession  === null || userSession  === "" ) {
            $('.userAuthentication').data("kendoWindow").open();
        } else {
            $location.path('/'+path);
        }
    };
    $scope.init();
});

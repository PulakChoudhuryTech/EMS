angular.module('EMS.authenticationService', [
   'kendo.directives',
   'LocalStorageModule'])

.service('authenticationService', function ($location, $window, $state, localStorageService) {

    this.registrationPopUp = function () {
        $('.userRegistration').data("kendoWindow").open();
    };

    this.saved = localStorage.getItem('userDetails');
    this.userName = {};
    this.welcomeName="";

    this.sessionCheck = function () {
        var session = this.userName.name;
        if(session === null) {
            $state.go('home');
        }
    };

    this.userLogin = function (username, password, callback) {

        for(var index = 0; index < (JSON.parse(this.saved)).length; index++) {

            var response = { success: username === (JSON.parse(this.saved))[index].name && password === (JSON.parse(this.saved))[index].password };
            if( !response.success) {
                response.message = "invalid user name or password";
            } else {
                this.welcomeName="welcome, " + username;
                $window.sessionStorage.setItem("id", this.welcomeName);
                this.userName.name =  $window.sessionStorage.getItem("id");
            }
            callback(response);
        }
    };
});


var app = angular.module('EMS', [
    'ui.router',
    'EMS.companyCtrl',
    'EMS.employeeCtrl',
    'EMS.registrationCtrl',
    'EMS.loginCtrl',
    'EMS.mainCtrl',
    'EMS.notificationService',
    'EMS.customGridService',
    'EMS.authenticationService',
    'EMS.companyService',
    'EMS.zoomContentDirective',
    'EMS.contentSlideDirective',
    'EMS.customValidateDirective',
    'EMS.customWindowDirective']);

var headerContent = {
   'mainImage'      : '../assets/image/ems.png',
   'errorIcon'      : '../assets/image/error.png',
   'menuImage'      : '../assets/image/menu_icon1.png',
   'companyImage'   : '../assets/image/company.png',
   'empImage'       : '../assets/image/user.gif'
};

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/home");

    $stateProvider
    .state('home', {
        url:'/home',
        templateUrl:'home.html'
    })
    .state('employee', {
        url:'/employee-details',
        templateUrl:'employee.html'
    })
    .state('company', {
        url:'/company-details',
        templateUrl:'company.html'
    })
    .state('company-pie', {
        url:'/company-pie',
        templateUrl:'company-pie.html'
    })
    .state('employee-profile', {
        url:'/employee-profile',
        templateUrl:'employee-profile.html'
    });

});

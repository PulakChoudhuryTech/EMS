angular.module('EMS.customValidateDirective', ['kendo.directives'])

.directive("customValidate", function ($parse) {

    return {
        restrict:  "A",
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            scope.getErrorMessage = function (item, message) {
                if (item.$error.required && item.$dirty) {
                    return "required";
                } else if (item.$error.pattern || item.$error.email || item.$error.url) {
                    return message;
                }
            };
            //Password match
            var checker = function () {

                var password = scope.$eval(attrs.customValidate);
                var confirmPassword = scope.$eval(attrs.ngModel);
                return confirmPassword == password;
            };
            // scope.$watch(checker, function (n) {
            //     ctrl.$setValidity("match", n);
            // });
        }
    };
});

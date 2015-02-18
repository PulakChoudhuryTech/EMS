angular.module('EMS.customWindowDirective', ['kendo.directives'])
.directive('customPopup',function($compile) {
    return {
        restrict:   'E',
        replace:    true,
        transclude: true,
		templateUrl: '../views/custom.html',
		 scope:      {
            title    :  '=',
            width    :  '=',
            height   :  '=',
            name     :  '=',
            visible  :  '=',
            options  :  '=',
			content :  	'='

        },
        link: function (scope, element, attrs) {
        }
    };
});

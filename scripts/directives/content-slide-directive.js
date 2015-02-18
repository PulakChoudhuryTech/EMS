angular.module('EMS.contentSlideDirective', ['kendo.directives'])
.directive("contentSlide", function () {

    return {
        restrict: "A",
        scope: true,
        link: function(scope, element, attrs) {
            element.mouseenter(function () {
                $( "#leftContentPane" ).animate({width: 'toggle'});
            });
            $(document).click(function(e) {

                if(e.target.id != 'leftContentPane') {
                    $("#leftContentPane").hide(500);
                }
            });
        }
    };
});

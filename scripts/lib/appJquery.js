$(document).ready(function(){

    $("#companies").hover(function() {
                kendo.fx(this).zoom("in").startValue(1).endValue(2).play();
            }, function() {
                kendo.fx(this).zoom("out").endValue(1).startValue(2).play();
    });
});

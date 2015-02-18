angular.module('EMS.notificationService', ['kendo.directives'])

.service('notificationService', function () {

    this.successNotification = function (value) {
        var notification = $("#notification").data("kendoNotification");
        notification.show({
                            message: value,
                        }, "upload-success");
        };

    this.errorNotification = function (value) {
        var notification = $("#notification").data("kendoNotification");
        notification.show({
                            message: value,
                        }, "error");
        };

});

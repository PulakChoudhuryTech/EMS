angular.module('EMS.customGridService', ['kendo.directives'])

.service('gridService', function () {

    this.GridDataBound = function (e) {
        var grid = e.sender;
        if (grid.dataSource.total() === 0) {
            var colCount = grid.columns.length;
            $(e.sender.wrapper)
            .find('tbody')
            .append('<tr class="kendo-data-row"><td colspan="' + colCount + '" class="no-data"><img src="../assets/image/sorry.png" style="height: 140px; margin-left:20%;"/></td></tr>');
        }
    };
});

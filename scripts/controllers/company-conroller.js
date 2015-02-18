angular.module('EMS.companyCtrl', [
    'kendo.directives',
    'LocalStorageModule',
    'kendo.window'])

.controller("CompanyController", function ($scope,
                                           $http,
                                           $timeout,
                                           $state,
                                           companyService,
                                           gridService,
                                           localStorageService,
                                           authenticationService,
                                           notificationService,
                                           $kWindow) {

    var companyRecord = localStorage.getItem('companyDetails');
    companyRecord = (localStorage.getItem('companyDetails') !== null) ? JSON.parse(companyRecord) : [];
    localStorage.setItem("companyDetails", JSON.stringify(companyRecord));

    var clearCompanyData = function() {
        $scope.company ={};
    };

    $scope.init = function () {

        companyService.someFunc();

        $scope.addVisible    = true;
        $scope.updateVisible = false;

        $scope.company = {};

        $scope.companyGridDataBound =  gridService.GridDataBound;

        $scope.countryOptions = companyService.countryArray;

        $scope.companyList = {
            dataSource: $scope.companyOptions
        };

        $scope.companyCountData = new kendo.data.DataSource({

            transport: {
                read: function (options) {
                    var data = companyService.companyCountList();
                    options.success(data);
                },
            }
        });

    };

    $scope.companyGridData = new kendo.data.DataSource({

        transport: {
            read: function (options) {
            var localData = JSON.parse(localStorage.getItem("companyDetails"));

            $timeout(function() {
                $scope.companyDataList = companyService.getSomething();
                angular.forEach(localData, function(element) {
                    $scope.companyDataList.push(element);
                });
                options.success($scope.companyDataList);
            }, 0);
            },
        },
        pageSize : 5
    });

    $scope.companySubmit = function () {

        var success = function () {

            var localData = JSON.parse(localStorage.getItem("companyDetails"));

            localData.push($scope.company);
            localStorage.setItem("companyDetails", JSON.stringify(localData));
            companyService.companyArray.push($scope.company.name);
            notificationService.successNotification("Added Successfully");
        };

        var error = function () {
            notificationService.errorNotification("Company already exist");
        };

        companyService.companyExistCheck($scope.company.name, success, error);
        clearCompanyData();
    };

    $scope.deleteCompanyRecord = function (data) {

        $scope.deleteRecord = function () {

            var deleteIndex = 0;
            angular.forEach(companyRecord, function(element) {

                if(data.name === element.name) {

                    companyRecord.splice(deleteIndex, 1);
                    localStorage.setItem("companyDetails", JSON.stringify(companyRecord));
                    notificationService.successNotification("Deleted Successfully");

                    $scope.companyGridData.remove(data);
                    $scope.editCompanyPopUp.close();
                }
                deleteIndex++;
            });
        };
        $scope.undoDelete = function () {
            $scope.editCompanyPopUp.close();
        };
    };

    $scope.editCompany = function (dataItem) {

        $scope.updateVisible = true;
        $scope.addVisible = false;

        // $scope.popuptitle = "Update Company";
        // $scope.updateCompanyPopUp.title($scope.popuptitle);
        // $scope.content="../views/company-form.html";
        // var selectedRows = this.select();
        // dataItem = this.dataItem(selectedRows[0]);
        //$scope.company = dataItem;
        // $kWindow.open({
        //                 modal: true,
        //                 title: "Update Company",
        //                 width: 600,
        //                 center: true,
        //                 templateUrl: '../views/company-form.html',
        //                 controller: 'CompanyController',
        //                 resolve: {
        //                     data: function () {
        //                         return dataItem;
        //                     }
        //                 }
        //             });

        $scope.company = dataItem;
        var index = $scope.companyGridData.indexOf(dataItem);

        $scope.companyUpdate = function () {

            companyRecord.splice(index, 1, $scope.company);
            localStorage.setItem("companyDetails", JSON.stringify(companyRecord));
            notificationService.successNotification("Updated Successfully");

            clearCompanyData();
            $scope.updateCompanyPopUp.close();

            $scope.updateVisible = false;
            $scope.addVisible = true;
        };
    };
    //Grid Filter
    $scope.searchCompanyRecord = function () {

        $scope.companyGridData.filter(
                                {
                                logic: "or",
                                filters: [
                                        {
                                            "field": "name",
                                            "operator": "contains",
                                            "value": $scope.searchText
                                        },
                                        {
                                            "field": "address",
                                            "operator": "contains",
                                            "value": $scope.searchText
                                        },
                                        {
                                            "field": "ceo",
                                            "operator": "contains",
                                            "value": $scope.searchText
                                        },
                                        {
                                            "field": "state",
                                            "operator": "contains",
                                            "value": $scope.searchText
                                        },
                                        {
                                            "field": "country",
                                            "operator": "contains",
                                            "value": $scope.searchText
                                        },
                                        {
                                            "field": "pin",
                                            "operator": "contains",
                                            "value": $scope.searchText
                                        },
                                        {
                                            "field": "contact",
                                            "operator": "contains",
                                            "value": $scope.searchText
                                        }
        ]});
     };
    $scope.init();
    authenticationService.sessionCheck();
});

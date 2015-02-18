angular.module('EMS.companyService', [
   'kendo.directives',
   'LocalStorageModule'])

.service('companyService', function ($http, $timeout) {

    this.companyArray = [];
    this.companyCount = [];

    var companyRecord = localStorage.getItem('companyDetails');
    companyRecord = (localStorage.getItem('companyDetails') !== null) ? JSON.parse(companyRecord) : [];
    localStorage.setItem("companyDetails", JSON.stringify(companyRecord));

    for(var i = 0; i < companyRecord.length ; i++) {
        this.companyArray.push(companyRecord[i].name);
    }

    var employeeRecord = localStorage.getItem('employeeDetails');
    employeeRecord = (localStorage.getItem('employeeDetails') !== null) ? JSON.parse(employeeRecord) : [];
    localStorage.setItem("employeeDetails", JSON.stringify(employeeRecord));

    this.companyExistCheck = function (companyName, success, error) {

        var localData = JSON.parse(localStorage.getItem("companyDetails"));

        for( var  searchIndex =0; searchIndex < localData.length; searchIndex++) {
            if(localData[searchIndex].name.toUpperCase() === companyName.toUpperCase()) {
                return error();
            }
        }
        return success();
    };

    var something = [];
    this.someFunc  = function () {

        $http.get("/data/company-list.json")
          .success(function(response) {
              something = response;
          });
    };

    this.getSomething = function () {
        return something;
    };

    this.companyCountList = function () {

        var localData = JSON.parse(localStorage.getItem("companyDetails"));

        var temp = [];
        angular.forEach(localData, function(element) {
            temp.push({name: element.name, count: 0});
        });
        for(var index = 0; index < employeeRecord.length; index++) {
            for(var matchedIndex = 0; matchedIndex < temp.length; matchedIndex++) {
                if(temp[matchedIndex].name === employeeRecord[index].company) {
                    temp[matchedIndex].count +=  1;
                }
            }
        }
        return temp;
    };

    this.countryArray = {
        dataTextField: 'name',
        dataValueField: 'value',
        headerTemplate: '<span>Select Country</span>',
        valueTemplate: '<img class="selected-value" src="../assets/image/{{dataItem.name}}.jpg" style="width:25px;height:20px;"><span style="margin-left:5px;"><strong>{{dataItem.name}}<strong></span>',
        template : '<img class="selected-value" src="../assets/image/{{dataItem.name}}.jpg"><span class="k-state-default"><strong>{{dataItem.name}}</strong></span>',
        dataSource: {
            transport: {
                read: {
                    dataType: "json",
                    url: "/data/country-list.json",
                },
            }
        }
    };
});

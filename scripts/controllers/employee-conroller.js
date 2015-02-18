angular.module('EMS.employeeCtrl', [
    'kendo.directives',
    'LocalStorageModule',
    'kendo.window'
    ])

.controller("EmployeeController", function ($scope,
                                            $state,
                                            $window,
                                            $timeout,
                                            $http,
                                            companyService,
                                            gridService,
                                            notificationService,
                                            authenticationService,
                                            $kWindow
                                            ) {

    var employeeRecord = localStorage.getItem('employeeDetails');
    employeeRecord= (localStorage.getItem('employeeDetails') !== null) ? JSON.parse(employeeRecord) : [];
    localStorage.setItem("employeeDetails", JSON.stringify(employeeRecord));

    var employeeProfileDetails = localStorage.getItem('employeeProfile');
    employeeProfileDetails = (localStorage.getItem('employeeProfile') !== null) ? JSON.parse(employeeProfileDetails) : [];
    localStorage.setItem("employeeProfile", JSON.stringify(employeeProfileDetails));

    //$scope.viewer = pdf.Instance("viewer");
    //$scope.pdfUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/149125/relativity.pdf';
    // $scope.viewResume = function (dataItem) {
    //
    //     var windowInstance = $kWindow.open({
    //                         modal: true,
    //                         title: "Update Company",
    //                         width: 600,
    //                         center: true,
    //                         templateUrl: '../views/employee-form.html',
    //                         controller: 'modalController',
    //                         resolve: {
    //                             data: function () {
    //                                 return dataItem;
    //                             }
    //                         }
    //                     });
    //     windowInstance.result.then(function () {alert();});
    // };
    $scope.init = function () {

        $scope.formUrl = 'employee-form.html';

        $scope.updateVisible = false;
        $scope.addVisible    = true;

        $scope.profile = {};
        var defaultProfileValue = {};

        $scope.employeeGridDataBound = gridService.GridDataBound;

        $scope.employeeImageArray= [];

        $scope.employee = {};

        $scope.languageList = {
            dataTextField: 'name',
            dataValueField : 'value',
            dataSource : {
                            transport: {
                                read: {
                                    dataType: "json",
                                    url: "/data/language-list.json",
                                }
                            }
                        }
        };

        $scope.selectSkills = {
            dataTextField: 'skills',
            dataValueField : 'skills',
            dataSource : {
                            transport: {
                                read: {
                                    dataType: "json",
                                    url: "/data/skill-set-list.json",
                                }
                            }
                        }
        };

        $scope.projectList = {
            dataTextField: 'project',
            dataValueField : 'project',
            dataSource : {
                            transport: {
                                read: {
                                    dataType: "json",
                                    url: "/data/project-list.json",
                                }
                            }
                        }
        };

        /* Retrieves Project Status percentage*/
        $http.get("/data/project-list.json")
        .success(function(response) {
            $scope.projectCompletedStatus = response;
        });
    };

    $scope.retrieveEmployeeImageOnLoad = function () {

        angular.forEach(employeeRecord, function(value) {

            if(value.url === undefined) {
                value.url = (value.sex == "female") ? "../assets/image/user_female.png" : "../assets/image/user_male.png";
            }
            $scope.employeeImageArray.push({"image": value.url,"name": value.firstName});
        });
    };

    $scope.onImageSelect = function(event) {

        var input = event.target;
     	var reader = new FileReader();

     	reader.onload = function(){

            $timeout(function() {
                $scope.employee.url = reader.result;
             });
     	};
     	reader.readAsDataURL(input.files[0]);
    };

    var clearProfile = function () {

        $scope.profile = {};
        $scope.profile.dob = '';
        $scope.profile.selectedSkills = '';
        $scope.profile.bio = '';
        $scope.profile.experience = '';
        $scope.workingProjectList = new kendo.data.DataSource({
            data:[]
        });
        $scope.profile.project = '';
    };

    $scope.selectedEmployeeName = function () {

        clearProfile();
        $scope.profile.name = $scope.selectedEmployee;
        for(var searchIndex = 0; searchIndex < employeeRecord.length; searchIndex++) {

            if($scope.profile.name === (employeeRecord[searchIndex].firstName) + " " + (employeeRecord[searchIndex].lastName)) {
                $scope.empComp = employeeRecord[searchIndex].company;
                $scope.empEmail = employeeRecord[searchIndex].email;
                $scope.empImage = employeeRecord[searchIndex].url;
            }

            if(searchIndex < employeeProfileDetails.length) {

                if($scope.profile.name === employeeProfileDetails[searchIndex].name) {

                    $scope.profile = employeeProfileDetails[searchIndex];
                    defaultProfileValue = angular.copy(employeeProfileDetails[searchIndex]);

                    $scope.workingProjectList = new kendo.data.DataSource({
                        data: employeeProfileDetails[searchIndex].project
                    });
                }
            }
        }
    };

    $scope.cancelProfile = function () {
        angular.copy(defaultProfileValue, $scope.profile);
    };

    $scope.employeeProfileUpdate = function () {

        var flag = 0;
        var index;
        var employeeProfileData = JSON.parse(localStorage.getItem("employeeProfile"));

        for(index = 0; index < employeeProfileData.length; index++) {

            if(employeeProfileData[index].name === $scope.selectedEmployee) {

                flag = 1;
                break;
            }
        }
        if(flag == 1) {
            employeeProfileData.splice(index, 1, $scope.profile);
            localStorage.setItem("employeeProfile", JSON.stringify(employeeProfileData));
            notificationService.successNotification("Profile has been updated Successfully");
        } else {
            employeeProfileData.push($scope.profile);
            localStorage.setItem("employeeProfile", JSON.stringify(employeeProfileData));
            notificationService.successNotification("Profile for " + $scope.profile.name+" added Successfully");
        }
    };


    $scope.getProjectStatus = function () {

        angular.forEach($scope.projectCompletedStatus, function(key) {
                if(key.project === $scope.projectSelected) {
                    $scope.projectCompletedValue = key.completedStatus;
                }
        });
    };

    var clearEmployeeData = function () {
        $scope.employee = {};
    };

    $scope.retrieveCompanyAndCountryList = function () {

        $scope.employee = {};
        $scope.companyOptions = companyService.companyArray;
        $scope.countryOptions = companyService.countryArray;

        $scope.companyList = {
            dataSource: $scope.companyOptions
        };
    };

    $scope.retrieveEmployeeList = function () {

        $scope.employeeListArray = [];
        for(var empListIndex = 0; empListIndex < employeeRecord.length; empListIndex++) {
            $scope.employeeListArray.push(employeeRecord[empListIndex].firstName + " " + employeeRecord[empListIndex].lastName);
        }

        $scope.employeeList = {
            dataSource: $scope.employeeListArray
        };
    };

    $scope.employeeGridData = new kendo.data.DataSource({

        transport: {
            read: function (options) {
                var localData = JSON.parse(localStorage.getItem("employeeDetails"));
                options.success(localData);
            },
        },
        pageSize : 5
    });

    $scope.employeeSubmit = function () {

        var localData = JSON.parse(localStorage.getItem("employeeDetails"));

        localData.push($scope.employee);

        localStorage.setItem("employeeDetails", JSON.stringify(localData));

        clearEmployeeData();
        notificationService.successNotification("Added Successfully");
    };

    $scope.editEmployee = function (dataItem) {

        $scope.updateVisible = true;
        $scope.addVisible = false;

        $scope.employee = dataItem;
        var updateIndex = $scope.employeeGridData.indexOf(dataItem);

        $scope.updateEmployee = function() {

            var employeeUpdateToProfile = JSON.parse(localStorage.getItem("employeeProfile"));

            for(var index = 0; index < employeeUpdateToProfile.length; index++) {

                if(employeeUpdateToProfile[index].name == employeeRecord[updateIndex].firstName + " " + employeeRecord[updateIndex].lastName) {

                    employeeUpdateToProfile[index].name = $scope.employee.firstName + " " + $scope.employee.lastName;
                    localStorage.setItem("employeeProfile", JSON.stringify(employeeUpdateToProfile));
                }
            }
            employeeRecord.splice(updateIndex, 1, $scope.employee);
            localStorage.setItem("employeeDetails", JSON.stringify(employeeRecord));
            notificationService.successNotification("Updated Successfully");

            $scope.updateEmployeePopUp.close();
            clearEmployeeData();
            $scope.updateVisible = false;
            $scope.addVisible = true;
        };
    };

    $scope.deleteEmployeeRecord = function (data) {

        $scope.deleteRecord = function () {

            var deleteIndex = $scope.employeeGridData.indexOf(data);

            for(var index = 0; index < employeeProfileDetails.length; index++) {

               if(employeeProfileDetails[index].name == employeeRecord[deleteIndex].firstName + " " + employeeRecord[deleteIndex].lastName) {

                  employeeProfileDetails.splice(index, 1);
                  localStorage.setItem("employeeProfile", JSON.stringify(employeeProfileDetails));
               }
            }
            employeeRecord.splice(deleteIndex, 1);
            localStorage.setItem("employeeDetails", JSON.stringify(employeeRecord));
            notificationService.successNotification("Deleted Successfully");

            $scope.employeeGridData.remove(data);
            $scope.editEmployeePopUp.close();
        };

        $scope.undoDelete = function () {
            $scope.editEmployeePopUp.close();
        };
   };

   $scope.init();
   authenticationService.sessionCheck();
   $scope.retrieveEmployeeList();
   $scope.retrieveCompanyAndCountryList();
   $scope.retrieveEmployeeImageOnLoad();
});

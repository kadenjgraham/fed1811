let app = angular.module('taskApp', []);
//change the way this is seen in home file
app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});
app.controller('main', function ($scope, $http) {
    $scope.logout = true;
    $scope.login = false;
    $scope.admin = false;
    $scope.employee = false;
    $scope.editting = false;
    $scope.logoutForm = () => {
        $scope.logout = true;
        $scope.login = false;
        $scope.admin = false;
        $scope.employee = false;
    };
    $scope.getUserData = (userName) => {
        if (userName == "BossMan1") {
            $scope.logout = false;
            $scope.login = true;
            $scope.admin = true;
            $http.get("https://employeetaskview.firebaseio.com/data/users.json")
                .then(function (responseData) {
                    var users = responseData.data;
                    $scope.adminTaskArr = users;
                })
        } else {
            $scope.logout = false;
            $scope.login = true;
            $scope.employee = true;
            $http.get("https://employeetaskview.firebaseio.com/data/users/" + userName + ".json")
                .then(function (responseData) {
                    var todo = responseData.data;
                    $scope.taskArr = todo;
                })
        }
    };
    $scope.newTaskSubmit = (name, desc, start, end) => {
        var guid = generateGuid() + generateGuid() + "-" + generateGuid() + "-4" + generateGuid().substr(0, 3) + "-" + generateGuid() + "-" + generateGuid() + generateGuid() + generateGuid().toLowerCase();
        var newTask = {};
        var usernameData = "";
        newTask[guid] = {
            dateEnd: end,
            dateStart: start,
            description: desc,
            id: guid,
            timeStamp: new Date()
        };
        if (name == "Josh") {
            usernameData = "BossMan1";
        } else if (name == "Don") {
            usernameData = "Don4";
        } else if (name == "Dorothy") {
            usernameData = "Dorothy3";
        } else if (name == "Jeremy") {
            usernameData = "Jeremy2";
        } else if (name == "Tom") {
            usernameData = "Tom1";
        } else {
            alert("You need to enter correct data to add to the tasks");
        }
        $http.patch(`https://employeetaskview.firebaseio.com/data/users/${usernameData}/tasks.json`, newTask);
        alert('Loading data and adding to table');
        setTimeout(function(){$scope.getUserData("BossMan1")}, 3000);
    };
    $scope.deleteData = (ufirstname, uid) => {
        var usernameURL = "";
        if (ufirstname == "Josh") {
            usernameURL = "BossMan1";
        } else if (ufirstname == "Don") {
            usernameURL = "Don4";
        } else if (ufirstname == "Dorothy") {
            usernameURL = "Dorothy3";
        } else if (ufirstname == "Jeremy") {
            usernameURL = "Jeremy2";
        } else if (ufirstname == "Tom") {
            usernameURL = "Tom1";
        }
        $http.delete(`https://employeetaskview.firebaseio.com/data/users/${usernameURL}/tasks/${uid}.json`);
        alert('Loading data and deleting from table');
        setTimeout(function(){$scope.getUserData("BossMan1")}, 3000);
    };
    $scope.editData = (uname, tdesc, sdate, edate, iid) => {
        $scope.editting = true;
        $scope.inputName = uname;
        $scope.taskDesc = tdesc;
        $scope.startDate = new Date(sdate);
        $scope.endDate = new Date(edate);
        $scope.editID = iid;
    };
    $scope.updateDatabase = (updateName, updateDesc, updateStart, updateEnd, updateID) => {
        $scope.editting = false;
        $scope.deleteData(updateName, updateID);
        let updatedData = {};
        updatedData[updateID] = {
            dateEnd: updateEnd,
            dateStart: updateStart,
            description: updateDesc,
            id: updateID,
            timeStamp: new Date()
        }
        var updateUNURL = "";
        if (updateName == "Josh") {
            updateUNURL = "BossMan1";
        } else if (updateName == "Don") {
            updateUNURL = "Don4";
        } else if (updateName == "Dorothy") {
            updatUNURL = "Dorothy3";
        } else if (updateName == "Jeremy") {
            updateUNURL = "Jeremy2";
        } else if (updateName == "Tom") {
            updateUNURL = "Tom1";
        }
        $http.patch(`https://employeetaskview.firebaseio.com/data/users/${updateUNURL}/tasks.json`, updatedData);
        alert('Loading data and updating table');
        setTimeout(function(){$scope.getUserData("BossMan1")}, 3000);
    };

    function generateGuid() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
})
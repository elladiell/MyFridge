var app = angular.module('schools', []); //показывает содержимое, возвращаемое rest-сервисом

app.controller("SchoolsController", function ($scope, $http) {

    $scope.searchSchools = function() {
        $http.get('/public/rest/schools').success(function (data, status, headers, config) {
            if($scope.search===""){
                $scope.schoolsList=data;
            }
            else {
                var j = data;
                for (var i = 0; i < j.length; i++) {
                    if (j[i].name !== $scope.search) {
                        j.splice(i, 1);
                        i--;
                    }
                }
                $scope.schoolsList = j;
            }
        }).error(function (data, status, headers, config) {
            if (data.message === 'Time is out') {
                $scope.finishByTimeout();
            }
        });

    };

    $scope.getSchools = function () {
        $http.get('/public/rest/schools').success(function (data, status, headers, config) {
            $scope.schoolsList = data;
        }).error(function (data, status, headers, config) {
            if (data.message === 'Time is out') {
                $scope.finishByTimeout();
            }
        });
    };

    $scope.delete = function (id) {
        $http.delete('/public/rest/schools/delete/' + id).success(function (data, status, headers, config) {
            for (var i = 0; i < $scope.schoolsList.length; i++) {
                var j = $scope.schoolsList[i];
                if (j.id === id) {
                    $scope.schoolsList.splice(i, 1);
                    break;
                }
            }
        }).error(function (data, status, headers, config) {
            console.error(status, data, headers);
        });
    };

    $scope.addSchool = function () {
        $http.post('/public/rest/schools/add/' + $scope.number + "/" + $scope.name).success(function (data, status, headers, config) {
            $scope.schoolsList.splice(0, 0, data);
        }
        ).error(function (data, status, headers, config) {
            console.error(status, data, headers);
        });

    };
});

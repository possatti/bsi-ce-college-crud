'use strict';

App.controller('MainController', ['$scope', '$http', 'Professor', function($scope, $http, Professor) {

  $scope.professores = [];

  $scope.professor = {};

  $scope.cadastrar = function(professor) {
    Professor.create({}, professor, function(value) {
      alert("O professor foi cadastrado.");
      $scope.professores.push(value);
    }, function(errResponse) {
      alert("O professor não pode ser cadastrado.");
      console.log(errResponse);
    });
  };

  $scope.apagar = function(professor) {
    Professor.destroyById({id:professor.id}, function(value) {
      console.log("Professor deletado:");
      console.log(value);
    }, function(errResponse) {
      console.log("Não foi possível deletara o professor:");
      console.log(errResponse);
    });
    var index = $scope.professores.indexOf(professor);
    if (index > -1) {
      $scope.professores.splice(index, 1);
    }
  };

  // Busca todos os professores.
  Professor.find({}, function(professoresCadastrados) {
    if (professoresCadastrados) {
      $scope.professores = professoresCadastrados;
    }
  });
}]);

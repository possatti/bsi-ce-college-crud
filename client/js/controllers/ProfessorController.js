'use strict';

App.controller('ProfessorController', ['$scope', '$http', 'Professor', function($scope, $http, Professor) {

  $scope.professores = [];

  $scope.professor = {};

  $scope.cadastrar = function(professor) {
    Professor.create({}, professor, function(value) {
      $scope.professores.push(value);
    }, function(errResponse) {
      alert("O professor não pôde ser cadastrado.");
      console.error(errResponse);
    });
  };

  $scope.apagar = function(professor) {
    Professor.destroyById({id:professor.id}, function(value) {
      var index = $scope.professores.indexOf(professor);
      if (index > -1) {
        $scope.professores.splice(index, 1);
      }
    }, function(errResponse) {
      alert("Não foi possível deletar o professor.");
      console.error(errResponse);
    });
  };

  $scope.cepAlterado = function() {
    $http.get('http://cep.correiocontrol.com.br/' + $scope.professor.cep + '.json')
    .then(function(response) {
      $scope.professor.rua = response.data.logradouro;
      $scope.professor.bairro = response.data.bairro;
      $scope.professor.cidade = response.data.localidade;
      $scope.professor.estado = response.data.uf;
    }, function(response) {
      alert("CEP não encontrado.")
      $scope.professor.rua = null;
      $scope.professor.bairro = null;
      $scope.professor.cidade = null;
      $scope.professor.estado = null;
      console.error(response);
    });
  };

  // Busca todos os professores.
  Professor.find({}, function(professoresCadastrados) {
    if (professoresCadastrados) {
      $scope.professores = professoresCadastrados;
    }
  });
}]);

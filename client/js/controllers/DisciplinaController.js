'use strict';

App.controller('DisciplinaController', ['$scope', 'Disciplina', function($scope, Disciplina) {

  $scope.disciplinas = [];

  $scope.disciplina = {};

  $scope.cadastrar = function(disciplina) {
    Disciplina.create({}, disciplina, function(value) {
      $scope.disciplinas.push(value);
    }, function(errResponse) {
      alert("O disciplina não pôde ser cadastrada.");
      console.error(errResponse);
    });
  };

  $scope.apagar = function(disciplina) {
    Disciplina.destroyById({id:disciplina.id}, function(value) {
      var index = $scope.disciplinas.indexOf(disciplina);
      if (index > -1) {
        $scope.disciplinas.splice(index, 1);
      }
    }, function(errResponse) {
      alert("Não foi possível deletar a disciplina.");
      console.error(errResponse);
    });
  };

  // Busca todos as disciplinas já cadastradas.
  Disciplina.find({}, function(disciplinasCadastradas) {
    if (disciplinasCadastradas) {
      $scope.disciplinas = disciplinasCadastradas;
    }
  });
}]);

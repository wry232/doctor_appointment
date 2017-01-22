app.controller('dashboardController',
  ['$rootScope', '$scope', '$location', 'userFactory','$routeParams',

    function($rootScope, $scope, $location, userFactory, $routeParams) {

    var getUser = function(){
      if (!$scope.user) {
        userFactory.getUser(function(user){
          $scope.user = user;
        });
      }
    }

    $scope.goToNewAppointment = function (user) {
      console.log('$scope.goToNewAppointment');
      var url = '/new_appointment';
      $location.url(url);
    };

    $scope.getAllAppintments = function() {
      var config = {};
      userFactory.getAllAppointments(config, function(appointments) {
        var today = new Date();
        today.setDate(today.getDate() - 1);
        var yesterday = moment(today);

        $scope.appointments = appointments.filter(function(appointment) {
          var str = '' + appointment.year + '-' + (appointment.month+1) + '-' + appointment.day;
          var date = moment(str);
          appointment.date = moment(new Date(appointment.date)).format("MMM DDD YYYY");
          appointment.time = moment(new Date(appointment.time)).format("hh:MM A");
          return date > today;
          // return appointment;
        });
      })
      // mock
      // $scope.appointments = [
      //   {
      //     date: '2017-01-13',
      //     time: '14:02',
      //     patientName: 'John Doe',
      //     complaint: "hello"
      //   }
      // ];
    }

    $scope.cancelAppointment = function(appointment) {
      console.log('appointment', appointment);
      userFactory.cancelAppointment(appointment, function(appointment) {
        console.log('returned appointment', appointment);
        $scope.getAllAppintments();
      });
    }

    $scope.ownAppointment = function(owner) {
      return $scope.user.name === owner;
    }

    $scope.logout = function() {
      console.log('User logged out');
      $rootScope.loggedUser = false;
    }

    $scope.searchKeyword = function(keyword) {
      console.log('keyword', keyword);
      if (keyword) {
        $scope._appointments = $scope.appointments.slice();
        $scope.appointments = $scope.appointments.filter(function(appointment){
          return appointment.owner.indexOf(keyword) > -1 || appointment.complaint.indexOf(keyword) > -1;
        });
      } else {
        $scope.appointments = $scope._appointments.slice();
      }
    }

    var init = function () {
      console.log('init');
      getUser();
      $scope.getAllAppintments();
    }

    init();

}]);

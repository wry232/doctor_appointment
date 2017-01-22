app.controller('appointmentController',
  ['$scope', '$location', 'userFactory','$routeParams',

    function($scope, $location, userFactory, $routeParams) {

    var getUserById = function(id){
      console.log('getUserById', id);

      userFactory.getUserById(id, function(user){
        $scope.user = user;
      });
    }

    $scope.goToDashboard = function (user) {
      var url = '/dashboard';
      $location.url(url);
    };

    $scope.createAppointment = function () {
      console.log('$scope.appointment.time');
      // if schedule time is 8 to 5
      var time = $scope.appointment.time;
      var eightAM = new Date(time.getTime());
      eightAM.setHours(8, 0);
      var fivePM = new Date(time.getTime());
      fivePM.setHours(17, 0);

      if ( eightAM <= time && time <= fivePM) {
        var appointment = {
          date: $scope.appointment.date,
          time: $scope.appointment.time,
          complaint: $scope.appointment.complaint,
          owner: $scope.user.name
        }
        console.log('appointment', appointment);

        userFactory.createAppointment(appointment, function(appointment){
          $scope.goToDashboard();
        });
      } else {
        alert('Time slot must between 8am and 5pm');
      }
    }

    var defaultAppointment = function() {
      var time = new Date();
      time.setHours(12);
      $scope.appointment = {
        date: new Date(),
        time: '',
        complaint: 'Please input here',
        owner: $scope.user.name
      }
    }

    var init = function () {
      console.log('init');
      defaultAppointment();
    }

    init();

}]);

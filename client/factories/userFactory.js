// this talks to database
app.factory("userFactory", function($http) {
  // factory
  var factory = {};
  var user;

  // helper functions
  var findUserByName = function (name, callback) {
    return $http.get('/users/' + name, {
      name: name
    })
    .then(function(result) {
      console.log('result', result);
      if (typeof(callback) === 'function') {
        callback(result.data);
      }
    }, function(error){
      console.log('error', error);

    });
  }

  var createUserByName = function(name, callback) {
    return $http.post('/users', {
      name: name
    })
    .then(function(result) {
      console.log('result', result);

      if (typeof(callback) === 'function') {
        console.log('result', result);
        callback(result.data);
      }
    });
  }

  var getAllUser = function(callback) {
    return $http.get('/users')
    .then(function(result) {
      console.log('result', result);

      if (typeof(callback) === 'function') {
        console.log('result', result);
        callback(result.data);
      }
    });
  }

  // methods
  factory.loginByUserName = function(name, callback) {
    findUserByName(name, function(existUser) {
      if (existUser) {
        console.log("factory found user:", existUser);
        user = existUser;
        callback(user);
      } else {
        console.log("factory user not found");
        createUserByName(name, function(newUser) {
          user = newUser;
          callback(user);
        });
      }
    });
  }

  factory.getUser = function(callback) {
    if (user) {
      callback(user);
    }

    return user;
  }

  factory.getUserById = function(id, callback) {
    return $http.get('/user/'+id)
    .then(function(result) {
      console.log('result', result);

      if (typeof(callback) === 'function') {
        console.log('result', result);
        callback(result.data);
      }
    });
  }

  // ===
  factory.createAppointment = function(appointment, callback) {
   return $http.post('/appointments/', {
      appointment: appointment
    })
    .then(function(result) {
      console.log('result', result);

      if (typeof(callback) === 'function') {
        console.log('result', result);
        callback(result.data);
      }
    });

  };

  factory.getAllAppointments = function(config, callback) {
   return $http.get('/appointments')
    .then(function(result) {
      console.log('result', result);

      if (typeof(callback) === 'function') {
        console.log('result', result);
        callback(result.data);
      }
    });
  };

 factory.cancelAppointment = function(appointment, callback) {
    return $http.get('/appointments/'+appointment._id)
    .then(function(result) {
      console.log('result', result);
      if (typeof(callback) === 'function') {
        console.log('result', result);
        callback(result.data);
      }
    });
  }

  return factory;
});

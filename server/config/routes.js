var path = require('path');
var appointments = require('./../controllers/appointments.js');
var users = require('./../controllers/users.js');

module.exports = function(app) {
  app.post('/users', users.create);
  app.get('/users', users.getAll);
  app.get('/users/:name', users.get);

  app.get('/user/:id', users.getUserById);

  app.post('/appointments', appointments.create);
  app.get('/appointments', appointments.get);
  app.get('/appointments/:id', appointments.cancel);

}

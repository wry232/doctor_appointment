console.log('appointment controller');
// WE NEED TO ADD A FEW lines of code here!
// How does a controller talk to mongoose and get a model?
// Build out the methods in the friendsControllers below
var mongoose = require('mongoose');
var querystring = require('querystring');
var Appointment = mongoose.model('Appointment');
var User = mongoose.model('User');

function AppointmentsController(){

  this.create = function(req, res){
    var appointmentConfig = req.body.appointment;
    console.log('appointmentConfig', appointmentConfig);
    var date = new Date(appointmentConfig.date);
    var day = date.getDate()
    var month = date.getMonth();
    var year = date.getFullYear();
    var config = {
      day: day,
      month: month,
      year: year
    };
    appointmentConfig = Object.assign(appointmentConfig, config);

    Appointment.create(appointmentConfig, function(err, result){
      if(err){
        console.log(err);
      } else {

        var createAppointment = function() {
          var appointment = new Appointment(appointmentConfig);
          appointment.save(function(err, result){
            if(err){
              console.log('err', err);
            } else {
              console.log("success, result:", result);
            }
            res.json(result);
          });
        };

        Appointment.find(config, function(err, result) {
          if(err){
            console.log('err', err);
          } else {
            console.log("success, result:", result);
            createAppointment();
          }
        });

        // if 3 appointments per day
        // if (Appointment.)

      }
    })
  };

  this.cancel = function(req, res) {
    console.log('cancel', req.body, req.query, req.params);
    var id = req.params.id;
    console.log('id', id);

    Appointment.remove({ _id: id}, function(err, result) {
      console.log('result', result);
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
  }

  this.get = function(req, res) {
    console.log('owner:', req.query.owner);

    var config = {};
    Appointment.find(config, function(err, result) {
      if (err) {
        console.log('Error', err);
      }
      if (result) {
        console.log('result', result);
        res.json(result);
      } else {
        console.log('no result', result);
      }
    })
  }

}

module.exports = new AppointmentsController();

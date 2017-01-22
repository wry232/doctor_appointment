var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppointmentSchema = new mongoose.Schema({
  // for comparsion
  day: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },

  date: {
    // type: Date,
    type: String,
    required: true
  },

  time: {
    // type: Date,
    type: String,
    default: false
  },

  complaint: {
    type: String,
    required: true
  },

  owner: {
    type: String,
    required: true
  },
  // owner: {
  //   type: Schema.Types.ObjectId,
  //   ref:'User'
  // }
}, {
    timestamps: true
});

mongoose.model('Appointment', AppointmentSchema);

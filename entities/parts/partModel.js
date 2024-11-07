const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartSchema = new Schema(
  {
    partId: {type: String, required: true},
    type: {type: String, required: true},
    size: {type: String, required: true},
    yearFrom: {type: Number},
    yearTo: {type: Number},
    versions: {
      type: Array,
      versId: {type: String},
      yearFrom: {type: Number},
      yearTo: {type: Number},
      logo: {type: String},
      pip: {type: String},
      mold: {type: String},
      place: {type: String},
      info: {type: String},
      struc: {type: Array},
      colors: {type: Array}
    }
  }
);

module.exports = mongoose.model('Part', PartSchema);
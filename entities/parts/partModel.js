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
      year: {type: Number},
      logo: {type: String},
      pip: {type: String},
      model: {type: String},
      place: {type: String},
      info: {type: String},
      cavity: {type: String},
      struc: {type: String}
    }
  }
);

module.exports = mongoose.model('Part', PartSchema);
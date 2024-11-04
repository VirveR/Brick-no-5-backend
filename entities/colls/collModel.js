const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollSchema = new Schema(
  {
    sets: {
      setId: {type: String},
      has: {
        partId: {type: String},
        version: {type: String},
        color: {type: String},
        quant: {type: Number}
      }
    }
  }
);

module.exports = mongoose.model('Coll', CollSchema);
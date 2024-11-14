const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is missing']
    },
    parts: {
      type: Array,
      partId: {type: String},
      version: {type: String},
      color: {type: String},
      quant: {type: Number}
    },
    sets: {
      type: Array,
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
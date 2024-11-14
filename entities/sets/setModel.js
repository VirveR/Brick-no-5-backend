const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SetSchema = new Schema(
  {
    setId: {
      type: String, 
      required: [true, 'Set id missing'],
      unique: [true, 'Set id already exists'],
      trim: true
    },
    name: {
      type: String, 
      required: [true, 'Set name missing'],
      trim: true
    },
    year: {
      type: Number, 
      required: [true, 'Set year missing']
    },
    altId: {
      type: String
    },
    altName: {
      type: String
    },
    needs: {
      type: Array,
      partId: {type: String},
      color: {type: String},
      quant: {type: Number}
    }
  }
);

module.exports = mongoose.model('Set', SetSchema);
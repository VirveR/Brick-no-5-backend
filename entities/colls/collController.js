const Coll = require('./collModel');
const {Types} = require('mongoose');

const getColls = async (req, res) => {
  try {
    const colls = await Coll.find();
    res.send(colls);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const getCollById = async (req, res) => {
  try {
    const id = new Types.ObjectId(`${req.params.id}`);
    const coll = await Coll.findById(id);
    res.status(200).json(coll);
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

const addColl = async (req, res) => {
  const coll = new Coll({
    name: req.body.name,
    parts: [],
    sets: []
  });
  try {
    const newColl = await coll.save();
    res.status(201).json({newColl});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

const addPartToColl = async (req, res) => {
  const part = {
    partId: req.body.partId,
    version: req.body.version,
    color: req.body.color,
    quant: req.body.quant
  };
  try {
    const updated = await Coll.findByIdAndUpdate(req.params.id, {$push: {parts: part}}, {new: true});
    return res.status(200).json({updated});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const addSetToColl = async (req, res) => {
  const set = {
    setId: req.body.setId,
    has: req.body.has,
  };
  try {
    const updated = await Coll.findByIdAndUpdate(req.params.id, {$push: {sets: set}}, {new: true});
    return res.status(200).json({updated});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const removeSetFromColl = async (req, res) => {
  try {
    const updated = await Coll.findByIdAndUpdate(req.params.id, {$pull: {sets: {setId: req.body.setId}}}, {new: true});
    return res.status(200).json({updated});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const deleteColl = async (req, res) => {
  try {
    const deleted = await Coll.findByIdAndDelete(req.params.id);
    return res.status(200).json({deleted});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

module.exports = {getColls, getCollById, addColl, addPartToColl, addSetToColl, removeSetFromColl, deleteColl};
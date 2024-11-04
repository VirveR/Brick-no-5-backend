const Coll = require('./collModel');

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
    const coll = await Coll.findById(req.params.id);
    res.send(coll);
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

const addColl = async (req, res) => {
  const coll = new Coll({
    sets: []
  });
  try {
    const newColl = await coll.save();
    res.status(201).json({newColl});
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

module.exports = {getColls, getCollById, addColl, addSetToColl, removeSetFromColl, deleteColl};
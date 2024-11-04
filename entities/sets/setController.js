const Set = require('./setModel');

const getSets = async (req, res) => {
  try {
    const sets = await Set.find();
    return res.status(200).send(sets);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const getSetById = async (req, res) => {
  try {
    const set = await Set.findOne({setId: req.params.id});
    res.status(200).send(set);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const addSet = async (req, res) => {
  const set = new Set({
    setId: req.body.setId,
    name: req.body.name,
    year: req.body.year,
    altId: req.body.altId,
    altName: req.body.altName,
    needs: []
  });
  try {
    const newSet = await set.save();
    res.status(201).json({newSet});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const addRowToSet = async (req, res) => {
  const row = {
    partId: req.body.partId,
    version: req.body.version,
    color: req.body.color,
    quant: parseInt(req.body.quant)
  };
  try {
    const updated = await Set.findOneAndUpdate({setId: req.params.id}, {$push: {needs: row}}, {new: true});
    return res.status(200).send(row);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const removeRowFromSet = async (req, res) => {
  try {
    const updated = await Set.findOneAndUpdate({setId: req.params.id}, {$pull: {needs: {partId: req.body.partId, color: req.body.color}}}, {new: true});
    return res.status(200).json({updated});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const deleteSet = async (req, res) => {
  try {
    const deleted = await Set.findOneAndDelete({setId: req.params.id});
    return res.status(200).json({deleted});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

module.exports = {getSets, getSetById, addSet, addRowToSet, removeRowFromSet, deleteSet};
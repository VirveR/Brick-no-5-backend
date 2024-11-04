const Part = require('./partModel');

const getParts = async (req, res) => {
  try {
    const parts = await Part.find();
    res.send(parts);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const getPartById = async (req, res) => {
  try {
    const part = await Part.findOne({partId: req.params.id});
    res.send(part);
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
};

const addPart = async (req, res) => {
  const part = new Part({
    partId: req.body.partId,
    type: req.body.type,
    size: req.body.size,
    yearFrom: req.body.yearFrom,
    yearTo: req.body.yearTo,
    versions: []
  });
  try {
    const newPart = await part.save();
    res.status(201).json({newPart});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const addVerToPart = async (req, res) => {
  const ver = {
    year: req.body.year,
    logo: req.body.logo,
    model: req.body.model,
    place: req.body.place,
    info: req.body.info,
    cavity: req.body.cavity,
    struc: req.body.struc
  };
  try {
    const updated = await Part.findOneAndUpdate({partId: req.params.id}, {$push: {versions: ver}}, {new: true});
    return res.status(200).json({updated});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const removeVerFromPart = async (req, res) => {
  try {
    const updated = await Part.findOneAndUpdate({partId: req.params.id}, {$pull: {versions: {year: req.body.year}}}, {new: true});
    return res.status(200).json({updated});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const deletePart = async (req, res) => {
  try {
    const deleted = await Part.findOneAndDelete({partId: req.params.id});
    return res.status(200).json({deleted});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

module.exports = {getParts, getPartById, addPart, addVerToPart, removeVerFromPart, deletePart};
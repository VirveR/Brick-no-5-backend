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
    yearFrom: parseInt(req.body.yearFrom),
    yearTo: parseInt(req.body.yearTo),
    versions: []
  });
  try {
    const newPart = await part.save();
    res.status(201).json({newPart});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

const addVerToPart = async (req, res) => {
  const ver = {
    versId: req.body.versId,
    year: req.body.year,
    logo: req.body.logo,
    pip: req.body.pip,
    mold: req.body.mold,
    place: req.body.place,
    info: req.body.info,
    struc: req.body.struc,
    out: req.body.out,
    in: req.body.in,
    bot: req.body.bot,
    colors: req.body.colors
  };
  try {
    const updated = await Part.findOneAndUpdate({partId: req.params.id}, {$push: {versions: ver}}, {new: true});
    return res.status(200).json({updated});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

const editVerInPart = async (req, res) => {
  const ver = {
    versId: req.body.versId,
    year: req.body.year,
    logo: req.body.logo,
    pip: req.body.pip,
    mold: req.body.mold,
    place: req.body.place,
    info: req.body.info,
    struc: req.body.struc,
    out: req.body.out,
    in: req.body.in,
    bot: req.body.bot,
    colors: req.body.colors
  };
  try {
    const updated = await Part.findOneAndUpdate({partId: req.params.id, 'versions.versId': req.body.versId}, {$set: {'versions.$': ver}}, {new: true});
    return res.status(200).json({updated});
  } catch (error) {
    return res.status(500).json({error: error.message});
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

module.exports = {getParts, getPartById, addPart, editVerInPart, addVerToPart, removeVerFromPart, deletePart};
const User = require('./userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//get user by id (get /api/users/:id)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({user});
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
};

//add user (post /api/users)
const addUser = async (req, res) => {
  try {
    //check for duplicates
    const isUser = await User.findOne({name: req.body.name});
    if (isUser) {
      throw {message: 'Username is already taken'};
    }
    //check password length
    if (req.body.password.length < 8) {
      throw {message: 'password has to be at least 8 characters long'};
    }
    //create empty collection array
    const colls = new Array;
    const password = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      password: password,
      colls: colls
    });
    const newUser = await user.save();
    res.status(201).json({newUser});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

//login (post /api/users/login)
const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({name: req.body.name});
    const ok = await bcrypt.compare(req.body.password, user.password);
    if (user && ok) {
      //const token = jwt.sign({userId: user._id}, process.env.SECRET);
      res.status(200).send({user});
    }
    else {
      res.status(400).send({message: 'Wrong password'});
    }
  } catch (error) {
    return res.status(500).send({message: error.message});
  }
};

const addCollToUser = async (req, res) => {
  const coll = {
    _id: req.body.id
  };
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, {$push: {colls: coll}}, {new: true});
    return res.status(200).json({updated});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

const removeCollFromUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, {$pull: {colls: {id: req.body.id}}}, {new: true});
    return res.status(200).json({updated});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({deleted});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

module.exports = {getUserById, addUser, loginUser, addCollToUser, removeCollFromUser, deleteUser};
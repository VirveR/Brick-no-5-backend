const express = require('express');
const router = express.Router();
const ctrl = require('./userController');

router.get('/:id', ctrl.getUserById);
router.post('/', ctrl.addUser);
router.post('/login', ctrl.loginUser);
router.put('/add/:name', ctrl.addCollToUser);
router.put('/remove/:name', ctrl.removeCollFromUser);
router.delete('/:id', ctrl.deleteUser);

module.exports = router;
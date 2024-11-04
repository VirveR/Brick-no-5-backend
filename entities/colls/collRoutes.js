const express = require('express');
const router = express.Router();
const ctrl = require('./collController');

router.get('/', ctrl.getColls);
router.get('/:id', ctrl.getCollById);
router.post('/', ctrl.addColl);
router.put('/add/:id', ctrl.addSetToColl);
router.put('/remove/:id', ctrl.removeSetFromColl);
router.delete('/:id', ctrl.deleteColl);

module.exports = router;
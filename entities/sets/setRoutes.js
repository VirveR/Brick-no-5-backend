const express = require('express');
const router = express.Router();
const ctrl = require('./setController');

router.get('/', ctrl.getSets);
router.get('/:id', ctrl.getSetById);
router.post('/', ctrl.addSet);
router.put('/add/:id', ctrl.addRowToSet);
router.put('/remove/:id', ctrl.removeRowFromSet);
router.delete('/:id', ctrl.deleteSet);

module.exports = router;
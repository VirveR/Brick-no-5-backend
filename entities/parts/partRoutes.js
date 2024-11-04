const express = require('express');
const router = express.Router();
const ctrl = require('./partController');

router.get('/', ctrl.getParts);
router.get('/:id', ctrl.getPartById);
router.post('/', ctrl.addPart);
router.put('/add/:id', ctrl.addVerToPart);
router.put('/remove/:id', ctrl.removeVerFromPart);
router.delete('/:id', ctrl.deletePart);

module.exports = router;
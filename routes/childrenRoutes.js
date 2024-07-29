const express = require('express');
const router = express.Router();
const childrenController = require('../controllers/childrenController');
const vaccinationsController = require('../controllers/vaccinationsController');

router.post('/', childrenController.createChild);
router.get('/:uhid', childrenController.getChildByUHID);
router.get('/:uhid/next_vaccination', vaccinationsController.getNextVaccination);
module.exports = router;

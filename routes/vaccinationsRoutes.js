const express = require('express');
const router = express.Router();
const vaccinationsController = require('../controllers/vaccinationsController');
const { updateMissedVaccination } = require('../controllers/vaccinationsController');
router.post('/vaccinations', vaccinationsController.createVaccination);
router.put('/vaccinations/:id', vaccinationsController.updateVaccination);
router.get('/vaccinations/:child_id', vaccinationsController.getVaccinationsByChild);
router.get('/:uhid/next_vaccination', vaccinationsController.getNextVaccination);
router.get('/child/:child_id', vaccinationsController.getVaccinationsByChild);
router.post('/update_missed', vaccinationsController.updateMissedVaccination);

module.exports = router;

const childModel = require('../models/child');
const vaccinationModel = require('../models/vaccination');
const vaccinationSchedule = require('../utils/vaccinationSchedule');

exports.createChild = async (req, res) => {
    try {
        const child = await childModel.createChild(req.body);
        const schedule = vaccinationSchedule(child.date_of_birth);

        for (const vaccine of schedule) {
            await vaccinationModel.createVaccination({
                child_id: child.id,
                vaccine_name: vaccine.vaccine_name,
                scheduled_date: vaccine.scheduled_date,
                administered_date: vaccine.administered_at_birth ? vaccine.scheduled_date : null
            });
        }

        res.status(201).json(child);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getChildByUHID = async (req, res) => {
    const uhid = req.params.uhid;
    try {
      const child = await childModel.getChildByUHID(uhid);
      if (!child) {
        return res.status(404).json({ error: 'Child not found' });
      }
      const vaccinations = await vaccinationModel.getVaccinationsByChild(child.id);
      child.vaccinations = vaccinations;
      res.json(child);
    } catch (error) {
      console.error('Error fetching child:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};


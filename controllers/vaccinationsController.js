const childModel = require('../models/child');
const vaccinationModel = require('../models/vaccination');
const { getChildByUHID } = require('../models/child');

exports.createVaccination = async (req, res) => {
    try {
        const vaccination = await vaccinationModel.createVaccination(req.body);
        res.status(201).json(vaccination);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateVaccination = async (req, res) => {
    try {
        const vaccination = await vaccinationModel.updateVaccination(req.params.id, req.body.administered_date);
        if (!vaccination) {
            return res.status(404).json({ error: 'Vaccination not found' });
        }
        res.json(vaccination);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getVaccinationsByChild = async (req, res) => {
    try {
        const vaccinations = await vaccinationModel.getVaccinationsByChild(req.params.child_id);
        res.json(vaccinations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getNextVaccination = async (req, res) => {
    try {
        const { uhid } = req.params;
        const child = await childModel.getChildByUHID(uhid);
        if (!child) {
            return res.status(404).json({ error: 'Child not found' });
        }

        const vaccinations = await vaccinationModel.getVaccinationsByChild(child.id);

        const upcomingVaccinations = vaccinations.filter(vaccination => {
            return vaccination.administered_date === null;
        }).sort((a, b) => new Date(a.scheduled_date) - new Date(b.scheduled_date));

        if (upcomingVaccinations.length > 0) {
            return res.status(200).json(upcomingVaccinations[0]);
        }

        return res.status(200).json({ message: 'All vaccinations are up-to-date' });
    } catch (error) {
        console.error('Error fetching next vaccination:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateMissedVaccination = async (req, res) => {
    const { uhid, newDate } = req.body;
    try {
        const child = await childModel.getChildByUHID(uhid);
        if (!child) {
            return res.status(404).json({ error: 'Child not found' });
        }

        const vaccinations = await vaccinationModel.getVaccinationsByChild(child.id);
        const nextVaccination = vaccinations.find(vac => vac.administered_date === null);

        if (!nextVaccination) {
            return res.status(404).json({ error: 'No pending vaccinations' });
        }

        const delay = new Date(newDate) - new Date(nextVaccination.scheduled_date);

        await vaccinationModel.updateVaccination(nextVaccination.id, newDate);

        for (let i = 0; i < vaccinations.length; i++) {
            if (vaccinations[i].id === nextVaccination.id) {
                for (let j = i + 1; j < vaccinations.length; j++) {
                    const newScheduledDate = new Date(new Date(vaccinations[j].scheduled_date).getTime() + delay);
                    await vaccinationModel.updateScheduledDate(vaccinations[j].id, newScheduledDate.toISOString().split('T')[0]);
                }
                break;
            }
        }

        res.status(200).json({ message: 'Vaccination schedule updated successfully' });
    } catch (error) {
        console.error('Error updating missed vaccination:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

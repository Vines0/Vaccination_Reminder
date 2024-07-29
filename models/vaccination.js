const pool = require('../config/db');

// Create a new vaccination
const createVaccination = async (vaccination) => {
    const { child_id, vaccine_name, scheduled_date, administered_date } = vaccination;
    const result = await pool.query(
        'INSERT INTO vaccinations (child_id, vaccine_name, scheduled_date, administered_date) VALUES ($1, $2, $3, $4) RETURNING *',
        [child_id, vaccine_name, scheduled_date, administered_date]
    );
    return result.rows[0];
};

// Update an existing vaccination's administered date
const updateVaccination = async (id, administered_date) => {
    const result = await pool.query(
        'UPDATE vaccinations SET administered_date = $1 WHERE id = $2 RETURNING *',
        [administered_date, id]
    );
    return result.rows[0];
};

// Update the scheduled date of a vaccination
const updateScheduledDate = async (id, newScheduledDate) => {
    const result = await pool.query(
        'UPDATE vaccinations SET scheduled_date = $1 WHERE id = $2 RETURNING *',
        [newScheduledDate, id]
    );
    return result.rows[0];
};

// Get all vaccinations for a specific child by child ID
const getVaccinationsByChild = async (childId) => {
    try {
        const result = await pool.query('SELECT * FROM vaccinations WHERE child_id = $1 ORDER BY scheduled_date ASC', [childId]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching vaccinations:', error);
        throw error;
    }
};

const rescheduleVaccinations = async (childId, missedVaccinationId, newDate) => {
    try {
        const vaccinations = await getVaccinationsByChild(childId);

        let reschedule = false;
        let delay = 0;

        for (let i = 0; i < vaccinations.length; i++) {
            if (vaccinations[i].id === missedVaccinationId) {
                const originalDate = new Date(vaccinations[i].scheduled_date);
                const newAdministeredDate = new Date(newDate);
                delay = newAdministeredDate - originalDate;

                await pool.query(
                    'UPDATE vaccinations SET administered_date = $1 WHERE id = $2',
                    [newDate, missedVaccinationId]
                );

                reschedule = true;
            } else if (reschedule) {
                const rescheduledDate = new Date(new Date(vaccinations[i].scheduled_date).getTime() + delay);
                await pool.query(
                    'UPDATE vaccinations SET scheduled_date = $1 WHERE id = $2',
                    [rescheduledDate.toISOString().split('T')[0], vaccinations[i].id]
                );
            }
        }
    } catch (error) {
        console.error('Error rescheduling vaccinations:', error);
        throw error;
    }
};

module.exports = {
    createVaccination,
    updateVaccination,
    getVaccinationsByChild,
    updateScheduledDate,
    rescheduleVaccinations,
};

const pool = require('../config/db');

const createChild = async (child) => {
    const { uhid, name, date_of_birth, phone_number } = child;
    const result = await pool.query(
        'INSERT INTO children (uhid, name, date_of_birth, phone_number) VALUES ($1, $2, $3, $4) RETURNING *',
        [uhid, name, date_of_birth, phone_number]
    );
    return result.rows[0];
};

const getChildByUHID = async (uhid) => {
    const result = await pool.query('SELECT * FROM children WHERE uhid = $1', [uhid]);
    return result.rows[0];
};

module.exports = {
    createChild,
    getChildByUHID,
};

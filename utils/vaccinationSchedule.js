const moment = require('moment');

const vaccinationSchedule = (dateOfBirth) => {
    const schedule = [
        { vaccine_name: 'O.P.V.', weeks: 0, administered_at_birth: true },
        { vaccine_name: 'B.C.G.', weeks: 0, administered_at_birth: true },
        { vaccine_name: 'HEPATITIS B 1 (BD)', weeks: 0, administered_at_birth: true },
        { vaccine_name: 'DPT / DTaP 1', weeks: 6, administered_at_birth: false },
        { vaccine_name: 'IPV 1', weeks: 6, administered_at_birth: false },
        { vaccine_name: 'HIB 1', weeks: 6, administered_at_birth: false },
        { vaccine_name: 'ROTAVIRUS-1', weeks: 6, administered_at_birth: false },
        { vaccine_name: 'PNEUMOCOCCAL (PCV) 1', weeks: 6, administered_at_birth: false },
        { vaccine_name: 'HEPATITIS B 2', weeks: 10, administered_at_birth: false },
        { vaccine_name: 'DPT / DTaP 2', weeks: 10, administered_at_birth: false },
        { vaccine_name: 'IPV 2', weeks: 10, administered_at_birth: false },
        { vaccine_name: 'HIB 2', weeks: 10, administered_at_birth: false },
        { vaccine_name: 'ROTAVIRUS-2', weeks: 10, administered_at_birth: false },
        { vaccine_name: 'PNEUMOCOCCAL (PCV) 2', weeks: 10, administered_at_birth: false },
        { vaccine_name: 'HEPATITIS B 3', weeks: 14, administered_at_birth: false },
        { vaccine_name: 'DPT / DTaP 3', weeks: 14, administered_at_birth: false },
        { vaccine_name: 'IPV 3', weeks: 14, administered_at_birth: false },
        { vaccine_name: 'HIB 3', weeks: 14, administered_at_birth: false },
        { vaccine_name: 'ROTAVIRUS-3', weeks: 14, administered_at_birth: false },
        { vaccine_name: 'PNEUMOCOCCAL (PCV) 3', weeks: 14, administered_at_birth: false },
        { vaccine_name: 'INFLUENZA 1', weeks: 24, administered_at_birth: false },
        { vaccine_name: 'INFLUENZA 2', weeks: 30, administered_at_birth: false },
        { vaccine_name: 'TYPHOID CONJUGATE VACCINE', weeks: 36, administered_at_birth: false },
        { vaccine_name: 'MMR 1', weeks: 39, administered_at_birth: false },
        { vaccine_name: 'HEPATITIS A', weeks: 52, administered_at_birth: false },
        { vaccine_name: 'VARICELLA 1', weeks: 60, administered_at_birth: false },
        { vaccine_name: 'MMR 2', weeks: 60, administered_at_birth: false },
        { vaccine_name: 'PCV BOOSTER', weeks: 60, administered_at_birth: false },
        { vaccine_name: 'DPT / DTaP B1', weeks: 72, administered_at_birth: false },
        { vaccine_name: 'IPV B1', weeks: 72, administered_at_birth: false },
        { vaccine_name: 'HIB B1', weeks: 72, administered_at_birth: false },
        { vaccine_name: 'HEP A 2', weeks: 78, administered_at_birth: false },
        { vaccine_name: 'INFLUENZA', weeks: 78, administered_at_birth: false },
        { vaccine_name: 'VARICELLA 2', weeks: 104, administered_at_birth: false },
    ];

    return schedule.map(vaccine => ({
        vaccine_name: vaccine.vaccine_name,
        scheduled_date: moment(dateOfBirth).add(vaccine.weeks, 'weeks').format('YYYY-MM-DD'),
        administered_at_birth: vaccine.administered_at_birth
    }));
};

module.exports = vaccinationSchedule;

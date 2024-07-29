const cron = require('node-cron');
const pool = require('../config/db');
const nodemailer = require('nodemailer');
const moment = require('moment');

// Configure your email transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

// Function to send email reminder
const sendEmailReminder = (child, vaccination) => {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: child.phone_number + '@your-sms-gateway.com', // Replace with SMS gateway or use email
        subject: 'Vaccination Reminder',
        text: `Dear ${child.name},\n\nThis is a reminder for your upcoming vaccination: ${vaccination.vaccine_name} scheduled on ${vaccination.scheduled_date}.\n\nPlease visit the hospital for the vaccination.\n\nThank you!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

// Function to check for upcoming vaccinations and send reminders
const checkVaccinations = async () => {
    const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
    const result = await pool.query(
        'SELECT children.*, vaccinations.* FROM vaccinations JOIN children ON vaccinations.child_id = children.id WHERE vaccinations.scheduled_date = $1 AND vaccinations.administered_date IS NULL',
        [tomorrow]
    );

    const vaccinations = result.rows;

    vaccinations.forEach((vaccination) => {
        const child = {
            id: vaccination.child_id,
            name: vaccination.name,
            phone_number: vaccination.phone_number
        };
        sendEmailReminder(child, vaccination);
    });
};

// Schedule the job to run every day at a specific time
cron.schedule('0 8 * * *', () => {
    console.log('Running a job at 08:00 AM to check for upcoming vaccinations');
    checkVaccinations();
});

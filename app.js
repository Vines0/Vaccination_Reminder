const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Add this line
const childrenRoutes = require('./routes/childrenRoutes');
const vaccinationsRoutes = require('./routes/vaccinationsRoutes');
const pool = require('./config/db'); // Include database connection module
const schedulerService = require('./services/schedulerService'); // Include the scheduler service

const app = express();

app.use(cors());  // Add this line
app.use(bodyParser.json());
app.use('/api/children', childrenRoutes);
app.use('/api/vaccinations', vaccinationsRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

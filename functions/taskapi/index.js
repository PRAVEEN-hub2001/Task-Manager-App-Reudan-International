const express = require('express');
const taskRoutes = require('./routes/routes');
const catalystInit = require('./middleware/catalyst');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(catalystInit);
app.use('/', taskRoutes);
app.use(errorHandler);

module.exports = app;

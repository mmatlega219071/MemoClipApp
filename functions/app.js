const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

// Middleware
app.use(express.json());

// API routes
const apiRoutes = require('./server/routes/api');
app.use('/api', apiRoutes); // dodaj prefix /api dla ścieżek API

// Serve static files from the Vue app
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Eksportuj aplikację Express
module.exports = app;


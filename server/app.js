const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

// Middleware
app.use(express.json());

// API routes
const apiRoutes = require('./routes/api');
app.use('/', apiRoutes);

// Serve static files from the Vue app
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/test', (req, res) => {
  console.log('GET /test ok');
  res.send('Test SERVER')
})
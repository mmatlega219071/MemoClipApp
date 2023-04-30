const express = require('express');
const router = express.Router();

// Add your API endpoints here
router.get('/home', (req, res) => {
  res.send('Home endpoint');
});

module.exports = router;

const express = require('express');
const fetchData = require('../db'); // Path to your db.js file
const router = express.Router();

router.get('/data', async (req, res) => {
  try {
    const query = 'SELECT * FROM ABDELILAH.COUNTRIES'; // Replace with your actual SQL query
    const data = await fetchData(query);

    res.json({ status: 'success', data });
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ status: 'error', message: 'Error fetching data' });
  }
});

module.exports = router;

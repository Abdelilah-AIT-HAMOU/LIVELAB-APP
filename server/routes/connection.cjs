/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/* eslint-env node */
const express = require('express');
const router = express.Router();

// Require controller module
const connectionController = require('../utils/rest-services/connection.cjs');

// Get connection status
router.get('/status', async (req, res, next) => {
    try {
        const connectionStatus = await connectionController.getStatus();
        res.send(connectionStatus);
        next();
    } catch (error) {
        next(error);
    }
});

// New route to fetch data
router.get('/data', async (req, res, next) => {
    try {
        const query = 'SELECT * FROM ABDELILAH.COUNTRIES'; // Replace with your actual table name
        const data = await connectionController.fetchData(query);
        res.json({ status: 'success', data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ status: 'error', message: 'Error fetching data' });
        next(error);
    }
});

module.exports = router;


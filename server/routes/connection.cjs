/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/

// --------------------- ORDS APIs---------------------------------------

const express = require('express');
const router = express.Router();
require('dotenv').config(); // To read .env variables

// env variables
const BASE_URL = process.env.VITE_BASE_URL;
const DATABASE_USERNAME = process.env.VITE_DB_USERNAME;

const getTableUrl = (tableName) => {
    const baseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
    const username = DATABASE_USERNAME.startsWith('/') ? DATABASE_USERNAME.slice(1) : DATABASE_USERNAME;
    return `${baseUrl}/${username}/${tableName}/`;
};

const tables = ['employees', 'departments', 'attendance', 'performancereviews'];

tables.forEach((table) => {
    // GET
    router.get(`/${table}`, async (req, res) => {
        try {
            const response = await fetch(getTableUrl(table));
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // POST 
    router.post(`/${table}`, async (req, res) => {
        try {
            const response = await fetch(getTableUrl(table), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(req.body),
            });
            const data = await response.json();
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // GET : by ID
    router.get(`/${table}/:id`, async (req, res) => {
        try {
            const response = await fetch(`${getTableUrl(table)}/${req.params.id}`);
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // PUT : Update  by ID
    router.put(`/${table}/:id`, async (req, res) => {
        try {
            // Remove trailing slash and append ID
            const baseUrl = getTableUrl(table);
            const url = `${baseUrl.slice(0, -1)}/${req.params.id}`;


            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(req.body),
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ 
                error: error.message,
                details: 'Failed to update record'
            });
        }
    });

    // DELETE by ID
    router.delete(`/${table}/:id`, async (req, res) => {
        try {
            const baseUrl = getTableUrl(table).replace(/\/$/, '');
            const url = `${baseUrl}/${req.params.id}`;

            const response = await fetch(url, { method: 'DELETE' });

            if (!response.ok) {
                const text = await response.text(); // Read error message if available
                 throw new Error(`Failed to delete record: ${response.status} - ${text}`);
            }

            res.status(200).json({ message: `Record with ID ${req.params.id} deleted successfully` });

        } catch (error) {
             res.status(500).json({
                error: error.message,
                details: `Failed to delete record with ID ${req.params.id}`,
            });
        }
    });
});

module.exports = router;
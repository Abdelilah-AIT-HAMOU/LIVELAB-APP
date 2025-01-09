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
const BASE_URL = process.env.BASE_URL;
const DATABASE_USERNAME = process.env.DB_USERNAME;

const getTableUrl = (tableName) => `${BASE_URL}${DATABASE_USERNAME}/${tableName}`;

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
            const response = await fetch(`${getTableUrl(table)}/${req.params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(req.body),
            });
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // DELETE by ID
    router.delete(`/${table}/:id`, async (req, res) => {
        try {
            const response = await fetch(`${getTableUrl(table)}/${req.params.id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
});

module.exports = router;

/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5500;

app.listen(port, "0.0.0.0" , () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

// Serve static files from the React app (production build)
app.use(express.static(path.join(__dirname, '../../dist')));

// Routes
const routes = require('./routes/connection.cjs');
app.use('/api/connection', routes);

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).send({
    errorCode: err.code,
    errorMessage: err.message,
  });
});
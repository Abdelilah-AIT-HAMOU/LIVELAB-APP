/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
const db = require('../db/index.cjs');

// Check database connection status
exports.getStatus = async function () {
    const connection = await db.getConnection();
    const result = await connection.execute('select 1 from dual');
    await connection.close();

    return {
        status: 'ok',
    };
};

// Fetch data from the database
exports.fetchData = async function (query) {
    let connection;
    try {
        // Get a connection from the pool
        connection = await db.getConnection();

        // Execute the provided query
        const result = await connection.execute(query);

        // Return the fetched rows
        return result.rows;
    } catch (error) {
         throw new Error('Failed to fetch data from the database');
    } finally {
        // Ensure the connection is closed
        if (connection) {
            await connection.close();
        }
    }
};

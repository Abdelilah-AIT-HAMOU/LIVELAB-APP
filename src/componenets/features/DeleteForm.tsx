/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
**
*/

import React, { useState, useEffect } from 'react';
import { Box, Button, Snackbar, Alert, Paper } from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { AppProvider } from '@toolpad/core';
import useFetchData from '../../hooks/useFetchData';
import { formatData, generateColumns } from '../../utils/formatData';
import { StyledDataGrid } from '../common/styleGrid';

export default function DropRecord() {
  const tableName = 'employees'; // You can dynamically change this as needed
  const { data, error, deleteData } = useFetchData(tableName);
  const [rows, setRows] = useState<any[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
  const [feedback, setFeedback] = useState<{ open: boolean, message: string, severity: 'success' | 'error' | 'info' | 'warning' }>({ open: false, message: '', severity: 'success' });

  // Sync rows state with fetched data
  useEffect(() => {
    setRows(formatData(data));
  }, [data]);

  const baseColumns = generateColumns(rows);

  const columns: GridColDef[] = [
    ...baseColumns,
    {
      field: 'actions',headerName: 'Actions',width: 100,
      renderCell: (params) => (
        <Button variant="text" size="small" onClick={(e) => { e.stopPropagation(); handleDelete(params.row); }}>
          Delete
        </Button>
      ),
    },
  ];

  const handleDelete = async (row: any) => {
    try {
      const uniqueKey = Object.keys(row).find((key) => key.toLowerCase().includes('id'));
      if (!uniqueKey) {
        throw new Error('No unique identifier field found in the row.');
      }

      await deleteData(`${row[uniqueKey]}`);

      const updatedRows = rows.filter((item) => item[uniqueKey] !== row[uniqueKey]);
      setRows(updatedRows);

      setFeedback({open: true, message: `Record with ID: ${row[uniqueKey]} deleted successfully`,severity: 'success', });
    } catch (error: any) {
      console.error('Failed to delete:', error);
      setFeedback({ open: true, message: `Failed to delete record: ${error.message}`, severity: 'error',});
    }
  };

  const handleBulkDelete = async () => {
    try {
      const uniqueKey = Object.keys(rows[0] || {}).find((key) => key.toLowerCase().includes('id'));
      if (!uniqueKey) {
        throw new Error('No unique identifier field found in the rows.');
      }

      // Use deleteData to delete records in bulk
      const deletePromises = selectionModel.map((id) => {
        const record = rows.find((row) => row[uniqueKey] === id);
        return record ? deleteData(`${record[uniqueKey]}`) : null;
      }).filter(Boolean);

      await Promise.all(deletePromises);

      // Update rows state to remove deleted records
      const remainingRows = rows.filter((row) => !selectionModel.includes(row[uniqueKey]));
      setRows(remainingRows);

      setFeedback({
        open: true,
        message: 'Selected records deleted successfully',
        severity: 'success',
      });
    } catch (error: any) {
      console.error('Failed to delete records:', error);
      setFeedback({
        open: true,
        message: `Failed to delete records: ${error.message}`,
        severity: 'error',
      });
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <Paper sx={{ p: 3, width: '100%' }}>
        <Box sx={{ height: 400, width: '100%' }}>
          <StyledDataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.employee_id}  
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={setSelectionModel}
          />
        </Box>


        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={selectionModel.length === 0}
            onClick={handleBulkDelete}
          >
            Delete Selected Records ({selectionModel.length})
          </Button>
        </Box>

        {/* Feedback Snackbar */}
        <Snackbar
          open={feedback.open}
          autoHideDuration={6000}
          onClose={() => setFeedback({ ...feedback, open: false })}
        >
          <Alert
            severity={feedback.severity}
            onClose={() => setFeedback({ ...feedback, open: false })}
          >
            {feedback.message}
          </Alert>
        </Snackbar>
      </Paper>
  );
}

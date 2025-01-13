import React, { useState, useEffect } from 'react';
import { Box, Button, Snackbar, Alert, Paper } from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { AppProvider } from '@toolpad/core';
import useFetchData from '../../hooks/useFetchData';
import { formatData, generateColumns } from '../../utils/formatData';

export default function DropRecord() {
  const tableName = 'employees';  // You can dynamically change this as needed
  const { data, error } = useFetchData(tableName);
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
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="text"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(params.row);
          }}
        >
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

      const endpointUrl = `http://localhost:3000/api/connection/${tableName}/${row[uniqueKey]}`;
      const response = await fetch(endpointUrl, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete record with ID: ${row[uniqueKey]}`);
      }

      // Update the local rows dynamically
      const updatedRows = rows.filter((item) => item[uniqueKey] !== row[uniqueKey]);
      setRows(updatedRows);

      setFeedback({
        open: true,
        message: `Record with ID: ${row[uniqueKey]} deleted successfully`,
        severity: 'success',
      });
    } catch (error) {
      console.error('Failed to delete:', error);
      setFeedback({
        open: true,
        message: `Failed to delete record: ${error.message}`,
        severity: 'error',
      });
    }
  };

  const handleBulkDelete = async () => {
    try {
      const uniqueKey = Object.keys(rows[0] || {}).find((key) => key.toLowerCase().includes('id'));
      if (!uniqueKey) {
        throw new Error('No unique identifier field found in the rows.');
      }

      // Create an array of delete promises
      const deletePromises = selectionModel.map((id) => {
        const record = rows.find((row) => row[uniqueKey] === id);
        if (record) {
          const endpointUrl = `http://localhost:3000/api/connection/${tableName}/${record[uniqueKey]}`;
          return fetch(endpointUrl, {
            method: 'DELETE',
          });
        }
        return null;
      }).filter(Boolean);

      // Wait for all delete operations to complete
      await Promise.all(deletePromises);

      // Update rows state to remove deleted records
      const remainingRows = rows.filter((row) => !selectionModel.includes(row[uniqueKey]));
      setRows(remainingRows);

      setFeedback({
        open: true,
        message: 'Selected records deleted successfully',
        severity: 'success',
      });
    } catch (error) {
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
    <AppProvider branding={{ title: 'ACME Inc.' }}>
      <Paper sx={{ p: 3, width: '100%' }}>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
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
    </AppProvider>
  );
}

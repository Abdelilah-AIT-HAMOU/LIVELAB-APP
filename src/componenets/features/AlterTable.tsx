import React, { useState, useEffect } from 'react';
import {  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Snackbar, TextField, Alert } from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { AppProvider } from '@toolpad/core';
import useFetchData from '../../hooks/useFetchData';
import { formatData, generateColumns } from '../../utils/formatData';

export default function AlterTable() {
  const tableName = 'employees';
  const { data } = useFetchData(tableName);
  const [rows, setRows] = useState<any[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
  const [editDialog, setEditDialog] = useState(false);
  const [editRow, setEditRow] = useState<any>(null);
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
            handleEditClick(params.row);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  const handleEditClick = (row: any) => {
    setEditRow(row);
    setEditDialog(true);
  };

  const handleEditClose = () => {
    setEditDialog(false);
    setEditRow(null);
  };

  const handleEditSave = async () => {
    try {
      // Infer the unique identifier field from the row dynamically
      const uniqueKey = Object.keys(editRow).find(key => key.toLowerCase().includes('id'));
      if (!uniqueKey) {
        throw new Error('No unique identifier field found in the row.');
      }

      // Construct the dynamic endpoint URL
      const endpointUrl = `http://localhost:3000/api/connection/${tableName}/${editRow[uniqueKey]}`;

      const response = await fetch(endpointUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editRow),
      });

      if (!response.ok) {
        throw new Error('Failed to update record');
      }
      // Update the local rows dynamically
      const updatedRows = rows.map((row) =>
        row[uniqueKey] === editRow[uniqueKey] && typeof row === 'object' && typeof editRow === 'object' ? { ...row, ...editRow } : row
      );
      setRows(updatedRows);

      // Show success feedback
      setFeedback({
        open: true,
        message: 'Record updated successfully',
        severity: 'success',
      });

      handleEditClose();
    } catch (error) {
      console.error('Failed to update:', error);
      setFeedback({
        open: true,
        message: `Failed to update record: ${error.message}`,
        severity: 'error',
      });
    }
  };


  const handleFieldChange = (field: string, value: any) => {
    setEditRow((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBulkUpdate = async () => {
    try {
      // Create an array of update promises
      const updatePromises = selectionModel.map(id => 
        fetch(`/api/${tableName}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ /* your bulk update data here */ }),
        })
      );

      // Wait for all updates to complete
      await Promise.all(updatePromises);

      // Show success message
      setFeedback({
        open: true,
        message: 'Records updated successfully',
        severity: 'success'
      });

    } catch (error) {
      console.error('Failed to update records:', error);
      setFeedback({
        open: true,
        message: 'Failed to update records',
        severity: 'error'
      });
    }
  };

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

        {/* Edit Dialog */}
        <Dialog open={editDialog} onClose={handleEditClose}>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogContent>
            {editRow && Object.keys(editRow).map((field) => {
              // Skip fields you don't want to edit
              if (field === 'employee_id' || field === 'actions') return null;

              return (
                <TextField
                  key={field}
                  margin="dense"
                  label={field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={editRow[field] || ''}
                  onChange={(e) => handleFieldChange(field, e.target.value)}
                />
              );
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button onClick={handleEditSave} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>

        {/* Bulk Update Button */}
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth
            disabled={selectionModel.length === 0}
            onClick={handleBulkUpdate}
          >
            Update Selected Records ({selectionModel.length})
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
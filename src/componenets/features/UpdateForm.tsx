/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
**
*/

import React, { useState, useEffect } from 'react';
import {  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Snackbar, TextField, Alert } from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
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
       const uniqueKey = Object.keys(editRow).find(key => key.toLowerCase().includes('id'));
      if (!uniqueKey) {
        throw new Error('No unique identifier field found in the row.');
      }

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
       const updatedRows = rows.map((row) =>
        row[uniqueKey] === editRow[uniqueKey] && typeof row === 'object' && typeof editRow === 'object' ? { ...row, ...editRow } : row
      );
      setRows(updatedRows);

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
       const updatePromises = selectionModel.map(id => 
        fetch(`/api/${tableName}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ }),
        })
      );

       await Promise.all(updatePromises);

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

    <Paper sx={{   p: 3,   width: '100%',   border: '1px solid',   borderColor: 'grey.300',   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',   borderRadius: 2, }}>
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

         <Dialog open={editDialog} onClose={handleEditClose}>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogContent>
            {editRow && Object.keys(editRow).map((field) => {
 
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
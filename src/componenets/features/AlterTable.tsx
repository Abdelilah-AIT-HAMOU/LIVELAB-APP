import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid, GridRowSelectionModel, GridEventListener } from '@mui/x-data-grid';

export default function AlterTable() {
  const [rows, setRows] = useState<any[]>([]); // Dynamic data
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]); // Track selected rows

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://g7775ce87bebf43-sqlcllivelabs.adb.eu-amsterdam-1.oraclecloudapps.com/ords/admin/employees/'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        const formattedRows = result.items.map((item: any, index: number) => ({
          id: item.id || index, // Ensure unique IDs
          ...item,
        }));
        setRows(formattedRows);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  // Handle cell edit and update specific value
  const handleProcessCellEdit = async (params: any) => {
    const { id, field, value } = params;

    // Optimistically update the specific cell in the local state
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );

    // Send the updated cell value to the backend
    try {
      const response = await fetch(
        `https://g7775ce87bebf43-sqlcllivelabs.adb.eu-amsterdam-1.oraclecloudapps.com/ords/admin/employees/${id}`, // Update endpoint
        {
          method: 'PATCH', // Use PATCH for partial updates
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ [field]: value }), // Send the specific field update
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update record');
      }

      console.log(`Successfully updated ${field}: ${value}`);
    } catch (error) {
      console.error('Error updating cell:', error);
      // Rollback on error: revert to the previous state
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, [field]: params.oldValue } : row
        )
      );
    }
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={Object.keys(rows[0] || {}).map((key) => ({
          field: key,
          headerName: key.replace(/_/g, ' ').toUpperCase(),
          width: 150,
          editable: true, // Enable cell editing
        }))}
        disableRowSelectionOnClick
        onCellEditStop={handleProcessCellEdit} // Handle cell edit events
        onRowSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        experimentalFeatures={{ newEditingApi: true }} // Enable editing API
      />
      <Button variant="contained" onClick={() => console.log('Selected Rows:', selectionModel)} sx={{ mt: 2 }}>
        Save Selected Data
      </Button>
    </Box>
  );
}

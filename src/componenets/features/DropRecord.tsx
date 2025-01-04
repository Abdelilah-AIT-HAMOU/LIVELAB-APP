import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid';

export default function DropRecord() {

    const [rows, setRows] = useState<any[]>([]); // Use `any[]` for dynamic data
    const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]); // Keep track of selected rows

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
            id: index, // Add a unique id for selection purposes
            ...item,
          }));
          setRows(formattedRows);
        } catch (error) {
          console.error(error.message);
        }
      };

      fetchData();
    }, []);

    const handleSave = () => {
      const selectedData = selectionModel.map((id) =>
        rows.find((row) => row.id === id)
      );
      console.log('Selected Data:', selectedData);
      // Here you can handle sending the selected data to the database
    };


  return (
    <Box sx={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={Object.keys(rows[0] || {}).map((key) => ({
        field: key,
        headerName: key.replace(/_/g, ' ').toUpperCase(),
        width: 150,
      }))}
      checkboxSelection
      disableRowSelectionOnClick
      onRowSelectionModelChange={(newSelectionModel) => {
        setSelectionModel(newSelectionModel);
      }}
    />
    <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
      delete Selected Data
    </Button>
  </Box>
  );
}

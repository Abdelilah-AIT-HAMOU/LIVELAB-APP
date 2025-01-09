import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import  { DataGrid } from '@mui/x-data-grid';
import  { useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import {generateColumns, formatData } from '../../utils/formatData';

export default function FlexGrid() {
  const tableName = 'employees';
  const { data, loading, error } = useFetchData(tableName);
  const [nbRows, setNbRows] = useState(3);

  // extract only the items array
  const rows = formatData(data);

  const removeRow = () => setNbRows((prev) => Math.max(0, prev - 1));
  const addRow = () => setNbRows((prev) => Math.min(rows.length, prev + 1));
  const showAllRows = () => setNbRows(rows.length);


  const columns = generateColumns(rows);

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log('Rows:', rows);

  return (

    <Box sx={{ width: '90%' }}>
    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
      <Button size="small" onClick={removeRow} disabled={nbRows <= 0}>
        Remove a row
      </Button>
      <Button size="small" onClick={addRow} disabled={nbRows >= rows.length}>
        Add a row
      </Button>
      <Button size="small" onClick={showAllRows} disabled={nbRows >= rows.length}>
        Show All Rows
      </Button>
    </Stack>
    <div style={{ height: 600, width: '100%' }}>
    <DataGrid
       rows={rows|| []}
       columns={columns}
       loading={loading}
       paginationModel={{ pageSize: nbRows, page: 0 }}
        getRowId={(row) => row.employee_id}
    />
    </div>
    <br />
  </Box>
  );
}
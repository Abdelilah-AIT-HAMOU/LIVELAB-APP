import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { generateColumns, formatData } from '../../utils/formatData';
import { Paper } from '@mui/material';
import { StyledDataGrid } from '../common/styleGrid';



export default function DisplayEmployee() {
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

 
  return (
    <Paper sx={{ p: 3, width: '100%', border: '1px solid', borderColor: 'grey.300', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: 2 }}>
      <Box sx={{ width: '100%' }}>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>

        </Stack>
        <div style={{ height: 500, width: '100%' }}>
          <StyledDataGrid 
            rows={rows || []}
            columns={columns}
            loading={loading}
            paginationModel={{ pageSize: nbRows, page: 0 }}
            getRowId={(row) => row.employee_id}
          />
        </div>
        <br />
      </Box>
    </Paper>
  );
}
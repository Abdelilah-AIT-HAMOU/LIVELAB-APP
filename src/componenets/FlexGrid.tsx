import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import  { useEffect, useState } from 'react';
import DisableElevation from './common/Mybutton';

export default function FlexGrid() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nbRows, setNbRows] = useState(3);

    const removeRow = () => setNbRows((prev) => Math.max(0, prev - 1));
    const addRow = () => setNbRows((prev) => Math.min(rows.length, prev + 1));
    const showAllRows = () => setNbRows(rows.length);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://g7775ce87bebf43-sqlcllivelabs.adb.eu-amsterdam-1.oraclecloudapps.com/ords/admin/employees/');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const result = await response.json();
          const formattedRows = result.items.map((item, index) => ({
            id: index,
            EMPLOYEE_ID: item.employee_id,
            FIRST_NAME: item.first_name,
            LAST_NAME: item.last_name,
            EMAIL: item.email,
            PHONE_NUMBER: item.phone_number,
            HIRE_DATE: item.hire_date,
          }));
          setRows(formattedRows);

        } catch (error) {
          console.error(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    const columns = [
      { field: 'EMPLOYEE_ID', headerName: 'Employee ID', width: 150 },
      { field: 'FIRST_NAME', headerName: 'First Name', width: 150 },
      { field: 'LAST_NAME', headerName: 'Last Name', width: 150 },
      { field: 'EMAIL', headerName: 'Email', width: 200 },
      { field: 'PHONE_NUMBER', headerName: 'Phone Number', width: 150 },
      { field: 'HIRE_DATE', headerName: 'Hire Date', width: 150 },
    ];

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
          rows={rows.slice(0, nbRows)} // Limit rows based on nbRows
          columns={columns}
          loading={loading}
          paginationModel={{ pageSize: nbRows, page: 0 }}
        />
      </div>
      <br></br>
    </Box>
  );
}
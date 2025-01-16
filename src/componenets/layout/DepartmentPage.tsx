import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import { Paper, Box, useTheme } from '@mui/material';
import { AppProvider } from '@toolpad/core/AppProvider';
import DepartmentCards from '../common/DepartmentCards';
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid';
import React from 'react';
import useFetchData from '../../hooks/useFetchData';
import { formatData } from '../../utils/formatData';

function DepartmentPage() {
  const tableName = 'departments';
  const theme = useTheme();
  const { data } = useFetchData(tableName);
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);

  const rows = formatData(data);
  // Calculate statistics
  const totalDepartments = rows.length;
  const departmentsWithManagers = rows.filter((row) => row.MANAGER_ID).length;
  const uniqueLocations = new Set(rows.map((row) => row.LOCATION)).size;

  const cardColors = {
    "Total Departments": "#D1C4E9", // Light Lavender
    "Departments with Managers": "#B2DFDB", // Pale Mint Green
    "Unique Locations": "#FFABAB", // Light Coral
    "Other Stat": "#FFF9C4", // Pastel Yellow
  };

  return (
    <AppProvider
      theme={theme}
      branding={{
        title: 'ACME Inc.',
      }}
    >
      <Paper sx={{ p: 3, width: '100%' }}>
        <Grid container spacing={3}>
          <Grid size={3}>
            <DepartmentCards
              title="Total Departments"
              value={totalDepartments}
              sx={{ backgroundColor: cardColors["Total Departments"]}}
            />
          </Grid>
          <Grid size={3}>
            <DepartmentCards
              title="Departments with Managers"
              value={departmentsWithManagers}
              sx={{ backgroundColor: cardColors["Departments with Managers"]}}
            />
          </Grid>
          <Grid size={3}>
            <DepartmentCards
              title="Unique Locations"
              value={uniqueLocations}
              sx={{ backgroundColor: cardColors["Unique Locations"]}}
            />
          </Grid>
          <Grid size={3}>
            <DepartmentCards
              title="Other Statistics ..."
              value={0}
              sx={{ backgroundColor: cardColors["Other Stat"]}}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, width: '100%' }}>
        <Grid container spacing={3} sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Grid size={8}>
            <Box sx={{ height: 300, width: '800px'}}>
              <DataGrid
                rows={rows.map((row, index) => ({ ...row, id: index }))}
                rowHeight={50}
                columns={Object.keys(rows[0] || {}).map((key) => ({
                  field: key,
                  headerName: key.replace(/_/g, ' ').toUpperCase(),
                  width: 150,
                }))}
                disableRowSelectionOnClick
                onRowSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </AppProvider>
  );
}

export default DepartmentPage;

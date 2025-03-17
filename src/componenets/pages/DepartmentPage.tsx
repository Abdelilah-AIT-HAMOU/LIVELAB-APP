/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
**
*/

import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { Paper, Box, useTheme } from '@mui/material';
import { AppProvider } from '@toolpad/core/AppProvider';
import DepartementCards from '../common/DepartementCards';
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid';
import React from 'react';
import useFetchData from '../../hooks/useFetchData';
import { formatData } from '../../utils/formatData';
import { StyledDataGrid } from '../common/styleGrid';

function DepartmentPage() {
  const tableName = 'departments';
  const theme = useTheme();
  const {data} = useFetchData(tableName);
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);

  const rows = formatData(data);
  // Calculate statistics
  const totalDepartments = rows.length;
  const departmentsWithManagers = rows.filter((row) => row.MANAGER_ID).length;
  const uniqueLocations = new Set(rows.map((row) => row.LOCATION)).size;


  return (
    <AppProvider
      theme={theme}
      branding={{
        title: 'ACME Inc.',
      }}
    >
      <Paper sx={{p: 3,width: '100%',border: '1px solid',borderColor: 'grey.300',boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid size={3}>
            <DepartementCards title="Total Departments" value={totalDepartments} color="#90CAF9"/>
          </Grid>
          <Grid size={3}>
            <DepartementCards title="Departments with Managers" value={departmentsWithManagers} color="rgba(255, 204, 204, 1)"/>
          </Grid>
          <Grid size={3}>
            <DepartementCards title="Unique Locations" value={uniqueLocations} color="#A5D6A7"/>
          </Grid>
          <Grid size={3}>
            <DepartementCards title="More Other Statistics" value={0} color="#FFCC80"/> {/* not implim yet */}
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{p: 3,width: '100%',border: '1px solid',borderColor: 'grey.300',boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',borderRadius: 2 }}>
            <Box sx={{ height: 300, width: '100%' }}>
              <StyledDataGrid
                rows={rows.map((row, index) => ({ ...row, id: index }))}
                rowHeight={50}
                columns={Object.keys(rows[0] || {}).map((key) => ({
                  field: key,
                  headerName: key.replace(/_/g, ' ').toUpperCase(),
                  width: 200,
                }))}
                disableRowSelectionOnClick
              //  onRowSelectionModelChange={(newSelectionModel) => {
               //   setSelectionModel(newSelectionModel);
              //  }}
              />
            </Box>
      </Paper>
    </AppProvider>
  );
}

export default DepartmentPage;

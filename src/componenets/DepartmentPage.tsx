import Grid from '@mui/material/Grid2';
import useStatenReact, { useEffect, useState } from 'react';
 import { Alert, Box, Paper, useTheme } from '@mui/material';
import { AppProvider } from '@toolpad/core/AppProvider';
import DepartementCards from './common/DepartementCards';
import AlterTable from './features/AlterTable';
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid';
import React from 'react';
import OpenChart from './charts/OpenChart';

function DepartmentPage() {
     const theme = useTheme();
     const [rows, setRows] = useState<any[]>([]); 
     const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            'https://g7775ce87bebf43-sqlcllivelabs.adb.eu-amsterdam-1.oraclecloudapps.com/ords/admin/departments/'          );
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const result = await response.json();
          const formattedRows = result.items.map((item: any, index: number) => ({
            id: index, 
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
 <AppProvider
            theme={theme}
            branding={{
                title: 'ACME Inc.',
            }}>

           <Paper sx={{ p: 3, width: '100%' }}>
                 <Grid container spacing={3}>
                   <Grid size={3}>
                   <DepartementCards></DepartementCards>
                   </Grid>
                   <Grid size={3}>
                   <DepartementCards></DepartementCards>
                   </Grid>
                   <Grid size={3}>
                   <DepartementCards></DepartementCards>
                   </Grid>
                   <Grid size={3}>
                   <DepartementCards></DepartementCards>
                   </Grid>
                </Grid>
           </Paper>
             
          <Paper sx={{ p: 3, width: '100%' }}>
            <Grid container spacing={3} sx={{ display: 'flex', alignItems: 'flex-start' }}>  
              <Grid size={8} /* Adjust width relative to grid layout */>
                 <Box sx={{ height: 300, width: '100%', maxWidth: 600, }}>
                   <DataGrid rows={rows} rowHeight={20} columns={Object.keys(rows[0] || {}).map((key) => ({field: key,headerName: key.replace(/_/g, ' ').toUpperCase(),width: 100,}))}disableRowSelectionOnClick onRowSelectionModelChange={(newSelectionModel) => { setSelectionModel(newSelectionModel); }}/>
                 </Box>
              </Grid>
              <Grid  size={4} >
               <OpenChart />
              </Grid>
            </Grid>
         </Paper>
    </AppProvider>
    );
};

export default DepartmentPage;
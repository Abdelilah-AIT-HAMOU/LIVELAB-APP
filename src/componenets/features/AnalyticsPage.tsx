import React from 'react';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Chart from '../charts/BasicPie';



function AnalyticsPage () {

return (
<Paper sx={{ p: 2, width: '100%' }}>
    <Grid container spacing={3}>
         <Grid size={7}>
            <Chart></Chart>
         </Grid>
</Grid>
</Paper>
    );
};

export default AnalyticsPage;
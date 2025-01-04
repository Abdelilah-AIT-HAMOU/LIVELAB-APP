    import React from 'react';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import BasicBars from '../charts/BasicBars';
import BasicLineChart from '../charts/BasicLineChart';
import GridDemo from '../charts/GridDemo';
import SimpleLineChart from '../charts/SimpleLineChart';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

 function AnalyticsPage () {
    return (
<Paper sx={{ p: 2, width: '100%' }}>
    <Grid container spacing={3}>
        <Grid size={7}>
              <BasicBars/>
         </Grid>

    <Grid size={5}>
         <BasicLineChart/>
    </Grid>

     <Grid size={4}>
      <GridDemo></GridDemo>
    </Grid>

    <Grid size={4}>
      <SimpleLineChart></SimpleLineChart>
    </Grid>

</Grid>
</Paper>
    );
};

export default AnalyticsPage;
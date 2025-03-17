/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
**
*/

import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AttendanceChart from '../charts/AttendanceChart';
import EmployeesPerDepartmentChart from '../charts/EmployeesPerDepartmentChart';
import PerformancePieChart from '../charts/PerformanceReview';

function AnalyticsPage() {
  return (
    <Paper sx={{   p: 3,   width: '100%',   border: '1px solid',   borderColor: 'grey.300',   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',   borderRadius: 2, }}>
      <Grid container spacing={1}>        <Grid item xs={12} sm={6}>
          <Paper  sx={{ p: 2, textAlign: 'center', display: 'flex',    flexDirection: 'column',    justifyContent: 'center',    alignItems: 'center',    height: 300,  }}  elevation={3}>

            <Typography variant="h6" component="div" gutterBottom>
              Performance Score Distribution
            </Typography>

            <PerformancePieChart />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 2, textAlign: 'center',display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',height: 300,}}  elevation={3}>
            <Typography variant="h6" component="div" gutterBottom>
              Attendance
            </Typography>
            <AttendanceChart />
          </Paper>
        </Grid>

       <Grid item xs={12}>

          <Paper   sx={{     p: 2,     textAlign: 'center',     display: 'flex',     flexDirection: 'column',     justifyContent: 'center',     alignItems: 'center',     height: 300,    }}   elevation={3} >

            <Typography variant="h6" component="div" gutterBottom>
              Employees per Department
            </Typography>

            <EmployeesPerDepartmentChart />

          </Paper>
        </Grid>
      </Grid>

    </Paper>
  );
}

export default AnalyticsPage;

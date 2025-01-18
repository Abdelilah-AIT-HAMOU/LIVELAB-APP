import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AttendanceChart from '../charts/Attendance';
import EmployeesPerDepartmentChart from '../charts/EmployeesPerDepartmentChart';
import PerformancePieChart from '../charts/PerformanceReview';

function AnalyticsPage() {
  return (
    <Paper sx={{ p: 2, width: '100%' }}>
      <Grid container spacing={1}>
        {/* Employees Per Department Chart */}
        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              p: 2,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: 300, // Optional: Set a fixed height
            }}
            elevation={3}
          >
            {/* Title */}
            <Typography variant="h6" component="div" gutterBottom>
              Employees per Department
            </Typography>
            {/* Chart */}
            <EmployeesPerDepartmentChart />
          </Paper>
        </Grid>

        {/* Attendance Chart */}
        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              p: 2,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: 300, // Optional: Set a fixed height
            }}
            elevation={3}
          >
            {/* Title */}
            <Typography variant="h6" component="div" gutterBottom>
              Attendance
            </Typography>
            {/* Chart */}
            <AttendanceChart />
          </Paper>
        </Grid>

        {/* Performance Score Pie Chart */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: 300, // Optional: Set a fixed height
            }}
            elevation={3}
          >
            {/* Title */}
            <Typography variant="h6" component="div" gutterBottom>
              Performance Score Distribution
            </Typography>
            {/* Chart */}
            <PerformancePieChart />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AnalyticsPage;

import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AttendanceChart from '../charts/Attendance';
import EmployeesPerDepartmentChart from '../charts/EmployeesPerDepartmentChart'; // Import the new chart
import PerformancePieChart from '../charts/PerformanceReview'; // Import the Performance Pie Chart

function AnalyticsPage() {
  return (
    <Paper sx={{ p: 2, width: '800px' }}>
      <Grid container spacing={3}>
        {/* Employees Per Department Chart */}
        <Grid item xs={12} sm={5}>
          <Paper sx={{ p: 2, textAlign: 'center' }} elevation={3}>
            {/* Title */}
            <Typography variant="h6" component="div" gutterBottom>
              Employees per Department
            </Typography>
            {/* Chart */}
            <EmployeesPerDepartmentChart />
          </Paper>
        </Grid>

        {/* Attendance Chart */}
        <Grid item xs={12} sm={7}>
          <Paper sx={{ p: 2, textAlign: 'center' }} elevation={3}>
            {/* Title */}
            <Typography variant="h6" component="div" gutterBottom>
              Attendance
            </Typography>
            {/* Chart */}
            <AttendanceChart />
          </Paper>
        </Grid>

        {/* Performance Score Pie Chart */}
        <Grid item xs={12} sm={7}>
          <Paper sx={{ p: 2, textAlign: 'center' }} elevation={3}>
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

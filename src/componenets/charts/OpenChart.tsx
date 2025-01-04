import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';

const OpenChart = () => {
  const chartUrl =
    'https://g7775ce87bebf43-sqlcllivelabs.adb.eu-amsterdam-1.oraclecloudapps.com/ords/admin/_sdw/charts/?name=employee_chart';

  const handleOpenChart = () => {
    window.open(chartUrl, '_blank');
  };

  return (
    <Card
      sx={{
        width: 220,
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 3,
        marginLeft: '20px', // Adds space between table and card
      }}
    >
      <CardActionArea onClick={handleOpenChart}>
        <CardContent sx={{ textAlign: 'center' }}>
          <BarChartIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="body1" component="div">
            Open Chart
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default OpenChart;

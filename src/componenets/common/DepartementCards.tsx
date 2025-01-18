import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

type DepartementCardsProps = {
  title: string;
  value: number;
  color?: string; 
};

function DepartementCards({ title, value, color="#ADD8E6"}: DepartementCardsProps) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: 'flex',
        backgroundColor: color,
        color: theme.palette.getContrastText(color), 
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6">
            {title}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            {value}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

export default DepartementCards;

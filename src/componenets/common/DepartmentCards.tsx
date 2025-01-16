import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

// Define prop types
type DepartmentCardsProps = {
  title: string;
  value: number;
  sx?: object; // Add sx as a prop to dynamically style the Card
};

function DepartmentCards({ title, value, sx }: DepartmentCardsProps) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', ...sx }}> {/* Apply sx dynamically */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6" sx={{ color: 'text.secondary' }}>
            {title}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: 'text.primary' }}
          >
            {value}
          </Typography>
        </CardContent>

        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        </Box>
      </Box>
    </Card>
  );
}

export default DepartmentCards;

import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
function DepartementCards() {
        const theme = useTheme();

    return (
        <Card sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>

          <CardContent sx={{ flex: '1 0 auto' }}>

          <IconButton aria-label="previous">
              {theme.direction === 'rtl' ? <KeyboardDoubleArrowUpIcon /> : <KeyboardDoubleArrowUpIcon />}
            </IconButton>
            <Typography component="div" variant="h5"> BLA BLA  </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: 'text.secondary' }}
            >
              Mac Miller
            </Typography>

          </CardContent>

          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              Bla bla
          </Box>
        </Box>
      </Card>
    );
};

export default DepartementCards;
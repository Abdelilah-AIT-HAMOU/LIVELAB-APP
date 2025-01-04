import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Uploadbutton from './Uploadbutton';

const card = (
  <React.Fragment>
    <CardContent>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
       import Data
      </Typography>
      <Typography variant="h5" component="div">
        Upload your JSON file to the database 
      </Typography>
    </CardContent>
    <CardActions>
      <Uploadbutton buttonName='json'></Uploadbutton>
    </CardActions>
  </React.Fragment>
);
const card2 = (
  <React.Fragment>
    <CardContent>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
       import Data
      </Typography>
      <Typography variant="h5" component="div">
        Upload your CSV file to the database 
      </Typography>
    </CardContent>
    <CardActions>
      <Uploadbutton buttonName='CSV'></Uploadbutton>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
      <Card variant="outlined">{card2}</Card>
    </Box>
  );
}
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { TextField, Grid, Paper} from '@mui/material';
import  Grid2  from '@mui/material/Grid2';
import { useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { formatData } from '../../utils/formatData';
import { response } from 'express';
import { AppProvider } from '@toolpad/core';

export default function DynamicForm() {
  const tableName = 'employees'; // Set the table name for dynamic fetching
  const { data, loading, error, postData } = useFetchData(tableName); // Use postData from the hook
  const [formData, setFormData] = useState({});

  // Format the data and use it directly
  const rows = formatData(data);

  // Handle changes to form inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Use the postData function from the hook to submit the data
     // const result = await postData(formData);
      alert('Employee record added successfully!');
      setFormData({}); // Reset form after submission
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('Error: ' + error.message);
    }

    // Log the form data for debugging
    console.log('Form Data:', formData);
  };

  if (loading) return <div>Loading...</div>;

  return (
<AppProvider branding={{  title: 'ACME Inc.',}}>
  <Paper sx={{ p: 3, width: '100%' }}>
    <Box sx={{ width: '100%' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {rows && rows.length > 0 &&
            Object.keys(rows[0]).map((key) => {
              return (
                <Grid item xs={12} sm={6} key={key}>
                  <TextField
                    label={key}
                    name={key}
                    value={formData[key] || ''}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
              );
            })
          }
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Employee
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
    </Paper>
    </AppProvider>
  );
}

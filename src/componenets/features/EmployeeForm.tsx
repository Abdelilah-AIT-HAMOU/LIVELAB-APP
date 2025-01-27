/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
**
*/

import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { TextField, Grid, Paper, Snackbar, Alert } from '@mui/material';
import { useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { formatData } from '../../utils/formatData';

export default function DynamicForm() {

  const tableName = 'employees';

  const { data, loading, error, postData } = useFetchData(tableName);
  const [formData, setFormData] = useState({});
  const [feedback, setFeedback] = useState<{  open: boolean;message: string;severity: 'success' | 'error' | 'warning' | 'info';}>({
    open: false,
    message: '',
    severity: 'success',
  });
  const rows = formatData(data);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await postData(formData);
      setFeedback({
        open: true,
        message: 'Employee record added successfully!',
        severity: 'success',
      });
      setFormData({});
    } catch (error) {
       setFeedback({
        open: true,
        message: `Failed to add record: ${error.message}`,
        severity: 'error',
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Paper sx={{   p: 3,   width: '100%',   border: '1px solid',   borderColor: 'grey.300',   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',   borderRadius: 2, }}>
    <Box sx={{ width: '100%' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {rows &&
            rows.length > 0 &&
            Object.keys(rows[0]).map((key) => {
              return (
                <Grid item xs={12} sm={6} key={key}>
                  <TextField
                    label={key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                    name={key}
                    value={formData[key] || ''}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
              );
            })}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Employee
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  
    <Snackbar
      open={feedback.open}
      autoHideDuration={6000}
      onClose={() => setFeedback({ ...feedback, open: false })}
    >
      <Alert
        severity={feedback.severity}
        onClose={() => setFeedback({ ...feedback, open: false })}
      >
        {feedback.message}
      </Alert>
    </Snackbar>
  </Paper>
  
  );
}

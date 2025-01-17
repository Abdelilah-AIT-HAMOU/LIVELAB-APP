import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { TextField, Grid, Paper, Snackbar, Alert } from '@mui/material';
import { useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { formatData } from '../../utils/formatData';
import { AppProvider } from '@toolpad/core';

export default function DynamicForm() {
  const tableName = 'employees';
  const { data, loading, error, postData } = useFetchData(tableName);
  const [formData, setFormData] = useState({});
  const [feedback, setFeedback] = useState<{  open: boolean;message: string;severity: 'success' | 'error' | 'warning' | 'info';}>({
    open: false,
    message: '',
    severity: 'success',
  });

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
      await postData(formData);

      // Show success
      setFeedback({
        open: true,
        message: 'Employee record added successfully!',
        severity: 'success',
      });

      setFormData({});
    } catch (error) {
      console.error('Error during form submission:', error);

      // Show error
      setFeedback({
        open: true,
        message: `Failed to add record: ${error.message}`,
        severity: 'error',
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AppProvider branding={{ title: 'ACME Inc.' }}>
      <Paper sx={{ p: 3, width: '100%' }}>
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

        {/* Feedback Snackbar */}
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
    </AppProvider>
  );
}

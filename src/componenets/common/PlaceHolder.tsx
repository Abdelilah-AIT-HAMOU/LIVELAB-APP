/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** 
*/

import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

interface PlaceHolderProps {
  PlaceHolderName: string;
}

export default function PlaceHolder({ PlaceHolderName }: PlaceHolderProps) {
  return (
    <Paper sx={{   p: 20,   width: '100%',   display: 'flex',   justifyContent: 'center',   alignItems: 'center' }}>
      <Stack sx={{ width: '100%', textAlign: 'center' }} spacing={2}>
        <Alert severity="warning" sx={{ fontSize: 22, fontWeight: 'medium' }}>
          {PlaceHolderName} feature coming soon!
        </Alert>
      </Stack>
    </Paper>
  );
}
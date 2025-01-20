/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
**
*/

import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

interface DescriptionAlertsProps {
  DescriptionInfoName: string;
}

export default function DescriptionInfo({ DescriptionInfoName }: DescriptionAlertsProps) {
  // Remove leading slash if present
  const formattedName = DescriptionInfoName.startsWith('/')
    ? DescriptionInfoName.slice(1)
    : DescriptionInfoName;

  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="info">
        <AlertTitle sx={{ color: 'text.primary', fontSize: 20, fontWeight: 'medium' }}>
          Page Content for {formattedName}
        </AlertTitle>
      </Alert>
    </Stack>
  );
}

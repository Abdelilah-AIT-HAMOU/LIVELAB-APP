/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
**
*/

import React from 'react';
import { Chip } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SyncIcon from '@mui/icons-material/Sync';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AnalyticsIcon from '@mui/icons-material/Analytics';

export const NAVIGATION = [
  {
    kind: 'header' as const,
    title: 'Employees',
  },
  {
    kind: 'page' as const,
    segment: 'Employees-Dashboard',
    title: 'Display Employees',
    icon: <DashboardIcon />,
  },
  {
    kind: 'page' as const,
    segment: 'UpdateRecords',
    title: 'Update Records',
    icon: <SyncIcon />,
  },
  {
    kind: 'divider' as const,
  },
  {
    kind: 'header' as const,
    title: 'Departments',
  },
  {
    kind: 'page' as const,
    segment: 'Departments',
    title: 'Departments',
    //TODO : change V2 to NEW 
    action: <Chip label={"V2"} color="primary" size="small" />,
    icon: <ApartmentIcon />,
  },
  {
    kind: 'divider' as const,
  },
  {
    kind: 'header' as const,
    title: 'Analytics',
  },
  {
    kind: 'page' as const,
    segment: 'Analytics',
    title: 'Analytics',
    //TODO : change V3 to NEW 
    action: <Chip label={"V3"} color="primary" size="small" />,
    icon: <AnalyticsIcon />, 
  },
];

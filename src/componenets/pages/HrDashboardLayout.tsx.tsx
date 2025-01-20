/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
**
*/

import React from 'react';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import {NAVIGATION} from '../navigation/NavigationConfig'
import { HRPageContent } from './HRPageContentSwitcher';

/**
 * This file represents the main dashboard layout of the HR application. It serves 
 * as the entry point or root component for the HR dashboard, managing the overall theme, 
 * layout, and routing.
 * 
 */

interface DemoProps {
  window?: () => Window;
}

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function HrDashboard(props: DemoProps) {
  const { window } = props;
  const router = useDemoRouter('Employees-Dashboard');
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="../../../public/assets/logo-blue.png" />,
        title: 'HR MANAGEMENT',
        homeUrl: '/',
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <HRPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

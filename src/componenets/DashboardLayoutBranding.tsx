import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import FlexGrid from './FlexGrid';
import Chip from '@mui/material/Chip';
import UploadingPage from './UpladingPage';
import UpdateRecordsForm from './UpdateRecordsForm';
import Grid from '@mui/material/Grid2';
import Mybutton from './common/Mybutton';

import AnalyticsPage from './features/AnalyticsPage';
import AlterTable from './features/AlterTable';
import DropRecord from './features/DropRecord';
import { useState } from 'react';
import DepartmentPage from './DepartmentPage';

const NAVIGATION = [
  {
    kind: "header",
    title: 'Employees',
  },
  {
    segment: 'dashboard',
    title: 'display employees',
   // icon: <DashboardIcon />,
  },
  {
    segment: 'UpdateRecords',
    title: 'Update Records',
   // icon: <ShoppingCartIcon />,
  },
  {
    segment: 'Upload',
    title: 'upload',
   // icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: "header",
    title: 'Departments',
  },
  {
    segment: 'Departments',
    title: 'Departments',
    action: <Chip label={"v2"} color="primary" size="small" />,
  },

  {
    kind: "divider",
  },
  {
    kind: "header",
    title: 'Analytics',
  },
  {
    segment: 'Analytics',
    title: 'Analytics',
    action: <Chip label={"v3"} color="primary" size="small" />,
  },
];

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

function DemoPageContent({ pathname }: { pathname: string }) {
 console.log(pathname);

 const [activeComponent, setActiveComponent] = useState<string>('add');
 const handleButtonClick = (componentName: string) => {setActiveComponent(componentName);};

 const renderActiveComponent = () => {
  switch (activeComponent) {
    case 'add':
      return <UpdateRecordsForm />;
    case 'alter':
      return <AlterTable />;
    case 'drop':
      return <DropRecord />;
    default:
      return <UpdateRecordsForm />;
  }
};

  const renderContent = () => {
    switch (pathname) {
      case '/dashboard':
        return <FlexGrid />;
      case '/Upload':
        return <UploadingPage />;
      case '/UpdateRecords':
        return (
          <>
            <Grid container spacing={3}>
              <Mybutton
                buttonName='Add'
                onClick={() => handleButtonClick('add')}
              />
              <Mybutton
                buttonName='alter'
                onClick={() => handleButtonClick('alter')}
              />
              <Mybutton
                buttonName='drop'
                onClick={() => handleButtonClick('drop')}
              />
            </Grid>
            {renderActiveComponent()}
          </>
        );
      case '/Analytics':
        return <AnalyticsPage />;
        case '/Departments':
          return <DepartmentPage/>
      default:
        return <Typography>No content available for {pathname}</Typography>;
    }
  };

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
      {renderContent()}
    </Box>
  );
}

interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function DashboardLayoutBranding(props: DemoProps) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://e7.pngegg.com/pngimages/931/769/png-clipart-database-icon-database-free-blue-background-blue-angle-thumbnail.png" />,
        title: 'HR MANAGEMENT',
        homeUrl: '/',
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

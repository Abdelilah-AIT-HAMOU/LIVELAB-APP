import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import FlexGrid from './FlexGrid';
import UploadingPage from '../common/UploadingPage';
import UpdateRecordsForm from '../common/UpdateRecordsForm';
import Grid from '@mui/material/Grid2';
import Mybutton from '../common/Mybutton';
import AlterTable from '../features/AlterTable';
import DropRecord from '../features/DropRecord';
import { useState } from 'react';
import { Alert } from '@mui/material';
import AnalyticsPage from '../features/AnalyticsPage';
import DepartmentPage from './DepartmentPage';
const NAVIGATION = [
  {
    kind: 'header' as const,
    title: 'Employees',
  },
  {
    kind: 'page' as const,
    segment: 'dashboard',
    title: 'Display Employees',
   // icon: <DashboardIcon />,
  },
  {
    kind: 'page' as const,
    segment: 'UpdateRecords',
    title: 'Update Records',
   // icon: <ShoppingCartIcon />,
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
   // action: <Chip label={"v2"} color="primary" size="small" />,
  },
  {
    kind: "divider" as const,
  },
  {
    kind: 'header' as const,
    title: 'Analytics',
  },
  {
    kind: 'page' as const,
    segment: 'Analytics',
    title: 'Analytics',
   // action: <Chip label={"v3"} color="primary" size="small" />,
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
                buttonName='Update'
                onClick={() => handleButtonClick('alter')}
              />
              <Mybutton
                buttonName='Delete'
                onClick={() => handleButtonClick('drop')}
              />
            </Grid>
            {renderActiveComponent()}
          </>
        );
      case '/Analytics':
        return <AnalyticsPage />;
      // <Alert severity="error">Error: this page is Not working , update the database.</Alert>;

        case '/Departments':
          return <DepartmentPage/>;
          // <Alert severity="error">Error: this page is Not working , update the database.</Alert>;

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
        logo: <img src="../../assets/Q.svg" />,
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

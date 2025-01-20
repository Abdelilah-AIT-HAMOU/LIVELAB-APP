import React, { useState } from 'react';
import { Box, Typography, Chip, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SyncIcon from '@mui/icons-material/Sync';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import FlexGrid from './FlexGrid';
import UpdateRecordsForm from '../features/DynamicForm';
import Mybutton from '../common/Mybutton';
import AlterTable from '../features/AlterTable';
import DropRecord from '../features/DropRecord';
import AnalyticsPage from './AnalyticsPage';
import DepartmentPage from './DepartmentPage';
import PlaceHolder from '../common/PlaceHolder';
import DescriptionInfo from '../common/DescriptionInfoAlert';

const NAVIGATION = [
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
    action: <Chip label={"v2"} color="primary" size="small" />,
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
    action: <Chip label={"v3"} color="primary" size="small" />,
    icon: <AnalyticsIcon />, 
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
      case '/Employees-Dashboard':
        return <FlexGrid />;
      case '/UpdateRecords':
        return (
          <Paper sx={{   p: 3,   width: '100%',   border: '1px solid',   borderColor: 'grey.300',   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',   borderRadius: 2}}>

            <Grid  spacing={2} container direction="row" justifyContent="center" alignItems="center" mb={3}> 
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
          </Paper>
        );
        case '/Departments':
          return <PlaceHolder PlaceHolderName={'Departments'}/>

        case '/Analytics':
        return  <PlaceHolder PlaceHolderName={'Analytics'} />
       // <AnalyticsPage />;

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
      <DescriptionInfo DescriptionInfoName={pathname}></DescriptionInfo>
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
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

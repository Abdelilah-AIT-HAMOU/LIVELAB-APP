import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useEffect, useState } from 'react';
import FlexGrid from './FlexGrid';


const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'Display Data',
    title: 'Display Data',
    icon: <DashboardIcon />,
  },
  {
    segment: 'DDL',
    title: 'DDL',
     icon: <DashboardIcon />,
  },
  {
    segment: 'Modifications',
    title: 'Modifications',
    icon: <ShoppingCartIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
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

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function DashboardLayoutBasic(props: any) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;


  // State to store fetched data
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

   // Fetch data on component mount
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://g7775ce87bebf43-sqlcllivelabs.adb.eu-amsterdam-1.oraclecloudapps.com/ords/admin/employees/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        console.log(response);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <AppProvider navigation={NAVIGATION} router={router} window={demoWindow}>
    <DashboardLayout>
      <PageContainer>
      <FlexGrid></FlexGrid>
      </PageContainer>
    </DashboardLayout>
  </AppProvider>
  );
}
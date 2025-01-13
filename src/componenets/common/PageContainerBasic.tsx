import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import {PageContainer,PageHeader,PageHeaderToolbar,} from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import OutlinedCard from './OutlinedCard';

const NAVIGATION: Navigation = [
  {
    segment: 'Upload',
    title: 'Upload your data',
  },
];

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

function CustomPageToolbar() {
  return (
    <PageHeaderToolbar>
      <Stack direction="row" spacing={2} alignItems="center">
      </Stack>
    </PageHeaderToolbar>
  );
}

function CustomPageHeader() {
  return <PageHeader slots={{ toolbar: CustomPageToolbar }} />;
}

export default function PageContainerBasic(props: any) {
  const { window } = props;
  const router = useDemoRouter('/Upload');
  const theme = useTheme();
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={theme}
      window={demoWindow}
      branding={{
        title: 'ACME Inc.',
      }}
    >
      <Paper sx={{ p: 3, width: '100%' }}>
        <PageContainer
          slots={{
            header: CustomPageHeader,
          }}
        >
          <Grid container spacing={1}>
            <Grid size={5} />
            <Grid size={12}>
              <OutlinedCard></OutlinedCard>
            </Grid>
          </Grid>
        </PageContainer>
      </Paper>
    </AppProvider>
  );
}

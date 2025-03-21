/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
**
*/

import React, { useState } from 'react';
import { Box, Typography, Chip, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import UpdateRecordsForm from '../features/EmployeeForm';
import CostmButton from '../common/CostmButton';
import AlterTable from '../features/UpdateForm';
import DropRecord from '../features/DeleteForm';
import PlaceHolder from '../common/PlaceHolder';
import DescriptionInfo from '../common/DescriptionInfoAlert';
import DisplayEmployee from './EmployeeDisplayerPage';
import AnalyticsPage from './AnalyticsPage';
import DepartmentPage from './DepartmentPage';

/**
 * This file handles the rendering of content specific to different HR-related pages, 
 * such as the employees dashboard, update records, and other features. It functions as 
 * the page content renderer for HR-related pages.
 * 
 * @param pathname - The current route path used to determine which content to render.
 * @returns A JSX element rendering the specific content based on the given pathname.
 */


export function HRPageContent({ pathname }: { pathname: string }) {
 
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
           return <DisplayEmployee />;
           case '/UpdateRecords':
           return (
             <Paper sx={{   p: 3,   width: '100%',   border: '1px solid',   borderColor: 'grey.300',   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',   borderRadius: 2}}>
               <Grid  spacing={2} container direction="row" justifyContent="center" alignItems="center" mb={3}>
                 <CostmButton buttonName='Add'onClick={() => handleButtonClick('add')}/>
                 <CostmButton  buttonName='Update'  onClick={() => handleButtonClick('alter')}/>
                 <CostmButton buttonName='Delete'onClick={() => handleButtonClick('drop')}/>
               </Grid>
               {renderActiveComponent()}
             </Paper>
           );

           // TODO : Implement Department feature by uncommenting <DepartmentPage /> and deleting the placeholder
           case '/Departments':
              return <PlaceHolder PlaceHolderName={'Departments'}/>;
             //return <DepartmentPage />;


           // TODO : Implement Analytics feature by uncommenting <AnalyticsPage /> and deleting the placeholder
           case '/Analytics':
              return <PlaceHolder PlaceHolderName={'Analytics'}/>;
             //return <AnalyticsPage />;


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
/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayoutBranding from "./componenets/layout/DashboardLayoutBranding"
import { Container } from '@mui/material';

function App() {
  const [isConnected, setIsConnected] = useState()
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/connection/status');
        const data = await response.json();

        console.log(data);

        if (data.status === 'ok') {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        console.error('Error fetching connection status:', error);
        setIsConnected(false);
      }
    };

    checkConnection();
  }, []);

  const checkingConnection = (isConnected) => {
    if (isConnected == undefined) {
      return 'Checking connection status...'
    } else if (isConnected) {
      return 'Database is working!'
    } else {
      return 'Something is wrong with the database!'
    }

  }
  console.log('isConnected:', isConnected);

  return (
    <Container>
       <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<DashboardLayoutBranding></DashboardLayoutBranding>}/>
        </Routes>
    </div>
    </Router>
    </Container>
  )
}

export default App

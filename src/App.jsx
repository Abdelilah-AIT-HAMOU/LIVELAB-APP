/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayoutBranding from "./componenets/DashboardLayoutBranding"
import { Container } from '@mui/material';
 function App() {
  const [isConnected, setIsConnected] = useState()

  const checkingConnection = (isConnected) => {
    if (isConnected == undefined) {
      return 'Checking connection status...'
    } else if (isConnected) {
      return 'Database is working!'
    } else {
      return 'Something is wrong with the database!'
    }

  }



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

/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayoutBranding from "./componenets/pages/DashboardLayoutBranding"
import { Container } from '@mui/material';

function App() {
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

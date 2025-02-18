/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
**
*/
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HrDashboard from "./componenets/pages/HrDashboardLayout.tsx"
import { Container } from '@mui/material';
import ErrorPage from './componenets/pages/ErrorPage.tsx';

function App() {
  return (
    <Container>
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HrDashboard />} />
          <Route path="*" element={<ErrorPage />} /> 
        </Routes>
      </div>
    </Router>
  </Container>
  )
}

export default App

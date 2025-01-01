/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { useState, useEffect } from 'react'
import './App.css'
import DashboardLayoutBasic from './componenets/DashboardLayoutBasic';

function App() {
  const [isConnected, setIsConnected] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/data');
        const result = await response.json();

        if (result.status === 'success') {
          setData(result.data);
        } else {
          console.error('Error fetching data:', result.message);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
  const [activeMenu, setActiveMenu] = useState('DISP');

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };


  return (
    <>
      <div className="app">
        <DashboardLayoutBasic />
    </div>
    </>
  )
}

export default App

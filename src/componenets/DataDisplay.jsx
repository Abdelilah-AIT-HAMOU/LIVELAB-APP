import React, { useEffect, useState } from 'react';


const DataDisplay = ({ activeMenu }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeMenu === 'DISP') {
      fetch('http://localhost:3000/api/employees') // Example API
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [activeMenu]);

  if (loading) return <p>Loading data...</p>;

  return (
    <div className="data-display">
      <table>
        <thead>
          <tr>
            <th>EMPLOYEE_ID</th>
            <th>FIRST_NAME</th>
            <th>LAST_NAME</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.EMPLOYEE_ID}>
              <td>{item.EMPLOYEE_ID}</td>
              <td>{item.FIRST_NAME}</td>
              <td>{item.LAST_NAME}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Statistics about the table...</p>
    </div>
  );
};

export default DataDisplay;

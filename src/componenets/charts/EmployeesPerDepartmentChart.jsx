import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import useFetchData from '../../hooks/useFetchData';
import { formatData } from '../../utils/formatData';

export default function EmployeesPerDepartmentChart() {
  const [chartData, setChartData] = useState({ departmentNames: [], employeeCounts: [] });
  const [error, setError] = useState(null);

  // Fetch data from both tables
  const { data: emp_data, loading: emp_loading, error: emp_error } = useFetchData('employees');
  const { data: dep_data, loading: dep_loading, error: dep_error } = useFetchData('departments');

  useEffect(() => {
    if (emp_data && dep_data) {
      try {
        // Format data for employees and departments
        const emp_rows = formatData(emp_data); // Contains all employees
        const dep_rows = formatData(dep_data); // Contains all departments

        // Count employees per department
        const departmentCounts = emp_rows.reduce((counts, emp) => {
          counts[emp.department_id] = (counts[emp.department_id] || 0) + 1;
          return counts;
        }, {});

        // Map department IDs to their names and counts
        const departmentNames = [];
        const employeeCounts = [];

        dep_rows.forEach((department) => {
          const departmentName = department.name; // Assuming "name" is the column for department names
          const count = departmentCounts[department.department_id] || 0; // Default to 0 if no employees in the department
          departmentNames.push(departmentName);
          employeeCounts.push(count);
        });

        setChartData({ departmentNames, employeeCounts });
      } catch (err) {
        setError('Failed to process chart data');
      }
    }
  }, [emp_data, dep_data]);

  // Handle loading or error states
  if (emp_loading || dep_loading) return <p>Loading...</p>;
  if (emp_error || dep_error || error) return <p>Error: {emp_error || dep_error || error}</p>;

  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: chartData.departmentNames }]}
      series={[{ data: chartData.employeeCounts, label: 'Number of Employees', color: '#FFB6C1' }]}
      width={300}
      height={200}
    />
  );
}

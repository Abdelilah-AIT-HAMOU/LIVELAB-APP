import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import useFetchData from '../../hooks/useFetchData';
import { formatData } from '../../utils/formatData';

export default function PerformancePieChart() {
  const tableName = 'performancereviews';
  const { data, loading, error } = useFetchData(tableName);
  const rows = formatData(data);
  
  const goals_achieved_data = rows.map(item => item.performance_score);

  const lowCount = goals_achieved_data.filter(score => score < 4).length;
  const mediumCount = goals_achieved_data.filter(score => score >= 4 && score <= 7).length;
  const highCount = goals_achieved_data.filter(score => score > 7).length;

  const chartData = [
    { id: 0, value: lowCount, label: 'Low' },
    { id: 1, value: mediumCount, label: 'Medium' },
    { id: 2, value: highCount, label: 'High' },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <PieChart
      series={[
        {
          data: chartData,
        },
      ]}
      width={400}
      height={200}
    />
  );
}

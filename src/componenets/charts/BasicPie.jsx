import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import useFetchData from '../../hooks/useFetchData';
import {generateColumns, formatData } from '../../utils/formatData';

export default function BasicPie() {

  const tableName = 'attendance';
  const { data, loading, error } = useFetchData(tableName);
  const rows = formatData(data);
  const status = rows.map(item => item.status);

  const countOccurrences = (array, word) => {
    return array.filter(item => item === word).length;
  };

  const presentCount = countOccurrences(status || [], 'Present');
  const absentCount = countOccurrences(status || [], 'Absent');


  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: presentCount, label: 'Presence' },
            { id: 1, value: absentCount, label: 'Absence' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}

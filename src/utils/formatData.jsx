/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
**
*/

export const formatData = (data) => {
  if (data && data.items) {
    return data.items.map(({ links, employee_id, ...filteredItem }) => ({
      ...filteredItem,
      id: employee_id, // Keep for DataGrid
      employee_id, // Keep but don't show in form
    }));
  }
  return [];
};

export const generateColumns = (data) => {
  if (data && data.length > 0) {
    const keys = Object.keys(data[0]).filter(key => key !== "employee_id");
      return keys.map(key => ({
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '), 
      width: 150,
    }));
  }
  return []; 
};
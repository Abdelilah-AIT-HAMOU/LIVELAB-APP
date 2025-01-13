export const formatData = (data) => {
  if (data && data.items) {
    return data.items.map(item => {
      const { links, ...filteredItem } = item; //////  remove the 'links' field and others 
      return filteredItem;
    });
  }
  return [];
}

export const generateColumns = (data) => {
  if (data && data.length > 0) {
    const keys = Object.keys(data[0]);
    return keys.map(key => ({
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '), 
      width: 150,
    }));
  }
  return []; 
};
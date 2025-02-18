/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
**
*/

import { useState, useEffect } from 'react';

const useFetchData = (tableName) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/${tableName}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.message}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableName]);

  const postData = async (dataToPost) => {
     try {
      const response = await fetch(`${API_URL}/${tableName}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToPost),
      });
      if (!response.ok) {
        const errorData = await response.json();
         throw new Error(errorData.message || 'Failed to post data');
      }
      return await response.json();
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };
  const putData = async (id, dataToUpdate) => {
    try {
      const response = await fetch(`${API_URL}/${tableName}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToUpdate),
      });
      if (!response.ok) throw new Error('Failed to update data');
      return await response.json();
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${tableName}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete data');
      return await response.json();
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  return { data, loading, error, postData, putData, deleteData };
};



export default useFetchData;
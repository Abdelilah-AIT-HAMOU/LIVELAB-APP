import { useState, useEffect } from 'react';

const useFetchData = (tableName) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/connection/${tableName}/`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableName]);

  const postData = async (dataToPost) => {
    console.log('Data to post:', dataToPost);
    try {
      const response = await fetch(`http://localhost:3000/api/connection/${tableName}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToPost),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error:', errorData);
        throw new Error(errorData.message || 'Failed to post data');
      }
      return await response.json();
    } catch (error) {
      console.error('Post error:', error);
      throw error;
    }
  };

  return { data, loading, error, postData };
};

export default useFetchData;

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
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableName]);



const postData = async (dataToPost) => {
  try {
    const response = await fetch(`http://localhost:3000/api/connection/${tableName}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToPost),
    });
    if (!response.ok) {
      throw new Error('Failed to post data');
    }
    const result = await response.json();
    return result; // Return the response if the post is successful
  } catch (error) {
    setError(error);
    throw error;
  }
};

return { data, loading, error, postData };
};

export default useFetchData;

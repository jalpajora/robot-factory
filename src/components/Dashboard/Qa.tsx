import { useState, useEffect } from 'react';
import Table from '../Table';

const API_URL = 'http://localhost:5000';

const Qa = () => {
  const [data, setData] = useState([]);
  const [isGenerate, setGenerate] = useState(false);

  useEffect(() => {
    const generateData = async () => {
      const data = await fetchData();
      setData(data);
    };

    if (isGenerate) {
      generateData();
    }
  }, [isGenerate]);

  const fetchData = async () => {
    const response = await fetch(`${API_URL}/robots`);
    const data = await response.json();

    return data;
  };

  const handleGenerate = () => {
    setGenerate(true);
  };

  return (
    <section className='container dashboard-qa' data-testid='db-qa'>
      <Table />
      {JSON.stringify(data)}
      <button onClick={handleGenerate}>Generate Batch</button>
    </section>
  );
};

export default Qa;

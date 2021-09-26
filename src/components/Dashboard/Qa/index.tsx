import { useState, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import Table from '../../Table';
import TableActions from '../../TableActions';

const API_URL = 'http://localhost:5000';

const Qa = () => {
  const [data, setData] = useState([]);
  const [isGenerate, setGenerate] = useState(false);

  useEffect(() => {
    let generateData: null | (() => Promise<void>) = async () => {
      const data = await fetchData();
      setData(data);
    };

    if (isGenerate) {
      generateData();
    }

    return () => {
      generateData = null;
    };
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
      {data.length ? (
        <>
          <TableActions>
            <TableActions.Button
              className='bulk-extinguish-btn'
              onClick={() => {}}
            >
              Extinguish
            </TableActions.Button>
            <TableActions.Button
              className='bulk-recycle-btn'
              onClick={() => {}}
            >
              Recycle
            </TableActions.Button>
            <TableActions.Button className='bulk-pass-btn' onClick={() => {}}>
              Pass QA
            </TableActions.Button>
            <TableActions.Button
              className='bulk-factory-btn'
              onClick={() => {}}
            >
              Factory Second
            </TableActions.Button>
          </TableActions>
          <Table data={data} />
        </>
      ) : (
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          className='table-caption'
        >
          <p>Ready to QA robots? Click 'Generate Batch' button to start.</p>
          <Button
            onClick={handleGenerate}
            className='generate-batch-btn'
            marginTop='2'
          >
            Generate Batch
          </Button>
        </Box>
      )}
    </section>
  );
};

export default Qa;

import { Box, Button } from '@chakra-ui/react';
import Table from '../../Table';
import TableActions from '../../TableActions';
import { Robots } from '../../../state';

interface Props {
  robots: Robots[];
  generateNewBatch(): void;
}

const Qa = ({ robots = [], generateNewBatch }: Props) => {
  const handleGenerate = () => {
    generateNewBatch();
  };

  return (
    <section className='container dashboard-qa' data-testid='db-qa'>
      {robots.length ? (
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
          <Table data={robots} />
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

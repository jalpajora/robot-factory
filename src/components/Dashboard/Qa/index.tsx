import { Box, Button } from '@chakra-ui/react';
import TableContainer from '../../TableContainer';
import { Robot, State } from '../../../state';

interface Props {
  robots: State;
  generateNewBatch(): void;
  extinguishItem: (items: Robot[], id: number) => void;
  recycleItem: (items: Robot[], id: number) => void;
}

const Qa = ({
  robots,
  generateNewBatch,
  extinguishItem,
  recycleItem,
}: Props) => {
  const handleGenerate = () => {
    generateNewBatch();
  };

  return (
    <section className='container dashboard-qa' data-testid='db-qa'>
      {robots.items.length ? (
        <TableContainer
          robots={robots}
          extinguishItem={extinguishItem}
          recycleItem={recycleItem}
        />
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

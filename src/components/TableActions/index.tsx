import React from 'react';
import { Button } from '@chakra-ui/react';

interface Props {
  handleAction: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id: number;
  showExinguish: boolean;
  showRecycle?: boolean;
  showPassQa?: boolean;
  showFactorySecond?: boolean;
}

const TableActions = ({
  handleAction,
  id,
  showExinguish,
  showRecycle,
  showPassQa,
  showFactorySecond,
}: Props) => {
  return (
    <>
      {showExinguish && (
        <Button
          name='extinguish-btn'
          className='extinguish-btn'
          onClick={handleAction}
          data-id={id}
        >
          Extinguish
        </Button>
      )}
      {showRecycle && (
        <Button
          name='recycle-btn'
          className='recycle-btn'
          onClick={handleAction}
          data-id={id}
        >
          Recycle
        </Button>
      )}
      {showPassQa && (
        <Button
          name='pass-qa-btn'
          className='pass-qa-btn'
          onClick={handleAction}
          data-id={id}
        >
          Pass QA
        </Button>
      )}
      {showFactorySecond && (
        <Button
          name='factory-second-btn'
          className='factory-second-btn'
          onClick={handleAction}
          data-id={id}
        >
          Factory Second
        </Button>
      )}
    </>
  );
};

export default TableActions;

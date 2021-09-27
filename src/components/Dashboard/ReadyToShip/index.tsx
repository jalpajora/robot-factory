// import { useEffect } from 'react';

import TableContainer from '../../TableContainer';
import { Robot, State } from '../../../state';

interface Props {
  robots: State;
  extinguishItem: (items: Robot[], id: number) => void;
  recycleItem: (items: Robot[], id: number) => void;
}

const ReadyToShip = ({ robots }: Props) => {
  const handleAction = (items: Robot[], id: number, name: string) => {
    if (name === 'factory-second') {
      // factory second
    } else if (name === 'pass-qa') {
      // factory second
    }
  };

  return (
    <section
      className='container dashboard-ready-to-ship'
      data-testid='db-ready-to-ship'
    >
      {robots.readyForShipping.length ? (
        <TableContainer
          items={robots.readyForShipping}
          handleAction={handleAction}
        />
      ) : (
        <p style={{ textAlign: 'center' }}>No robots are ready to ship.</p>
      )}
    </section>
  );
};

export default ReadyToShip;

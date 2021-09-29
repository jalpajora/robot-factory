// import { useEffect } from 'react';

import TableContainer from '../../TableContainer';
import { Robot, State } from '../../../state';

interface Props {
  robots: State;
  removeFromShipment: (items: Robot[], id: number) => void;
  sendShipment: (items: Robot[], id: number) => void;
}

const ReadyToShip = ({ robots, removeFromShipment, sendShipment }: Props) => {
  const handleAction = (items: Robot[], id: number, name: string) => {
    if (name === 'send-shipment-btn') {
      sendShipment(items, Number(id));
    } else if (name === 'remove-from-shipment-btn') {
      removeFromShipment(items, Number(id));
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

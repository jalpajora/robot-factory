import React from 'react';
import { Button } from '@chakra-ui/react';

interface Props {
  handleAction: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id: number;
  showExinguish?: boolean;
  showRecycle?: boolean;
  showAddShipment?: boolean;
  showSendShipment?: boolean;
  showRemoveShipment?: boolean;
}

const TableActions = ({
  handleAction,
  id,
  showExinguish,
  showRecycle,
  showAddShipment,
  showSendShipment,
  showRemoveShipment,
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
      {showAddShipment && (
        <Button
          name='add-shipment-btn'
          className='add-shipment-btn'
          onClick={handleAction}
          data-id={id}
        >
          Add to Shipment
        </Button>
      )}
      {showRemoveShipment && (
        <Button
          name='remove-from-shipment-btn'
          className='remove-from-shipment-btn'
          onClick={handleAction}
          data-id={id}
        >
          Remove from Shipment
        </Button>
      )}
      {showSendShipment && (
        <Button
          name='send-shipment-btn'
          className='send-shipment-btn'
          onClick={handleAction}
          data-id={id}
        >
          Send Shipment
        </Button>
      )}
    </>
  );
};

export default TableActions;

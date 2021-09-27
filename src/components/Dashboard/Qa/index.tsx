import TableContainer from '../../TableContainer';
import { Robot, State } from '../../../state';

interface Props {
  robots: State;
  extinguishItem: (items: Robot[], id: number) => void;
  recycleItem: (items: Robot[], id: number) => void;
  addToShipment: (items: Robot[], id: number) => void;
}

const Qa = ({ robots, extinguishItem, recycleItem, addToShipment }: Props) => {
  const handleAction = (items: Robot[], id: number, name: string) => {
    if (name === 'recycle-btn') {
      recycleItem(items, Number(id));
    } else if (name === 'extinguish-btn') {
      extinguishItem(items, Number(id));
    } else if (name === 'add-shipment-btn') {
      addToShipment(items, Number(id));
    }
  };

  return (
    <section className='container dashboard-qa' data-testid='db-qa'>
      {robots.items.length ? (
        <TableContainer items={robots.items} handleAction={handleAction} />
      ) : (
        <p style={{ textAlign: 'center' }}>
          No robots are ready in queue for QA.
        </p>
      )}
    </section>
  );
};

export default Qa;

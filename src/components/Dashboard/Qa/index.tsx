import TableContainer from '../../TableContainer';
import { Robot, State } from '../../../state';

interface Props {
  robots: State;
  extinguishItem: (id: number) => void;
  recycleItem: (items: Robot[], id: number) => void;
  addToShipment: (items: Robot[], id: number) => void;
  recycleItems: (ids: number[]) => void;
}

const Dashboard = ({
  robots,
  extinguishItem,
  recycleItem,
  addToShipment,
  recycleItems,
}: Props) => {
  const handleAction = (items: Robot[], id: number, name: string) => {
    if (name === 'recycle-btn') {
      recycleItem(items, Number(id));
    } else if (name === 'extinguish-btn') {
      extinguishItem(Number(id));
    } else if (name === 'add-shipment-btn') {
      addToShipment(items, Number(id));
    }
  };

  return (
    <section className='container dashboard-qa' data-testid='db-qa'>
      {robots.items.length ? (
        <TableContainer
          items={robots.items}
          handleAction={handleAction}
          recycleItems={recycleItems}
        />
      ) : (
        <p style={{ textAlign: 'center' }}>
          No robots are ready in queue for QA.
        </p>
      )}
    </section>
  );
};

export default Dashboard;

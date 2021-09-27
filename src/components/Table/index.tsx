import { useContext } from 'react';
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { useLocation } from 'react-router';
import { TableContext, TableContainerProps } from '../TableContainer';
import TableActions from '../TableActions';
import {
  isForExtinguish,
  isForRecycle,
  isForFactorySecond,
} from '../../utils/qaStatusHelpers';
import { Robot } from '../../state';

const Table = () => {
  const location = useLocation();
  const context = useContext(TableContext);
  const { items, handleAction } = context as TableContainerProps;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget.dataset;
    const name = e.currentTarget.name;
    if (!id || !name) {
      return;
    }

    handleAction(items, Number(id), name);
  };

  const Buttons = ({ item }: { item: Robot }) => {
    const forExtinguish = isForExtinguish(item);
    const forRecycle = !forExtinguish && isForRecycle(item);
    const forFactorySecond =
      !forExtinguish && !forRecycle && isForFactorySecond(item);
    const passedQa = !forExtinguish && !forRecycle && !forFactorySecond;

    if (location.pathname.includes('/qa')) {
      return (
        <TableActions
          id={item.id}
          handleAction={handleClick}
          showExinguish={forExtinguish}
          showRecycle={forRecycle}
          showAddShipment={forFactorySecond || passedQa}
        />
      );
    } else if (location.pathname.includes('/ready-to-ship')) {
      return (
        <TableActions
          id={item.id}
          handleAction={handleClick}
          showExinguish={forExtinguish}
          showRecycle={forRecycle}
          showAddShipment={forFactorySecond || passedQa}
        />
      );
    }

    return null;
  };

  return (
    <ChakraTable size='sm' border='thin' borderColor='gray.100'>
      <Thead borderTop='1px solid' borderColor='gray.200'>
        <Tr>
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>Config</Th>
          <Th>Statuses</Th>
          <Th>QA Status</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {items.map((item, index) => {
          const { id, name, configuration, statuses, qaStatus } = item;
          const {
            hasSentience,
            hasWheels,
            hasTracks,
            Colour,
            numberOfRotors = 0,
          } = configuration;

          return (
            <Tr key={`tr-${id}-${index}`}>
              <Td>{id}</Td>
              <Td>{name}</Td>
              <Td>
                <ul>
                  <li data-testid='col-sentience'>
                    Sentience: {hasSentience ? 'Yes' : 'No'}
                  </li>
                  <li data-testid='col-wheels'>
                    Wheels: {hasWheels ? 'col' : 'No'}
                  </li>
                  <li data-testid='col-tracks'>
                    Tracks: {hasTracks ? 'Yes' : 'No'}
                  </li>
                  <li data-testid='col-rotors'>
                    Rotors: {numberOfRotors.toString()}
                  </li>
                  <li data-testid='col-colour'>Colour: {Colour}</li>
                </ul>
              </Td>
              <Td data-testid='col-statuses'>
                <ul>
                  {statuses.map((status, i) => (
                    <li key={`statuses-${id}-${i}`}>{status}</li>
                  ))}
                </ul>
              </Td>
              <Td>
                {qaStatus && (
                  <span
                    style={{
                      color: `${
                        qaStatus === 'Factory Second' ? 'yellow' : 'green'
                      }`,
                    }}
                  >
                    {qaStatus}
                  </span>
                )}
              </Td>
              <Td>
                <Buttons item={item} />
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </ChakraTable>
  );
};

export default Table;

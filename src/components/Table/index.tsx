import { useContext } from 'react';
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { TableContext } from '../TableContainer';
import TableActions from '../TableActions';
import { Robot } from '../../state';
import { isForExtinguish, isForRecycle } from '../../utils/qaStatusHelpers';

interface Props {
  extinguishItem: (items: Robot[], id: number) => void;
  recycleItem: (items: Robot[], id: number) => void;
}

const Table = ({ extinguishItem, recycleItem }: Props) => {
  const { items } = useContext(TableContext);

  const handleAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget.dataset;
    const name = e.currentTarget.name;
    if (!id || !name) {
      return;
    }

    if (name === 'recycle-btn') {
      recycleItem(items, Number(id));
    } else if (name === 'extinguish-btn') {
      extinguishItem(items, Number(id));
    } else if (name === 'factory-second') {
      // factory second
    } else if (name === 'pass-qa') {
      // factory second
    }
  };

  return (
    <ChakraTable size='sm' border='thin' borderColor='gray.100'>
      <Thead borderTop='1px solid' borderColor='gray.200'>
        <Tr>
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>Sentience</Th>
          <Th>Wheels</Th>
          <Th>Tracks</Th>
          <Th>Rotors</Th>
          <Th>Colour</Th>
          <Th>Statuses</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {items.map((item) => {
          const { id, name, configuration, statuses } = item;
          const {
            hasSentience,
            hasWheels,
            hasTracks,
            Colour,
            numberOfRotors = 0,
          } = configuration;

          return (
            <Tr key={`tr-${id}`}>
              <Td>{id}</Td>
              <Td>{name}</Td>
              <Td data-testid='col-sentience'>{hasSentience ? 'Yes' : 'No'}</Td>
              <Td data-testid='col-wheels'>{hasWheels ? 'col' : 'No'}</Td>
              <Td data-testid='col-tracks'>{hasTracks ? 'Yes' : 'No'}</Td>
              <Td data-testid='col-rotors'>{numberOfRotors.toString()}</Td>
              <Td data-testid='col-colour'>{Colour}</Td>
              <Td data-testid='col-statuses'>
                <ul>
                  {statuses.map((status, i) => (
                    <li key={`statuses-${id}-${i}`}>{status}</li>
                  ))}
                </ul>
              </Td>
              <Td>
                <TableActions
                  id={id}
                  handleAction={handleAction}
                  showExinguish={isForExtinguish(item)}
                  showRecycle={isForRecycle(item)}
                />
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </ChakraTable>
  );
};

export default Table;

import { useContext, useState } from 'react';
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Button,
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
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [checkedValues, setCheckedValues] = useState<number[]>([]);
  const location = useLocation();
  const context = useContext(TableContext);
  const { items, handleAction, recycleItems } = context as TableContainerProps;

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
          showSendShipment={true}
          showRemoveShipment={true}
        />
      );
    }

    return null;
  };

  const handleSelectAll = () => {
    setIsSelectAll(!isSelectAll);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.currentTarget.id);
    let values = checkedValues;
    if (e.currentTarget.checked) {
      values = [...values, Number(e.currentTarget.id)];
    } else {
      values = values.filter((value) => value !== id);
    }
    setCheckedValues(values);
  };

  const handleBulkRecycle = () => {
    if (isSelectAll) {
      const ids = items
        .filter((item) => {
          const forExtinguish = isForExtinguish(item);
          const forRecycle = !forExtinguish && isForRecycle(item);
          return forRecycle;
        })
        .map((item) => item.id);
      recycleItems(ids);
    } else if (checkedValues.length) {
      recycleItems(checkedValues);
    }
  };

  return (
    <>
      {location.pathname.includes('/qa') && (
        <Button onClick={handleBulkRecycle}>Bulk Recycle</Button>
      )}
      <ChakraTable size='sm' border='thin' borderColor='gray.100'>
        <Thead borderTop='1px solid' borderColor='gray.200'>
          <Tr>
            {location.pathname.includes('/qa') && (
              <Th>
                <Checkbox onChange={handleSelectAll} />
              </Th>
            )}
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
              <Tr key={`tr-${id}-${index}`} className={`tr-${id}`}>
                {location.pathname.includes('/qa') && (
                  <Td>
                    <Checkbox
                      onChange={handleSelect}
                      isChecked={isSelectAll || checkedValues.includes(id)}
                      id={`${id}`}
                    />
                  </Td>
                )}
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
                      data-testid='qa-status'
                      style={{
                        color: `${
                          qaStatus === 'Factory Second' ? 'blue' : 'green'
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
    </>
  );
};

export default Table;

import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

const Table = () => {
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
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
        </Tr>
        <Tr>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
        </Tr>
      </Tbody>
    </ChakraTable>
  );
};

export default Table;

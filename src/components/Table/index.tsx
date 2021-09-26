import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

interface Props {
  data: {
    id: number;
    name: string;
    configuration: {
      hasSentience: boolean;
      hasWheels: boolean;
      hasTracks: boolean;
      numberOfRotors: number;
      Colour: string;
    };
  }[];
}
const Table = ({ data = [] }: Props) => {
  // console.log(data);
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
        {data.map(({ id, name, configuration }) => {
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
              <Td>{hasSentience ? 'Yes' : 'No'}</Td>
              <Td>{hasWheels ? 'Yes' : 'No'}</Td>
              <Td>{hasTracks ? 'Yes' : 'No'}</Td>
              <Td>{numberOfRotors.toString()}</Td>
              <Td>{Colour}</Td>
              <Td></Td>
            </Tr>
          );
        })}
        {/* <Tr>
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
        </Tr> */}
      </Tbody>
    </ChakraTable>
  );
};

export default Table;

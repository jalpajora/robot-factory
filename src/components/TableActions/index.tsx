import { Button } from '@chakra-ui/react';

interface Props {
  children: JSX.Element[];
}

const TableActions = ({ children }: Props) => {
  return <div className='table-actions'>{children}</div>;
};

TableActions.Button = Button;

export default TableActions;

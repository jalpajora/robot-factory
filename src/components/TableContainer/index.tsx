import React from 'react';
import { Robot } from '../../state';
import Table from '../Table';

export interface TableContainerProps {
  items: Robot[];
  handleAction: (items: Robot[], id: number, name: string) => void;
}

export const TableContext = React.createContext<TableContainerProps | null>(
  null
);

const TableContainer = (props: TableContainerProps) => {
  const tableContext: TableContainerProps = props;

  return (
    <TableContext.Provider value={tableContext}>
      <Table />
    </TableContext.Provider>
  );
};

export default TableContainer;

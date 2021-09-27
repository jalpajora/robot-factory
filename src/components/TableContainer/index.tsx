import React from 'react';
import { State, initialRobotsState, Robot } from '../../state';
import Table from '../Table';

export const TableContext = React.createContext(initialRobotsState);

interface Props {
  robots: State;
  extinguishItem: (items: Robot[], id: number) => void;
  recycleItem: (items: Robot[], id: number) => void;
}

const TableContainer = ({ robots, extinguishItem, recycleItem }: Props) => {
  return (
    <TableContext.Provider value={robots}>
      <Table extinguishItem={extinguishItem} recycleItem={recycleItem} />
    </TableContext.Provider>
  );
};

export default TableContainer;

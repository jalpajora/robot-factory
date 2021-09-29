import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Robot, State } from '../../state';

const Main = React.lazy(() => import('./Main'));
const Qa = React.lazy(() => import('./Qa'));
const ReadyToShip = React.lazy(() => import('./ReadyToShip'));
const Shipping = React.lazy(() => import('./Shipping'));

interface Props {
  robots: State;
  extinguishItem: (id: number) => void;
  recycleItem: (items: Robot[], id: number) => void;
  addToShipment: (items: Robot[], id: number) => void;
  removeFromShipment: (items: Robot[], id: number) => void;
  sendShipment: (items: Robot[], id: number) => void;
  recycleItems: (ids: number[]) => void;
}

const Dashboard = (props: Props) => {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path='/qa' children={<Qa {...props} />} />
          <Route path='/ready-to-ship' children={<ReadyToShip {...props} />} />
          <Route path='/shipping' children={<Shipping />} />
          <Route path='/' exact children={<Main />} />
        </Switch>
      </Suspense>
    </main>
  );
};

export default Dashboard;

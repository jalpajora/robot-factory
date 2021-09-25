import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

const Main = React.lazy(() => import('./Main'));
const Qa = React.lazy(() => import('./Qa'));
const ReadyToShip = React.lazy(() => import('./ReadyToShip'));
const Shipping = React.lazy(() => import('./Shipping'));

const Dashboard = () => {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path='/qa' children={<Qa />} />
          <Route path='/ready-to-ship' children={<ReadyToShip />} />
          <Route path='/shipping' children={<Shipping />} />
          <Route path='/' exact children={<Main />} />
        </Switch>
      </Suspense>
    </main>
  );
};

export default Dashboard;

// import { Switch, Route } from 'react-router-dom';
// import { ShippingDashboard, ReadyToShipDashboard, QaDashboard } from './';

// import
// const module = await import('/modules/myCustomModule.js');

const MainDashboard = () => {
  return (
    <main>
      <section className='container dashboard-content' data-testid='db-main'>
        <p>
          Hi! This is a temporary landing page where inventory list will be
          displayed!
        </p>
        {/* Revisit this component when time allows */}
      </section>
    </main>
  );
};

export { MainDashboard };

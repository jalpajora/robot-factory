import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dashboard from '../Dashboard';
import Header from '../Header';
import { actionCreators, RootState, State } from '../../state';

function App() {
  const robots: State = useSelector((state: RootState) => state.robots);
  const dispatch = useDispatch();
  const {
    generateNewBatch,
    extinguishItem,
    recycleItem,
    addToShipment,
    removeFromShipment,
    sendShipment,
    recycleItems,
  } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (!robots.items.length) {
      generateNewBatch();
    }
  }, [generateNewBatch, robots.items]);

  return (
    <div className='App' data-testid='app'>
      <Router>
        <Header>
          <Header.Nav />
          <Header.DashboardNav />
        </Header>
        <Dashboard
          robots={robots}
          extinguishItem={extinguishItem}
          recycleItem={recycleItem}
          addToShipment={addToShipment}
          removeFromShipment={removeFromShipment}
          sendShipment={sendShipment}
          recycleItems={recycleItems}
        />
      </Router>
    </div>
  );
}

export default App;

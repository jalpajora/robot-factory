import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dashboard from '../Dashboard';
import Header from '../Header';
import { actionCreators, RootState } from '../../state';

function App() {
  const robots = useSelector((state: RootState) => state.robots);
  const dispatch = useDispatch();
  const { generateNewBatch } = bindActionCreators(actionCreators, dispatch);

  return (
    <div className='App' data-testid='app'>
      <Router>
        <Header>
          <Header.Nav />
          <Header.DashboardNav />
        </Header>
        <Dashboard robots={robots} generateNewBatch={generateNewBatch} />
      </Router>
    </div>
  );
}

export default App;

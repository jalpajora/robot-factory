import { BrowserRouter as Router } from 'react-router-dom';

import Dashboard from '../Dashboard';
import Header from '../Header';

function App() {
  return (
    <div className='App' data-testid='app'>
      <Router>
        <Header>
          <Header.Nav />
          <Header.DashboardNav />
        </Header>
        <Dashboard />
      </Router>
    </div>
  );
}

export default App;

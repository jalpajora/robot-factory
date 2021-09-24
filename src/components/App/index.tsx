import { Image, Button, Link, Box } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  BrowserRouter as Router,
  Link as RouterLink,
  Switch,
  Route,
} from 'react-router-dom';

import {
  MainDashboard,
  ShippingDashboard,
  ReadyToShipDashboard,
  QaDashboard,
} from '../Dashboard';

import logo from '../../styles/images/logo.svg';

function App() {
  return (
    <Router>
      <div className='App' data-testid='app'>
        <header>
          <nav role='navigation'>
            <Link as={RouterLink} to='/' _hover={{ textDecoration: 'none' }}>
              <Image htmlWidth='100px' src={logo} alt='company logo' />
              Robot Factory
            </Link>
            <Button
              fontWeight='normal'
              color='inherit'
              variant='link'
              data-testid='logout-btn'
            >
              Logout
            </Button>
          </nav>
          <section className='container dashboard-header'>
            <Box className='dashboard-menu'>
              <Link as={RouterLink} to='/qa'>
                QA
              </Link>
              <ArrowForwardIcon color='pink.700' />
              <Link as={RouterLink} to='/ready-to-ship'>
                Ready to Ship
              </Link>
              <ArrowForwardIcon color='pink.700' />
              <Link as={RouterLink} to='/shipping'>
                Shipping
              </Link>
            </Box>
          </section>
        </header>
        <Switch>
          <Route path='/qa' children={<QaDashboard />} />
          <Route path='/ready-to-ship' children={<ReadyToShipDashboard />} />
          <Route path='/shipping' children={<ShippingDashboard />} />
          <Route path='/' exact children={<MainDashboard />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

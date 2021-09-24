import { Image, Button, Link, Box } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import Dashboard from '../Dashboard';
import logo from '../../styles/images/logo.svg';

function App() {
  return (
    <div className='App' data-testid='app'>
      <header>
        <nav role='navigation'>
          <Link href='/'>
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
        {/* <Heading as='h1'>Robot Factory Portal</Heading> */}
        <section className='container dashboard-header'>
          <Box className='dashboard-menu'>
            <Link href='#test'>QA</Link>
            <ArrowForwardIcon color='pink.700' />
            <Link href='#test'>Ready to Ship</Link>
            <ArrowForwardIcon color='pink.700' />
            <Link href='#test'>Shipping</Link>
          </Box>
        </section>
      </header>
      <Dashboard />
    </div>
  );
}

export default App;

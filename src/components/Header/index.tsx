import { Image, Button, Link, Box } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

import logo from '../../styles/images/logo.svg';

interface HeaderProps {
  children: JSX.Element[];
}

function Header({ children }: HeaderProps) {
  return <header>{children}</header>;
}

Header.Nav = () => (
  <nav role='navigation'>
    <Link
      as={RouterLink}
      to='/'
      className='logo'
      _hover={{ textDecoration: 'none' }}
    >
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
);

Header.DashboardNav = () => (
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
);

export default Header;

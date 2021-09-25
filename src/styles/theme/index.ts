import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      '.App': {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        color: 'gray.600',
      },
      header: {
        backgroundColor: 'white',
      },
      nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
      },
      'nav .logo': {
        color: '#97266d',
      },
      'nav, .dashboard-header': {
        borderBottom: '1px solid rgb(235, 235, 235)',
        background: '#fafafa',
      },
      '.dashboard-header': {
        width: '100%',
      },
      '.dashboard-menu': {
        textTransform: 'uppercase',
        width: '500px',
        margin: 'auto',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      '.dashboard-menu a': {
        // color: '#f848c4',
        // color: '#97266d',
        fontWeight: '600',
      },
      main: {
        height: '100vh',
        padding: '16px',
      },
      'a:focus:not(:focus-visible), button:focus:not(:focus-visible)': {
        boxShadow: 'none',
      },
    },
  },
  colors: {
    brand: '#f848c4',
  },
});

export default theme;

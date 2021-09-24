import { extendTheme } from '@chakra-ui/react';

// const Card = {
//   baseStyle: {
//     display: "flex",

//     background: "white",
//     alignItems: "center",
//     gap: 6,
//   },
// };

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
      'nav, .dashboard-header': {
        borderBottom: '1px solid rgb(235, 235, 235)',
      },
      '.dashboard-header': {
        width: '100%',
      },
      '.dashboard-menu': {
        // marginTop: '1rem',
        textTransform: 'uppercase',
        // fontWeight: 'bold',
        width: '500px',
        margin: 'auto',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // background: '#EDF2F7',
      },
      '.logo:hover': {
        textDecoration: 'none',
      },
    },
  },
  colors: {
    brand: '#f848c4',
  },
});

export default theme;

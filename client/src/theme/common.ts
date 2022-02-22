const commonTheme = {
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#910500',
    },
    text: {
      primary: '#F5F5F5',
    },
  },
  zIndex: {
    appBar: 1250,
  },
  typography: {
    htmlFontSize: 18,
    fontFamily: 'Arial',
    fontSize: 16,
  },
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: '#910500',
          width: '90%',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#000',
        },
      },
    },
  },
}

export default commonTheme

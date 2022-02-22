const darkTheme = {
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
  typography: {
    htmlFontSize: 18,
    fontFamily: 'Arial',
    fontSize: 16,
  },
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          borderColor: '#000000',
          width: '90%',
        },
      },
    },
  },
}

export default darkTheme

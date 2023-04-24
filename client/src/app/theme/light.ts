const lightTheme = {
  palette: {
    action: {
      active: '#6B7280',
      focus: 'rgba(55, 65, 81, 0.12)',
      hover: 'rgba(55, 65, 81, 0.04)',
      selected: 'rgba(55, 65, 81, 0.08)',
      disabledBackground: 'rgba(55, 65, 81, 0.12)',
      disabled: 'rgba(55, 65, 81, 0.26)'
    },
    background: {
      default: '#fff',
      paper: 'rgb(255, 255, 255)',
      rare: '#fff',
      header: 'rgba(255, 255, 255, 0.8)'
    },
    primary: {
      main: '#6366F1',
      light: '#828DF8',
      dark: '#3832A0',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#10B981',
      light: '#3FC79A',
      dark: '#0B815A',
      contrastText: '#FFFFFF'
    },
    success: {
      main: '#14B8A6',
      light: '#43C6B7',
      dark: '#0E8074',
      contrastText: '#FFFFFF'
    },
    info: {
      main: '#2196F3',
      light: '#64B6F7',
      dark: '#0B79D0',
      contrastText: '#FFFFFF'
    },
    warning: {
      main: '#FFB020',
      light: '#FFBF4C',
      dark: '#B27B16',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#D14343',
      light: '#DA6868',
      dark: '#922E2E',
      contrastText: '#FFFFFF'
    },
    text: {
      primary: '#111927',
      secondary: '#9DA4AE',
      disabled: 'rgba(55, 65, 81, 0.48)'
    },
    grey: {
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6c737f',
      600: '#4B5563',
      700: 'rgba(17, 25, 39, 0.12)',
      800: '#D1D5DB',
      900: '#111827'
    },
    divider: 'rgb(45, 55, 72)'
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#2d3748'
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(248, 249, 250)',
          '.MuiTableCell-root': {
            color: 'rgb(47, 55, 70)'
          }
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgb(242, 244, 247)'
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        standardError: {
          backgroundColor: 'rgb(254, 252, 252)',
          color: 'rgb(101, 91, 90)',
          fontSize: 16
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(195, 196, 249)',
          '& .MuiLinearProgress-barColorPrimary': {
            backgroundColor: 'rgb(99, 102, 241)'
          }
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: 'rgba(55, 65, 81, 0.04) #FFF',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#FFF'
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: 'rgba(55, 65, 81, 0.04)',
            minHeight: 24,
            border: '3px solid rgba(55, 65, 81, 0.04)'
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: 'rgba(17, 25, 39, 0.12)'
          },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
            backgroundColor: 'rgba(17, 25, 39, 0.12)'
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgba(17, 25, 39, 0.12)'
          },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: 'rgba(17, 25, 39, 0.12)'
          }
        }
      }
    }
  }
}

export default lightTheme

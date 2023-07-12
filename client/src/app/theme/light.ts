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
      dark: '#464dc8',
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
    divider: '#D1D5DB'
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '-webkit-text-fill-color': '#111827',
          '-webkit-box-shadow': '0 0 0px 1000px linear-gradient(65.7deg, -67.89%, 125.28%) inset',
          transition: 'background-color 5000s ease-in-out 0s'
        },

        notchedOutline: {
          borderColor: '#D1D5DB'
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
          borderBottom: '1px solid #dfe4eb'
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

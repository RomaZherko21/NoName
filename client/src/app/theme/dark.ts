const PRIMARY_TEXT = 'rgb(237, 242, 247)'

const darkTheme = {
  palette: {
    action: {
      active: '#9CA3AF',
      focus: '#252E3E',
      hover: '#252E3E',
      selected: 'rgba(55, 65, 81, 0.08)',
      disabledBackground: 'rgba(55, 65, 81, 0.12)',
      disabled: 'rgba(243, 244, 246, 0.38)'
    },
    background: {
      default: 'rgba(14, 19, 32)',
      paper: '#111927',
      rare: '#1C2536',
      header: 'rgba(14, 19, 32, 0.8)'
    },
    primary: {
      main: '#7582EB',
      light: '#828DF8',
      dark: 'rgb(99, 102, 241)',
      contrastText: PRIMARY_TEXT
    },
    secondary: {
      main: '#10B981',
      light: '#3FC79A',
      dark: '#0B815A',
      contrastText: PRIMARY_TEXT
    },
    success: {
      main: '#14B8A6',
      light: '#43C6B7',
      dark: '#0E8074',
      contrastText: PRIMARY_TEXT
    },
    info: {
      main: '#2196F3',
      light: '#64B6F7',
      dark: '#0B79D0',
      contrastText: PRIMARY_TEXT
    },
    warning: {
      main: '#FFB020',
      light: '#FFBF4C',
      dark: '#B27B16',
      contrastText: PRIMARY_TEXT
    },
    error: {
      main: '#D14343',
      light: '#DA6868',
      dark: '#922E2E',
      contrastText: PRIMARY_TEXT
    },
    text: {
      primary: PRIMARY_TEXT,
      secondary: 'rgb(160, 174, 192)',
      disabled: 'rgba(55, 65, 81, 0.48)'
    },
    grey: {
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6c737f',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
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
          backgroundColor: '#1C2536',
          '.MuiTableCell-root': {
            color: '#9CA1AA'
          }
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #1C2536'
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        standardError: {
          backgroundColor: '#191616',
          color: PRIMARY_TEXT,
          fontSize: 16
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 32
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(49, 51, 120)',
          '& .MuiLinearProgress-barColorPrimary': {
            backgroundColor: 'rgb(99, 102, 241)'
          }
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#9CA3AF #0B0F19',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#0B0F19'
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#111827',
            minHeight: 24,
            border: '3px solid #111827'
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: '#9CA3AF'
          },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
            backgroundColor: '#9CA3AF'
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#9CA3AF'
          },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: '#2b2b2b'
          }
        }
      }
    }
  }
}

export default darkTheme

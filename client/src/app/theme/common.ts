const PRIMARY_FONT = ['Roboto', 'Arial', 'sans-serif'].join(',')
const SECONDARY_FONT = ['Manrope', 'Arial', 'sans-serif'].join(',')

const commonTheme = {
  zIndex: {
    appBar: 1250
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 14,
    fontFamily: PRIMARY_FONT,

    subtitle1: {
      fontFamily: SECONDARY_FONT,
      fontWeight: 500
    },
    subtitle2: {
      fontFamily: SECONDARY_FONT,
      fontSize: '0.775rem'
    },
    body1: {
      fontFamily: PRIMARY_FONT
    },
    body2: {
      fontFamily: PRIMARY_FONT
    },
    caption: {
      fontFamily: SECONDARY_FONT
    },
    overline: {
      fontFamily: SECONDARY_FONT
    },
    button: {
      fontWeight: 400,
      textTransform: 'none',
      fontFamily: PRIMARY_FONT
    },
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.375,
      fontFamily: PRIMARY_FONT
    },
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.375,
      fontFamily: PRIMARY_FONT
    },
    h3: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.375,
      fontFamily: PRIMARY_FONT
    },
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.375,
      fontFamily: PRIMARY_FONT
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.375,
      fontFamily: PRIMARY_FONT
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.375,
      fontFamily: PRIMARY_FONT
    }
  },
  shape: {
    borderRadius: 10
  },
  components: {
    MuiOutlinedInput: {
      defaultProps: {
        sx: {
          fontSize: 14
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          width: '100%',
          '& .MuiTableCell-root': {
            borderBottom: 'none',
            fontSize: '12px',
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: 0.5,
            textTransform: 'uppercase'
          }
        }
      }
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            border: 'none'
          }
        }
      }
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 32
          }
          }
          }

    MuiAccordion: {
      styleOverrides: {
        root: {
          '&.MuiAccordion-root': {
            '&:before': {
              display: 'none'
            },
            '&:after': {
              display: 'none'
            }
          }
}
}
        }
      }
    }
  }
}

export default commonTheme

import { Theme } from '@mui/material'

export const formFieldErrorStyles = {
  input: {
    color: ({ palette }: Theme) => palette.error.main,
  },
  svg: {
    color: ({ palette }: Theme) => palette.error.main,
  },
  label: {
    color: ({ palette }: Theme) => palette.error.main,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: ({ palette }: Theme) => palette.error.main,
    },
    '&:hover fieldset': {
      borderColor: ({ palette }: Theme) => palette.error.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: ({ palette }: Theme) => palette.error.main,
    },
  },
  '& .MuiInputLabel-root': {
    '&.Mui-focused': {
      color: ({ palette }: Theme) => palette.error.main,
    },
  },
}

import { useFormikContext } from 'formik'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { FormControl, FormHelperText, TextField, Theme } from '@mui/material'

import { DEFAULT_DATE_FORMAT } from 'shared/consts'

const formFieldErrorStyles = {
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
}

interface Props {
  label: string
  field: string
  dateFormat?: string
}

function FormDatePicker(props: Props) {
  const { label, field, dateFormat = DEFAULT_DATE_FORMAT } = props
  const { t } = useTranslation()

  const { touched, values, errors, setFieldValue } = useFormikContext<any>()

  const hasError = touched[field] && Boolean(errors[field])

  return (
    <FormControl fullWidth error={hasError}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          {...props}
          label={t(label)}
          inputFormat={dateFormat}
          value={values[field]}
          onChange={(newValue: Date | null) =>
            newValue && setFieldValue(field, format(newValue, DEFAULT_DATE_FORMAT))
          }
          renderInput={(params) => (
            <TextField {...params} sx={hasError ? formFieldErrorStyles : {}} />
          )}
        />
      </LocalizationProvider>
      {touched[field] && <FormHelperText>{errors[field]}</FormHelperText>}
    </FormControl>
  )
}

export default FormDatePicker

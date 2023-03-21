import { useFormikContext } from 'formik'
import { format, isValid } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { FormControl, FormHelperText, TextField } from '@mui/material'

import { DEFAULT_DATE_FORMAT } from 'shared/consts'
import { formFieldErrorStyles } from './errorStyles'

interface Props {
  label: string
  field: string
  dateFormat?: string
}

function FormDatePicker(props: Props) {
  const { label, field, dateFormat = DEFAULT_DATE_FORMAT } = props
  const { t } = useTranslation()

  const { touched, values, errors, setFieldValue } = useFormikContext<{
    [key: string]: any
  }>()

  const hasError = touched[field] && Boolean(errors[field])

  return (
    <FormControl fullWidth error={hasError} sx={hasError ? formFieldErrorStyles : {}}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          {...props}
          label={t(label)}
          inputFormat={dateFormat}
          value={values[field]}
          onChange={(newValue: Date | null) => {
            if (newValue && isValid(newValue)) {
              setFieldValue(field, format(newValue, DEFAULT_DATE_FORMAT))
            }
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      {touched[field] && <FormHelperText>{errors[field]}</FormHelperText>}
    </FormControl>
  )
}

export default FormDatePicker

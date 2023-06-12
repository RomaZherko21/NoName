import { useFormikContext } from 'formik'
import { isValid } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { FormControl, FormHelperText, TextField } from '@mui/material'

import { formFieldErrorStyles } from './errorStyles'

interface Props {
  label: string
  field: string
  dateFormat?: string
}

function FormTimePicker(props: Props) {
  const { t } = useTranslation()
  const { label, field } = props

  const { touched, values, errors, setFieldValue } = useFormikContext<{
    [key: string]: any
  }>()

  const hasError = touched[field] && Boolean(errors[field])

  return (
    <FormControl fullWidth error={hasError} sx={hasError ? formFieldErrorStyles : {}}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileTimePicker
          {...props}
          label={t(label)}
          value={values[field] || '2022-04-17T12:45'}
          onChange={(newValue: Date | null) => {
            if (newValue && isValid(newValue)) {
              setFieldValue(field, newValue)
            }
          }}
          renderInput={(params) => <TextField {...params} error={hasError} />}
        />
      </LocalizationProvider>
      {touched[field] && <FormHelperText>{errors[field]}</FormHelperText>}
    </FormControl>
  )
}

export default FormTimePicker

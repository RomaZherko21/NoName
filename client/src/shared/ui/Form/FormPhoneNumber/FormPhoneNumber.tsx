import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'
import { FormControl, FormHelperText } from '@mui/material'

import MuiPhoneNumber from 'material-ui-phone-number'

import s from './Styles.module.scss'
import { formFieldErrorStyles } from '../errorStyles'

interface Props {
  label: string
  field: string
}

function FormPhoneNumber(props: Props) {
  const { label, field } = props
  const { t } = useTranslation()

  const { touched, errors, setFieldValue, values } = useFormikContext<{ [key: string]: any }>()

  const hasError = touched[field] && Boolean(errors[field])

  return (
    <FormControl fullWidth error={hasError} sx={hasError ? formFieldErrorStyles : {}}>
      <MuiPhoneNumber
        label={t(label)}
        fullWidth
        variant="outlined"
        defaultCountry="by"
        value={values[field]}
        onChange={(value) => {
          setFieldValue(field, value)
        }}
        autoFormat
        disableAreaCodes
        dropdownClass={s.dropdown}
      />
      {touched[field] && <FormHelperText>{errors[field]}</FormHelperText>}
    </FormControl>
  )
}

export default FormPhoneNumber

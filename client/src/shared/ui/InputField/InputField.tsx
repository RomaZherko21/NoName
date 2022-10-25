import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { useFormikContext } from 'formik'
import { TextField } from '@mui/material'

interface Props {
  field: string
  label: string
  type?: string
  multiline?: boolean
}

const InputField = ({ field, label, type, multiline = false }: Props) => {
  const { t } = useTranslation()

  const { touched, values, errors, handleChange } = useFormikContext<any>()

  return (
    <TextField
      fullWidth
      id={field}
      name={field}
      label={t(label)}
      type={type}
      value={values[field]}
      onChange={handleChange}
      error={touched[field] && Boolean(errors[field])}
      helperText={touched[field] && errors[field]}
      multiline={multiline}
    />
  )
}

export default observer(InputField)

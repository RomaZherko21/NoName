import { TextField } from '@mui/material'
import { useFormikContext } from 'formik'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

interface Props {
  field: string
  label: string
  type?: string
}

const InputField = ({ field, label, type }: Props) => {
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
    />
  )
}

export default observer(InputField)

import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useFormikContext } from 'formik'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'

interface Props {
  field: string
  label: string
  options: { [key: string]: string }
}

const FormSelect = ({ field, label, options }: Props) => {
  const { t } = useTranslation()

  const { touched, values, errors, setFieldValue } = useFormikContext<any>()

  return (
    <FormControl fullWidth error={touched[field] && Boolean(errors[field])}>
      <InputLabel id={field}>{t(label)}</InputLabel>
      <Select
        labelId={field}
        id={field}
        value={values[field]}
        label={t(label)}
        onChange={(e) => setFieldValue(field, e.target.value)}
      >
        {Object.entries(options).map(([key, text]) => (
          <MenuItem key={key} value={key}>
            {t(text)}
          </MenuItem>
        ))}
      </Select>
      {touched[field] && <FormHelperText>{errors[field]}</FormHelperText>}
    </FormControl>
  )
}

export default observer(FormSelect)

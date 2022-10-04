import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { useFormikContext } from 'formik'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

interface Props {
  field: string
  label: string
  options: any
}

const SelectField = ({ field, label, options }: Props) => {
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
        {Object.values(options).map((value: any) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
      {touched[field] && <FormHelperText>{errors[field]}</FormHelperText>}
    </FormControl>
  )
}

export default observer(SelectField)

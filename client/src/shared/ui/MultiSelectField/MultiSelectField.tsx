import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useFormikContext } from 'formik'
import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material'

interface Props {
  field: string
  label: string
  options: any
}

const MultiSelectField = ({ field, label, options }: Props) => {
  const { t } = useTranslation()

  const { touched, values, errors, setFieldValue } = useFormikContext<any>()

  const handleChange = (event: SelectChangeEvent<typeof options>) => {
    const {
      target: { value },
    } = event
    setFieldValue(field, value.split(','))
  }

  return (
    <FormControl fullWidth error={touched[field] && Boolean(errors[field])}>
      <InputLabel id={field}>{t(label)}</InputLabel>
      <Select
        labelId={field}
        id={field}
        value={values[field]}
        input={<OutlinedInput label={t(label)} />}
        onChange={handleChange}
        renderValue={(selected) => selected.join(', ')}
        multiple
      >
        {Object.values(options).map((value: any) => (
          <MenuItem key={value} value={value}>
            <Checkbox checked={Object.values(options).indexOf(value) > -1} />
            <ListItemText primary={value} />
          </MenuItem>
        ))}
      </Select>
      {touched[field] && <FormHelperText>{errors[field]}</FormHelperText>}
    </FormControl>
  )
}

export default observer(MultiSelectField)

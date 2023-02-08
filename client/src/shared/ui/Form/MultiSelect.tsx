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

interface Option {
  id: number
  name: string
}

interface Props {
  field: string
  label: string
  options: Option[]
}

const MultiSelectField = ({ field, label, options }: Props) => {
  const { t } = useTranslation()

  const { touched, values, errors, setFieldValue } = useFormikContext<any>()

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setFieldValue(field, event.target.value)
  }

  return (
    <FormControl fullWidth error={touched[field] && Boolean(errors[field])}>
      <InputLabel id={field}>{t(label)}</InputLabel>
      <Select
        labelId={field}
        id={field}
        value={values[field] || []}
        input={<OutlinedInput label={t(label)} />}
        onChange={handleChange}
        renderValue={(selected) => selected.join(', ')}
        multiple
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 230,
            },
          },
        }}
      >
        {options.map((value: { id: number; name: string }) => (
          <MenuItem key={value.name} value={value.name}>
            <Checkbox checked={values[field]?.indexOf(value.name) > -1} />
            <ListItemText primary={value.name} />
          </MenuItem>
        ))}
      </Select>
      {touched[field] && <FormHelperText>{errors[field]}</FormHelperText>}
    </FormControl>
  )
}

export default observer(MultiSelectField)

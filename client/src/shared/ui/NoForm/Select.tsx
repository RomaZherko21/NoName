import { useTranslation } from 'react-i18next'
import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material'

interface Props {
  field: string
  label: string
  options: any
  value: string
  onChange: (e: any) => void
}

const Select = ({ label, options, onChange, value }: Props) => {
  const { t } = useTranslation()

  return (
    <FormControl fullWidth size="small">
      <InputLabel>{t(label)}</InputLabel>
      <MuiSelect fullWidth label={t(label)} onChange={onChange} value={value}>
        {Object.values(options).map((value: any) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}

export default Select

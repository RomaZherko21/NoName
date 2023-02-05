import { useTranslation } from 'react-i18next'
import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material'

interface Props {
  label: string
  options: { [key: string]: string }
  value: string
  size?: 'small' | 'medium'
  onChange: (e: any) => void
  [key: string]: any
}

const Select = (props: Props) => {
  const { label, options, onChange, value, size = 'small' } = props
  const { t } = useTranslation()

  return (
    <FormControl {...props} fullWidth size={size}>
      <InputLabel>{t(label)}</InputLabel>
      <MuiSelect fullWidth label={t(label)} onChange={onChange} value={value}>
        {Object.entries(options).map(([key, text]) => (
          <MenuItem key={key} value={key}>
            {t(text)}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}

export default Select

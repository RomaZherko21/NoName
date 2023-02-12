import { DatePicker as MuiDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface Props {
  label: string
  value: string
  onChange: (e: number | null) => void
}

function DatePicker(props: Props) {
  const { label, value, onChange } = props
  const { t } = useTranslation()

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        {...props}
        label={t(label)}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} size="small" />}
      />
    </LocalizationProvider>
  )
}

export default DatePicker

import { DatePicker as MuiDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface Props {
  label: string
  value: string
  onChange: (e: any) => void
}

function DatePicker({ label, value, onChange }: Props) {
  const { t } = useTranslation()

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        label={t(label)}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} size="small" />}
      />
    </LocalizationProvider>
  )
}

export default DatePicker

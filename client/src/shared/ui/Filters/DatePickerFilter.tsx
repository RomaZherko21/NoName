import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface Props {
  label: string
  value: string
  onChange: (e: any) => void
}

function DatePickerFilter({ label, value, onChange }: Props) {
  const { t } = useTranslation()

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={t(label)}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} size="small" />}
      />
    </LocalizationProvider>
  )
}

export default DatePickerFilter

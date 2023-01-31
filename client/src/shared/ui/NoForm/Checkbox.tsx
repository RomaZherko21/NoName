import { useTranslation } from 'react-i18next'
import FormControlLabel from '@mui/material/FormControlLabel'
import {default as MuiCheckbox} from '@mui/material/Checkbox'

interface Props {
  checked: boolean
  label: string
  onChange: (e: any) => void
}

function Checkbox({ checked, label, onChange }: Props) {
  const { t } = useTranslation()

  return (
    <FormControlLabel
      control={<MuiCheckbox defaultChecked size="medium" checked={checked} onChange={onChange} />}
      label={t(label)}
    />
  )
}

export default Checkbox

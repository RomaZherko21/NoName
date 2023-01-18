import { useTranslation } from 'react-i18next'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

interface Props {
  checked: boolean
  label: string
  onChange: (e: any) => void
}

function CheckBoxFilter({ checked, label, onChange }: Props) {
  const { t } = useTranslation()

  return (
    <FormControlLabel
      control={<Checkbox defaultChecked size="medium" checked={checked} onChange={onChange} />}
      label={t(label)}
    />
  )
}

export default CheckBoxFilter

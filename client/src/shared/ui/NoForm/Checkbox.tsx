import { SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import FormControlLabel from '@mui/material/FormControlLabel'
import { default as MuiCheckbox } from '@mui/material/Checkbox'

interface Props {
  checked: boolean
  label: string
  onChange: (e: React.SyntheticEvent<Element, Event>, checked: boolean) => void
}

function Checkbox(props: Props) {
  const { checked, label, onChange } = props
  const { t } = useTranslation()

  return (
    <FormControlLabel
      {...props}
      control={<MuiCheckbox defaultChecked size="small" checked={checked} onChange={onChange} />}
      label={t(label)}
    />
  )
}

export default Checkbox

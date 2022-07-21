import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface Props {
  placeholder?: string
  size?: 'small' | 'medium' | undefined
}

export const InputFilter = (props: Props) => {
  const { t } = useTranslation()

  const { placeholder = 'common.emptyInput', size = 'small' } = props

  return (
    <TextField
      {...props}
      placeholder={t(placeholder)}
      label={t(placeholder)}
      variant="outlined"
      size={size}
    />
  )
}

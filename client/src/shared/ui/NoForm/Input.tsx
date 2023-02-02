import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface Props {
  placeholder?: string
  size?: 'small' | 'medium' | undefined
}

const Input = (props: Props & any) => {
  const { t } = useTranslation()

  const { placeholder = 'common.emptyInput', size = 'small' } = props

  return (
    <TextField
      fullWidth
      placeholder={t(placeholder)}
      label={t(placeholder)}
      variant="outlined"
      size={size}
      {...props}
    />
  )
}

export default Input

import { InputAdornment, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface Props {
  placeholder?: string
  size?: 'small' | 'medium' | undefined
  icon?: JSX.Element
  fullWidth?: boolean
}

const Input = (props: Props & any) => {
  const { t } = useTranslation()

  const { placeholder = 'common.emptyInput', size = 'small', icon, fullWidth = true } = props

  return (
    <TextField
      {...props}
      fullWidth={fullWidth}
      placeholder={t(placeholder)}
      label={t(placeholder)}
      variant="outlined"
      size={size}
      InputProps={
        icon && {
          startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
        }
      }
    />
  )
}

export default Input

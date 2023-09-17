import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { useFormikContext } from 'formik'
import { InputAdornment, TextField } from '@mui/material'
import { useMemo } from 'react'

interface Props {
  field: string
  label: string
  type?: string
  size?: 'medium' | 'small'
  multiline?: boolean
  rows?: number
  icon?: JSX.Element
  isEditActive?: boolean
}

const FormInput = ({
  field,
  label,
  size = 'medium',
  type,
  multiline = false,
  icon,
  rows = 0,
  isEditActive = true
}: Props) => {
  const { t } = useTranslation()

  const { touched, values, errors, handleChange } = useFormikContext<{
    [key: string]: any
  }>()

  const isDisabled = !isEditActive

  function addStyles() {
    let result = {}

    if (!isEditActive) {
      result = {
        ...result,
        ...{
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: 'white'
          },
          '& fieldset': { border: 'none' }
        }
      }
    }

    return result
  }

  const additionalStyles = useMemo(addStyles, [isEditActive])

  return (
    <TextField
      id={field}
      name={field}
      value={values[field]}
      onChange={handleChange}
      disabled={isDisabled}
      sx={additionalStyles}
      fullWidth
      size={size}
      label={t(label)}
      type={type}
      error={touched[field] && Boolean(errors[field])}
      helperText={touched[field] && errors[field]}
      multiline={multiline}
      rows={rows}
      InputProps={
        icon && {
          startAdornment: <InputAdornment position="start">{icon}</InputAdornment>
        }
      }
    />
  )
}

export default observer(FormInput)

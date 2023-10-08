import { useTranslation } from 'react-i18next'
import { useFormikContext } from 'formik'
import { Autocomplete, Box, InputAdornment, TextField } from '@mui/material'

import { countries } from '../contryConfig'

interface Props {
  label: string
  field: string
}

function FormPhoneNumber2(props: Props) {
  const { label, field } = props
  const { t } = useTranslation()
  const { setFieldValue, values } = useFormikContext<{
    [key: string]: any
  }>()

  return (
    <Autocomplete
      id="country-select-demo"
      options={countries}
      autoHighlight
      fullWidth
      onChange={(_, value) => {
        setFieldValue(field, value)
      }}
      getOptionLabel={(option) => `+${option.phone}`}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img loading="lazy" width="20" src={`/flags/${option.code.toLowerCase()}.svg`} alt="" />+
          {option.phone}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t(label)}
          variant="outlined"
          fullWidth
          value={values[field]}
          onChange={(value) => {
            setFieldValue(field, value)
          }}
          InputProps={{
            ...params.InputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
            startAdornment: (
              <InputAdornment position="start">
                <img
                  loading="lazy"
                  width="24"
                  src={`/flags/${values[field]?.code?.toLowerCase()}.svg`}
                  alt=""
                />
              </InputAdornment>
            )
          }}
        />
      )}
    />
  )
}

export default FormPhoneNumber2

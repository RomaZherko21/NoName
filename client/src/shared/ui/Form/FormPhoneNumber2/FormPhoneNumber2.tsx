import { Autocomplete, Box, TextField } from '@mui/material'
import { useState } from 'react'
import { countries } from '../contryConfig'
import { useTranslation } from 'react-i18next'

import { useFormikContext } from 'formik'

interface Props {
  label: string
  field: string
}

function FormPhoneNumber2(props: Props) {
  const [value, setValue] = useState<any>('')
  const { label, field } = props
  const { t } = useTranslation()
  const { setFieldValue } = useFormikContext<{
    [key: string]: any
  }>()

  const handleCountryChange = (event: React.ChangeEvent<{}>, value: any) => {
    setValue(value)
    setFieldValue(field, value)
  }

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 400 }}
      options={countries}
      autoHighlight
      onChange={handleCountryChange}
      getOptionLabel={(option) => `+${option.phone}`}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img loading="lazy" width="20" src={`/flags/${option.code.toLowerCase()}.svg`} alt="" />
          {option.label} (+{option.phone})
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t(label)}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password' // disable autocomplete and autofill
          }}
          value={value}
          onChange={(event) => {
            console.log('sadasdsa', event.target.value)
            setValue(event.target.value)
          }}
        />
      )}
    />
  )
}

export default FormPhoneNumber2

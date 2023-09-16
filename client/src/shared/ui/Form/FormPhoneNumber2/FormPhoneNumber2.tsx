import { Autocomplete, Box, TextField } from '@mui/material'
import { useState } from 'react'
import { countries } from '../contryConfig'

function FormPhoneNumber2() {
  const [value, setValue] = useState<any>('')

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 400 }}
      options={countries}
      autoHighlight
      onChange={(event, values) => {
        console.log(event, values)
      }}
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
          label="Choose a country"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password' // disable autocomplete and autofill
          }}
          onChange={(e) => {
            console.log('sadasdsa', e.target.value)
            setValue(e.target.value)
          }}
          value={value}
        />
      )}
    />
  )
}

export default FormPhoneNumber2

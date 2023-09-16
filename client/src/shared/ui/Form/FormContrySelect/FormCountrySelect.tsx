import { Autocomplete, Box, TextField } from '@mui/material'
import { countries } from '../contryConfig'

function FormCountrySelect() {
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 400 }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img loading="lazy" width="20" src={`/flags/${option.code.toLowerCase()}.svg`} alt="" />
          {option.label}
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
        />
      )}
    />
  )
}

export default FormCountrySelect

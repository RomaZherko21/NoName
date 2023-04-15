import { Grid } from '@mui/material'

import { ContactForm, ContactInfo } from './ui'

const Contact = () => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: ({ palette }) => palette.background.paper
      }}
    >
      <Grid
        sx={{
          backgroundColor: 'background.rare'
        }}
        item
        md={6}
        xs={12}
      >
        <ContactInfo />
      </Grid>
      <Grid item md={6} xs={12}>
        <ContactForm />
      </Grid>
    </Grid>
  )
}

export default Contact

import { Typography, Container, Paper, Grid } from '@mui/material'

function NewBook() {
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        New book
      </Typography>
      <Paper>
        <Grid></Grid>
        <Grid></Grid>
      </Paper>
    </Container>
  )
}

export default NewBook

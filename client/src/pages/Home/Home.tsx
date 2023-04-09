import { Container } from '@mui/material'

import { Reviews, Questions } from './ui'

function Home() {
  return (
    <Container component="main" maxWidth="lg">
      <Reviews />
      <Questions />
    </Container>
  )
}

export default Home

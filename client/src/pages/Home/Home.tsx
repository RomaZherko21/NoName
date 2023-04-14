import { Container } from '@mui/material'

import { Reviews, Questions, Footer } from './ui'

function Home() {
  return (
    <Container component="main"  maxWidth="lg">
      <Reviews />
      <Questions />
      <Footer/>
    </Container>
  )
}

export default Home

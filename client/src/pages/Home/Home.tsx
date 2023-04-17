import { Container } from '@mui/material'

import { Reviews, Questions, HomeHeader, Footer } from './ui'

function Home() {
  return (
    <Container component="main" maxWidth="lg">
      <HomeHeader />
      <Reviews />
      <Questions />
      <Footer/>
    </Container>
  )
}

export default Home

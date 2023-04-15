import { Container } from '@mui/material'

import { Reviews, Questions, HomeHeader } from './ui'

function Home() {
  return (
    <Container component="main" maxWidth="lg">
      <HomeHeader />
      <Reviews />
      <Questions />
    </Container>
  )
}

export default Home

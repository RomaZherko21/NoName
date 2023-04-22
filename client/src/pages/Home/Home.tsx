import { Container } from '@mui/material'

import { Reviews, Questions, HomeHeader, MainSection, Footer } from './ui'

function Home() {
  return (
    <Container component="main" maxWidth="lg" sx={{ p: 15 }}>
      <HomeHeader />
      <MainSection />
      <Reviews />
      <Questions />
      <Footer />
    </Container>
  )
}

export default Home

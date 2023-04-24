import { Container } from '@mui/material'

import { Reviews, Questions, HomeHeader, MainSection, Footer, Purchase, ToolsItems } from './ui'

function Home() {
  return (
    <Container component="main" maxWidth="lg" sx={{ p: 15 }}>
      <HomeHeader />
      <MainSection />
      <ToolsItems />
      <Reviews />
      <Purchase />
      <Questions />
      <Footer />
    </Container>
  )
}

export default Home

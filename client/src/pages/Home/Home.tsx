import { Container } from '@mui/material'

import { Reviews, Questions, HomeHeader, Purchase, ToolsItems } from './ui'

function Home() {
  return (
    <Container component="main" maxWidth="xl">
      <HomeHeader />
      <ToolsItems />
      <Reviews />
      <Purchase />
      <Questions />
    </Container>
  )
}

export default Home

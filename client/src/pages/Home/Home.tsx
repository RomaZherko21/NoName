import { Box, Container } from '@mui/material'

import { Reviews, Questions, HomeHeader, MainSection, Footer, Purchase, ToolsItems } from './ui'

function Home() {
  return (
    <Box sx={{ pt: 15 }}>
      <HomeHeader />
      <MainSection />
      <ToolsItems />
      <Reviews />
      <Purchase />
      <Questions />
      <Footer />
    </Box>
  )
}

export default Home

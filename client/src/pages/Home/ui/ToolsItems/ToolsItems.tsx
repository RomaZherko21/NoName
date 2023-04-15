import { useTranslation } from 'react-i18next'

import { Box, Container, Typography } from '@mui/material'

function ToolsItems() {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        mt: 12,
        background: ({ palette }) =>
          `linear-gradient(45deg, ${palette.background.default} 30%, rgba(37, 69, 125, 1) 80%, rgba(3, 175, 213, 1) 100%)`
      }}
    >
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          py: 15
        }}
      >
        <Typography variant="h3" textAlign="center">
          {t('home:toolsitams.title')}
        </Typography>
        <Typography variant="subtitle1" textAlign="center" sx={{ mt: 2 }}>
          {t('home:toolsitams.subtitle')}
        </Typography>
      </Container>
    </Box>
  )
}

export default ToolsItems

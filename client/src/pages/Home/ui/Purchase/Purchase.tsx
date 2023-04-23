import { useTranslation } from 'react-i18next'

import { Box, Button, Container, Typography } from '@mui/material'

function Purchase() {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        mt: 12,
        // background: ({ palette }) =>
        //   `linear-gradient(45deg, ${palette.background.default} 30%, rgba(37, 69, 125, 1) 80%, rgba(3, 175, 213, 1) 100%)`
        background: `linear-gradient(349deg, rgba(54, 72, 87) 35%, rgba(50, 90, 112, 0.7) 71%, rgba(3, 213, 213, 0.25) 100%)`
      }}
    >
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          py: 12
        }}
      >
        <Typography variant="h3" textAlign="center">
          {t('home:purchasing.title')}
        </Typography>
        <Typography variant="subtitle1" textAlign="center" sx={{ mt: 2 }}>
          {t('home:purchasing.subtitle')}
        </Typography>
        <Button variant="contained" sx={{ mt: 3 }}>
          {t('home:purchaseNow')}
        </Button>
      </Container>
    </Box>
  )
}

export default Purchase

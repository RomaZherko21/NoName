import { useTranslation } from 'react-i18next'
import { Box, Button, Typography } from '@mui/material'

function Purchase() {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        mt: 12,
        background: `linear-gradient(337deg, rgba(54, 72, 87, 0.5) 35%, rgba(50, 90, 112, 0.7) 71%, rgba(3, 213, 213, 0.1) 100%)`,
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
    </Box>
  )
}

export default Purchase

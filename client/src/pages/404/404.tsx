import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import notFoundImg from 'assets/images/404.png'

const NotFound = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>{t('page:404')}</title>
        <meta name="description" content={t('page:404')} />
      </Helmet>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          alt="Under development"
          src={notFoundImg}
          style={{
            marginBottom: 50,
            display: 'inline-block',
            maxWidth: '100%',
            width: 350,
          }}
        />
        <Typography align="center" color="text.primary" variant="h3">
          {t('sentences:notFound.title')}
        </Typography>
        <Typography align="center" color="text.secondary" variant="subtitle2">
          {t('sentences:notFound.subtitle')}
        </Typography>
        <Button
          onClick={() => {
            navigate(-1)
          }}
          sx={{ mt: 6 }}
          variant="text"
        >
          {t('actions.goBack')}
        </Button>
      </Box>
    </>
  )
}

export default NotFound

import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Box, Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import notFoundImg from 'assets/images/error-404.png'

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
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
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
            </Box>
            <Typography align="center" color="textPrimary" variant="h3">
              {t('sentences:notFound.title')}
            </Typography>
            <Typography align="center" color="rgb(160, 174, 192)" variant="subtitle2">
              {t('sentences:notFound.subtitle')}
            </Typography>
            <Button
              sx={{ mt: 6 }}
              variant="text"
              onClick={() => {
                navigate(-1)
              }}
            >
              {t('actions.goBack')}
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default NotFound

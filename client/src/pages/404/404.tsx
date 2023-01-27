import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Box, Button, Container, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'

import notFoundImg from 'assets/images/404.svg'

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
            <Typography align="center" color="textPrimary" variant="h1">
              {t('sentences:notFound.title')}
            </Typography>
            <Typography align="center" color="textPrimary" variant="subtitle2">
              {t('sentences:notFound.subtitle')}
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <img
                alt="Under development"
                src={notFoundImg}
                style={{
                  marginTop: 50,
                  display: 'inline-block',
                  maxWidth: '100%',
                  width: 560,
                }}
              />
            </Box>
            <Button
              startIcon={<ArrowBackIcon fontSize="small" />}
              sx={{ mt: 3 }}
              variant="contained"
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

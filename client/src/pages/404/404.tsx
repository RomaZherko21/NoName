import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Box, Button, Container, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import notFoundImg from 'assets/images/404.svg'

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>404 | Page not found</title>
        <meta name="description" content="404 | Page not found" />
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
              {t('sentence:notFound.title')}
            </Typography>
            <Typography align="center" color="textPrimary" variant="subtitle2">
              {t('sentence:notFound.subtitle')}
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
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
              sx={{ mt: 3 }}
              variant="contained"
              href="/"
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

import { useTranslation } from 'react-i18next'

import { Box, Typography, Link as MuiLink } from '@mui/material'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'

import { ROUTES } from 'shared/consts'
import { Link } from 'react-router-dom'

const Contact = () => {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        backgroundColor: ({ palette }) => palette.background.paper,
        py: 8,
        px: 4
      }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="left"
    >
      <MuiLink
        component={Link}
        underline="hover"
        variant="body2"
        color="text.primary"
        to={ROUTES.HOME}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <ArrowBackOutlinedIcon></ArrowBackOutlinedIcon>
        {t('page:home')}
      </MuiLink>

      <Typography variant="h4" sx={{ mt: 2 }}>
        {t('sentences:Contact')}
      </Typography>

      <Box display="flex" alignItems="center" sx={{ mt: 2, gap: 2 }}>
        <Box
          sx={{
            backgroundColor: ({ palette }) => palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: 1
          }}
        >
          <MailOutlinedIcon />
        </Box>
        <Typography variant="body2">Contact sales</Typography>
      </Box>

      <Typography variant="h1" sx={{ mt: 6 }}>
        Talk to our account expert
      </Typography>

      <Typography sx={{ mt: 2 }}>
        Have questions about integrating our APIs? Fill out the form and a senior web expert will be
        in touch shortly.
      </Typography>
      <Typography sx={{ mt: 2 }} color="primary" variant="h6">
        Join 6,000+ forward-thinking companies:
      </Typography>

      <Box
        display="flex"
        sx={{
          mt: 4,
          gap: 4
        }}
      >
        <img src="/src/shared/assets/images/contact/samsung.svg" alt="samsung" />

        <img src="/src/shared/assets/images/contact/visma.svg" alt="visma" />

        <img src="/src/shared/assets/images/contact/bolt.svg" alt="bolt" />

        <img src="/src/shared/assets/images/contact/aws.svg" alt="aws" />

        <img src="/src/shared/assets/images/contact/assent.svg" alt="assent" />

        <img src="/src/shared/assets/images/contact/att.svg" alt="att" />
      </Box>
    </Box>
  )
}

export default Contact

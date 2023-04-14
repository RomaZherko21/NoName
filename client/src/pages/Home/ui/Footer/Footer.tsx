import { Link } from 'react-router-dom'
import { Grid, Typography, Divider, Link as MuiLink, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ROUTES } from 'shared/consts'

import logo from 'shared/assets/images/logo/white-transparent-logo.svg'

function Footer() {
  const { t } = useTranslation()

  return (
    <Box sx={{ backgroundColor: 'background.rare', pt: 12, pb: 6 }}>
      <Grid container spacing={6} sx={{ display: 'flex' }}>
        <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <MuiLink component={Link} to={ROUTES.HOME} sx={{ width: 'fit-content' }}>
            <img
              alt="NoName logo"
              src={logo}
              style={{
                width: 90
              }}
            />
          </MuiLink>
          <Typography variant="caption" color="text.secondary">
            {t('home:development')}
          </Typography>
        </Grid>

        <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {t('home:menu')}
          </Typography>
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
            <Box
              sx={{
                mr: 1,
                width: 12,
                height: 2,
                backgroundColor: 'primary.main'
              }}
            />
            Browse Components
          </MuiLink>
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
            <Box
              sx={{
                mr: 1,
                width: 12,
                height: 2,
                backgroundColor: 'primary.main'
              }}
            />
            Documentation
          </MuiLink>
        </Grid>

        <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {t('home:legal')}
          </Typography>
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
            <Box
              sx={{
                mr: 1,
                width: 12,
                height: 2,
                backgroundColor: 'primary.main'
              }}
            />
            Terms & Conditions
          </MuiLink>
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
            <Box
              sx={{
                mr: 1,
                width: 12,
                height: 2,
                backgroundColor: 'primary.main'
              }}
            />
            License
          </MuiLink>
          <MuiLink
            component={Link}
            underline="hover"
            variant="body2"
            color="text.primary"
            to={ROUTES.CONTACT}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Box
              sx={{
                mr: 1,
                width: 12,
                height: 2,
                backgroundColor: 'primary.main'
              }}
            />
            Contact
          </MuiLink>
        </Grid>

        <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {t('home:social')}
          </Typography>
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
            <Box
              sx={{
                mr: 1,
                width: 12,
                height: 2,
                backgroundColor: 'primary.main'
              }}
            />
            Instagram
          </MuiLink>
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
            <Box
              sx={{
                mr: 1,
                width: 12,
                height: 2,
                backgroundColor: 'primary.main'
              }}
            />
            LinkedIn
          </MuiLink>
        </Grid>
      </Grid>

      <Divider sx={{ my: 6 }} />

      <Typography variant="caption" color="text.secondary">
        {t('home:rights')}
      </Typography>
    </Box>
  )
}

export default Footer

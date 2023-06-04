import { Link } from 'react-router-dom'
import { Grid, Typography, Divider, Link as MuiLink, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ROUTES } from 'shared/consts'
import FooterLink from './FooterLink'

import logo from 'shared/assets/images/logo/white-transparent-logo.svg'

function Footer() {
  const { t } = useTranslation()

  return (
    <Box sx={{ backgroundColor: 'background.rare', pt: 12, pb: 6, pr: 12, pl: 12 }}>
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
          {[
            {
              title: 'Browse Components',
              path: ROUTES.HOME
            },
            {
              title: 'Documentation',
              path: ROUTES.HOME
            }
          ].map((category) => (
            <FooterLink category={category} key={category.title} />
          ))}
        </Grid>

        <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {t('home:legal')}
          </Typography>
          {[
            {
              title: 'Terms & Conditions',
              path: ROUTES.HOME
            },
            {
              title: 'License',
              path: ROUTES.HOME
            },
            {
              title: 'Contact',
              path: ROUTES.CONTACT
            }
          ].map((category) => (
            <FooterLink category={category} key={category.title} />
          ))}
        </Grid>

        <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {t('home:social')}
          </Typography>
          {[
            {
              title: 'Instagram',
              path: ROUTES.HOME
            },
            {
              title: 'LinkedIn',
              path: ROUTES.HOME
            }
          ].map((category) => (
            <FooterLink category={category} key={category.title} />
          ))}
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

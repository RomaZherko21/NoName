import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { Box, Breadcrumbs, Grid, IconButton, Link as MuiLink, Typography } from '@mui/material'
import { AiOutlineHome } from 'react-icons/ai'

import { ROUTES } from 'shared/consts'

interface Props {
  pageName: string
  children?: JSX.Element | null
  breadcrumbs?: { to?: string; text: string }[]
}

const PageHeader = ({ pageName, children, breadcrumbs }: Props) => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{pageName}</title>
        <meta name="description" content={pageName} />
      </Helmet>

      <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
        <Grid item sx={{ mb: 8 }}>
          <Typography variant="h4" color="text.primary">
            {pageName}
          </Typography>

          <Breadcrumbs
            aria-label="breadcrumb"
            separator={
              <Box
                sx={{
                  width: '4px',
                  height: '4px',
                  backgroundColor: 'text.secondary',
                  borderRadius: 50,
                }}
              />
            }
          >
            <MuiLink
              component={Link}
              underline="hover"
              variant="body2"
              color="text.primary"
              to={ROUTES.HOME}
            >
              <IconButton
                sx={{
                  color: ({ palette }) => palette.text.secondary,
                  fontSize: 12,
                  '&.MuiButtonBase-root:hover': {
                    bgcolor: 'transparent',
                  },
                }}
              >
                <AiOutlineHome />
              </IconButton>
              {t('page:home')}
            </MuiLink>

            {breadcrumbs?.map((item) =>
              item.to ? (
                <MuiLink
                  component={Link}
                  underline="hover"
                  variant="body2"
                  color="text.primary"
                  to={item.to}
                  key={item.to}
                >
                  {t(item.text)}
                </MuiLink>
              ) : (
                <Typography key={item.to} variant="body2" color="text.secondary">
                  {t(item.text)}
                </Typography>
              )
            )}
          </Breadcrumbs>
        </Grid>
        {children}
      </Grid>
    </>
  )
}

export default PageHeader

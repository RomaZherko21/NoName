import { useTranslation } from 'react-i18next'
import { Grid, Typography } from '@mui/material'
import { Helmet } from 'react-helmet'

import { AnalyticsInfoBlock, Charts } from './ui'

function LibraryStatistics() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('page:libraryStatistics')}</title>
        <meta name="description" content={t('page:libraryStatistics')} />
      </Helmet>

      <Grid container>
        <Grid item>
          <Typography variant="h3" color="text.primary">
            {t('page:libraryStatistics')}
          </Typography>
        </Grid>
      </Grid>

      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticsInfoBlock
            title="Total Page Views"
            count="4,42,236"
            percentage={59.3}
            extra="35,000"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticsInfoBlock title="Total Users" count="78,250" percentage={70.5} extra="8,900" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticsInfoBlock
            title="Total Order"
            count="18,800"
            percentage={27.4}
            isLoss
            color="warning"
            extra="1,943"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticsInfoBlock
            title="Total Sales"
            count="$35,078"
            percentage={27.4}
            isLoss
            color="warning"
            extra="$20,395"
          />
        </Grid>
        <Grid item xs={12}>
          <Charts />
        </Grid>
      </Grid>
    </>
  )
}

export default LibraryStatistics

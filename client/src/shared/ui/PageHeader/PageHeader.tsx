import { Grid, Typography } from '@mui/material'
import { Helmet } from 'react-helmet'

const PageHeader = ({ pageName, children }: { pageName: string; children?: JSX.Element }) => (
  <>
    <Helmet>
      <title>{pageName}</title>
      <meta name="description" content={pageName} />
    </Helmet>

    <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
      <Grid item>
        <Typography variant="h3" color="text.primary" sx={{ mb: 8 }}>
          {pageName}
        </Typography>
      </Grid>
      {children}
    </Grid>
  </>
)

export default PageHeader

import { useTranslation } from 'react-i18next'
import { Box, Container, Grid, Paper, Typography } from '@mui/material'

import { PageHeader } from 'shared/ui'
import ProfileCover from 'assets/images/cover.jpg'

function Post() {
  const { t } = useTranslation()

  return (
    <Container>
      <PageHeader pageName={t('page:post')} />
      <Paper elevation={1} sx={{ mb: 3 }}>
        <Box display="flex" alignItems="center" sx={{ p: 4 }}>
          <Typography variant="h6">Name of Post</Typography>
        </Box>
        <Grid item xs={12}>
          <img src={ProfileCover} alt="profile cover" />
        </Grid>
      </Paper>
    </Container>
  )
}

export default Post

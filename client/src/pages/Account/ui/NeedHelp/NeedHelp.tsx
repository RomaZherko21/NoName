import { useTranslation } from 'react-i18next'
import { Avatar, AvatarGroup, Button, Card, Grid, Stack, Typography } from '@mui/material'

function NeedHelp() {
  const { t } = useTranslation()

  return (
    <Card sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Stack>
              <Typography variant="h5" noWrap>
                {t('translation:common.helpAndSupport')}
              </Typography>
              <Typography variant="caption" color="secondary" noWrap>
                {t('translation:common.typicalReplay')}
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
              <Avatar alt="Remy Sharp" src="" />
              <Avatar alt="Travis Howard" src="" />
              <Avatar alt="Cindy Baker" src="" />
              <Avatar alt="Agnes Walker" src="" />
            </AvatarGroup>
          </Grid>
        </Grid>
        <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
          {t('notification:needHelp')}
        </Button>
      </Stack>
    </Card>
  )
}

export default NeedHelp

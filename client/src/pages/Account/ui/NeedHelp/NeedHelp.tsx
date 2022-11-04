import { Avatar, AvatarGroup, Button, Card, Grid, Stack, Typography } from '@mui/material'

function NeedHelp() {
  return (
    <Card sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Stack>
              <Typography variant="h5" noWrap>
                Help & Support Chat
              </Typography>
              <Typography variant="caption" color="secondary" noWrap>
                Typical replay within 5 min
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
          Need Help?
        </Button>
      </Stack>
    </Card>
  )
}

export default NeedHelp

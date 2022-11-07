import { Box, Card, Divider, Grid, Stack, Switch, Typography } from '@mui/material'

function Notifications() {
  return (
    <>
      <Card sx={{ mt: 2 }}>
        <Grid container sx={{ p: 4 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5">Email</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
              <Box>
                <Typography variant="h6">Product updates</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  News, announcements, and product updates.
                </Typography>
              </Box>
              <Switch defaultChecked />
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
              <Box>
                <Typography variant="h6">Security updates</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Important notifications about your account security.
                </Typography>
              </Box>
              <Switch defaultChecked />
            </Stack>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ mt: 2 }}>
        <Grid container sx={{ p: 4 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5">Phone notifications</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
              <Box>
                <Typography variant="h6">Product updates</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  News, announcements, and product updates.
                </Typography>
              </Box>
              <Switch defaultChecked />
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default Notifications

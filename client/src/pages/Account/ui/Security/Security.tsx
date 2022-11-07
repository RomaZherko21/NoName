import { Box, Button, Card, Divider, Grid, Paper, Stack, Switch, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { InputFilter } from 'shared/ui'

function Security() {
  return (
    <>
      <Paper sx={{ mb: 4 }}>
        <Grid container sx={{ p: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5">Change password</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction="row" justifyContent="space-between">
              <InputFilter placeholder="Password" />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      <Paper>
        <Grid container spacing={2} sx={{ p: 4 }}>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Typography variant="h5">Multi Factor Authentication</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack direction="column">
                <Typography variant="h6" color="error" sx={{ mb: 3 }}>
                  Off
                </Typography>
                <Typography variant="subtitle1">Authenticator App</Typography>
                <Typography variant="body2" color="text.secondary">
                  Use an authenticator app to generate one time security codes.
                </Typography>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  sx={{ mt: 3, width: 'fit-content' }}
                  variant="outlined"
                  size="small"
                >
                  Set Up
                </Button>
              </Stack>
            </Paper>
          </Grid>
          <Grid item>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack direction="column">
                <Typography variant="h6" color="error" sx={{ mb: 3 }}>
                  Off
                </Typography>
                <Typography variant="subtitle1">Text Message</Typography>
                <Typography variant="body2" color="text.secondary">
                  Use your mobile phone to receive security codes via SMS.
                </Typography>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  sx={{ mt: 3, width: 'fit-content' }}
                  variant="outlined"
                  size="small"
                >
                  Set Up
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default Security

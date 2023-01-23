import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Container,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import { ProfileModel } from 'pages/Profile/model'
import { Spinner } from 'shared/ui'
import { NODE_API_USER_AVATAR_URL } from 'shared/consts'

const SentConnections = () => {
  const { t } = useTranslation()

  useEffect(() => {
    ProfileModel.fetch({ isSent: true, isReceived: false })
  }, [])

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ p: 3 }}>
        {t('page:sentConnections')}
      </Typography>
      <Divider />
      <Box sx={{ p: 3, display: 'flex', alignItems: 'flex-end', gap: 3 }}>
        <SearchIcon />
        <TextField id="input-with-sx" label={t('user:actions.searchName')} variant="standard" />
      </Box>
      <Divider />

      <Grid container spacing={3} sx={{ p: 3 }}>
        {ProfileModel.loading.has ? (
          <Container>
            <Spinner />
          </Container>
        ) : (
          ProfileModel.connections.map((item) => (
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  spacing={3}
                  alignItems="start"
                  justifyContent="space-between"
                >
                  <Box display="flex" gap={2}>
                    <Avatar
                      alt="User avatar"
                      sx={{ cursor: 'pointer', width: 56, height: 56 }}
                      src={`${NODE_API_USER_AVATAR_URL}/${item.avatar}`}
                    />
                    <Stack>
                      <Typography variant="h6">
                        {item.name} {item.surname}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {t('user:email')}: {item.email}
                      </Typography>
                      <Button
                        color="primary"
                        variant="outlined"
                        size="small"
                        sx={{ mt: 2, width: 'fit-content' }}
                        onClick={() => ProfileModel.removeRequest(item.user_id)}
                      >
                        {t('user:actions.cancelSending')}
                      </Button>
                    </Stack>
                  </Box>
                  <IconButton aria-label="upload picture" component="label">
                    <Tooltip title={t('user:moreInfo')}>
                      <MoreHorizIcon />
                    </Tooltip>
                  </IconButton>
                </Stack>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </Paper>
  )
}

export default observer(SentConnections)

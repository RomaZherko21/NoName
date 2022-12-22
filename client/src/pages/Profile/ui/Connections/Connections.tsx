import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import { NODE_API_USER_AVATAR_URL } from 'shared/consts'

const Connections = () => {
  const { t } = useTranslation()

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ p: 3 }}>
        Connections
      </Typography>
      <Divider />
      <Box sx={{ p: 3, display: 'flex', alignItems: 'flex-end', gap: 3 }}>
        <SearchIcon />
        <TextField id="input-with-sx" label="Search connections" variant="standard" />
      </Box>
      <Divider />

      <Grid container spacing={3} sx={{ p: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Stack direction="row" spacing={3} alignItems="start">
              <Avatar
                alt="User avatar"
                sx={{ cursor: 'pointer', width: 56, height: 56 }}
                src={`https://material-kit-pro-react.devias.io/static/mock-images/avatars/avatar-carson_darrin.png`}
              />
              <Stack>
                <Typography variant="h6">Carson Darrin</Typography>
                <Typography variant="body2" color="textSecondary">
                  10 connections in common
                </Typography>
                <Button
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2, width: 'fit-content' }}
                >
                  Connect
                </Button>
              </Stack>
              <IconButton aria-label="upload picture" component="label">
                <Tooltip title="More info">
                  <MoreHorizIcon />
                </Tooltip>
              </IconButton>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Stack direction="row" spacing={3} alignItems="start">
              <Avatar
                alt="User avatar"
                sx={{ cursor: 'pointer', width: 56, height: 56 }}
                src={`https://material-kit-pro-react.devias.io/static/mock-images/avatars/avatar-carson_darrin.png`}
              />
              <Stack>
                <Typography variant="h6">Carson Darrin</Typography>
                <Typography variant="body2" color="textSecondary">
                  10 connections in common
                </Typography>
                <Button
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2, width: 'fit-content' }}
                >
                  {t('translation:actions.connect')}
                </Button>
              </Stack>
              <IconButton aria-label="upload picture" component="label">
                <Tooltip title="More info">
                  <MoreHorizIcon />
                </Tooltip>
              </IconButton>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Stack direction="row" spacing={3} alignItems="start">
              <Avatar
                alt="User avatar"
                sx={{ cursor: 'pointer', width: 56, height: 56 }}
                src={`https://material-kit-pro-react.devias.io/static/mock-images/avatars/avatar-carson_darrin.png`}
              />
              <Stack>
                <Typography variant="h6">Carson Darrin</Typography>
                <Typography variant="body2" color="textSecondary">
                  10 connections in common
                </Typography>
                <Button
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2, width: 'fit-content' }}
                >
                  {t('translation:actions.connect')}
                </Button>
              </Stack>
              <IconButton aria-label="upload picture" component="label">
                <Tooltip title="More info">
                  <MoreHorizIcon />
                </Tooltip>
              </IconButton>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default observer(Connections)

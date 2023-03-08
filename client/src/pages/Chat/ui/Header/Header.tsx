import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Paper, Stack, Avatar, Typography, Box, IconButton } from '@mui/material'
import { BsTelephone } from 'react-icons/bs'
import { FiMoreVertical, FiSearch } from 'react-icons/fi'

import { COMMON_DATE_FORMAT, ROUTES } from 'shared/consts'
import { fromMsToDate } from 'shared/helpers'

interface Props {
  user: any
}

function Header({ user }: Props) {
  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 0,
        height: 60,
        width: '100%',
      }}
    >
      <Box
        component={Link}
        to={ROUTES.USERS}
        sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}
      >
        <Avatar sx={{ height: 32, width: 32 }} src={user.avatar} />
        <Stack>
          <Typography variant="subtitle2" color="text.primary">
            {`${user.name} ${user.surname}`}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {format(fromMsToDate(user.online), COMMON_DATE_FORMAT)}
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <IconButton sx={{ fontSize: '16px' }}>
          <BsTelephone />
        </IconButton>
        <IconButton sx={{ fontSize: '18px' }}>
          <FiSearch />
        </IconButton>
        <IconButton sx={{ fontSize: '18px' }}>
          <FiMoreVertical />
        </IconButton>
      </Box>
    </Paper>
  )
}

export default observer(Header)

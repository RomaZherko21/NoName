import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Paper, Stack, Avatar, Typography, Box, IconButton } from '@mui/material'
import { BsTelephone } from 'react-icons/bs'
import { FiMoreVertical, FiSearch } from 'react-icons/fi'

import { COMMON_DATE_FORMAT, ROUTES } from 'shared/consts'
import { fromMsToDate } from 'shared/helpers'

interface Props {
  user_avatar?: string
  user_name?: string
  user_surname?: string
  was_online?: number
}

function Header({
  user_avatar = '',
  user_name = 'Miron',
  user_surname = 'Vitold',
  was_online = 1632131232111,
}: Props) {
  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 0,
        height: 66,
        width: `100%`,
      }}
    >
      <Box
        component={Link}
        to={ROUTES.USERS}
        sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}
      >
        <Avatar sx={{ height: 32, width: 32 }} src={user_avatar} />
        <Stack>
          <Typography variant="subtitle2" color="text.primary">
            {`${user_name} ${user_surname}`}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {format(fromMsToDate(was_online), COMMON_DATE_FORMAT)}
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        <IconButton>
          <BsTelephone size="18px" />
        </IconButton>
        <IconButton>
          <FiSearch size="18px" />
        </IconButton>
        <IconButton>
          <FiMoreVertical size="18px" />
        </IconButton>
      </Box>
    </Paper>
  )
}

export default observer(Header)
